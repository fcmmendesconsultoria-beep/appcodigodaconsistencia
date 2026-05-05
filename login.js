document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const authError = document.getElementById('auth-error');
    const btn = document.getElementById('login-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (authError) authError.style.display = 'none';

            if (!window.supabaseClient) {
                console.error("Supabase não carregado");
                authError.textContent = "Erro interno. Tente novamente.";
                authError.style.display = 'block';
                return;
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                authError.textContent = "Preencha todos os campos.";
                authError.style.display = 'block';
                return;
            }

            btn.disabled = true;
            btn.textContent = "Entrando...";

            try {
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    authError.textContent = "Erro: " + error.message;
                    authError.style.display = 'block';
                } else {
                    window.location.href = 'app.html'; // sua página principal
                }

            } catch (err) {
                console.error(err);
                authError.textContent = "Erro inesperado.";
                authError.style.display = 'block';
            }

            btn.disabled = false;
            btn.textContent = "Entrar";
        });
    }
});
