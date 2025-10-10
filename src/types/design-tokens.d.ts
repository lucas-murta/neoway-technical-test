declare global {
  type TokenFontFamily = 'heading' | 'highlight' | 'body'
  type TokenFontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  type TokenFontSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  type TokenSize = TokenFontSize
  type TokenSpacing = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  type TokenSurfaceColor =
    | 'surface-0'
    | 'surface-1'
    | 'surface-2'
    | 'surface-3'
    | 'surface-4'
    | 'surface-info'
    | 'surface-system'
    | 'surface-warning'
    | 'surface-positive'
    | 'surface-negative'
    | 'surface-primary'
  type TokenContentColor =
    | 'content-default'
    | 'content-disable'
    | 'content-ghost'
    | 'content-bright'
    | 'content-din'
    | 'content-primary'
    | 'content-info'
    | 'content-system'
    | 'content-warning'
    | 'content-positive'
    | 'content-negative'
}

export {}
