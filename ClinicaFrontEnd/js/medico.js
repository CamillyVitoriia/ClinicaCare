function formatarDataBrasileira(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Função para carregar informações do paciente
function consultarPaciente() {
    var rgCpf = document.getElementById('rg-cpf-consulta').value.trim(); // Obtendo o RG ou CPF do paciente

    // Endpoint da API para consultar informações do paciente
    var apiUrl = `https://clinicacare.onrender.com/api/v1/paciente/${rgCpf}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar paciente');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Limpa o conteúdo anterior
            var resultadoConsulta = document.getElementById('resultado-consulta');
            resultadoConsulta.innerHTML = '';

            // Cria elementos para exibir as informações do paciente
            var pacienteInfo = document.createElement('div');
            pacienteInfo.classList.add('paciente-info');
            pacienteInfo.innerHTML = `
                <h3>Informações do Paciente</h3>
                <p><strong>Nome:</strong> ${data.nomeCompleto}</p>
                <p><strong>Data de Nascimento:</strong> ${formatarDataBrasileira(data.dataNascimento)}</p>
                <p><strong>Gênero:</strong> ${data.genero}</p>
            `;
            
            // Adiciona o histórico médico se existir
            if (data.historicoMedico && data.historicoMedico.length > 0) {
                var historicoMedicoContainer = document.createElement('div');
                historicoMedicoContainer.innerHTML = '<h4>Histórico Médico</h4>';
                
                data.historicoMedico.forEach(item => {
                    historicoMedicoContainer.innerHTML += `
                        <p><strong>Problema de Saúde:</strong> ${item.problema}</p>
                        <p><strong>Medicamento em Uso:</strong> ${item.medicamento}</p>
                    `;
                });
                
                pacienteInfo.appendChild(historicoMedicoContainer);
            }

            resultadoConsulta.appendChild(pacienteInfo);

            // Consulta os problemas de saúde registrados para o paciente
            // consultarProblemasSaude(rgCpf);
        })
        .catch(error => {
            console.error('Erro ao consultar paciente:', error);
            var resultadoConsulta = document.getElementById('resultado-consulta');
            resultadoConsulta.innerHTML = '<p>Não foi possível encontrar informações para o paciente.</p>';
        });
}



// Função para registrar problema de saúde e medicamento em uso
// Função para registrar problema de saúde e medicamento em uso
function registrarProblema() {
    const rgCpf = document.getElementById('rg-cpf-registro').value; // Obtendo o RG ou CPF do paciente
    const problemaSaude = document.getElementById('problema-saude').value;
    const medicamentoUso = document.getElementById('medicamento-uso').value;

    // Endpoint da API para adicionar um problema de saúde ao paciente
    const apiUrl = `https://clinicacare.onrender.com/api/v1/paciente/${rgCpf}`;

    // Montando o objeto com o novo problema a ser adicionado ao array
    const historicoMedicoPaciente = {
        historicoMedico: {
            problema: problemaSaude,
            medicamento: medicamentoUso
        }
    };

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(historicoMedicoPaciente)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Erro ao adicionar problema de saúde');
            }
            alert(`Problema de saúde "${problemaSaude}" e medicamento "${medicamentoUso}" adicionado para o paciente com RG/CPF ${rgCpf} com sucesso!`);
        })
        .catch(error => {
            console.error('Erro ao adicionar problema de saúde:', error);
            // Trate o erro de forma adequada, exibindo uma mensagem para o usuário, por exemplo
            alert('Erro ao adicionar problema de saúde. Verifique os dados e tente novamente.');
        });
}


// Função de logout
function logout() {
    // Aqui você implementaria a lógica para limpar o estado de autenticação
    // e redirecionar o médico para a página de login
    window.location.href = "index.html"; // Redirecionar para a página de login
}

// Adicionar evento de clique ao botão de logout
document.getElementById('logout-btn').addEventListener('click', logout);

// Adicionando evento de submit ao formulário de consulta de paciente
document.getElementById('form-consulta-paciente').addEventListener('submit', function (event) {
    event.preventDefault();
    consultarPaciente();
});

// Adicionando evento de submit ao formulário de registro de problema de saúde
document.getElementById('form-registro-problema').addEventListener('submit', function (event) {
    event.preventDefault();
    registrarProblema();
});
// Função para realizar o sair
function realizarSair() {
    // Aqui você pode limpar dados de sessão, local storage, cookies, etc.
    // Ou redirecionar para a página de login, por exemplo:
    window.location.href = "../html/index.html"; // Altere para o caminho correto da sua página de login
}

// Adicionar evento de clique ao botão de sair
document.getElementById('btn-sair').addEventListener('click', realizarSair);
