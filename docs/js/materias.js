const URL = 'https://tp4-nodejs-g2.onrender.com/materias'

const cardContainer = document.querySelector('#card-container-todos')
const btnMaterias = document.querySelector('#btn-materias')

const cardContainer2 = document.querySelector('#card-container-id')
const btnMateriaId = document.querySelector('#btn-materia-id')
const inputIdMateria = document.querySelector('#input-idMateria')

const cardContainer3 = document.querySelector('#card-container-nuevo')
const inputIdMateriaNuevo = document.querySelector('#input-idMateriaNuevo')
const inputNombre = document.querySelector('#input-nombre')
const inputCuatrimestre = document.querySelector('#input-cuatrimestre')
const btnMateriaNueva = document.querySelector('#btn-materia-nueva')

const cardContainer4 = document.querySelector('#card-container-modificar')
const inputIdMateriaM = document.querySelector('#input-idMateriaM')
const inputNombreM = document.querySelector('#input-nombreM')
const inputCuatrimestreM = document.querySelector('#input-cuatrimestreM')
const btnMateriaModificar = document.querySelector('#btn-materia-modificar')

const cardContainer5 = document.querySelector('#card-container-eliminar')
const inputIdMateriaE = document.querySelector('#input-idMateriaE')
const btnMateriaEliminar = document.querySelector('#btn-materia-eliminar')

async function cargarTodasMaterias() {
  try {
    const response = await fetch(URL)
    const data = await response.json()

    cardContainer.innerHTML = ''

    data.forEach((materia) => {
      const div = document.createElement('div')
      div.classList.add('card')

      div.innerHTML = `
        <p>"ID MATERIA": ${materia.idMateria}</p>
        <p>"NOMBRE": ${materia.nombre}</p>
        <p>"CUATRIMESTRE": ${materia.cuatrimestre}</p>
        <br>
      `

      cardContainer.append(div)
    })
  } catch (error) {
    console.log(error)
  }
}

async function cargarMateriaPorId() {
  try {
    const idMateria = inputIdMateria.value.trim()

    const response = await fetch(`${URL}/${idMateria}`)

    const materia = await response.json()

    cardContainer2.innerHTML = `
      <div class="card">
        <p>"ID MATERIA": ${materia.idMateria}</p>
        <p>"NOMBRE": ${materia.nombre}</p>
        <p>"CUATRIMESTRE": ${materia.cuatrimestre}</p>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function agregarMateria() {
  try {
    const nuevaMateria = {
      idMateria: inputIdMateriaNuevo.value.trim(),
      nombre: inputNombre.value.trim(),
      cuatrimestre: Number(inputCuatrimestre.value)
    }

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaMateria)
    })

    const data = await response.json()

    cardContainer3.innerHTML = `
      <div class="card">
        <p>"ID MATERIA": ${data.nuevaMateria.idMateria}</p>
        <p>"NOMBRE": ${data.nuevaMateria.nombre}</p>
        <p>"CUATRIMESTRE": ${data.nuevaMateria.cuatrimestre}</p>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function modificarMateria() {
  try {
    const idMateria = inputIdMateriaM.value.trim()

    const materia = {}

    if (inputNombreM.value) {
      materia.nombre = inputNombreM.value
    }

    if (inputCuatrimestreM.value) {
      materia.cuatrimestre = Number(inputCuatrimestreM.value)
    }

    const response = await fetch(`${URL}/${idMateria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(materia)
    })

    const data = await response.json()

    cardContainer4.innerHTML = `
      <div class="card">
        <p>"ID MATERIA": ${data.idMateria}</p>
        <p>"NOMBRE": ${data.nombre}</p>
        <p>"CUATRIMESTRE": ${data.cuatrimestre}</p>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function eliminarMateria() {
  try {
    const idMateria = inputIdMateriaE.value.trim()

    const response = await fetch(`${URL}/${idMateria}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    cardContainer5.innerHTML = `
      <p style="color:green">${data.msg}</p>

      <div class="card">
        <p>"ID MATERIA": ${data.materia.idMateria}</p>
        <p>"NOMBRE": ${data.materia.nombre}</p>
        <p>"CUATRIMESTRE": ${data.materia.cuatrimestre}</p>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

btnMaterias.addEventListener('click', cargarTodasMaterias)
btnMateriaId.addEventListener('click', cargarMateriaPorId)
btnMateriaNueva.addEventListener('click', agregarMateria)
btnMateriaModificar.addEventListener('click', modificarMateria)
btnMateriaEliminar.addEventListener('click', eliminarMateria)