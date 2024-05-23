# Frontend API REST Countries

## Sobre o Projeto

Este projeto visa fornecer uma plataforma web abrangente que permite aos usuários realizar diversas operações relacionadas a países, desde cadastro de pets até exploração geográfica e visualização de dados estatísticos. Abaixo está uma descrição detalhada de cada componente:

### Cadastro

Uma página com um formulário de cadastro completo que inclui campos para data de nascimento, nome completo, CPF, tipo e raça do animal de estimação, renda mensal e informações de endereço. O formulário fornece validação em tempo real para garantir a precisão das informações antes da submissão.

### Exploração Geográfica

1. **Lista de Países e Capitais da América:** Uma página que apresenta uma lista dos países da América e suas respectivas capitais. Ao clicar em um país, uma nova aba é aberta mostrando o Google Maps centrado no país selecionado, permitindo aos usuários explorarem visualmente a geografia do país.
   
2. **Busca por País e Idioma:** Os usuários podem pesquisar por países inserindo o nome em um campo de texto. A aplicação irá encontrar o país correspondente ou sugerir países com nomes similares. Além disso, ao clicar em um dos idiomas oficiais listados para um país, a aplicação apresenta uma lista dos países que compartilham o mesmo idioma.

### Visualização de Dados Geográficos

Uma página com gráficos interativos que mostram a área e a população de cada país em um mapa demográfico dividido por continente. Esses gráficos fornecem uma representação visual das diferenças entre os países em termos de área territorial e população, permitindo uma compreensão mais intuitiva das disparidades geográficas.

## Tecnologias Utilizadas

### Frontend
- Vue 3
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- Nuxt UI
- Leaflet

## Como Executar o Projeto

### Pré-requisitos: npm/yarn

```bash
npm install

# ou

yarn install
```

## Servidor de desenvolvimento

Inicia o servidor de desenvolvimento:

```bash
npm run dev

# ou

yarn dev
```

## Produção

Builda o app para produção:

```bash
npm run build

# ou

yarn build
```

Preview local do build de produção:

```bash
npm run preview

# ou

yarn preview
```
Pronto!

# Porta utilizada
- 3000

# Autor

Roberto de Moraes

https://www.linkedin.com/in/robertomoraeszarzur/
