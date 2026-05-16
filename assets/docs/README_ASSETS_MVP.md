# README_ASSETS_MVP.md — Flechas do Rei

Documento de controle dos assets visuais necessários para o MVP.

Este arquivo deve orientar Antigravity/Codex na implementação das telas:
- Login
- Onboarding
- Home
- Player do áudio
- Configurações

## Regra principal

Não transformar a tela inteira em imagem.

Use imagens apenas para ilustrações complexas, personagens, avatares, recompensas e logos.  
Use SVG/código para ícones, botões, cards, bordas, progressos, toggles, sliders, tabs e textos.

---

## Estrutura de pastas

```txt
/assets
  /images
    /branding
    /heroes
    /characters
    /avatars
    /narrators
    /rewards
    /illustrations
    /textures
  /svg
    /branding
    /icons
    /effects
    /rings
  /docs
    README_ASSETS_MVP.md
```

---

## Convenções de nome

Use sempre:
- letras minúsculas
- nomes em inglês
- hífen entre palavras
- sem espaços
- sem acentos

Exemplo:

```txt
audio-player-day1-light.webp
guide-boy-full.png
chevron-right.svg
```

---

## Formatos recomendados

| Tipo de asset | Formato | Observação |
|---|---:|---|
| Hero/cenário grande | `.webp` | Melhor para ilustrações grandes |
| Personagem recortado | `.png` | Fundo transparente |
| Avatar | `.png` | Fundo transparente, bom para crop circular |
| Recompensa/objeto | `.png` | Fundo transparente |
| Ícone de UI | `.svg` | Melhor para escala e tema |
| Efeito simples | `.svg` | Glow, sparkle, ring |
| Textura | `.png` | Opcional |

---

## Status possíveis

Use estes status no controle:

```txt
PENDENTE
GERAR
PRONTO
SUBSTITUIR
OPCIONAL
```

---

# 1. Assets raster

## 1.1 Branding

| Arquivo | Tipo | Prioridade | Status | Telas | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/branding/flechas-do-rei-logo-horizontal.png` | PNG | Alta | PENDENTE | Login, Onboarding | Logo principal com nome |
| `/assets/images/branding/flechas-do-rei-logo-mark.png` | PNG | Média | PENDENTE | Splash/futuro | Símbolo isolado da marca |

Observação: se possível, preferir versão SVG em `/assets/svg/branding`.

---

## 1.2 Heroes principais

| Arquivo | Tipo | Prioridade | Status | Tela | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/heroes/login-hero-bible-light.webp` | WEBP | Alta | PENDENTE | Login | Fundo com Bíblia aberta e feixe de luz |
| `/assets/images/heroes/onboarding-hero-city-light.webp` | WEBP | Alta | PENDENTE | Onboarding | Fundo com cidade iluminada e clima de jornada |
| `/assets/images/heroes/audio-player-day1-light.webp` | WEBP | Alta | PENDENTE | Player | Cena Dia 1 — Haja Luz |
| `/assets/images/heroes/home-open-bible-map.webp` | WEBP | Alta | PENDENTE | Home | Bíblia aberta com mapa da grande jornada |

Regras:
- não embutir textos na imagem
- não embutir botões
- evitar UI dentro da arte
- deixar espaço visual para overlays/textos quando necessário

---

## 1.3 Personagens

| Arquivo | Tipo | Prioridade | Status | Telas | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/characters/guide-boy-full.png` | PNG transparente | Alta | PENDENTE | Login, Onboarding, Home | Menino guia em pose de apresentação |
| `/assets/images/characters/guide-boy-back.png` | PNG transparente | Alta | PENDENTE | Player | Menino de costas olhando para a luz |

Regras:
- fundo transparente
- manter estilo consistente entre as poses
- mesma roupa, cabelo, paleta e proporção visual

---

## 1.4 Avatares

| Arquivo | Tipo | Prioridade | Status | Telas | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/avatars/avatar-boy-1.png` | PNG transparente | Alta | PENDENTE | Onboarding, Header | Opção 1 de companheiro/avatar |
| `/assets/images/avatars/avatar-girl-1.png` | PNG transparente | Alta | PENDENTE | Onboarding | Opção 2 de companheiro/avatar |
| `/assets/images/avatars/avatar-boy-2.png` | PNG transparente | Alta | PENDENTE | Onboarding | Opção 3 de companheiro/avatar |
| `/assets/images/avatars/default-profile-avatar.png` | PNG transparente | Alta | PENDENTE | Home, Player, Configurações | Avatar padrão no topo |

Observação:
- `default-profile-avatar.png` pode inicialmente ser cópia de `avatar-boy-1.png`.

---

## 1.5 Narradores

| Arquivo | Tipo | Prioridade | Status | Tela | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/narrators/journey-narrator-avatar.png` | PNG transparente | Média | PENDENTE | Player | Avatar circular do narrador |

Observação:
- Pode ser um personagem bíblico acolhedor, sábio e inspirador.
- Não precisa ser realista.

---

## 1.6 Recompensas

| Arquivo | Tipo | Prioridade | Status | Tela | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/rewards/mana-orb-blue.png` | PNG transparente | Média | PENDENTE | Player | Recompensa “+10 Mana” |
| `/assets/images/rewards/mana-coin-bread.png` | PNG transparente | Média | PENDENTE | Home | Ícone visual do recurso “Maná” |

---

## 1.7 Ilustrações pequenas

| Arquivo | Tipo | Prioridade | Status | Tela | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/illustrations/shield-check-illustration.png` | PNG transparente | Média | PENDENTE | Login | Card de acesso liberado manualmente |

---

## 1.8 Texturas

| Arquivo | Tipo | Prioridade | Status | Telas | Uso |
|---|---:|---:|---:|---|---|
| `/assets/images/textures/noise-overlay.png` | PNG | Baixa | OPCIONAL | Todas | Textura premium sutil sobre fundos escuros |

---

# 2. Assets SVG

## 2.1 Branding SVG

| Arquivo | Prioridade | Status | Telas | Uso |
|---|---:|---:|---|---|
| `/assets/svg/branding/flechas-do-rei-logo-horizontal.svg` | Alta | PENDENTE | Login, Onboarding | Logo principal |
| `/assets/svg/branding/flechas-do-rei-logo-mark.svg` | Média | PENDENTE | Geral/futuro | Marca isolada |

---

## 2.2 Ícones base

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/back-arrow.svg` | Alta | PENDENTE | Voltar |
| `/assets/svg/icons/chevron-right.svg` | Alta | PENDENTE | Próximo/entrar |
| `/assets/svg/icons/skip.svg` | Média | PENDENTE | Pular onboarding |

---

## 2.3 Bottom navigation

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/home.svg` | Alta | PENDENTE | Aba Início |
| `/assets/svg/icons/map.svg` | Alta | PENDENTE | Aba Mapa |
| `/assets/svg/icons/cinema.svg` | Alta | PENDENTE | Aba Cinema |
| `/assets/svg/icons/gamepad.svg` | Alta | PENDENTE | Aba Jogo |
| `/assets/svg/icons/library.svg` | Alta | PENDENTE | Aba Biblioteca |
| `/assets/svg/icons/parents.svg` | Alta | PENDENTE | Aba Pais |
| `/assets/svg/icons/more.svg` | Alta | PENDENTE | Aba Mais |

Observação:
- A tela de Player usa “Mais”.
- A Home usa “Pais”.
- Manter ambos disponíveis.

---

## 2.4 Player / áudio

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/audio-wave.svg` | Alta | PENDENTE | Ícone de áudio/narração |
| `/assets/svg/icons/play.svg` | Alta | PENDENTE | Play |
| `/assets/svg/icons/pause.svg` | Alta | PENDENTE | Pause |
| `/assets/svg/icons/rewind-15.svg` | Média | PENDENTE | Voltar 15 segundos |
| `/assets/svg/icons/forward-15.svg` | Média | PENDENTE | Avançar 15 segundos |
| `/assets/svg/icons/volume.svg` | Alta | PENDENTE | Volume da narração |
| `/assets/svg/icons/music.svg` | Alta | PENDENTE | Música/efeitos sonoros |

---

## 2.5 Conteúdo / recompensas

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/gift.svg` | Alta | PENDENTE | Recompensa |
| `/assets/svg/icons/book-open.svg` | Alta | PENDENTE | Versículo/história aberta |
| `/assets/svg/icons/book.svg` | Média | PENDENTE | Livro/biblioteca |
| `/assets/svg/icons/lock.svg` | Alta | PENDENTE | Bloqueio |
| `/assets/svg/icons/sun-episode.svg` | Média | PENDENTE | Episódio 1 / luz |
| `/assets/svg/icons/star-verse.svg` | Média | PENDENTE | Versículo do dia |
| `/assets/svg/icons/trophy.svg` | Média | PENDENTE | Conquistas |

---

## 2.6 Configurações / conta / suporte

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/language.svg` | Alta | PENDENTE | Idioma |
| `/assets/svg/icons/user.svg` | Alta | PENDENTE | Perfil da criança |
| `/assets/svg/icons/users.svg` | Alta | PENDENTE | Trocar perfil |
| `/assets/svg/icons/info.svg` | Alta | PENDENTE | Informação / Sobre |
| `/assets/svg/icons/shield.svg` | Alta | PENDENTE | Sobre / segurança |
| `/assets/svg/icons/help.svg` | Alta | PENDENTE | Ajuda e suporte |
| `/assets/svg/icons/logout.svg` | Alta | PENDENTE | Sair da conta |
| `/assets/svg/icons/mail.svg` | Alta | PENDENTE | Input de e-mail |
| `/assets/svg/icons/google.svg` | Baixa | PENDENTE | Google em breve |

---

## 2.7 Home / grande jornada

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/icons/crown.svg` | Média | PENDENTE | Capítulo Reino / ícone decorativo |
| `/assets/svg/icons/scroll.svg` | Média | PENDENTE | Profetas |
| `/assets/svg/icons/cross-small.svg` | Média | PENDENTE | Jesus / divisor |
| `/assets/svg/icons/church.svg` | Média | PENDENTE | Igreja |
| `/assets/svg/icons/star-level.svg` | Média | PENDENTE | Nível do usuário |
| `/assets/svg/icons/next-step-star.svg` | Média | PENDENTE | Próximo passo |

---

## 2.8 Efeitos SVG

| Arquivo | Prioridade | Status | Uso |
|---|---:|---:|---|
| `/assets/svg/effects/gold-sparkle.svg` | Média | PENDENTE | Brilhos decorativos |
| `/assets/svg/effects/gold-glow-circle.svg` | Média | PENDENTE | Glow atrás de botões/ícones |
| `/assets/svg/effects/gold-divider-ornament.svg` | Média | PENDENTE | Ornamento divisor |
| `/assets/svg/effects/nav-active-glow.svg` | Baixa | PENDENTE | Glow do item ativo na tab |
| `/assets/svg/effects/card-corner-glow.svg` | Baixa | PENDENTE | Brilho de canto nos cards |

---

## 2.9 Rings SVG

| Arquivo | Prioridade | Status | Tela | Uso |
|---|---:|---:|---|---|
| `/assets/svg/rings/avatar-ring.svg` | Média | PENDENTE | Header/Onboarding | Anel dourado do avatar |
| `/assets/svg/rings/narrator-ring.svg` | Média | PENDENTE | Player | Anel do narrador |
| `/assets/svg/rings/play-button-ring.svg` | Média | PENDENTE | Player | Anel do botão play/pause |
| `/assets/svg/rings/lock-progress-ring.svg` | Média | PENDENTE | Player | Anel de progresso do bloqueio |
| `/assets/svg/rings/active-selection-ring.svg` | Média | PENDENTE | Onboarding | Anel do avatar selecionado |

---

# 3. Mapeamento por tela

## 3.1 Login

### Assets necessários

```txt
/assets/images/branding/flechas-do-rei-logo-horizontal.png
/assets/images/heroes/login-hero-bible-light.webp
/assets/images/characters/guide-boy-full.png
/assets/images/illustrations/shield-check-illustration.png
/assets/svg/icons/mail.svg
/assets/svg/icons/chevron-right.svg
/assets/svg/icons/info.svg
/assets/svg/icons/google.svg
/assets/svg/effects/gold-divider-ornament.svg
```

### Fazer em código

```txt
input de e-mail
botão principal
card de acesso liberado manualmente
texto de lista de espera
divisor inferior
bordas
glow
```

---

## 3.2 Onboarding

### Assets necessários

```txt
/assets/images/heroes/onboarding-hero-city-light.webp
/assets/images/characters/guide-boy-full.png
/assets/images/avatars/avatar-boy-1.png
/assets/images/avatars/avatar-girl-1.png
/assets/images/avatars/avatar-boy-2.png
/assets/images/branding/flechas-do-rei-logo-horizontal.png
/assets/svg/icons/skip.svg
/assets/svg/icons/chevron-right.svg
/assets/svg/rings/active-selection-ring.svg
/assets/svg/effects/gold-divider-ornament.svg
```

### Fazer em código

```txt
card de escolha de companheiro
paginação de três pontos
botão continuar
borda dourada
glow do avatar selecionado
```

---

## 3.3 Home

### Assets necessários

```txt
/assets/images/heroes/home-open-bible-map.webp
/assets/images/characters/guide-boy-full.png
/assets/images/avatars/default-profile-avatar.png
/assets/images/rewards/mana-coin-bread.png
/assets/svg/icons/gift.svg
/assets/svg/icons/home.svg
/assets/svg/icons/map.svg
/assets/svg/icons/cinema.svg
/assets/svg/icons/gamepad.svg
/assets/svg/icons/library.svg
/assets/svg/icons/parents.svg
/assets/svg/icons/trophy.svg
/assets/svg/icons/book-open.svg
/assets/svg/icons/chevron-right.svg
/assets/svg/icons/lock.svg
/assets/svg/icons/crown.svg
/assets/svg/icons/scroll.svg
/assets/svg/icons/cross-small.svg
/assets/svg/icons/church.svg
/assets/svg/icons/star-level.svg
```

### Fazer em código

```txt
título e subtítulo
badge de nível
botão continuar
cards de maná, conquistas e próximo passo
bottom navigation
```

---

## 3.4 Player do áudio

### Assets necessários

```txt
/assets/images/heroes/audio-player-day1-light.webp
/assets/images/characters/guide-boy-back.png
/assets/images/avatars/default-profile-avatar.png
/assets/images/narrators/journey-narrator-avatar.png
/assets/images/rewards/mana-orb-blue.png
/assets/svg/icons/back-arrow.svg
/assets/svg/icons/sun-episode.svg
/assets/svg/icons/audio-wave.svg
/assets/svg/icons/pause.svg
/assets/svg/icons/play.svg
/assets/svg/icons/rewind-15.svg
/assets/svg/icons/forward-15.svg
/assets/svg/icons/lock.svg
/assets/svg/icons/gift.svg
/assets/svg/icons/book-open.svg
/assets/svg/icons/chevron-right.svg
/assets/svg/icons/home.svg
/assets/svg/icons/map.svg
/assets/svg/icons/cinema.svg
/assets/svg/icons/gamepad.svg
/assets/svg/icons/library.svg
/assets/svg/icons/more.svg
/assets/svg/rings/play-button-ring.svg
/assets/svg/rings/lock-progress-ring.svg
/assets/svg/rings/narrator-ring.svg
```

### Fazer em código

```txt
barra de progresso do áudio
tempo atual e tempo total
botão central play/pause
botões de voltar/avançar 15s
card de liberação do jogo
card de recompensa
card de versículo
bottom navigation
```

---

## 3.5 Configurações

### Assets necessários

```txt
/assets/images/avatars/default-profile-avatar.png
/assets/svg/icons/back-arrow.svg
/assets/svg/icons/audio-wave.svg
/assets/svg/icons/volume.svg
/assets/svg/icons/music.svg
/assets/svg/icons/book-open.svg
/assets/svg/icons/language.svg
/assets/svg/icons/star-verse.svg
/assets/svg/icons/user.svg
/assets/svg/icons/users.svg
/assets/svg/icons/info.svg
/assets/svg/icons/shield.svg
/assets/svg/icons/help.svg
/assets/svg/icons/logout.svg
/assets/svg/icons/chevron-right.svg
```

### Fazer em código

```txt
cards de seção
slider de volume
toggle de efeitos sonoros
toggle de música de fundo
linha de idioma
linha de versículo do dia
linhas de conta
linhas de sobre
botão sair da conta
rodapé de versão
```

---

# 4. Ordem recomendada de produção

## Fase 1 — essencial

Produzir primeiro:

```txt
flechas-do-rei-logo-horizontal
login-hero-bible-light.webp
onboarding-hero-city-light.webp
audio-player-day1-light.webp
home-open-bible-map.webp
guide-boy-full.png
guide-boy-back.png
avatar-boy-1.png
avatar-girl-1.png
avatar-boy-2.png
default-profile-avatar.png
back-arrow.svg
chevron-right.svg
home.svg
map.svg
cinema.svg
gamepad.svg
library.svg
parents.svg
more.svg
mail.svg
play.svg
pause.svg
lock.svg
gift.svg
book-open.svg
volume.svg
music.svg
language.svg
user.svg
users.svg
info.svg
shield.svg
help.svg
logout.svg
```

## Fase 2 — refinamento

Produzir depois:

```txt
journey-narrator-avatar.png
mana-orb-blue.png
mana-coin-bread.png
shield-check-illustration.png
sun-episode.svg
rewind-15.svg
forward-15.svg
audio-wave.svg
star-verse.svg
trophy.svg
crown.svg
scroll.svg
cross-small.svg
church.svg
star-level.svg
next-step-star.svg
effects/*
rings/*
noise-overlay.png
```

---

# 5. Tokens visuais sugeridos

Antigravity/Codex deve criar tokens equivalentes a estes:

```ts
export const colors = {
  background: '#020817',
  backgroundDeep: '#01040D',
  card: '#06111F',
  cardSoft: 'rgba(6, 17, 31, 0.86)',
  gold: '#F6B94A',
  goldLight: '#FFD77A',
  goldDeep: '#B97825',
  cream: '#F7E4B7',
  textPrimary: '#F9E7BD',
  textSecondary: '#C9A978',
  muted: '#8C8176',
  danger: '#FF6B4A',
  line: 'rgba(246, 185, 74, 0.35)',
};
```

```ts
export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};
```

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

---

# 6. Regras para implementação

## Fazer com assets

```txt
ilustrações grandes
personagens
avatares
orbes/recompensas
logo
ícones
ornamentos
```

## Fazer em código

```txt
cards
botões
bordas
inputs
toggles
sliders
progress bars
textos
tabs
badges
glows simples
sombras
gradientes
```

---

# 7. Observações finais

- O nome visual do app deve ser **Flechas do Rei**.
- Evitar usar “AppJesusKid” em assets novos.
- Nenhum hero deve ter texto embutido.
- Nenhum botão deve estar embutido nas imagens.
- Personagens devem manter consistência visual.
- SVGs devem aceitar troca de cor via props quando usados como componente.
- Os assets raster devem ser exportados em alta resolução.
- UI deve ser responsiva e montada em React Native/Expo, não como print fatiado.
