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
  <button
    type="button"
    class="card"
    :aria-label="article.title"
    @click="onClick && onClick($event)"
  >
    <Paper background="surface-0" border="border-1" border-radius="2" elevation="1" padding="2">
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
            :aria-label="article.title"
            :lines="1"
            class="card__title"
          >
            {{ article.title }}
          </Typography>
          <Typography
            tag="p"
            variant="body-small"
            font-family="body"
            font-weight="regular"
            size="sm"
            :aria-label="article.title"
            class="card__meta"
          >
            {{ article.source.name }} • {{ article.author || 'Unknown' }} • {{ formattedDate }}
          </Typography>
          <Typography
            v-if="article.description"
            tag="p"
            variant="body-medium"
            font-family="highlight"
            font-weight="regular"
            size="base"
            :lines="3"
            class="card__description"
          >
            {{ article.description }}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </button>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
@use '@/styles/mixins/flex' as flex;

.card {
  display: block;
  background: transparent;
  border: none;
  border-radius: spacing('2');
  padding: 0;
  margin: 0;
  cursor: pointer;
  width: 100%;
  text-align: -webkit-auto;
  color: inherit;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-status-focus);
  }

  &__media {
    height: 12rem;
  }

  &__placeholder {
    @include flex.center-both;
  }

  &__image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: spacing('1');
  }

  &__title {
    margin: 0;
  }

  &__meta {
    margin: 0;
    padding-bottom: spacing('1');
    border-bottom: 1px solid $color-border-1;
  }

  &__description {
    margin: 0;
  }
}
</style>
