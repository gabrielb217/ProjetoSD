const express = require('express');
const cors = require('cors'); // Adicionado para habilitar o CORS
const app = express();
const path = require('path');
const email = require('./email');
const genGrafico = require('./grafico');
const stringSimilarity = require('string-similarity'); 
const port = process.env.PORT || 4000;

const tabela = [];

app.use(cors()); // Habilitar o CORS para todas as requisições
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.post('/receive-dataset', (req, res) => {
    req.body.forEach(element => {
        tabela.push(element);
    });
    console.log(tabela);
    res.status(200).send('Dataset received');
});

app.post('/notify', (req, res) => {
    email.sendEmail(req.body, buscaTime(req.body.time))
    .then(() => res.status(200).send('Novo atleta registrado e email enviado com sucesso'))
    .catch((err) => {
      console.error('Erro ao enviar o email:', err);
      res.status(500).send('Erro ao registrar novo atleta ou enviar email');
    });
});

app.get('/grafico/:nomeTime1/:nomeTime2', async (req, res) => {
    const { nomeTime1, nomeTime2 } = req.params;
    // pode dar erro se n existir
    const time1 = buscaTime(nomeTime1);
    const time2 = buscaTime(nomeTime2);
    // Verificar se os times existem nos dados
    if (!time2 || !time1) {
      return res.status(404).send('Um ou ambos os times não foram encontrados');
    }

    try {
        const imageBuffer = await genGrafico.gerarGrafico(time1, time2);
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
      } catch (error) {
        res.status(500).send('Erro ao gerar o gráfico.');
      }
});

app.use(express.static(path.join(__dirname, '../web')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/form.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

function buscaTime(time) {
    const nomesTimes = tabela.map(entry => entry.Time);
    
    // Encontre o melhor match para o time fornecido
    const bestMatch = stringSimilarity.findBestMatch(time, nomesTimes).bestMatch;
    
    // Retornar o objeto completo da tabela que corresponde ao melhor match
    const resultado = tabela.find(entry => entry.Time === bestMatch.target);
    
    return resultado;
}