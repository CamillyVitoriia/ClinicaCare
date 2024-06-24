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

// Função para carregar as consultas realizadas pelo paciente por CPF
function carregarConsultasRealizadas(cpfPaciente) {
    var apiUrl = `https://clinicacare.onrender.com/api/v1/paciente/${cpfPaciente}/consultas/realizadas`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar consultas realizadas');
            }
            return response.json();
        })
        .then(data => {
            var consultasRealizadasContainer = document.getElementById('consultas-realizadas');
            consultasRealizadasContainer.innerHTML = '';

            data.forEach(consulta => {
                var consultaCard = criarCardConsulta(consulta, false); // false indica que é uma consulta realizada
                consultasRealizadasContainer.appendChild(consultaCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar consultas realizadas:', error);
            var consultasRealizadasContainer = document.getElementById('consultas-realizadas');
            consultasRealizadasContainer.innerHTML = '<p>Não foi possível carregar as consultas realizadas.</p>';
        });
}

// Função para criar um card de consulta
// Exemplo de uso dentro da função criarCardConsulta
function criarCardConsulta(consulta, agendada) {
    var consultaCard = document.createElement('div');
    consultaCard.classList.add('consulta-card');

    var status = agendada ? 'Agendada' : 'Realizada';
    var statusClass = agendada ? 'agendada' : 'realizada';

    consultaCard.innerHTML = `
        <div class="consulta-header">
            <h3>${consulta.especialidade}</h3>
            <span class="status ${statusClass}">${status}</span>
            <button class="delete-btn" onclick="deletarConsulta('${consulta._id}', ${agendada})"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="consulta-body">
            <p><strong>Data e Hora:</strong> ${formatarDataHora(consulta.dataHora)}</p>
            <p><strong>Médico:</strong> ${consulta.medico}</p>
            <p><strong>Diagnóstico:</strong> ${consulta.diagnostico || '-'}</p>
        </div>
    `;

    return consultaCard;
}

// Função para formatar data e hora
function formatarDataHora(dataHora) {
    const data = new Date(dataHora);
    const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e formata para ter dois dígitos
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (começa do zero, por isso +1) e formata para ter dois dígitos
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0'); // Obtém a hora e formata para ter dois dígitos
    const minutos = data.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e formata para ter dois dígitos

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}

// Função para deletar uma consulta
function deletarConsulta(consultaId, agendada) {
    var apiUrl = `https://clinicacare.onrender.com/api/v1/consultas/${consultaId}`;

    fetch(apiUrl, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar consulta');
        }
        return response.json();
    })
    .then(data => {
        console.log('Consulta deletada com sucesso:', data);
        // Após deletar, recarrega as consultas correspondentes (agendadas ou realizadas)
        if (agendada) {
            carregarConsultasAgendadas(cpfPaciente);
        } else {
            carregarConsultasRealizadas(cpfPaciente);
        }
    })
    .catch(error => {
        console.error('Erro ao deletar consulta:', error);
        // Aqui você pode adicionar lógica para mostrar uma mensagem de erro ao usuário
    });
}

// Adicionando evento de submit ao formulário de agendamento de consulta
document.getElementById('form-agendamento-consulta').addEventListener('submit', function(event) {
    event.preventDefault();

    var dataHoraConsulta = document.getElementById('data-hora-consulta-agendamento').value;
    var especialidade = document.getElementById('especialidade').value;
    var cpfPaciente = document.getElementById('cpf-paciente-agendamento').value;

    // Aqui você pode implementar a lógica para agendar a consulta via API
    // Exemplo: fetch para enviar os dados para o backend

    // Exemplo de como enviar uma requisição POST para agendar a consulta
    var apiUrl = 'https://clinicacare.onrender.com/api/v1/consultas/agendar';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dataHora: dataHoraConsulta,
            especialidade: especialidade,
            cpfPaciente: cpfPaciente
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao agendar consulta');
        }
        return response.json();
    })
    .then(data => {
        console.log('Consulta agendada com sucesso:', data);
        // Após agendar, recarrega as consultas agendadas
        carregarConsultasAgendadas(cpfPaciente);
    })
    .catch(error => {
        console.error('Erro ao agendar consulta:', error);
        // Aqui você pode adicionar lógica para mostrar uma mensagem de erro ao usuário
    });
});
// Função para realizar o sair
function realizarSair() {
    // Aqui você pode limpar dados de sessão, local storage, cookies, etc.
    // Ou redirecionar para a página de login, por exemplo:
    window.location.href = "../html/index.html"; // Altere para o caminho correto da sua página de login
}

// Adicionar evento de clique ao botão de sair
document.getElementById('btn-sair').addEventListener('click', realizarSair);


// Adicionando evento para carregar as consultas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarConsultas();
});