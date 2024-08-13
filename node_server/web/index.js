document.getElementById('socioTorcedor').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    let dadosCliente = {
        nomeCliente: document.getElementById('nomeCliente').value,
        time: document.getElementById('time').value,
        numeroCelular: document.getElementById('numero').value,
        emailCliente: document.getElementById('email').value
    };

    if(dadosCliente.nomeCliente == '' || dadosCliente.time == '' || dadosCliente.numeroCelular == ''){
        alert('Por favor, preencha todos os campos.')
    }

    if (!validateEmail(dadosCliente.emailCliente)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    fetch('http://localhost:4000/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCliente)
    })
    .then(response => response.text())
    .then(data => {
        alert('Confira a caixa de email!');
        console.log('Resposta do servidor:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert('Ocorreu um erro ao cadastrar o evento.');
    });

});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}