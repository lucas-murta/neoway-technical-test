# Button (Base Component)

Componente base de botão com suporte a variantes, tamanhos, cores e ícones.

Props
- `variant`: estilo visual. Ex.: `solid`, `outline`, `text`. Padrão: `solid`.
- `size`: tamanho. Ex.: `small`, `medium`, `large`. Padrão: `medium`.
- `color`: cor. Ex.: `primary`, `secondary`, `positive`, `negative`. Padrão: `primary`.
- `className`: classes adicionais para o botão.
- `disabled`: desabilita interações do botão.
- `iconButton`: renderiza somente ícone, sem label.
- `iconLeft`: nome do ícone à esquerda (FontAwesome, ex.: `user`).
- `iconRight`: nome do ícone à direita (FontAwesome, ex.: `user`).
- `onClick`: callback de clique `(event: MouseEvent) => void`.

Slots
- `default`: conteúdo textual do botão.

Classes Geradas
- Base: `button`
- Variante: `button--variant-{variant}`
- Tamanho: `button--size-{size}`
- Cor: `button--color-{color}`
- Icon-only: `button--icon-only` quando `iconButton` é verdadeiro
- Estado: `is-disabled` quando `disabled` é verdadeiro

Exemplos
```vue
<Button variant="solid" size="small" color="primary">Enviar</Button>

<Button variant="outline" size="medium" color="secondary">Cancelar</Button>

<Button variant="text" size="large" color="positive">Saiba mais</Button>

<Button variant="solid" size="medium" color="primary" icon-left="user">Perfil</Button>

<Button variant="solid" size="medium" color="primary" icon-right="user">Continuar</Button>

<Button variant="solid" size="medium" color="primary" icon-button icon-left="user" />

<Button variant="solid" size="medium" color="primary" @click="handleClick">Clique</Button>
```

Notas
- Ícones dependem da biblioteca Font Awesome estar registrada (ver `src/lib/base-components/Icon/library.ts`).
- Tipografia do label é renderizada via componente `Typography`.