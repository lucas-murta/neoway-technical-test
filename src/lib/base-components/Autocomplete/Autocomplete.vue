<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import type { AutocompleteProps } from './autocomplete.interface'
import { createInputHandlers, createAutocompleteKeydown } from '@/utils/input-hooks'
import Paper from '../Paper/Paper.vue'

const props = withDefaults(defineProps<AutocompleteProps>(), {
  value: '',
  options: () => [],
})

const query = ref(props.value ?? '')
const isFocused = ref(false)
const activeIndex = ref(-1)
const listId = `autocomplete-list-${Math.random().toString(36).slice(2)}`
watch(
  () => props.value,
  (val) => {
    if (val !== query.value) query.value = val ?? ''
  },
)
watch(query, () => {
  activeIndex.value = -1
})

const classes = computed(() => {
  const c: string[] = ['autocomplete']
  if (props.disabled) c.push('is-disabled')
  if (props.readOnly) c.push('is-readonly')
  if (isFocused.value) c.push('is-focused')
  return c.join(' ')
})

const normalizedOptions = computed<{ label: string; value: string }[]>(() => {
  return (props.options ?? []).map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : { label: opt.label, value: opt.value },
  )
})

const filteredOptions = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return normalizedOptions.value
  return normalizedOptions.value.filter((o) => o.label.toLowerCase().includes(q))
})

const { onInput, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onClick, selectOption } =
  createInputHandlers({ props, query, isFocused })

const handleKeyDown = createAutocompleteKeydown({
  onKeyDown,
  isFocused,
  activeIndex,
  filteredOptions,
  selectOption,
})
</script>

<template>
  <div :class="classes" @click="onClick">
    <label class="autocomplete__label">
      <Typography
        v-if="label"
        tag="label"
        variant="body-small"
        font-family="body"
        font-weight="regular"
      >
        {{ label }}
      </Typography>

      <div class="autocomplete__field">
        <Paper
          background="surface-2"
          border="none"
          height="4"
          width="4"
          class="autocomplete__icon-paper"
        >
          <Icon v-if="icon" :icon="['fas', icon]" size="sm" class="autocomplete__icon" />
        </Paper>
        <input
          class="autocomplete__input"
          type="text"
          :name="name"
          :value="query"
          :disabled="disabled"
          :readonly="readOnly"
          :placeholder="placeholder"
          :maxlength="maxLength"
          :min="min"
          :max="max"
          :autocomplete="autoComplete"
          :required="required"
          :pattern="pattern"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="handleKeyDown"
          @keyup="onKeyUp"
        />
        <ul v-if="isFocused && filteredOptions.length" :id="listId" class="autocomplete__list">
          <li
            v-for="(opt, index) in filteredOptions"
            :key="opt.value"
            :class="['autocomplete__item', { 'is-active': index === activeIndex }]"
            @mousedown.prevent="selectOption(opt)"
          >
            <Typography tag="span" variant="body-small" font-family="body" font-weight="regular">
              {{ opt.label }}
            </Typography>
          </li>
        </ul>
      </div>
    </label>

    <Typography v-if="messageInfo" tag="p" variant="body-small" size="sm" class="message info">
      {{ messageInfo }}
    </Typography>
    <Typography v-if="messageDanger" tag="p" variant="body-small" size="sm" class="message danger">
      {{ messageDanger }}
    </Typography>
    <Typography
      v-if="messageSuccess"
      tag="p"
      variant="body-small"
      size="sm"
      class="message success"
    >
      {{ messageSuccess }}
    </Typography>
  </div>
  <slot />
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.autocomplete {
  display: flex;
  flex-direction: column;
  gap: spacing('1');

  &__label {
    margin-bottom: spacing('1');
  }

  &__field {
    display: flex;
    align-items: center;
    gap: spacing('1');
    background-color: $color-surface-0;
    border: 1px solid $color-border-1;
    border-radius: spacing('1');
    padding: spacing('1');
    position: relative;
  }

  &__icon {
    color: $color-content-default;
  }

  &__icon-paper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: $color-content-default;
    font-size: $font-size-base;
    padding: spacing('1');
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid $color-border-1;
    border-radius: spacing('1');
    background-color: $color-surface-0;
    position: absolute;
    top: calc(100% + spacing('1'));
    left: 0;
    right: 0;
    z-index: 1000;
    max-height: 240px;
    overflow-y: auto;
  }

  &__item {
    padding: spacing('1') spacing('2');
    cursor: pointer;
    &:hover {
      background-color: $color-surface-1;
    }
    &.is-active {
      background-color: $color-surface-1;
    }
  }

  .message.info {
    color: $color-content-info;
  }
  .message.danger {
    color: $color-status-negative;
  }
  .message.success {
    color: $color-status-positive;
  }

  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &.is-readonly {
    .autocomplete__input {
      cursor: default;
    }
  }

  &.is-focused {
    .autocomplete__field {
      border-color: $color-border-2;
      box-shadow: 0 0 0 2px $color-status-focus;
      transition:
        box-shadow 120ms ease,
        border-color 120ms ease;
    }
  }
}
</style>
