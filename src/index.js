import { registerUser, provider, auth } from './firebase.js'
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


btnIngresar.addEventListener('click', async() => {
    try {
        const result = await registerUser(auth, provider)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
})