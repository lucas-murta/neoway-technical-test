// Configuração para gh-pages
module.exports = {
  branch: 'gh-pages',
  dest: 'dist',
  dotfiles: true, // Inclui arquivos que começam com ponto (como .nojekyll)
  message: 'feat: deploy to github pages [skip ci]',
  user: {
    name: 'GitHub Actions',
    email: 'github-actions[bot]@users.noreply.github.com',
  },
}
