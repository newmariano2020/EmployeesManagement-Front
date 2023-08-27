# TITULO: EMPLOYEES MANAGEMENT

Una aplicación web para realizar un seguimiento del nombre y el salario de los empleados 



## CARACTERÍSTICAS:

Registro y Autenticación de Usuarios:

1- Implementación de un sistema de registro de usuarios utilizando React.js y Node.js.
Autenticación segura con cifrado de contraseñas y uso de JWT (JSON Web Tokens).
Selección de avatares personalizados al iniciar sesión.
CRUD de Usuarios:

2- Capacidad para crear, leer, actualizar y eliminar usuarios utilizando el patrón CRUD (Create, Read, Update, Delete).
Interfaz amigable en React.js para administrar la información de los usuarios.
Gestión Individual de Empleados:

3- Renderización dinámica de listas de empleados para cada usuario registrado.
Implementación de CRUD para cada lista de empleados, permitiendo a los usuarios agregar, editar y eliminar empleados según su perfil.
Descarga de Datos en Formato CSV:

4- Opción para que los usuarios descarguen la lista de empleados en formato CSV.
Facilita la exportación y uso de los datos de empleados en otras aplicaciones.
Seguridad y Privacidad:

5- Uso de la librería "helmet" para añadir capas de seguridad adicionales en la aplicación web.
Cifrado de contraseñas para proteger los datos sensibles de los usuarios almacenados en la base de datos.


### TECNOLOGÍAS UTILIZADAS:

- Frontend: React.js para la interfaz de usuario, con cache para almacenar datos temporales además de Boostrap para la Tabla de Empleados y Material UI para los estilos.

Backend: Node.js y Express para el manejo de solicitudes y la lógica de negocio.

Base de Datos: MySQL para el almacenamiento de información de usuarios y empleados.

Implementación de Cache:

- lmacenamiento en caché de datos como el email y el token para una experiencia de usuario más eficiente.
Diseño Responsivo:

- Diseño adaptable que se ajusta a diferentes tamaños de pantalla, garantizando una experiencia coherente en dispositivos variados.


#### LIBRERÍAS UTILIZADAS:

* * BACKEND:

* mysql2/promise: Esta librería se utiliza para interactuar con bases de datos MySQL en Node.js. Al importar createPool de esta librería, creo un pool de  conexiones a la base de datos, lo que mejora la eficiencia al manejar múltiples solicitudes de bases de datos de manera concurrente.

* dotenv: dotenv se utiliza para cargar variables de entorno desde un archivo .env. 

* express: La librería express me permitió definir rutas, manejar solicitudes y respuestas HTTP de manera ordenada y legible.

* cors: La librería cors me permitió que el servidor web responda a solicitudes de diferentes orígenes (dominios) de manera controlada.

* joi: joi como librería de validación me permitió para controlar los datos de entrada y asegurar que cumplan con ciertos criterios antes de procesarlos.

* sanitize-html: Esta librería la utilizé para limpiar y sanitizar contenido HTML lo que ayuda a prevenir ataques de inyección de código y asegura que el contenido proporcionado por los usuarios sea seguro para mostrar.

* helmet: Al integrar Helmet agrego encabezados HTTP relacionados con la seguridad a las respuestas generadas por mi aplicación. Estos encabezados ayudan a proteger contra ciertos tipos de ataques, como el ataque de Cross-Site Scripting (XSS), evitando que los navegadores ejecuten scripts maliciosos inyectados en las páginas web.

* bcrypt: bcrypt lo utilizo para el cifrado seguro de contraseñas. Ayuda a proteger las contraseñas almacenadas en la base de datos mediante el uso de técnicas de hash y salting.

* jsonwebtoken: jsonwebtoken lo utilizao para trabajar con tokens de autenticación basados en JSON. Esta librería es comúnmente utilizada para implementar la autenticación basada en tokens JWT.

* fast-csv: fast-csv es una librería para la lectura y escritura rápida de archivos CSV. En mi caso, se utiliza para formatear y generar archivos CSV que los usuarios pueden descargar.


* * FRONTEND:

* * axios: lo utilizé para interactuar con el backend y realizar operaciones como la obtención y el envío de datos.

* * react-router-dom: Me Permiteió definir rutas y componentes asociados a esas rutas, lo que ayuda a crear una experiencia de navegación fluida.

* * formik: Me proporcionó herramientas para manejar el estado del formulario, validación, envío de datos y más.

* * @mui/system y @mui/icons-material: Aqui di estilos a mis componentes e iconos para mejorar la experiencia de navegación del usuario.

* * file-saver: La utilizé para habilitar la descarga de archivos CSV generados en el frontend.

* * Yup: La utilicé utiliza junto con formik para definir esquemas de validación para los datos del formulario.

* * React Context API: La utilizé para proporcionar y consumir información del usuario a través del contexto.


##### EJEMPLOS:



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
