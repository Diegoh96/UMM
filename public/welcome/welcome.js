// welcome.js - lógica exclusiva de la pantalla de bienvenida
document.addEventListener('DOMContentLoaded', async () => {
    // Si venimos de ser expulsados por bloqueo, mostramos el aviso
    const params = new URLSearchParams(window.location.search);
    if (params.get('bloqueado') === '1') {
        const banner = document.getElementById('avisoBanner');
        banner.textContent = 'Usuario bloqueado hasta nuevo aviso. Contacta al administrador si crees que es un error.';
        banner.style.display = 'block';
    }

    // Si el usuario ya tiene sesión activa, lo mandamos directo a la tienda
    try {
        const res = await fetch('/api/sesion', { credentials: 'include' });
        const data = await res.json();

        if (data.bloqueado) {
            const banner = document.getElementById('avisoBanner');
            banner.textContent = 'Usuario bloqueado hasta nuevo aviso. Contacta al administrador si crees que es un error.';
            banner.style.display = 'block';
            return;
        }
        if (data.autenticado) {
            window.location.href = '/tienda/tienda.html';
            return;
        }
    } catch (err) {
        console.error('No se pudo verificar la sesión:', err);
    }

    document.getElementById('linkInvitado').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.setItem('modoInvitado', 'true');
        window.location.href = '/tienda/tienda.html';
    });
});
