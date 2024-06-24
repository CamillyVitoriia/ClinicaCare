// login.js

document.getElementById('form-login').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var tipoUsuario = document.getElementById('tipo-usuario').value;

    const login = {
        email: username,
        senha: password
    };

    console.log(login)

    let url = '';
    if (tipoUsuario === 'paciente') {
        url = 'https://clinicacare.onrender.com/api/v1/auth/paciente';
    } else if (tipoUsuario === 'funcionario') {
        url = 'https://clinicacare.onrender.com/api/v1/auth/funcionario';
    } else if (tipoUsuario === 'medico') {
        url = 'https://clinicacare.onrender.com/api/v1/auth/medico';
    }

    if (url) {
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Usuário ou senha inválidos');
            }
        })
        .then(data => {
            console.log('Login bem-sucedido:', data);
            // Redirecionar para a página apropriada
            if (tipoUsuario === 'paciente') {
                window.location.href = './paciente.html';
            } else if (tipoUsuario === 'funcionario') {
                window.location.href = './funcionario.html';
            } else if (tipoUsuario === 'medico') {
                window.location.href = './medico.html';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message);
        });
    }
});
