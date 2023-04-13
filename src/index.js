import { registerUser, provider, auth, onAuthUser, outSesion, getCurrentUser, docRef } from './firebase.js'

let previosTitle = document.title;

window.addEventListener('blur', () => {
    previosTitle = document.title;
    document.title = '¡No te vayas! ¡Vuelve! 🥺';
})

window.addEventListener('focus', () => {
    document.title = previosTitle;
})

const btnSalir = document.querySelector('#btnSalir')
const btnIngresar = document.querySelector('#btnIngresar')
const chat = document.querySelector('#chat')
const formulario = document.querySelector('#formulario')
const btnEnviar = document.querySelector('#btnEnviar')
const msgInicio = document.querySelector('#msgInicio')


btnIngresar.addEventListener('click', async() => {
    try {
        const result = await registerUser(auth, provider)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
})

    const removeElement = (element) => element.classList.add('d-none')
    const visualizeElement = (element) => element.classList.remove('d-none')


    const userExist = () => onAuthUser(auth, (user) => {
            if (user) {
              console.log('existe el usuario', user)
              visualizeElement(btnSalir)
              removeElement(btnIngresar)
              visualizeElement(chat)
              visualizeElement(formulario)
              removeElement(msgInicio)
            } else {
                console.log('no existe el usuario')
                removeElement(btnSalir)
                visualizeElement(btnIngresar)
                removeElement(chat)
                removeElement(formulario)
                visualizeElement(msgInicio)
            }
          });
          userExist()


btnSalir.addEventListener('click', async() => {
    await outSesion(auth)
})


formulario.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log(formulario.msg.value);
    const msgTimeReal = formulario.msg.value.trim()
    const user = getCurrentUser()
    const userId = user.uid
    const fecha = new Date()
    try {
        await docRef(msgTimeReal, userId, fecha);
    } catch (error) {
        console.log(error)
    }
  
})
