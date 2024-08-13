const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function gerarGrafico(time1, time2) {
  const width = 800;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: 'bar',
    data: {
      labels: ['PG', 'J', 'V', 'E', 'D', 'GC', 'GP', 'SG', '%'],
      datasets: [
        {
          label: time1.Time,
          data: ['PG', 'J', 'V', 'E', 'D', 'GC', 'GP', 'SG', '%'].map(label => parseInt(time1[label])),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: time2.Time,
          data: ['PG', 'J', 'V', 'E', 'D', 'GC', 'GP', 'SG', '%'].map(label => parseInt(time2[label])),
          backgroundColor: 'rgba(0, 128, 255, 0.8)',
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  try {
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    console.log('Buffer gerado com sucesso', buffer); // Verifique se o buffer é gerado corretamente
    return buffer;
  } catch (error) {
    console.error('Erro ao gerar o gráfico:', error); // Log detalhado em caso de erro
    throw error;
  }
}

module.exports = {
  gerarGrafico
};
