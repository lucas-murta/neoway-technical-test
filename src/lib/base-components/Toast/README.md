# Toast (Base Component)

Componente base de notificação toast com suporte a diferentes status e ícones correspondentes.

Props
- `status`: status da notificação. Ex.: `system`, `warning`, `positive`, `negative`. Obrigatório.
- `title`: título da notificação. Obrigatório.
- `text`: texto descritivo da notificação. Obrigatório.
- `className`: classes adicionais para o toast.

Classes Geradas
- Base: `toast`
- Status: `toast--status-{status}`

Ícones por Status
- `system`: `info-circle` (informação)
- `warning`: `exclamation-triangle` (aviso)
- `positive`: `check-circle` (sucesso)
- `negative`: `times-circle` (erro)

Cores por Status
- `system`: usa tokens `$color-surface-system` e `$color-content-system`
- `warning`: usa tokens `$color-surface-warning` e `$color-content-warning`
- `positive`: usa tokens `$color-surface-positive` e `$color-content-positive`
- `negative`: usa tokens `$color-surface-negative` e `$color-content-negative`

Exemplos
```vue
<Toast 
  status="system" 
  title="Informação do Sistema" 
  text="Esta é uma notificação informativa do sistema." 
/>

<Toast 
  status="warning" 
  title="Atenção" 
  text="Verifique os dados antes de continuar." 
/>

<Toast 
  status="positive" 
  title="Sucesso" 
  text="Operação realizada com sucesso!" 
/>

<Toast 
  status="negative" 
  title="Erro" 
  text="Ocorreu um erro ao processar a solicitação." 
/>
```

Notas
- Ícones dependem da biblioteca Font Awesome estar registrada (ver `src/lib/base-components/Icon/library.ts`).
- Tipografia do título e texto são renderizadas via componente `Typography`.
- Cores seguem os design tokens definidos nos temas light/dark.