## Breve documentación de la API

Se utilizó para el desarrollo de la API "Nodejs" con su framework "Express", se utilizó el patrón de diseño MVC (Modelo-Vista-Controlador), se creó una estructura de carpetas acorde a las especificaciones del ejercicio.

### Rutas

#### Authentication
##### Login
* POST: `/auth/login` parámetros de entrada `body: {
    'username', 'password'
}` devuelve las credenciales del usuario si existe.

##### Register
* POST: `/auth/register` parámetros de entrada `body: {
    'username', 'fullname', 'password'
}` devuelve las credenciales del usuario si se registro correctamente.

##### Logout
* POST: `/auth/logout` cierra la sesión del usuario.

##### Profile
* GET: `/auth/profile` devuelve los datos del usuario.

##### Veirfy Token
* GET: `/auth/verify-token` verifica si el token del usuario es válido.

#### Users
##### Get All Users
* GET: `/user/` devuelve todos los usuarios.

##### Get One User
* GET: `/user/:id` devuelve un usuario a partir de su id.

##### Create
* POST: `/user/` parámetros de entrada `body: {
    'username', 'fullname', 'password', 'avatar'
}` crea un usuario.

##### Update
* PUT: `/user/:id` parámetros de entrada `body: {
    'username', 'fullname', 'password', 'avatar'
}` actualiza un usuario por su id.

##### Delete
* DELETE: `/user/:id` elimina un usuario por su id

#### Polls
##### Get All Polls
* GET: `/polls/` devuelve todas las encuestas.

##### Get One Poll
* GET: `/polls/:id` devuelve una encuesta a partir de su id.

##### Create
* POST: `/polls/` parámetros de entrada `body: {
    'title', 'fields', 'state', 'usersThatVoted'
}` crea una encuesta.

##### Update
* PUT: `/polls/:id` parámetros de entrada `body: {
    'title', 'fields', 'state', 'usersThatVoted'
}` actualiza una encuesta por su id.

##### Delete
* DELETE: `/polls/:id` elimina una encuesta por su id

##### Update poll with vote
* PUT: `/vote/:id/:inputId` actualiza una encuesta con la votación del usuario.

##### Close poll
* PUT: `/close_poll/:id` cierra una encuesta.

### Estructura de carpetas y funcionamiento

#### src
Carpeta fuente del proyecto
#### src/constants
- Donde se guardan las constantes como los strings de los mensajes que se utilizan en la API.
#### src/controllers
- Donde controlan todas las acciones que a partir las peticiones.
#### src/middlewares
- Se almacenan las funciones que validan si el usuario tiene permisos o no antes de responder a su petición.
#### src/model
- Se definen los contratos de los modelos y la comunicación con la base de datos.
#### src/routes
- Contiene las rutas a las que va a responder la API
#### src/schemas
- Los contratos y validaciones para los datos introducidos por el usuario
#### src/utils
- Funciones reutilizables y librerias para el uso de la API.

