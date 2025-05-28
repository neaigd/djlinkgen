import os
import datetime
from dotenv import load_dotenv, find_dotenv, set_key
import pyperclip
import urllib.parse
import webbrowser

def main():
    # 2. Load Environment Variables
    load_dotenv()
    oab_number = os.getenv("OAB_NUMBER")
    oab_uf = os.getenv("OAB_UF")

    # 3. Handle OAB Input
    if not oab_number or not oab_uf:
        print("Informações da OAB não encontradas nas variáveis de ambiente.")
        oab_number_input = input("Digite o número da sua OAB: ").strip()
        oab_uf_input = ""
        while True:
            oab_uf_input = input("Digite a UF da sua OAB (ex: RJ): ").strip().upper()
            if len(oab_uf_input) == 2 and oab_uf_input.isalpha():
                break
            print("UF inválida. Por favor, digite 2 letras (ex: RJ).")

        save_env = input("Deseja salvar estas informações em um arquivo .env para uso futuro? (s/n): ").strip().lower()
        if save_env == 's':
            dotenv_path = find_dotenv(usecwd=True, raise_error_if_not_found=False)
            if not dotenv_path:
                # Create .env file if it doesn't exist
                with open('.env', 'w') as f:
                    pass
                dotenv_path = find_dotenv(usecwd=True)

            if dotenv_path: # Should always exist now
                set_key(dotenv_path, "OAB_NUMBER", oab_number_input)
                set_key(dotenv_path, "OAB_UF", oab_uf_input)
                print(f"Informações salvas em {dotenv_path}")
                oab_number = oab_number_input # Use the input values for the current session
                oab_uf = oab_uf_input
            else:
                print("Não foi possível encontrar ou criar o arquivo .env para salvar as informações.")
                # Use the input values for the current session even if not saved
                oab_number = oab_number_input
                oab_uf = oab_uf_input
    else:
        print(f"Usando OAB: {oab_number}/{oab_uf} (configurado no .env)")


    # 4. Date Filter Selection
    data_inicio_str = None
    data_fim_str = None

    while True:
        print("\nEscolha o filtro de data para a consulta:")
        print("[1] Em Aberto (sem filtro de data)")
        print("[2] Últimos 5 dias")
        print("[3] Definir intervalo personalizado")
        date_choice = input("Sua opção: ").strip()

        if date_choice in ['1', '2', '3']:
            break
        print("Opção inválida. Por favor, escolha 1, 2 ou 3.")

    # 5. Date Logic
    if date_choice == '2': # Últimos 5 dias
        data_fim = datetime.date.today()
        data_inicio = data_fim - datetime.timedelta(days=4)
        data_inicio_str = data_inicio.strftime("%Y-%m-%d")
        data_fim_str = data_fim.strftime("%Y-%m-%d")
        print(f"Filtrando por datas: Início: {data_inicio_str}, Fim: {data_fim_str}")
    elif date_choice == '3': # Intervalo Personalizado
        while True:
            try:
                start_date_input = input("Data de início (AAAA-MM-DD): ").strip()
                data_inicio = datetime.datetime.strptime(start_date_input, "%Y-%m-%d").date()
                break
            except ValueError:
                print("Formato de data inválido. Use AAAA-MM-DD.")
        
        while True:
            try:
                end_date_input = input("Data de fim (AAAA-MM-DD): ").strip()
                data_fim = datetime.datetime.strptime(end_date_input, "%Y-%m-%d").date()
                if data_fim < data_inicio:
                    print("A data de fim não pode ser anterior à data de início. Tente novamente.")
                    continue
                break
            except ValueError:
                print("Formato de data inválido. Use AAAA-MM-DD.")
        
        data_inicio_str = data_inicio.strftime("%Y-%m-%d")
        data_fim_str = data_fim.strftime("%Y-%m-%d")
        print(f"Filtrando por datas: Início: {data_inicio_str}, Fim: {data_fim_str}")

    # 6. URL Generation
    base_url = "https://comunica.pje.jus.br/consulta"
    params = {
        "meio": "D",
        "numeroOab": oab_number,
        "ufOab": oab_uf
    }
    if data_inicio_str and data_fim_str:
        params["dataDisponibilizacaoInicio"] = data_inicio_str
        params["dataDisponibilizacaoFim"] = data_fim_str

    # Filter out None values from params, just in case, though oab_number and oab_uf should be set
    # However, if the user chose not to save and also didn't provide valid OAB details initially (edge case not fully handled yet)
    # this could be an issue. For now, assuming oab_number and oab_uf are always populated if we reach this stage.
    query_string = urllib.parse.urlencode(params)
    generated_url = f"{base_url}?{query_string}"

    # 7. Display Link
    print(f"\nLink gerado: {generated_url}")

    # 8. Copy to Clipboard
    try:
        pyperclip.copy(generated_url)
        print("Link copiado para a área de transferência!")
    except pyperclip.PyperclipUnavailableException:
        print("Pyperclip não está disponível. Instale xclip ou xsel para copiar para a área de transferência no Linux.")
        print("Por favor, copie o link manualmente.")
    except Exception as e: # Catching other potential pyperclip errors
        print(f"Não foi possível copiar para a área de transferência: {e}")
        print("Por favor, copie o link manualmente.")

    # 9. Open in browser
    try:
        print("Abrindo link no navegador...")
        webbrowser.open(generated_url)
    except Exception as e:
        print(f"Não foi possível abrir o link no navegador: {e}")

if __name__ == "__main__":
    main()
