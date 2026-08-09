document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', message: 'Por favor, informe o seu nome.' },
      { id: 'email', message: 'Por favor, informe um email válido.' },
      { id: 'phone', message: 'Por favor, informe o seu telefone.' },
      { id: 'message', message: 'Por favor, escreva a sua mensagem.' }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const group = input.closest('.form-group');
      group.classList.remove('error');

      if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          group.classList.add('error');
          valid = false;
        }
      } else {
        if (!input.value.trim()) {
          group.classList.add('error');
          valid = false;
        }
      }
    });

    if (valid) {
      form.style.display = 'none';
      successEl.classList.add('show');
    }
  });

  // Remove error state on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      group.classList.remove('error');
    });
  });
});
