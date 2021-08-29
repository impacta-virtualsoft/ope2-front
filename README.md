# Introdução

Descrição das tecnologias usadas e expectativas

Usamos tecnologias padrão de frontend: Javascript (com Typescript), HTML e CSS.

Para facilitar o trabalho, usamos o framework [Nextjs](https://nextjs.org/), em cima da biblioteca [Reactjs](https://reactjs.org/). Além deles, o projeto conta com várias outras bibliotecas, como: [axios](https://axios-http.com/), [react-query](https://react-query.tanstack.com/), [tailwindcss](https://tailwindcss.com/), [chartjs](https://www.chartjs.org/), [React Hook Form](https://react-hook-form.com/), [daisyui](https://daisyui.com/), [Jest](https://jestjs.io/), [cypress](https://www.cypress.io/), entre outras.

Para facilitar a organização e o desenvolvimento, foi escolhido o [Prettier](https://prettier.io/) para formatar o código e o [Husky](https://github.com/typicode/husky) com [lint-staged](https://github.com/okonet/lint-staged) no [git](https://git-scm.com/) para que isso aconteça automaticamente ao tentar enviar um PR/Code Review. Além disso, o [ESLint](https://eslint.org/) foi escolhido para resolver problemas corriqueiros nessa etapa, assim como o [Typescript](https://www.typescriptlang.org/). Com isso o desenvolvedor pode programar na IDE que achar mais interessante.

Recomendamos o [VSCode](https://code.visualstudio.com/) como IDE.

Os testes estáticos ficam por conta do Typescript, que já faz isso nativamente e com configuração estrita `{ strict: true }`. Os testes integrados, com Jest. Já os testes end to end (e2e), se possível, serão feitos com cypress.

# Requerimentos

Para rodar o projeto localmente você precisa desses itens:

- [Nodejs](https://nodejs.org/en/), versão 14+ (última LTS). É possível que rode em versões menores, mas não testamos.
- [Git](https://git-scm.com/), para clonar o projeto

### Recomendável

- Se estiver no Windows 10: [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) e [Windows Terminal](https://www.microsoft.com/pt-br/p/windows-terminal/9n0dx20hk701) - atenção, WSL é a versão 2!
- Instale o Ubuntu 20.04 no WSL2 e atualize `sudo apt update && sudo apt upgrade`
- Instale o git se já não tiver `sudo apt install git`
- Instale o [nvm](https://github.com/nvm-sh/nvm): `curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh) | bash`
- Instale o node lts via nvm: `nvm install --lts` e atualize o npm `npm install -g npm`

# Instalação

- Clone o projeto (repo: [https://github.com/impacta-virtualsoft/ope2-front](https://github.com/impacta-virtualsoft/ope2-front))
- Instale as dependências `npm install`

# Rodando o projeto localmente

Para rodar localmente, basta executar o comando `npm run dev`

Abra o navegador e acesse a url [http://localhost:3333](http://localhost:3333)

Toda alteração que fizer reflete na hora.

# Publicação

A ser escrito
