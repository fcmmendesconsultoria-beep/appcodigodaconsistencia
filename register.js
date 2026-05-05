document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const authError = document.getElementById('auth-error');
    const authSuccess = document.getElementById('auth-success');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Limpa mensagens anteriores
            authError.classList.add('hidden');
            authSuccess.classList.add('hidden');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;

            // Faz o cadastro no Supabase
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                authError.textContent = "Erro: " + error.message;
                authError.classList.remove('hidden');
            } else {
                authSuccess.classList.remove('hidden');
                
                // Aguarda 2 segundos e manda para o login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }
});
