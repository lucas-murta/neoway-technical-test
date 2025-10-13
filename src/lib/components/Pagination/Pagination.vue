<script setup lang="ts">
import { computed } from 'vue'
import { scrollToTopSmooth } from '@/utils/dom/scroll'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import type { PaginationEmits } from './pagination.interface'

interface PaginationProps {
  page: number
  pageSize: number
  totalResults: number | null
  disabled?: boolean
}

const props = defineProps<PaginationProps>()
const emit = defineEmits<PaginationEmits>()

const totalPages = computed(() => {
  if (!props.totalResults || props.totalResults <= 0) return 0
  return Math.max(1, Math.ceil(props.totalResults / props.pageSize))
})

const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < totalPages.value)

function goTo(page: number) {
  if (page < 1) return
  if (totalPages.value && page > totalPages.value) return
  emit('change', { page })
}

const onPrev = () => {
  if (canPrev.value) {
    goTo(props.page - 1)
    scrollToTopSmooth()
  }
}

const onNext = () => {
  if (canNext.value) {
    goTo(props.page + 1)
    scrollToTopSmooth()
  }
}
</script>

<template>
  <Grid direction="row" gap="2" justify-items="end" align-items="center">
    <Button
      variant="text"
      size="small"
      color="primary"
      icon-button
      icon-left="angle-left"
      :disabled="!canPrev || disabled"
      @click="onPrev"
    />
    <Typography tag="span" variant="body-small" font-family="body" font-weight="regular" size="sm">
      Page {{ page }}
      <Typography
        v-if="totalPages"
        tag="span"
        variant="body-small"
        font-family="body"
        font-weight="regular"
        size="sm"
      >
        / {{ totalPages }}
      </Typography>
    </Typography>
    <Button
      variant="text"
      size="small"
      color="primary"
      icon-button
      icon-right="angle-right"
      :disabled="!canNext || disabled"
      @click="onNext"
    />
  </Grid>
</template>
