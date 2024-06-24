// Função para formatar data e hora no formato brasileiro
function formatarDataHoraBrasileira(dataHoraISO) {
    const dataHora = new Date(dataHoraISO);
    const dia = String(dataHora.getDate()).padStart(2, '0');
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
    const ano = dataHora.getFullYear();
    const hora = String(dataHora.getHours()).padStart(2, '0');
    const minutos = String(dataHora.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}

// Função para carregar consultas agendadas
function carregarConsultas() {
    const consultasAgendadasElement = document.getElementById('consultas-agendadas');
    consultasAgendadasElement.innerHTML = ''; // Limpa o conteúdo atual

    fetch('https://clinicacare.onrender.com/api/v1/consulta')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar consultas');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(consulta => {
                const consultaCard = document.createElement('div');
                consultaCard.classList.add('consulta-card');
                consultaCard.innerHTML = `
                    <p><strong>Paciente:</strong> ${consulta.nomePaciente}</p>
                    <p><strong>Data e Hora:</strong> ${formatarDataHoraBrasileira(consulta.dataHora)}</p>
                    <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                    <p><strong>CPF do Paciente:</strong> ${consulta.cpfPaciente}</p>
                    <button class="btn-cancelar" data-cpf="${consulta.cpfPaciente}" data-id="${consulta.id}">Cancelar Consulta</button>
                `;
                consultasAgendadasElement.appendChild(consultaCard);

                // Adicionar evento de clique para cancelar consulta
                const btnCancelarConsulta = consultaCard.querySelector('.btn-cancelar');
                btnCancelarConsulta.addEventListener('click', () => {
                    cancelarConsulta(consulta.cpfPaciente, consulta._id); // Chamando a função cancelarConsulta
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar consultas:', error);
        });
}

// Função para cancelar uma consulta
function cancelarConsulta(cpfPaciente, consultaId) {
    fetch(`https://clinicacare.onrender.com/api/v1/consulta/${cpfPaciente}/${consultaId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cancelar consulta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consulta cancelada com sucesso:', data);
            carregarConsultas(); // Recarregar a lista de consultas após cancelamento
        })
        .catch(error => {
            console.error('Erro ao cancelar consulta:', error);
        });
}

// Função para cadastrar um novo paciente
function cadastrarPaciente() {
    const nomePaciente = document.getElementById('nome-paciente').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const genero = document.querySelector('input[name="genero"]:checked').value;

    const rua = document.getElementById('rua').value;
    const numero = parseInt(document.getElementById('numero').value);
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;

    const paciente = {
        nomeCompleto: nomePaciente,
        dataNascimento: dataNascimento,
        genero,
        cpf,
        endereco: {
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        },
        email,
        contato: telefone
    };

    fetch('https://clinicacare.onrender.com/api/v1/paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar paciente');
            }
            return response.json();
        })
        .then(data => {
            console.log('Paciente cadastrado com sucesso:', data);
            alert('Paciente cadastrado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao cadastrar paciente:', error);
            alert('Erro ao cadastrar o paciente');
        });
}

// Adicionando evento de submit ao formulário de cadastro de paciente
document.getElementById('form-cadastro-paciente').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário
    cadastrarPaciente(); // Chamar a função de cadastro de paciente
});

// Adicionando evento de submit ao formulário de agendamento de consulta
document.getElementById('form-agendamento-consulta').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão de submissão do formulário

    const paciente = document.getElementById('paciente-agendamento').value;
    const dataHoraConsulta = document.getElementById('data-hora-consulta-agendamento').value;
    const especialidade = document.getElementById('especialidade').value;
    const cpfPaciente = document.getElementById('cpf-paciente-agendamento').value;

    const consultaData = {
        dataHora: new Date(dataHoraConsulta).toISOString(),
        especialidade: especialidade,
        cpfPaciente: cpfPaciente
    };

    fetch('https://clinicacare.onrender.com/api/v1/consulta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultaData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consulta agendada com sucesso:', data);
            carregarConsultas(); // Recarregar a lista de consultas após agendamento
        })
        .catch(error => {
            console.error('Erro ao agendar consulta:', error);
        });
});

// Função para formatar data no formato brasileiro
function formatarDataBrasileira(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Adicionando evento para carregar as consultas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarConsultas();
});
// Função para realizar o sair
function realizarSair() {
    // Aqui você pode limpar dados de sessão, local storage, cookies, etc.
    // Ou redirecionar para a página de login, por exemplo:
    window.location.href = "../html/Clinicacare.html"; // Altere para o caminho correto da sua página de login
}

// Adicionar evento de clique ao botão de sair
document.getElementById('btn-sair').addEventListener('click', realizarSair);
