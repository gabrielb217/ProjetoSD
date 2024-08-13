#!/bin/bash

# URL
URL="https://www.uol.com.br/esporte/futebol/campeonatos/brasileirao/"

# Arquivo de saída
OUTPUT_FILE="uol.html"

# Baixar a página
curl -o "$OUTPUT_FILE" "$URL"

# Executar o script de limpeza de dados
python dataCleaning.py