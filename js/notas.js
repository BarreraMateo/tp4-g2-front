const API_NOTAS =
    "https://tp4-nodejs-g2.onrender.com/notas";

let notas = [];

async function mostrarNotas() {

    const response =
        await fetch(API_NOTAS);

    notas =
        await response.json();

    let html = `

        <h2 class="mb-3">
            Gestión de Notas
        </h2>

        <div class="row mb-3">

            <div class="col-md-3">

                <input
                    id="legajoNota"
                    class="form-control"
                    placeholder="Legajo">

            </div>

            <div class="col-md-3">

                <input
                    id="materiaNota"
                    class="form-control"
                    placeholder="ID Materia">

            </div>

            <div class="col-md-3">

                <input
                    id="notaAlumno"
                    class="form-control"
                    placeholder="Nota">

            </div>

            <div class="col-md-3">

                <button
                    class="btn btn-success w-100"
                    onclick="crearNota()">

                    Crear

                </button>

            </div>

        </div>

        <input
            id="buscadorNota"
            class="form-control mb-3"
            placeholder="Buscar nota..."
            onkeyup="filtrarNotas()">

        <table class="table table-striped">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Legajo</th>
                    <th>Materia</th>
                    <th>Nota</th>
                    <th>Fecha Alta</th>
                    <th>Modificación</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody id="tablaNotas">

            </tbody>

        </table>
    `;

    document.getElementById("contenido")
        .innerHTML = html;

    renderizarNotas(notas);
}

function renderizarNotas(datos) {

    const tabla =
        document.getElementById("tablaNotas");

    tabla.innerHTML = "";

    datos.forEach(nota => {

        tabla.innerHTML += `

            <tr>

                <td>${nota.id}</td>
                <td>${nota.legajo}</td>
                <td>${nota.idMateria}</td>
                <td>${nota.nota}</td>
                <td>${nota.fechaAlta}</td>
                <td>${nota.modificacion}</td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="editarNota(${nota.id})">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarNota(${nota.id})">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;
    });
}

async function crearNota() {

    await fetch(API_NOTAS, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            legajo: Number(
                document.getElementById("legajoNota").value
            ),

            idMateria:
                document.getElementById("materiaNota").value,

            nota: Number(
                document.getElementById("notaAlumno").value
            )

        })

    });

    mostrarNotas();
}

async function editarNota(id) {

    const notaEncontrada =
        notas.find(
            n => n.id === id
        );

    if (!notaEncontrada) return;

    const nuevaNota =
        prompt(
            "Nueva nota",
            notaEncontrada.nota
        );

    if (nuevaNota === null) return;

    const nuevaMateria =
        prompt(
            "ID Materia",
            notaEncontrada.idMateria
        );

    if (nuevaMateria === null) return;

    const response = await fetch(
        `${API_NOTAS}/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id: notaEncontrada.id,
                legajo: notaEncontrada.legajo,
                idMateria: nuevaMateria,
                nota: Number(nuevaNota)

            })

        }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (response.ok) {
        mostrarNotas();
    }
}

async function eliminarNota(id) {

    if (!confirm("¿Eliminar nota?"))
        return;

    await fetch(
        `${API_NOTAS}/${id}`,
        {
            method: "DELETE"
        }
    );

    mostrarNotas();
}

function filtrarNotas() {

    const texto =
        document.getElementById("buscadorNota")
        .value
        .toLowerCase();

    const filtrados =
        notas.filter(n =>
            JSON.stringify(n)
                .toLowerCase()
                .includes(texto)
        );

    renderizarNotas(filtrados);
}