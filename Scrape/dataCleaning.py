import requests
import pandas as pd
import re
from bs4 import BeautifulSoup
import os
import time

# Nome do arquivo HTML gerado pelo scrape
html_file_name = 'uol.html'
server_url = 'http://node-server:4000/receive-dataset'

# Ler o conteúdo do arquivo HTML
with open(html_file_name, 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Encontrar todas as tabelas no HTML
tables = soup.find_all('table')

if len(tables) > 1:
    # Capturar os nomes dos times e os dados da tabela
    teams = [re.sub(r'\d+°\s+', '', row.text.strip()) for row in tables[0].find_all('tr')[1:]]
    headers = [th.text.strip() for th in tables[1].find_all('th')] or [td.text.strip() for td in tables[1].find('tr').find_all('td')]
    rows = [[cell.text.strip() for cell in tr.find_all('td')] for tr in tables[1].find_all('tr')[1:]]

    # Adicionar os times como a primeira coluna
    for i, row in enumerate(rows):
        row.insert(0, teams[i])

    # Criar o DataFrame
    df = pd.DataFrame(rows, columns=["Time"] + headers).dropna()

    # Tentar enviar os dados para o servidor
    for attempt in range(10):
        try:
            response = requests.post(server_url, json=df.to_dict(orient='records'), headers={'Content-Type': 'application/json'})
            if response.status_code == 200:
                print("Dataset enviado com sucesso")
                break
            else:
                print(f"Erro ao enviar dataset: {response.status_code}, {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Tentativa {attempt + 1} falhou: {e}")
        time.sleep(5)
else:
    print("Tabelas necessárias não encontradas.")
