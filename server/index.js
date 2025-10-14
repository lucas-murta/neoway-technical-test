// Simple Express proxy server for NewsAPI with 1-hour disk cache
// Run with: npm run start:proxy

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001
const NEWSAPI_BASE = 'https://newsapi.org/v2'
const API_KEY = process.env.NEWS_API_KEY
const CACHE_DIR = path.join(__dirname, '..', '.cache', 'newsapi')
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
}

app.use(cors())

function cacheFileFor(endpoint, qs) {
  const key = `${endpoint}?${qs}`
  const hash = crypto.createHash('sha1').update(key).digest('hex')
  return path.join(CACHE_DIR, `${endpoint.replace('/', '_')}-${hash}.json`)
}

function readCache(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const payload = JSON.parse(raw)
    if (payload && payload.cachedAt && Date.now() - payload.cachedAt < CACHE_DURATION) {
      return payload.data
    }
  } catch (error) {
    console.error('Failed to read cache', error)
  }
  return null
}

function writeCache(filePath, data) {
  try {
    const payload = { cachedAt: Date.now(), data }
    fs.writeFileSync(filePath, JSON.stringify(payload), 'utf-8')
  } catch (err) {
    console.error('Failed to write cache', err)
  }
}

async function proxyEndpoint(endpoint, req, res) {
  const qs = new URLSearchParams(req.query).toString()
  const file = cacheFileFor(endpoint, qs)
  const cached = readCache(file)
  if (cached) {
    return res.json(cached)
  }

  if (!API_KEY) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Missing NEWS_API_KEY on proxy server.' })
  }

  const queryString = qs ? `?${qs}` : ''
  const upstreamUrl = `${NEWSAPI_BASE}${endpoint}${queryString}`
  try {
    const upstreamRes = await fetch(upstreamUrl, {
      headers: { 'X-Api-Key': API_KEY },
    })
    const data = await upstreamRes.json()
    // Cache only successful responses
    if (upstreamRes.ok) writeCache(file, data)
    return res.status(upstreamRes.status).json(data)
  } catch (err) {
    console.error('Proxy fetch error:', err)
    return res.status(502).json({ status: 'error', message: 'Bad Gateway', error: String(err) })
  }
}

app.get('/api/news/top-headlines', (req, res) => proxyEndpoint('/top-headlines', req, res))
app.get('/api/news/everything', (req, res) => proxyEndpoint('/everything', req, res))
app.get('/api/news/sources', (req, res) => proxyEndpoint('/sources', req, res))

app.listen(PORT, () => {
  console.log(`[news-proxy] listening on http://localhost:${PORT}`)
})
