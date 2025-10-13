# Autocomplete (Base Component)

Componente de entrada com sugestões filtradas conforme digitação.

Props
- `value`: texto atual do input.
- `icon`: nome do ícone (Font Awesome solid), ex.: `search`.
- `label`: rótulo do campo.
- `name`: atributo `name` do input.
- `disabled`: desabilita o campo.
- `readOnly`: somente leitura.
- `placeholder`: placeholder do input.
- `maxLength`: comprimento máximo.
- `min` / `max`: limites numéricos (compatibilidade minimalista).
- `options`: lista de opções (`string` ou `{ label, value }`).
- `required`: validação obrigatória nativa.
- `pattern`: regex nativa do input.
- `messageInfo` / `messageDanger` / `messageSuccess`: mensagens auxiliares.

Eventos
- `onInput`, `onChange`, `onFocus`, `onBlur`, `onKeyDown`, `onKeyUp`, `onClick`.

Slots
- `default`: conteúdo extra após o bloco do componente.

Classes Geradas
- Base: `autocomplete`.
- Estados: `is-disabled`, `is-readonly`.
- Estrutura: `autocomplete__label`, `autocomplete__field`, `autocomplete__icon`, `autocomplete__input`, `autocomplete__list`, `autocomplete__item`.

Exemplo
```vue
<Autocomplete
  label="Search"
  icon="search"
  placeholder="Type to filter"
  :options="['Apple', 'Banana', 'Cherry']"
/>
```

Notas
- Depende de `Icon` e `Typography` para ícone e texto.
- Biblioteca de ícones deve estar registrada em `main.ts`.