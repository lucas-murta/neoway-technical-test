# Thumbnail (Base Component)

Componente de imagem em miniatura com controle de brilho via `overlap` e interação hover opcional.

Props
- `url`: endereço da imagem.
- `overlap`: nível de brilho aplicado (`1`=0.8, `2`=0.7, `3`=0.6).
- `interact`: quando verdadeiro, reduz o brilho em 0.1 no hover e anima.
- `border`, `borderRadius`: seguem o padrão dos tokens.
- `width`, `height`, `padding`, `margin` e variantes responsivas: seguem o padrão do `Paper`.

Exemplo
```vue
<Thumbnail
  url="https://picsum.photos/300/200"
  overlap="2"
  interact
  border="border-1"
  borderRadius="1"
  width="300px"
  height="200px"
  padding="2"
  margin="2"
/>
```