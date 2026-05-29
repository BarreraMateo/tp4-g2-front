const API_ALUMNOS =
    "https://tp4-nodejs-g2.onrender.com/alumnos";

let alumnos = [];

window.onload = () => {
    mostrarAlumnos();
};

async function mostrarAlumnos() {

    const response =
        await fetch(API_ALUMNOS);

    alumnos =
        await response.json();

    let html = `

        <h2 class="mb-3">
            Gestión de Alumnos
        </h2>

        <div class="row mb-3">

            <div class="col-md-3">

                <input
                    id="nombre"
                    class="form-control"
                    placeholder="Nombre">

            </div>

            <div class="col-md-3">

                <input
                    id="apellido"
                    class="form-control"
                    placeholder="Apellido">

            </div>

            <div class="col-md-3">

                <input
                    id="email"
                    class="form-control"
                    placeholder="Email">

            </div>

            <div class="col-md-3">

                <button
                    class="btn btn-success w-100"
                    onclick="crearAlumno()">

                    Crear Alumno

                </button>

            </div>

        </div>

        <input
            id="buscadorAlumno"
            class="form-control mb-3"
            placeholder="Buscar alumno..."
            onkeyup="filtrarAlumnos()">

        <table class="table table-striped">

            <thead>

                <tr>

                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Fecha Alta</th>
                    <th>Modificación</th>
                    <th>Estado</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaAlumnos">

            </tbody>

        </table>
    `;

    document.getElementById("contenido")
        .innerHTML = html;

    renderizarAlumnos(alumnos);
}

function renderizarAlumnos(datos) {

    const tabla =
        document.getElementById("tablaAlumnos");

    tabla.innerHTML = "";

    datos.forEach(alumno => {

        tabla.innerHTML += `

            <tr>

                <td>${alumno.legajo}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.email}</td>
                <td>${alumno.fechaAlta}</td>
                <td>${alumno.modificacion}</td>

                <td>

                    ${
                        alumno.isActive
                        ? '<span class="activo">Activo</span>'
                        : '<span class="inactivo">Inactivo</span>'
                    }

                </td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="editarAlumno(${alumno.legajo})">

                        Editar

                    </button>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="cambiarEstadoAlumno(${alumno.legajo}, ${alumno.isActive})">

                        ${
                            alumno.isActive
                            ? "Desactivar"
                            : "Activar"
                        }

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarAlumno(${alumno.legajo})">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;
    });
}

async function crearAlumno() {

    const nombre =
        document.getElementById("nombre").value;

    const apellido =
        document.getElementById("apellido").value;

    const email =
        document.getElementById("email").value;

    if (!nombre || !apellido || !email) {

        alert("Complete todos los campos");

        return;
    }

    await fetch(API_ALUMNOS, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre,
            apellido,
            email
        })

    });

    mostrarAlumnos();
}

async function editarAlumno(legajo) {

    const alumno =
        alumnos.find(
            a => a.legajo === legajo
        );

    if (!alumno) return;

    const nombre =
        prompt(
            "Nombre",
            alumno.nombre
        );

    if (nombre === null) return;

    const apellido =
        prompt(
            "Apellido",
            alumno.apellido
        );

    if (apellido === null) return;

    const email =
        prompt(
            "Email",
            alumno.email
        );

    if (email === null) return;

    await fetch(
        `${API_ALUMNOS}/${legajo}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                apellido,
                email
            })

        }
    );

    mostrarAlumnos();
}

async function cambiarEstadoAlumno(
    legajo,
    estadoActual
) {

    await fetch(
        `${API_ALUMNOS}/${legajo}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                isActive: !estadoActual
            })

        }
    );

    mostrarAlumnos();
}

async function eliminarAlumno(
    legajo
) {

    const confirmar =
        confirm(
            "¿Eliminar alumno?"
        );

    if (!confirmar) return;

    await fetch(
        `${API_ALUMNOS}/${legajo}`,
        {
            method: "DELETE"
        }
    );

    mostrarAlumnos();
}

function filtrarAlumnos() {

    const texto =
        document.getElementById(
            "buscadorAlumno"
        )
        .value
        .toLowerCase();

    const filtrados =
        alumnos.filter(alumno =>

            JSON.stringify(alumno)
                .toLowerCase()
                .includes(texto)

        );

    renderizarAlumnos(filtrados);
}