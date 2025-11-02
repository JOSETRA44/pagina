# Landing Page de Kolki

Este proyecto contiene el código fuente de la landing page de la aplicación **Kolki**, una app de control de gastos con reconocimiento de voz.

## 🚀 Estructura del Proyecto

El proyecto ha sido estructurado para ser modular, mantenible y escalable. Los archivos principales se encuentran en la carpeta `assets`:

-   `assets/css/style.css`: Contiene todos los estilos de la página. Se utilizan variables CSS globales para mantener un diseño consistente y facilitar futuras modificaciones.
-   `assets/js/`: Contiene el código JavaScript, dividido en los siguientes módulos:
    -   `script.mjs`: Archivo principal que importa y ejecuta los demás módulos.
    -   `animations.mjs`: Contiene la lógica para las animaciones de scroll.
    -   `smoke-effect.mjs`: Contiene la lógica para el efecto de humo de la sección principal.
-   `assets/images/`: Contiene los recursos gráficos, como la textura de humo.

## 🛠️ Decisiones Técnicas

-   **Modularidad**: Se ha optado por una estructura de carpetas `assets` para separar las responsabilidades (CSS, JS, imágenes). El código JavaScript se ha dividido en módulos para mejorar la legibilidad y la mantenibilidad.
-   **Rendimiento**: Se ha priorizado el rendimiento optimizando los recursos. La textura de humo se aloja localmente para reducir las solicitudes de red, y el código JavaScript se carga de forma diferida para no bloquear el renderizado de la página.
-   **Accesibilidad**: Se han implementado las mejores prácticas de accesibilidad, como el uso de etiquetas ARIA y la verificación del contraste de color, para asegurar que el sitio sea usable por todos.
-   **Mantenibilidad**: Se ha refactorizado el CSS para utilizar variables globales, lo que facilita la actualización de la paleta de colores, la tipografía y el espaciado.
-   **Autonomía**: Todas las decisiones de diseño y tecnología se han tomado con el objetivo de maximizar la calidad, la legibilidad y la estética profesional del sitio.
