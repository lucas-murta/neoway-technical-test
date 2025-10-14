<script setup lang="ts">
import { ref } from 'vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import Autocomplete from '@/lib/base-components/Autocomplete/Autocomplete.vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import type { HeaderEmits } from './header.interface'

const emit = defineEmits<HeaderEmits>()
const searchOpen = ref(false)

const { isDesktop } = useBreakpoints()

const query = ref('')

function onMenuClick() {
  emit('menu-click')
}

function onSearch() {
  emit('search-autocomplete', { value: query.value.trim() })
}

function onOpenSearch() {
  searchOpen.value = !searchOpen.value
}
</script>

<template>
  <header class="header">
    <Grid :cols="3" gap="2" padding="1" justify-items="center" align-items="center">
      <Button
        class="header__menu-button"
        variant="text"
        size="medium"
        color="primary"
        icon-button
        icon-left="bars"
        @click="onMenuClick"
      ></Button>
      <Typography
        :variant="isDesktop ? 'heading-3' : 'body-large'"
        font-family="heading"
        font-weight="bold"
        size="xl"
        class="header__brand"
      >
        <Icon
          :icon="['fas', 'globe']"
          :size="isDesktop ? '3xl' : 'xl'"
          class="header__brand-icon"
        />
        <span v-if="isDesktop"> Global News </span>
      </Typography>
      <div v-if="isDesktop" class="header__search-autocomplete">
        <Autocomplete
          name="header-search"
          icon="magnifying-glass"
          placeholder="Search"
          :value="query"
          :on-input="
            (e) => {
              const t = e.target as HTMLInputElement | null
              if (t) query = t.value
            }
          "
          :on-key-down="
            (e) => {
              if (e.key === 'Enter') onSearch()
            }
          "
        ></Autocomplete>
      </div>
      <Button
        v-if="!isDesktop"
        class="header__search-autocomplete"
        variant="text"
        size="medium"
        color="primary"
        icon-button
        icon-left="search"
        @click="onOpenSearch"
      ></Button>
    </Grid>
    <Grid v-if="!isDesktop && searchOpen" :cols="1" gap="2" padding="1">
      <Autocomplete
        name="header-search"
        icon="magnifying-glass"
        placeholder="Search"
        :value="query"
        :on-input="
          (e) => {
            const t = e.target as HTMLInputElement | null
            if (t) query = t.value
          }
        "
        :on-key-down="
          (e) => {
            if (e.key === 'Enter') onSearch()
          }
        "
      ></Autocomplete>
    </Grid>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

.header {
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: $color-surface-0;
  border-bottom: 1px solid $color-border-1;

  &__right {
    gap: spacing('2');
  }

  &__menu-button {
    justify-self: flex-start;
  }

  &__search-autocomplete {
    justify-self: flex-end;
  }

  &__brand {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    gap: spacing('1');
  }

  &__brand-icon {
    color: $color-primary;
  }
}
</style>
