const cardContainer = document.querySelector('#card-container-todos')
const btnProfesores = document.querySelector('#btn-profesores')

const cardContainer2 = document.querySelector('#card-container-legajo')
const btnProfesorLegajo = document.querySelector('#btn-profesor-legajo')
const inputLegajo = document.querySelector('#input-legajo')

const cardContainer3 = document.querySelector('#card-container-nuevo')
const inputNombre = document.querySelector('#input-nombre')
const inputApellido = document.querySelector('#input-apellido')
const inputEmail = document.querySelector('#input-email')
const inputEspecialidad = document.querySelector('#input-especialidad')
const btnProfesorNuevo = document.querySelector('#btn-profesor-nuevo')

const cardContainer4 = document.querySelector('#card-container-modificar')
const inputLegajoM = document.querySelector('#input-legajoM')
const inputNombreM = document.querySelector('#input-nombreM')
const inputApellidoM = document.querySelector('#input-apellidoM')
const inputEmailM = document.querySelector('#input-emailM')
const inputEspecialidadM = document.querySelector('#input-especialidadM')
const inputIsActiveM = document.querySelector('#input-isActiveM')
const btnProfesorModificado = document.querySelector('#btn-profesor-modificar')

const cardContainer5 = document.querySelector('#card-container-eliminar')
const btnProfesorEliminar = document.querySelector('#btn-profesor-eliminar')
const inputLegajoE = document.querySelector('#input-legajoE')

const URL = 'https://tp4-nodejs-g2.onrender.com/profesores'

async function cargarTodosProfesores() {
  try {
    const response = await fetch(URL)
    const data = await response.json()

    cardContainer.innerHTML = ''

    data.forEach((profesor) => {
      const div = document.createElement('div')
      div.classList.add('card')

      div.innerHTML = `
        <div class="card-legajo"><p>"LEGAJO": ${profesor.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${profesor.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${profesor.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${profesor.email}</p></div>
        <div class="card-especialidad"><p>"ESPECIALIDAD": ${profesor.especialidad}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${profesor.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${profesor.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${profesor.isActive}</p></div>
        <br>
      `

      cardContainer.append(div)
    })
  } catch (error) {
    console.log(`Error al cargar profesores: ${error}`)
  }
}

async function cargarProfesorPorLegajo() {
  try {
    const legajo = inputLegajo.value.trim()

    const response = await fetch(`${URL}/${legajo}`)

    if (!response.ok) {
      throw new Error('Profesor no encontrado')
    }

    const profesor = await response.json()

    cardContainer2.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${profesor.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${profesor.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${profesor.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${profesor.email}</p></div>
        <div class="card-especialidad"><p>"ESPECIALIDAD": ${profesor.especialidad}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${profesor.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${profesor.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${profesor.isActive}</p></div>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function agregarProfesor() {
  try {
    const nuevoProfesor = {
      nombre: inputNombre.value.trim(),
      apellido: inputApellido.value.trim(),
      email: inputEmail.value.trim(),
      especialidad: inputEspecialidad.value.trim()
    }

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProfesor)
    })

    const data = await response.json()

    cardContainer3.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${data.profesorNuevo.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${data.profesorNuevo.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${data.profesorNuevo.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${data.profesorNuevo.email}</p></div>
        <div class="card-especialidad"><p>"ESPECIALIDAD": ${data.profesorNuevo.especialidad}</p></div>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function modificarProfesor() {
  try {
    const legajo = inputLegajoM.value.trim()

    const profesor = {}

    if (inputNombreM.value) profesor.nombre = inputNombreM.value
    if (inputApellidoM.value) profesor.apellido = inputApellidoM.value
    if (inputEmailM.value) profesor.email = inputEmailM.value
    if (inputEspecialidadM.value) profesor.especialidad = inputEspecialidadM.value

    if (inputIsActiveM.value) {
      profesor.isActive = inputIsActiveM.value.toLowerCase() === 'true'
    }

    const response = await fetch(`${URL}/${legajo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profesor)
    })

    const data = await response.json()

    cardContainer4.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${data.profesorModificado.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${data.profesorModificado.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${data.profesorModificado.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${data.profesorModificado.email}</p></div>
        <div class="card-especialidad"><p>"ESPECIALIDAD": ${data.profesorModificado.especialidad}</p></div>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

async function eliminarProfesor() {
  try {
    const legajo = inputLegajoE.value.trim()

    const response = await fetch(`${URL}/${legajo}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    cardContainer5.innerHTML = `
      <p style="color:green;">${data.msg}</p>

      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${data.profesor.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${data.profesor.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${data.profesor.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${data.profesor.email}</p></div>
        <div class="card-especialidad"><p>"ESPECIALIDAD": ${data.profesor.especialidad}</p></div>
      </div>
    `
  } catch (error) {
    console.log(error)
  }
}

btnProfesores.addEventListener('click', cargarTodosProfesores)
btnProfesorLegajo.addEventListener('click', cargarProfesorPorLegajo)
btnProfesorNuevo.addEventListener('click', agregarProfesor)
btnProfesorModificado.addEventListener('click', modificarProfesor)
btnProfesorEliminar.addEventListener('click', eliminarProfesor)