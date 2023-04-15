import { 
    registerUser, provider, auth, onAuthUser, outSesion, getCurrentUser, docRef, getOnSnapshot, q
} 
from './firebase.js'

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
const msgTemplate = document.querySelector('#msgTemplate')


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

    let unsubscribe;
    const userExist = () => onAuthUser(auth, (user) => {
            if (user) {
              console.log('existe el usuario', user)
              visualizeElement(btnSalir)
              removeElement(btnIngresar)
              visualizeElement(chat)
              visualizeElement(formulario)
              removeElement(msgInicio)

              //manipulando el template para que pinte los mensajes del chat
              chat.innerHTML = '';
              unsubscribe = getOnSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if (change.type === "added") {
                      console.log("New msg: ", change.doc.data());

                      const clone = msgTemplate.content.cloneNode(true);  //se crea un clon como "respaldo" y es como el fragment de React
                      clone.querySelector('span').textContent = change.doc.data().msg;

                      if(user.uid === change.doc.data().uid) {

                        clone.querySelector('div').classList.add('text-end'); // me va a colocar los mensajes que yo envíe a la derecha
                        clone.querySelector('span').classList.add('bg-success');
                      } else {
                        clone.querySelector('div').classList.add('text-start'); //coloca lois msgs que coloca otro usuario a la izquierda
                        clone.querySelector('span').classList.add('bg-secondary');
                      }
                      chat.append(clone);
                  }
                  
                });
              });
             

            } else {
                console.log('no existe el usuario')
                removeElement(btnSalir)
                visualizeElement(btnIngresar)
                removeElement(chat)
                removeElement(formulario)
                visualizeElement(msgInicio)

                if(unsubscribe) { //si existe el unsubscribe la ejecutamos ya que arriba se inicia y con eso eliminamos esa suscripcion es decir, elimina el observable
                    unsubscribe();
                }
            }
          });
          userExist()


btnSalir.addEventListener('click', async() => {
    await outSesion(auth)
})


formulario.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log(formulario.msg.value);
    if(!formulario.msg.value.trim()){
        formulario.msg.value = '';
        formulario.msg.focus();
        return console.log('Tienes que escribir algo')
    }
    const msgTimeReal = formulario.msg.value.trim()
    const user = getCurrentUser()
    const userId = user.uid
    const fecha = new Date()

    try {
        btnEnviar.disabled = true; //para desahibilitar el boton y el usuario no pueda enviarlo muchas veces
        await docRef(msgTimeReal, userId, fecha);
        formulario.msg.value = ''; //limpia el formulario una vez se envíe el mensage
    } catch (error) {
        console.log(error)
    } finally {
        btnEnviar.disabled = false; //asi el usuario no podrá enviar el mismo mensaje una y otra vez
    }
  
})
