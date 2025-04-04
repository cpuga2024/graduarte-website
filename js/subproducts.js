// Funcionalidad para subproductos
document.addEventListener('DOMContentLoaded', function() {
    // Referencia a los elementos existentes
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Mostrar subproductos cuando se selecciona una categoría
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Mostrar u ocultar categorías de productos
                document.querySelectorAll('.product-category').forEach(cat => {
                    if (category === 'all') {
                        cat.style.display = 'block';
                    } else {
                        if (cat.getAttribute('data-category') === category) {
                            cat.style.display = 'block';
                        } else {
                            cat.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Funcionalidad para el formulario de WhatsApp
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar campos
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const telefono = document.getElementById('telefono');
            const institucion = document.getElementById('institucion');
            const producto = document.getElementById('producto');
            const mensaje = document.getElementById('mensaje');
            
            // Validar nombre
            if (nombre.value.trim() === '') {
                isValid = false;
                showError(nombre, 'Por favor ingrese su nombre');
            } else {
                removeError(nombre);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                isValid = false;
                showError(email, 'Por favor ingrese su correo electrónico');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Por favor ingrese un correo electrónico válido');
            } else {
                removeError(email);
            }
            
            // Validar teléfono
            if (telefono.value.trim() === '') {
                isValid = false;
                showError(telefono, 'Por favor ingrese su número de teléfono');
            } else {
                removeError(telefono);
            }
            
            // Validar producto
            if (producto.value === '') {
                isValid = false;
                showError(producto, 'Por favor seleccione un producto');
            } else {
                removeError(producto);
            }
            
            // Validar mensaje
            if (mensaje.value.trim() === '') {
                isValid = false;
                showError(mensaje, 'Por favor ingrese su mensaje');
            } else {
                removeError(mensaje);
            }
            
            // Si todo es válido, enviar a WhatsApp
            if (isValid) {
                // Construir mensaje para WhatsApp
                let whatsappMessage = `*Solicitud de Cotización*%0A%0A`;
                whatsappMessage += `*Nombre:* ${nombre.value}%0A`;
                whatsappMessage += `*Email:* ${email.value}%0A`;
                whatsappMessage += `*Teléfono:* ${telefono.value}%0A`;
                
                if (institucion.value.trim() !== '') {
                    whatsappMessage += `*Institución:* ${institucion.value}%0A`;
                }
                
                whatsappMessage += `*Producto:* ${producto.options[producto.selectedIndex].text}%0A`;
                whatsappMessage += `*Mensaje:* ${mensaje.value}%0A`;
                
                // Número de WhatsApp (reemplazar con el número real)
                const whatsappNumber = '5212345678';
                
                // Crear URL de WhatsApp
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                
                // Abrir WhatsApp en una nueva ventana
                window.open(whatsappURL, '_blank');
                
                // Resetear formulario
                contactForm.reset();
            }
        });
    }
    
    // Función para validar email (existente)
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para mostrar error (existente)
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = 'red';
    }
    
    // Función para remover error (existente)
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '';
    }
});
