# Typography (Base Component)

Componente base de tipografia que aplica estilos via classes geradas a partir de tokens Sass.

Props
- `tag`: elemento HTML renderizado. Padrão: `p`.
- `variant`: estilo tipográfico. Ex.: `heading-1`, `heading-2`, `heading-3`, `highlight-large`, `highlight-medium`, `body-large`, `body-medium`, `body-small`.
- `size`: tamanho da fonte. Ex.: `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`.
- `fontFamily`: família tipográfica. Ex.: `heading`, `highlight`, `body`.
- `fontWeight`: peso da fonte. Ex.: `light`, `regular`, `medium`, `semibold`, `bold`.
- `color`: cor de conteúdo. Ex.: `content-default`.

Slots
- `default`: conteúdo de texto ou nós filhos a serem renderizados.

Classes Geradas
- Base: `typography`
- Variante: `typography--{variant}`
- Tamanho: `typography--size-{size}`
- Família: `typography--font-{fontFamily}`
- Peso: `typography--weight-{fontWeight}`
- Cor: `typography--color-{color}`

Exemplos
```vue
<Typography tag="h1" variant="heading-2" font-family="heading" font-weight="bold" size="3xl">
  Typography Component
  
</Typography>

<Typography
  tag="p"
  variant="body-medium"
  font-family="body"
  font-weight="regular"
  size="base"
  color="content-default"
>
  This is a body text using design tokens.
</Typography>
```

Notas
- Os tokens Sass são disponibilizados globalmente via configuração do Vite.