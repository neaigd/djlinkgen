# DJLinkGen-Web: Gerador de Links para Diário de Justiça (Interface Web)

Esta é uma interface web de página única para gerar links de consulta de publicações no Diário de Justiça Eletrônico.

## Funcionalidades

* Interface amigável com tema escuro e design minimalista.
* Entrada de número da OAB e UF.
* Opções de filtro por data: sem filtro, últimos 5 dias, ou intervalo personalizado.
* Geração instantânea do link de consulta.
* Botão para copiar o link gerado para a área de transferência.
* Opção "Lembrar meus dados" usando o armazenamento local do navegador.

## Como Usar

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone https://github.com/USER/REPO
    cd DJLinkGen/djlinkgen_web
    ```
2.  **Abra o arquivo `index.html`:**
    Simplesmente abra o arquivo `index.html` em seu navegador de internet preferido (Chrome, Firefox, Edge, etc.). Não é necessário um servidor web para a funcionalidade básica, mas pode ser útil para desenvolvimento.

3.  **Preencha os campos:**
    * Informe seu número da OAB e UF.
    * Marque "Lembrar meus dados" se desejar que estas informações sejam salvas no seu navegador para a próxima visita.
    * Escolha a opção de filtro de data desejada.
    * Clique em "Gerar Link".

4.  **Copie o link:**
    O link gerado aparecerá na tela. Você pode clicá-lo para abrir em uma nova aba ou usar o botão "Copiar Link".

## Arquivo `.env.example`

O arquivo `.env.example` é fornecido como referência para o desenvolvedor. Em um contexto de desenvolvimento local com ferramentas que suportam variáveis de ambiente (como alguns servidores de desenvolvimento Node.js), ele poderia ser usado para pré-preencher valores. Para o uso normal desta página estática, ele não é diretamente utilizado pelo `index.html` no navegador do usuário final.

## Contribuições

Contribuições são bem-vindas!
