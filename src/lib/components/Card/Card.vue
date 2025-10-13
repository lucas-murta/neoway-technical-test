<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './card.interface'
import Paper from '@/lib/base-components/Paper/Paper.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import Thumbnail from '@/lib/base-components/Thumbnail/Thumbnail.vue'

const props = defineProps<CardProps>()

const formattedDate = computed(() => {
  const d = new Date(props.article.publishedAt)
  if (Number.isNaN(d.getTime())) return props.article.publishedAt
  return d.toLocaleDateString()
})
</script>

<template>
  <Paper background="surface-0" border="border-1" border-radius="2" elevation="1" padding="2">
    <div class="card">
      <Grid :cols="1" :sm-cols="1" :md-cols="2" :lg-cols="2" gap="2" align-items="start">
        <Grid class="card__media">
          <Thumbnail
            v-if="article.urlToImage"
            :url="article.urlToImage"
            alt="cover"
            overlap="1"
            border-radius="1"
            height="full"
            width="full"
            interact
          />

          <Paper v-else background="surface-3" height="full" width="full" class="card__placeholder">
            <Icon :icon="['fas', 'image']" size="5xl" color="content-ghost" />
          </Paper>
        </Grid>
        <Grid col="1" gap="1" align-content="start">
          <Typography
            tag="h3"
            variant="heading-3"
            font-family="heading"
            font-weight="bold"
            size="lg"
            class="card__title"
          >
            {{ article.title }}
          </Typography>
          <Typography
            v-if="article.description"
            tag="p"
            variant="body-medium"
            font-family="highlight"
            font-weight="regular"
            size="base"
            class="card__description"
          >
            {{ article.description }}
          </Typography>
          <Typography
            tag="p"
            variant="body-small"
            font-family="body"
            font-weight="regular"
            size="sm"
            class="card__meta"
          >
            {{ article.source.name }} • {{ article.author || 'Unknown' }} • {{ formattedDate }}
          </Typography>
        </Grid>
      </Grid>
    </div>
  </Paper>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
@use '@/styles/mixins/flex' as flex;

.card {
  display: block;
}

.card__media {
  height: 12rem;
}

.card__placeholder {
  @include flex.center-both;
}

.card__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: spacing('1');
}

.card__title {
  margin: 0;
}

.card__description {
  margin: 0;
}
</style>
