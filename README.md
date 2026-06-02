# TP4 - Frontend Grupo 2

## Descripción

Este proyecto corresponde al desarrollo del Frontend del Trabajo Práctico N.º 4. La aplicación fue creada para consumir una API REST desarrollada previamente y permitir la administración de distintas entidades académicas mediante operaciones CRUD.

A través de la interfaz web es posible realizar consultas, altas, modificaciones y eliminaciones de registros relacionados con:

* Alumnos
* Profesores
* Materias
* Notas

Toda la información se obtiene y actualiza mediante JavaScript utilizando Fetch API para comunicarse con la API desplegada en Render.

---

# Objetivo del Trabajo

El objetivo principal fue aplicar los conceptos vistos durante la cursada relacionados con:

* Desarrollo Frontend.
* Consumo de APIs REST.
* Manipulación del DOM.
* Uso de Fetch API.
* Integración entre Frontend y Backend.
* Operaciones CRUD.
* Pruebas de endpoints mediante Postman.

---

# Tecnologías Utilizadas

Para el desarrollo del proyecto se utilizaron las siguientes tecnologías:

* HTML5
* CSS3
* JavaScript
* Fetch API
* Postman
* Render
* Node.js (Backend)

---

# Estructura del Proyecto

```text
TP4-G2-FRONT
│
├── css
│   └── styles.css
│
├── docs
│   ├── assets
│   │   └── favicon.ico
│   │
│   ├── js
│   │   ├── alumnos.js
│   │   ├── profesores.js
│   │   ├── materias.js
│   │   └── notas.js
│   │
│   ├── pages
│   │   ├── profesores.html
│   │   ├── materias.html
│   │   └── notas.html
│   │
│   └── index.html
│
└── README.md
```

## Navegación de la Aplicación

La aplicación está dividida en varias páginas para facilitar la administración de cada entidad.

## Página Principal (index.html)
La página principal está destinada a la gestión de alumnos.

Desde esta pantalla se pueden realizar las siguientes acciones:

-Mostrar todos los alumnos.

-Buscar un alumno por legajo.

-Crear un alumno nuevo.

-Modificar un alumno existente.

-Eliminar un alumno.

-Además, contiene enlaces para acceder a las demás secciones del sistema.

## Página de Profesores
Esta sección permite administrar la información de los profesores.

Las funcionalidades implementadas son:

Mostrar todos los profesores.

Buscar profesor por legajo.

Crear profesor.

Modificar profesor.

Eliminar profesor.

Datos administrados:

Legajo

Nombre

Apellido

Email

Especialidad

Estado activo

## Página de Materias
Esta sección permite administrar las materias registradas.

Las funcionalidades implementadas son:

Mostrar todas las materias.

Buscar materia por ID.

Crear materia.

Modificar materia.

Eliminar materia.

Datos administrados:

ID de materia

Nombre

Cuatrimestre

## Página de Notas
Esta sección permite administrar las notas de los alumnos.

Las funcionalidades implementadas son:

Mostrar todas las notas.

Buscar nota por ID.

Crear nota.

Modificar nota.

Eliminar nota.

Datos administrados:

ID

Legajo del alumno

ID de materia

Nota

Fecha

La fecha se genera automáticamente al momento de registrar una nueva nota.

## Funcionalidades Comunes de los Módulos JavaScript
Cada entidad del sistema (alumnos, profesores, materias y notas) cuenta con su propio archivo JavaScript.
Aunque se aplican a diferentes datos, todos comparten las mismas cuatro operaciones CRUD:

-Consultar registros

-Obtener todos los registros de la entidad.

-Buscar un registro específico por su identificador (legajo o ID).

-Crear registros

-Registrar un nuevo elemento en la base de datos.

-Validar campos obligatorios antes de enviar la solicitud.

-Modificar registros

-Actualizar información existente.

-Permitir cambios parciales (solo los campos ingresados).

-Eliminar registros

-Borrar un registro por su identificador.

-Mostrar confirmación del registro eliminado.

Estas operaciones se implementan utilizando Fetch API para comunicarse con la API REST y manipulación del DOM para mostrar los resultados en pantalla mediante tarjetas de datos.

## API Consumida
La API fue desplegada utilizando Render y durante el desarrollo se utilizaron pruebas en Postman para verificar el funcionamiento de los distintos endpoints antes de integrarlos al Frontend.

URL base utilizada:

https://tp4-nodejs-g2.onrender.com

## Endpoints de Alumnos

GET    /alumnos
GET    /alumnos/:legajo
POST   /alumnos
PUT    /alumnos/:legajo
DELETE /alumnos/:legajo

## Endpoints de Profesores

GET    /profesores
GET    /profesores/:legajo
POST   /profesores
PUT    /profesores/:legajo
DELETE /profesores/:legajo

## Endpoints de Materias

GET    /materias
GET    /materias/:idMateria
POST   /materias
PUT    /materias/:idMateria
DELETE /materias/:idMateria

## Endpoints de Notas

GET    /notas
GET    /notas/:id
POST   /notas
PUT    /notas/:id
DELETE /notas/:id

## Diseño y Estilos
Los estilos generales se encuentran en el archivo:

css/styles.css
Se aplicaron estilos para mejorar la visualización de la información mediante:
Tarjetas de datos.
Botones.
Organización de elementos en pantalla.
Diferenciación visual de estados activos e inactivos.
Mejor presentación de la información obtenida desde la API.
El objetivo fue mantener una interfaz simple, clara y fácil de utilizar.

## Cómo Ejecutar el Proyecto
Clonar el repositorio.

bash
git clone <url-del-repositorio>
Abrir el proyecto en Visual Studio Code.

-Ejecutar la aplicación utilizando Live Server o cualquier servidor local.
-Acceder a la página principal.
-Navegar entre las distintas secciones utilizando los enlaces disponibles.
-Probar las operaciones CRUD de alumnos, profesores, materias y notas.

## Distribución de Tareas
Para el desarrollo del proyecto se realizó una división de tareas entre los integrantes del grupo.

Ricardo Herbas
Se encargó del desarrollo de:

. Página principal (index.html)
. Hoja de estilos (styles.css)
. Dos módulos JavaScript del proyecto
. Integración y organización general de la interfaz

Mateo Barrera
Se encargó del desarrollo de:

. Dos páginas HTML del proyecto

. Dos módulos JavaScript del proyecto
. Elaboración de la documentación del proyecto (README.md)
. La distribución del trabajo permitió avanzar de forma organizada y posteriormente integrar todas las partes para obtener una aplicación funcional.

## Integrantes
Grupo 2

Barrera, Mateo

Herbas, Ricardo

## Conclusión
Este trabajo nos permitió aplicar los conocimientos vistos durante la cursada sobre desarrollo Frontend, manipulación del DOM y consumo de APIs REST mediante JavaScript y Fetch API.
Durante el desarrollo utilizamos Postman para probar los endpoints y Render para acceder a la API desplegada. Posteriormente integramos todas las funcionalidades en una interfaz web que permite realizar operaciones CRUD sobre alumnos, profesores, materias y notas.
Además, el trabajo en equipo permitió distribuir responsabilidades y coordinar la integración de los distintos módulos para obtener una aplicación funcional y organizada.