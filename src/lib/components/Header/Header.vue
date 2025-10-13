<script setup lang="ts">
import { ref } from 'vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import Autocomplete from '@/lib/base-components/Autocomplete/Autocomplete.vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import type { HeaderEmits } from './header.interface'

const emit = defineEmits<HeaderEmits>()

const query = ref('')

function onMenuClick() {
  emit('menu-click')
}

function onSearch() {
  emit('search-autocomplete', { value: query.value.trim() })
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
      <Typography variant="heading-3" font-family="heading" font-weight="bold" size="xl">
        Logo
      </Typography>
      <div class="header__search-autocomplete">
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
}
</style>
