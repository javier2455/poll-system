## Breve documentación de la API

Se utilizó para el desarrollo de la API "Nodejs" con su framework "Express", se utilizó el patrón de diseño MVC (Modelo-Vista-Controlador), se creó una estructura de carpetas acorde a las especificaciones del ejercicio.

**src**
Carpeta fuente del proyecto
**src/constants**
- Donde se guardan las constantes como los strings de los mensajes que se utilizan en la API.
**src/controllers**
- Donde controlan todas las acciones que a partir las peticiones.
**src/middlewares**
- Se almacenan las funciones que validan si el usuario tiene permisos o no antes de responder a su petición.
**src/model**
- Se definen los contratos de los modelos y la comunicación con la base de datos.
**src/routes**
- Contiene las rutas a las que va a responder la API
**src/schemas**
- Los contratos y validaciones para los datos introducidos por el usuario
**src/utils**
- Funciones reutilizables y librerias para el uso de la API.

