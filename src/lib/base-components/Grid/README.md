# Grid (Base Component)

Componente base de layout utilizando `display: grid`, com utilidades para espaçamento e responsividade.

Props
- `direction`: direção do fluxo em grid (aplica classes utilitárias de flex para alinhamento). Ex.: `row`, `column`.
- `alignItems`: alinhamento dos itens. Ex.: `start`, `center`, `end`, `stretch`, `baseline`.
- `justifyContent`: distribuição no eixo principal. Ex.: `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly`.
- `gap`: espaçamento entre itens pelo token (`'1'` a `'12'`).
- `gapX`: espaçamento horizontal entre colunas via token.
- `gapY`: espaçamento vertical entre linhas via token.
- `cols`: colunas base. Número inteiro.
- `smCols`, `mdCols`, `lgCols`: colunas responsivas para breakpoints.
- `height`, `width`: tamanho do container. Aceita tokens de espaçamento `'1'` a `'12'`, `'auto'` e keywords (`'full'`, `'fit-content'`, `'max-content'`, `'min-content'`).
- `padding`, `smPadding`, `mdPadding`, `lgPadding`: padding como shorthand (ex.: `"8px 16px"`).
- `margin`, `smMargin`, `mdMargin`, `lgMargin`: margin como shorthand.

Classes Geradas
- Base: `grid`
- Direção: `grid--dir-{direction}`
- Alinhamento: `grid--ai-{alignItems}`
- Justificação: `grid--jc-{justifyContent}`
- Gap: `grid--gap-{token}`
- Gap X: `grid--gapx-{token}`
- Gap Y: `grid--gapy-{token}`
- Colunas: `grid--cols-{n}`
- Responsivas: `grid--sm-cols-{n}`, `grid--md-cols-{n}`, `grid--lg-cols-{n}`

Exemplo
```vue
<script setup lang="ts">
import Grid from '@/lib/base-components/grid/Grid.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
</script>

<template>
  <Grid :cols="2" :md-cols="3" :lg-cols="4" gap="2" padding="16px">
    <div v-for="n in 8" :key="n" style="background-color: #fff; border: 1px solid #ddd; padding: 8px">
      <Typography tag="p" variant="body-small" font-family="body" font-weight="regular" size="sm">
        Item {{ n }}
      </Typography>
    </div>
  </Grid>
</template>
```

Notas
- Tokens Sass estão disponíveis globalmente via `vite.config.ts` (`@use "@/styles/tokens" as *;`).
- `padding`/`margin` aceitam shorthand (`"8px 16px"`, `"4px 8px 12px"`, etc.).
- `gap`, `gapX`, `gapY` usam tokens numéricos `'1'` a `'12'`.