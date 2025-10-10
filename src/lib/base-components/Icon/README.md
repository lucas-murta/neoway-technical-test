# Icon (Base Component)

Componente de ícone baseado em FontAwesome, seguindo os tokens de `size` e `color` do Typography.

Props
- `icon`: identificador do ícone. Aceita `string` (ex.: `faUser`) ou tupla `[prefix, name]` (ex.: `['fas', 'user']`).
- `size`: tamanho do ícone, reutiliza os mesmos valores de `TokenSize` do Typography (`xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`).
- `color`: cor do conteúdo, reutiliza os mesmos valores de `TokenContentColor` do Typography.

Classes Geradas
- Base: `icon`
- Tamanho: `icon--size-{size}`
- Cor: `icon--color-{color}`

Exemplo
```vue
<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/lib/base-components/Icon/Icon.vue'

library.add(faUser)
</script>

<template>
  <Icon :icon="['fas', 'user']" size="lg" color="content-primary" />
</template>
```

Notas
- É necessário adicionar os ícones desejados na `library` do FontAwesome antes de usá-los.