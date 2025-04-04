# Instrucciones de Despliegue

## Opción 1: Despliegue en GitHub Pages

GitHub Pages es una forma gratuita y sencilla de publicar tu sitio web directamente desde un repositorio de GitHub.

### Paso 1: Crear una cuenta en GitHub (si no tienes una)
1. Ve a [GitHub](https://github.com)
2. Haz clic en "Sign up" y sigue las instrucciones para crear una cuenta

### Paso 2: Crear un nuevo repositorio
1. Una vez que hayas iniciado sesión, haz clic en el botón "+" en la esquina superior derecha
2. Selecciona "New repository"
3. Nombra tu repositorio (por ejemplo, "graduacion-website")
4. Asegúrate de que el repositorio sea público
5. Haz clic en "Create repository"

### Paso 3: Subir los archivos del sitio web
**Opción A: Usando la interfaz web de GitHub**
1. En tu nuevo repositorio, haz clic en "uploading an existing file"
2. Arrastra y suelta todos los archivos y carpetas de tu sitio web
3. Haz clic en "Commit changes"

**Opción B: Usando Git desde la línea de comandos**
1. Instala Git desde [git-scm.com](https://git-scm.com/downloads) si no lo tienes
2. Abre una terminal o línea de comandos
3. Navega hasta la carpeta de tu sitio web:
   ```
   cd ruta/a/graduation_website
   ```
4. Inicializa un repositorio Git:
   ```
   git init
   ```
5. Añade todos los archivos:
   ```
   git add .
   ```
6. Realiza el primer commit:
   ```
   git commit -m "Primer commit del sitio web de graduación"
   ```
7. Conecta tu repositorio local con el remoto:
   ```
   git remote add origin https://github.com/tu-usuario/graduacion-website.git
   ```
8. Sube los archivos:
   ```
   git push -u origin master
   ```

### Paso 4: Configurar GitHub Pages
1. En tu repositorio, ve a "Settings" (pestaña de configuración)
2. Desplázate hacia abajo hasta la sección "GitHub Pages"
3. En "Source", selecciona "master branch" (o "main branch" si ese es el nombre de tu rama principal)
4. Haz clic en "Save"
5. Espera unos minutos y tu sitio estará disponible en: `https://tu-usuario.github.io/graduacion-website`

## Opción 2: Despliegue en Netlify

Netlify es una plataforma que ofrece alojamiento gratuito con funciones avanzadas como formularios, funciones serverless y más.

### Paso 1: Crear una cuenta en Netlify
1. Ve a [Netlify](https://www.netlify.com/)
2. Haz clic en "Sign up" y regístrate (puedes usar tu cuenta de GitHub para iniciar sesión)

### Paso 2: Desplegar tu sitio web
**Opción A: Arrastrar y soltar**
1. Una vez que hayas iniciado sesión, verás un área donde puedes arrastrar y soltar tu carpeta del sitio web
2. Simplemente arrastra la carpeta `graduation_website` a esta área
3. Netlify comenzará a desplegar tu sitio automáticamente

**Opción B: Desde un repositorio de GitHub**
1. Si ya subiste tu sitio a GitHub siguiendo los pasos anteriores, puedes conectar Netlify a tu repositorio
2. En el dashboard de Netlify, haz clic en "New site from Git"
3. Selecciona "GitHub" como proveedor de Git
4. Autoriza a Netlify para acceder a tus repositorios
5. Selecciona el repositorio que contiene tu sitio web
6. En las opciones de despliegue, deja los campos por defecto y haz clic en "Deploy site"

### Paso 3: Configurar un dominio personalizado (opcional)
1. En el dashboard de tu sitio en Netlify, ve a "Domain settings"
2. Puedes usar el subdominio gratuito que Netlify te proporciona o configurar tu propio dominio
3. Para usar tu propio dominio, haz clic en "Add custom domain" y sigue las instrucciones

## Configuración del formulario de contacto

Para que el formulario de contacto funcione correctamente después del despliegue, necesitarás configurar un servicio de procesamiento de formularios:

### Para GitHub Pages:
1. Puedes usar servicios como [Formspree](https://formspree.io/) o [Getform](https://getform.io/)
2. Regístrate en uno de estos servicios
3. Modifica el formulario en tu archivo `index.html` para que apunte a la URL proporcionada por el servicio

Ejemplo con Formspree:
```html
<form id="contact-form" action="https://formspree.io/f/tu-codigo-unico" method="POST">
```

### Para Netlify:
1. Netlify tiene un servicio de formularios integrado
2. Solo necesitas añadir el atributo `data-netlify="true"` a tu formulario

Ejemplo:
```html
<form id="contact-form" data-netlify="true" name="contact">
```

## Mantenimiento y actualizaciones

Para actualizar tu sitio web después del despliegue:

### En GitHub Pages:
1. Realiza los cambios en tus archivos locales
2. Sube los cambios a GitHub:
   ```
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. GitHub Pages actualizará automáticamente tu sitio

### En Netlify:
1. Si usaste la opción de arrastrar y soltar, deberás volver a subir todo el sitio
2. Si conectaste un repositorio de GitHub, simplemente sube tus cambios a GitHub y Netlify actualizará automáticamente tu sitio

## Soporte técnico

Si encuentras problemas durante el despliegue:
- GitHub Pages: [Documentación oficial](https://docs.github.com/en/pages)
- Netlify: [Centro de ayuda](https://answers.netlify.com/)
