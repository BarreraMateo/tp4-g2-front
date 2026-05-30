const API_MATERIAS =
    "https://tp4-nodejs-g2.onrender.com/materias";

let materias = [];

async function mostrarMaterias() {

    const response =
        await fetch(API_MATERIAS);

    materias =
        await response.json();

    let html = `

        <h2 class="mb-3">
            Gestión de Materias
        </h2>

        <div class="row mb-3">

            <div class="col-md-3">

                <input
                    id="idMateria"
                    class="form-control"
                    placeholder="ID Materia">

            </div>

            <div class="col-md-5">

                <input
                    id="nombreMateria"
                    class="form-control"
                    placeholder="Nombre">

            </div>

            <div class="col-md-2">

                <input
                    id="cuatrimestre"
                    class="form-control"
                    placeholder="Cuatrimestre">

            </div>

            <div class="col-md-2">

                <button
                    class="btn btn-success w-100"
                    onclick="crearMateria()">

                    Crear

                </button>

            </div>

        </div>

        <input
            id="buscadorMateria"
            class="form-control mb-3"
            placeholder="Buscar materia..."
            onkeyup="filtrarMaterias()">

        <table class="table table-striped">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cuatrimestre</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaMaterias">

            </tbody>

        </table>
    `;

    document.getElementById("contenido")
        .innerHTML = html;

    renderizarMaterias(materias);
}

function renderizarMaterias(datos) {

    const tabla =
        document.getElementById("tablaMaterias");

    tabla.innerHTML = "";

    datos.forEach(materia => {

        tabla.innerHTML += `

            <tr>

                <td>${materia.idMateria}</td>
                <td>${materia.nombre}</td>
                <td>${materia.cuatrimestre}</td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="editarMateria('${materia.idMateria}')">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarMateria('${materia.idMateria}')">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;
    });
}

async function crearMateria() {

    await fetch(API_MATERIAS, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            idMateria:
                document.getElementById("idMateria").value,

            nombre:
                document.getElementById("nombreMateria").value,

            cuatrimestre:
                document.getElementById("cuatrimestre").value

        })

    });

    mostrarMaterias();
}
async function editarMateria(id) {

    const materia =
        materias.find(
            m => m.idMateria === id
        );

    if (!materia) return;

    const nombre =
        prompt(
            "Nombre",
            materia.nombre
        );

    if (nombre === null) return;

    const response = await fetch(
        `${API_MATERIAS}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                idMateria: materia.idMateria,
                nombre: nombre
            })
        }
    );

    const data = await response.json();

    console.log(data);

    mostrarMaterias();
}
async function eliminarMateria(id) {

    if (!confirm("¿Eliminar materia?"))
        return;

    await fetch(
        `${API_MATERIAS}/${id}`,
        {
            method: "DELETE"
        }
    );

    mostrarMaterias();
}

function filtrarMaterias() {

    const texto =
        document.getElementById("buscadorMateria")
        .value
        .toLowerCase();

    const filtrados =
        materias.filter(m =>
            JSON.stringify(m)
                .toLowerCase()
                .includes(texto)
        );

    renderizarMaterias(filtrados);
}