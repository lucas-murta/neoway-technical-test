# Paper (Base Component)

Componente de contêiner com fundo, borda, raio e elevação, além de controle de largura/altura e espaçamentos via variáveis de estilo.

Props
- `background`: cor de superfície. Ex.: `surface-0`, `surface-1`, `surface-2`, `surface-3`, `surface-4`, `surface-info`, `surface-system`, `surface-warning`, `surface-positive`, `surface-negative`, `surface-primary`.
- `border`: cor de borda. Ex.: `none`, `border-1`, `border-2`, `border-3`. Padrão: `none`.
- `borderRadius`: raio de borda. Ex.: `none`, `1`, `2`. Padrão: `1`.
- `elevation`: sombra/elevacao. Ex.: `0`, `1`.
- `width`: largura. Aceita tokens de espaçamento (`1`..`12`), `auto` ou keywords de tamanho (`full`, `fit-content`, `max-content`, `min-content`).
- `height`: altura. Aceita tokens de espaçamento (`1`..`12`), `auto` ou keywords de tamanho.
- `padding`: shorthand para espaçamento interno (aceita tokens `1`..`12` ou valores CSS). Suporte responsivo: `smPadding`, `mdPadding`, `lgPadding`.
- `margin`: shorthand para espaçamento externo (aceita tokens `1`..`12` ou valores CSS). Suporte responsivo: `smMargin`, `mdMargin`, `lgMargin`.

Classes Geradas
- Base: `paper`
- Fundo: `paper--bg-{background}`
- Borda: `paper--border-{border}` (omitido quando `border` = `none`)
- Raio: `paper--radius-{borderRadius}` (omitido quando `borderRadius` = `none`)
- Elevação: `paper--elevation-{elevation}`

Variáveis de Estilo
- `--paper-height`, `--paper-width`
- `--paper-padding`, `--paper-sm-padding`, `--paper-md-padding`, `--paper-lg-padding`
- `--paper-margin`, `--paper-sm-margin`, `--paper-md-margin`, `--paper-lg-margin`

Exemplos
```vue
<Paper background="surface-0" border="border-1" border-radius="2" elevation="1" padding="2" md-padding="3" margin="2 auto">
  <Typography tag="p" variant="body-small" font-family="body" font-weight="regular" size="sm">
    Content here
  </Typography>
</Paper>

<Grid :cols="3" gap="2">
  <Paper v-for="n in 3" :key="n" background="surface-1" border="border-2" padding="1 2">
    <Typography tag="p" variant="body-small" font-family="body" font-weight="regular" size="sm">
      Card {{ n }}
    </Typography>
  </Paper>
</Grid>
```

Notas
- Tokens Sass e mixins são `@use`d no escopo do componente para aplicar superfícies, bordas/raio e elevação.
- As variáveis de estilo permitem controle responsivo e integração com tokens.