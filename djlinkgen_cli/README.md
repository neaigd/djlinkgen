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
    git clone https://github.com/USER/REPO
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
