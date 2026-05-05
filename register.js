document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const authError = document.getElementById('auth-error');
    const authSuccess = document.getElementById('auth-success');
    const btn = document.getElementById('register-btn');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Esconde mensagens anteriores
            if (authError) authError.style.display = 'none';
            if (authSuccess) authSuccess.style.display = 'none';

            // Verifica se o Supabase carregou
            if (!window.supabaseClient) {
                console.error("Supabase não carregado");
                if (authError) {
                    authError.textContent = "Erro interno. Tente novamente.";
                    authError.style.display = 'block';
                }
                return;
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;

            // Validação simples
            if (!email || !password) {
                if (authError) {
                    authError.textContent = "Preencha todos os campos.";
                    authError.style.display = 'block';
                }
                return;
            }

            // Feedback no botão
            btn.disabled = true;
            btn.textContent = "Criando...";

            try {
                const { data, error } = await window.supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        }
                    }
                });

                if (error) {
                    if (authError) {
                        authError.textContent = "Erro: " + error.message;
                        authError.style.display = 'block';
                    }
                } else {
                    if (authSuccess) {
                        authSuccess.textContent = "Conta criada! Verifique seu e-mail.";
                        authSuccess.style.display = 'block';
                    }

                    // Redireciona depois de 2s
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }

            } catch (err) {
                console.error(err);
                if (authError) {
                    authError.textContent = "Erro inesperado. Tente novamente.";
                    authError.style.display = 'block';
                }
            }

            // Restaura botão
            btn.disabled = false;
            btn.textContent = "Tô dentro!";
        });
    }
});
