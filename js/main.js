// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Filtrado de productos
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón seleccionado
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Mostrar u ocultar productos según la categoría
                productCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Slider de testimonios
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    if (testimonialSlides.length > 0) {
        // Función para mostrar slide actual
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            testimonialSlides[index].style.display = 'block';
        }
        
        // Inicializar slider
        showSlide(currentSlide);
        
        // Evento para botón anterior
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = testimonialSlides.length - 1;
                }
                showSlide(currentSlide);
            });
        }
        
        // Evento para botón siguiente
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide >= testimonialSlides.length) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
        }
        
        // Auto-rotación del slider cada 5 segundos
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar campos
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const telefono = document.getElementById('telefono');
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
            
            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            }
        });
    }
    
    // Validación del formulario de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                alert('Por favor ingrese un correo electrónico válido');
            } else {
                alert('¡Gracias por suscribirte a nuestro boletín!');
                newsletterForm.reset();
            }
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para mostrar error
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
    
    // Función para remover error
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '';
    }
    
    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de aparición al hacer scroll
    const revealElements = document.querySelectorAll('.section-title, .product-card, .about-content, .testimonial-content');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Agregar clase para CSS
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });
    
    // Verificar al cargar la página y al hacer scroll
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
