const API_PROFESORES =
    "https://tp4-nodejs-g2.onrender.com/profesores";

let profesores = [];

async function mostrarProfesores() {

    const response =
        await fetch(API_PROFESORES);

    profesores =
        await response.json();

    let html = `

        <h2 class="mb-3">
            Gestión de Profesores
        </h2>

        <div class="row mb-3">

            <div class="col-md-3">
                <input
                    id="nombreProfesor"
                    class="form-control"
                    placeholder="Nombre">
            </div>

            <div class="col-md-3">
                <input
                    id="apellidoProfesor"
                    class="form-control"
                    placeholder="Apellido">
            </div>

            <div class="col-md-2">
                <input
                    id="emailProfesor"
                    class="form-control"
                    placeholder="Email">
            </div>

            <div class="col-md-2">
                <input
                    id="especialidadProfesor"
                    class="form-control"
                    placeholder="Especialidad">
            </div>

            <div class="col-md-2">
                <button
                    class="btn btn-success w-100"
                    onclick="crearProfesor()">

                    Crear

                </button>
            </div>

        </div>

        <input
            id="buscadorProfesor"
            class="form-control mb-3"
            placeholder="Buscar profesor..."
            onkeyup="filtrarProfesores()">

        <table class="table table-striped">

            <thead>

                <tr>

                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Especialidad</th>
                    <th>Fecha Alta</th>
                    <th>Modificación</th>
                    <th>Estado</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaProfesores">

            </tbody>

        </table>
    `;

    document.getElementById("contenido")
        .innerHTML = html;

    renderizarProfesores(profesores);
}

function renderizarProfesores(datos) {

    const tabla =
        document.getElementById("tablaProfesores");

    tabla.innerHTML = "";

    datos.forEach(profesor => {

        tabla.innerHTML += `

            <tr>

                <td>${profesor.legajo}</td>
                <td>${profesor.nombre}</td>
                <td>${profesor.apellido}</td>
                <td>${profesor.email}</td>
                <td>${profesor.especialidad}</td>
                <td>${profesor.fechaAlta}</td>
                <td>${profesor.modificacion}</td>

                <td>

                    ${
                        profesor.isActive
                        ? '<span class="activo">Activo</span>'
                        : '<span class="inactivo">Inactivo</span>'
                    }

                </td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="editarProfesor(${profesor.legajo})">

                        Editar

                    </button>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="cambiarEstadoProfesor(${profesor.legajo}, ${profesor.isActive})">

                        ${
                            profesor.isActive
                            ? "Desactivar"
                            : "Activar"
                        }

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProfesor(${profesor.legajo})">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;
    });
}

async function crearProfesor() {

    await fetch(API_PROFESORES, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nombre:
                document.getElementById("nombreProfesor").value,

            apellido:
                document.getElementById("apellidoProfesor").value,

            email:
                document.getElementById("emailProfesor").value,

            especialidad:
                document.getElementById("especialidadProfesor").value
        })

    });

    mostrarProfesores();
}

async function editarProfesor(legajo) {

    const profesor =
        profesores.find(
            p => p.legajo === legajo
        );

    if (!profesor) return;

    const nombre =
        prompt("Nombre", profesor.nombre);

    if (nombre === null) return;

    const apellido =
        prompt("Apellido", profesor.apellido);

    if (apellido === null) return;

    const email =
        prompt("Email", profesor.email);

    if (email === null) return;

    const especialidad =
        prompt(
            "Especialidad",
            profesor.especialidad
        );

    if (especialidad === null) return;

    await fetch(
        `${API_PROFESORES}/${legajo}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                apellido,
                email,
                especialidad
            })

        }
    );

    mostrarProfesores();
}

async function cambiarEstadoProfesor(
    legajo,
    estadoActual
) {

    await fetch(
        `${API_PROFESORES}/${legajo}`,
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

    mostrarProfesores();
}

async function eliminarProfesor(
    legajo
) {

    if (!confirm("¿Eliminar profesor?"))
        return;

    await fetch(
        `${API_PROFESORES}/${legajo}`,
        {
            method: "DELETE"
        }
    );

    mostrarProfesores();
}

function filtrarProfesores() {

    const texto =
        document.getElementById(
            "buscadorProfesor"
        )
        .value
        .toLowerCase();

    const filtrados =
        profesores.filter(profesor =>

            JSON.stringify(profesor)
                .toLowerCase()
                .includes(texto)

        );

    renderizarProfesores(filtrados);
}