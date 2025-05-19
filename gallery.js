// Funcionalidad para galería de imágenes y expansión
document.addEventListener('DOMContentLoaded', function() {
    // Crear el modal para la imagen expandida
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <img src="" alt="Imagen ampliada" class="modal-image">
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(imageModal);

    // Referencias a elementos del modal
    const modalImage = imageModal.querySelector('.modal-image');
    const modalClose = imageModal.querySelector('.modal-close');
    const modalPrev = imageModal.querySelector('.modal-prev');
    const modalNext = imageModal.querySelector('.modal-next');

    // Variables para controlar la galería actual
    let currentGallery = [];
    let currentIndex = 0;

    // Inicializar galerías de productos
    initProductGalleries();

    // Cerrar modal al hacer clic en el botón de cierre
    modalClose.addEventListener('click', function() {
        imageModal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera de la imagen
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
        }
    });

    // Navegar a la imagen anterior
    modalPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        modalImage.src = currentGallery[currentIndex];
    });

    // Navegar a la imagen siguiente
    modalNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        modalImage.src = currentGallery[currentIndex];
    });

    // Permitir navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (!imageModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            imageModal.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            modalImage.src = currentGallery[currentIndex];
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            modalImage.src = currentGallery[currentIndex];
        }
    });

    // Función para inicializar las galerías de productos
    function initProductGalleries() {
        // Obtener todas las tarjetas de productos
        const productCards = document.querySelectorAll('.subproduct-card');
        
        productCards.forEach(card => {
            // Obtener categoría y nombre del producto
            const category = card.closest('.product-category').getAttribute('data-category');
            const productName = card.querySelector('h4').textContent.trim();
            
            // Crear array de imágenes para este producto (principal + adicionales)
            const mainImage = card.querySelector('.subproduct-image img').src;
            const additionalImages = generateAdditionalImages(category, productName, mainImage);
            const allImages = [mainImage, ...additionalImages];
            
            // Crear estructura de galería
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'product-gallery';
            
            // Imagen principal
            const galleryMainImage = document.createElement('img');
            galleryMainImage.src = mainImage;
            galleryMainImage.alt = productName;
            galleryMainImage.className = 'gallery-main-image';
            galleryContainer.appendChild(galleryMainImage);
            
            // Contenedor de miniaturas
            const thumbnailsContainer = document.createElement('div');
            thumbnailsContainer.className = 'gallery-thumbnails';
            
            // Crear miniaturas para todas las imágenes
            allImages.forEach((imgSrc, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imgSrc;
                thumbnail.alt = `${productName} - Vista ${index + 1}`;
                thumbnail.className = 'gallery-thumbnail';
                if (index === 0) thumbnail.classList.add('active');
                
                // Cambiar imagen principal al hacer clic en miniatura
                thumbnail.addEventListener('click', function() {
                    galleryMainImage.src = imgSrc;
                    // Actualizar clase activa
                    thumbnailsContainer.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    thumbnail.classList.add('active');
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
            
            galleryContainer.appendChild(thumbnailsContainer);
            
            // Abrir modal al hacer clic en la imagen principal
            galleryMainImage.addEventListener('click', function() {
                currentGallery = allImages;
                currentIndex = 0;
                modalImage.src = currentGallery[currentIndex];
                imageModal.classList.add('active');
            });
            
            // Reemplazar la imagen actual con la galería
            const currentImageContainer = card.querySelector('.subproduct-image');
            currentImageContainer.innerHTML = '';
            currentImageContainer.appendChild(galleryContainer);
        });
    }

    // Función para generar imágenes adicionales para cada producto
    function generateAdditionalImages(category, productName, mainImage) {
        // Generar URLs únicas para imágenes adicionales
        // Usamos parámetros random diferentes para obtener imágenes distintas
        const additionalImages = [];
        
        // Generar 3 imágenes adicionales para cada producto
        for (let i = 1; i <= 3; i++) {
            // Crear un hash único basado en la categoría, nombre y número
            const hash = btoa(`${category}-${productName}-${i}`).substring(0, 8);
            const randomParam = `random=${hash}`;
            
            // Crear URL con parámetro único
            const imgUrl = `https://picsum.photos/600/400?${randomParam}`;
            additionalImages.push(imgUrl);
        }
        
        return additionalImages;
    }
});
