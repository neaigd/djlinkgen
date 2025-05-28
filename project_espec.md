<a href="https://chat.whatsapp.com/Imp8gTK8UR5JgAGSY19tzf" target="_blank">
    <img src="https://github.com/p31x070/fact_chek/raw/main/LogoNIAD.png" class="logo" width="250"/>
</a>

# Especificações Completas do Projeto: Gerador de Links para Diário de Justiça Eletrônico (DJLinkGen) - Versões CLI e Web

**Para: Jules (Assistente de Desenvolvimento AI)**

**De: [Seu Nome/Usuário GitHub]**

**Data:** 27 de maio de 2025

**Assunto:** Desenvolvimento Integral do Projeto DJLinkGen: Ferramenta CLI em Python e Interface Web

**Prezado Jules,**

Este documento detalha as especificações completas para o desenvolvimento do projeto "DJLinkGen". O projeto consiste em duas partes principais:

1. Uma ferramenta de linha de comando (CLI) em Python (`DJLinkGen-CLI`).
2. Uma interface web de página única (`DJLinkGen-Web`).

Ambas as ferramentas visam gerar links de consulta para o Diário de Justiça Eletrônico, com base no número e UF da OAB do usuário, e com opções de filtro por data.

Solicito que você desenvolva todos os códigos, arquivos de configuração de exemplo e a documentação (arquivos `README.md`) conforme descrito abaixo.

## Parte 1: DJLinkGen-CLI (Versão Python para Linha de Comando)

### 1.1. Objetivo da Ferramenta CLI

Criar um script Python interativo que permita ao usuário gerar links de consulta de forma rápida diretamente do terminal. A ferramenta deverá ler as credenciais da OAB de um arquivo `.env` ou solicitá-las ao usuário, oferecer opções de filtro por data e exibir o link gerado, com a possibilidade de copiá-lo para a área de transferência.

### 1.2. Especificações Técnicas e Funcionais da CLI

- **Linguagem:** Python 3.x
- **Bibliotecas Externas:**
    - `python-dotenv` (para carregar variáveis de ambiente do `.env`)
    - `pyperclip` (opcional, para copiar para clipboard; o script deve funcionar mesmo se não estiver instalado, informando o usuário)
- **Gerenciamento de Dependências:** Utilizar um arquivo `requirements.txt`.
- **Estrutura de Arquivos (dentro de `djlinkgen_cli/`):**
    
    ```
    djlinkgen_cli/
    ├── djlinkgen.py          # Script principal
    ├── requirements.txt      # Dependências Python
    ├── .env.example          # Exemplo de arquivo .env
    └── README.md             # Documentação específica da CLI (você deverá criá-lo)
    ```
    
- **Arquivo `.env.example` (e `.env` a ser criado pelo usuário):**
    
    Ini, TOML
    
    ```
    OAB_NUMBER=""
    OAB_UF=""
    ```
    
- **Funcionalidades:**
    1. **Leitura de Credenciais:**
        - Ao iniciar, tentar carregar `OAB_NUMBER` e `OAB_UF` do arquivo `.env` na mesma pasta do script.
        - Se `.env` não existir ou as variáveis estiverem ausentes:
            - Solicitar ao usuário: "Digite o número da sua OAB:"
            - Solicitar ao usuário: "Digite a UF da sua OAB (ex: RJ):" (validar para 2 caracteres alfabéticos).
            - Perguntar: "Deseja salvar estas informações em um arquivo .env para uso futuro? (s/n):" Se 's', criar/atualizar o `.env`.
    2. **Seleção de Filtro de Data:**
        - Apresentar as opções:
            
            ```
            Escolha o filtro de data para a consulta:
            [1] Em Aberto (sem filtro de data)
            [2] Últimos 5 dias
            [3] Definir intervalo personalizado
            Sua opção:
            ```
            
    3. **Lógica de Datas:**
        - **Últimos 5 dias:** Data Fim = data atual; Data Início = data atual - 4 dias. Formato `AAAA-MM-DD`.
        - **Intervalo Personalizado:** Solicitar "Data de início (AAAA-MM-DD):" e "Data de fim (AAAA-MM-DD):". Validar formato e se data de início não é posterior à data de fim.
    4. **Geração e Exibição do Link:**
        - URL Base: `https://comunica.pje.jus.br/consulta`
        - Parâmetros: `meio=D`, `numeroOab`, `ufOab`, e opcionais `dataDisponibilizacaoInicio`, `dataDisponibilizacaoFim`.
        - Exibir: `Link gerado: [URL_GERADA]`
    5. **Copiar para Clipboard (Opcional):**
        - Tentar usar `pyperclip.copy(URL_GERADA)`.
        - Se sucesso: `Link copiado para a área de transferência!`
        - Se `pyperclip` não estiver instalado ou falhar: `Não foi possível copiar. Por favor, copie o link manualmente.`
- **Interação:** O script deve ser totalmente interativo via `input()`.

### 1.3. Conteúdo do Arquivo `djlinkgen_cli/README.md` (A ser gerado por você, Jules)

Por favor, crie o arquivo `djlinkgen_cli/README.md` com o seguinte conteúdo e estrutura:

Markdown

```
# DJLinkGen-CLI: Gerador de Links para Diário de Justiça (Linha de Comando)

Esta ferramenta CLI permite gerar rapidamente links para consulta de publicações no Diário de Justiça Eletrônico.

## Funcionalidades

* Gera links com base no seu número de OAB e UF.
* Opções de filtro por data: sem filtro, últimos 5 dias, ou intervalo personalizado.
* Salva suas informações de OAB em um arquivo `.env` para uso futuro.
* Tenta copiar o link gerado para a área de transferência.

## Pré-requisitos

* Python 3.7 ou superior.
* `pip` (gerenciador de pacotes Python).

## Instalação

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO_AQUI]
    cd DJLinkGen/djlinkgen_cli
    ```

2.  **Crie e ative um ambiente virtual (recomendado):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Linux/macOS
    # venv\Scripts\activate   # Windows
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

## Configuração

Antes de usar a ferramenta pela primeira vez, você pode configurar suas informações da OAB.

1.  **Crie um arquivo `.env`:**
    Copie o arquivo `.env.example` para `.env`:
    ```bash
    cp .env.example .env  # Linux/macOS
    # copy .env.example .env # Windows
    ```

2.  **Edite o arquivo `.env`:**
    Abra o arquivo `.env` em um editor de texto e preencha com seu número da OAB e UF:
    ```ini
    OAB_NUMBER="SEUNUMEROAQUI"
    OAB_UF="SUAUFAQUI"
    ```
    Se você não criar este arquivo, a ferramenta solicitará essas informações na primeira execução e oferecerá a opção de salvá-las.

## Uso

1.  Certifique-se de que seu ambiente virtual está ativado (se você criou um).
2.  Navegue até o diretório `djlinkgen_cli`.
3.  Execute o script:
    ```bash
    python djlinkgen.py
    ```
4.  Siga as instruções no terminal para selecionar o filtro de data e gerar o link.

## Criando um Alias para Acesso Rápido (Opcional)

Para executar a ferramenta de qualquer lugar no seu terminal usando um comando simples (ex: `djlink`), você pode criar um alias.

### Linux e macOS (bash/zsh)

1.  Abra seu arquivo de configuração do shell (`~/.bashrc` para bash, `~/.zshrc` para zsh):
    ```bash
    nano ~/.bashrc  # Ou use seu editor preferido
    # nano ~/.zshrc
    ```
2.  Adicione a seguinte linha ao final do arquivo, substituindo `/caminho/completo/para/DJLinkGen/djlinkgen_cli` pelo caminho absoluto onde o script `djlinkgen.py` está localizado no seu sistema:
    ```bash
    alias djlink='python /caminho/completo/para/DJLinkGen/djlinkgen_cli/djlinkgen.py'
    ```
    *Dica: Você pode obter o caminho completo navegando até o diretório `djlinkgen_cli` e executando `pwd`.*
3.  Salve o arquivo e recarregue a configuração do shell:
    ```bash
    source ~/.bashrc  # Ou source ~/.zshrc
    ```
4.  Agora você pode usar o comando `djlink` de qualquer diretório.

### Windows

#### PowerShell

1.  Verifique se você tem um perfil do PowerShell. Digite no PowerShell:
    ```powershell
    Test-Path $PROFILE
    ```
2.  Se retornar `False`, crie um:
    ```powershell
    New-Item -Type File -Path $PROFILE -Force
    ```
3.  Abra seu perfil do PowerShell para edição (ex: com o Bloco de Notas):
    ```powershell
    notepad $PROFILE
    ```
4.  Adicione a seguinte linha, substituindo `C:\caminho\completo\para\DJLinkGen\djlinkgen_cli\djlinkgen.py` pelo caminho absoluto para o script:
    ```powershell
    Set-Alias -Name djlink -Value "python C:\caminho\completo\para\DJLinkGen\djlinkgen_cli\djlinkgen.py"
    ```
    *Se o Python não estiver no seu PATH, você pode precisar especificar o caminho completo para `python.exe` também.*
5.  Salve o arquivo e feche o editor. Para aplicar as alterações, feche e reabra o PowerShell ou execute:
    ```powershell
    . $PROFILE
    ```
6.  Agora você pode usar o comando `djlink`.

#### Prompt de Comando (CMD) via `doskey` (Menos permanente)

1.  Você pode criar um alias temporário usando `doskey`:
    ```cmd
    doskey djlink=python C:\caminho\completo\para\DJLinkGen\djlinkgen_cli\djlinkgen.py $*
    ```
    Substitua o caminho conforme necessário. Este alias durará apenas para a sessão atual do CMD.
2.  Para torná-lo mais permanente, você pode adicionar este comando `doskey` a um arquivo `.bat` que é executado quando o CMD inicia (por exemplo, através de uma chave de AutoRun no Registro do Windows, o que é mais avançado). Uma maneira mais simples é criar um arquivo `.bat` (ex: `djlink_alias.bat`) com o comando `doskey` e colocá-lo em um diretório no seu PATH, e então executar esse `.bat` uma vez por sessão.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
```

_(Jules, por favor, substitua `[URL_DO_SEU_REPOSITÓRIO_AQUI]` no README acima pela URL correta quando o usuário fornecer ou pelo placeholder se não souber)._

## Parte 2: DJLinkGen-Web (Versão Web Page)

### 2.1. Objetivo da Interface Web

Criar uma página web de interface única, visualmente agradável (tema escuro, minimalista), responsiva e intuitiva, onde os usuários possam facilmente inserir seus dados da OAB, selecionar opções de data e gerar/copiar o link de consulta.

### 2.2. Especificações Técnicas e Funcionais da Web

Por favor, siga as especificações detalhadas na **Seção "II. Versão Web Page (DJLinkGen-Web)"** da minha resposta anterior (data: 27 de maio de 2025), começando com "Instruções para um Assistente de Desenvolvimento AI (como Build ou Jules)". Isso inclui:

- **Design e Layout:** Tema Escuro, Minimalista, Organizado, Fontes, Responsividade.
- **Estrutura de Arquivos (dentro de `djlinkgen_web/`):** `index.html`, `style.css`, `script.js`, `.env.example`, `README.md`.
- **Conteúdo e Elementos do `index.html`:** Título, Cabeçalho, Formulário (OAB, Opções de Data, Campos de Data Personalizada), Botão de Ação, Área de Resultado, Área de Mensagens. Incluir a opção "Lembrar meus dados" com `localStorage`.
- **Estilização (`style.css`):** Implementação do tema escuro, estilização de formulários, feedback visual.
- **Funcionalidades JavaScript (`script.js`):** Manipulação de eventos, validação, lógica de datas ("Últimos 5 dias" e personalizada), construção de URL com `URLSearchParams`, exibição de resultado, cópia para clipboard, uso de `localStorage`.
- **Arquivo `.env.example` (para `djlinkgen_web/`):**
    
    Ini, TOML
    
    ```
    OAB_NUMBER=""
    OAB_UF=""
    ```
    
    (Com a observação de que para o site estático, é para referência do dev ou servidores locais).

### 2.3. Conteúdo do Arquivo `djlinkgen_web/README.md` (A ser gerado por você, Jules)

Por favor, crie o arquivo `djlinkgen_web/README.md` com o seguinte conteúdo e estrutura:

Markdown

```
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
    git clone [URL_DO_SEU_REPOSITÓRIO_AQUI]
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
```

_(Jules, por favor, substitua `[URL_DO_SEU_REPOSITÓRIO_AQUI]` no README acima pela URL correta)._

## Parte 3: Estrutura Geral do Repositório e Arquivos Globais

### 3.1. Estrutura de Diretórios Principal

O repositório deverá ter a seguinte estrutura de alto nível:

```
DJLinkGen/
├── djlinkgen_cli/          # Contém todos os arquivos da versão CLI
│   ├── djlinkgen.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── djlinkgen_web/          # Contém todos os arquivos da versão Web
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── .env.example
│   └── README.md
├── .gitignore              # Arquivo .gitignore global
└── README.md               # README principal do projeto (você deverá criá-lo)
```

### 3.2. Conteúdo do Arquivo `.gitignore` Global (Raiz do Projeto)

Crie um arquivo `.gitignore` na raiz do projeto com o seguinte conteúdo:

Snippet de código

```
# Python
__pycache__/
*.py[cod]
*.egg-info/
*.so
*.DS_Store
venv/
env/
.env*
!/.env.example # Não ignorar os arquivos .env.example

# Node (se usado para desenvolvimento web ou ferramentas)
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnp/
.pnp.js

# Build artifacts
dist/
build/
```

### 3.3. Conteúdo do `README.md` Principal (Raiz do Projeto - A ser gerado por você, Jules)

Crie o `README.md` principal na raiz do projeto com o seguinte conteúdo:

Markdown

```
# DJLinkGen: Gerador de Links para Consulta no Diário de Justiça

Bem-vindo ao DJLinkGen! Este projeto fornece ferramentas para simplificar a geração de links de consulta para publicações no Diário de Justiça Eletrônico.

## Visão Geral

O DJLinkGen oferece duas maneiras de gerar seus links:

1.  **`DJLinkGen-CLI`**: Uma ferramenta de linha de comando em Python para usuários que preferem o terminal.
2.  **`DJLinkGen-Web`**: Uma interface web amigável e de página única para uso direto no navegador.

Ambas as ferramentas permitem que você use seu número de OAB e UF, com opções flexíveis de filtro por data.

## Componentes do Projeto

* **[DJLinkGen-CLI](./djlinkgen_cli/README.md)**: Instruções detalhadas e código para a versão de linha de comando.
* **[DJLinkGen-Web](./djlinkgen_web/README.md)**: Instruções detalhadas e código para a interface web.

## Como Contribuir

Contribuições são muito bem-vindas! Se você tem ideias para melhorias, novas funcionalidades ou encontrou algum bug, sinta-se à vontade para:

* Abrir uma [Issue]([LINK_PARA_ISSUES_DO_REPOSITÓRIO_AQUI]).
* Enviar um [Pull Request]([LINK_PARA_PULL_REQUESTS_DO_REPOSITÓRIO_AQUI]).

## Licença

Este projeto é distribuído sob a licença [NOME_DA_LICENÇA_EXEMPLO_MIT_APACHE_ETC]. (Jules, por favor, adicione uma seção de licença se o usuário especificar uma, ou deixe este placeholder).
```

_(Jules, por favor, substitua os placeholders de link e licença acima pela informação correta se fornecida, ou mantenha-os como placeholders)._

---

Agradeço sua dedicação em desenvolver este projeto conforme as especificações. O objetivo é ter um conjunto de ferramentas robusto, bem documentado e fácil de usar.

Atenciosamente,

**[Seu Nome/Usuário GitHub]**
