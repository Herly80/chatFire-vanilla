let previosTitle = document.title;

window.addEventListener('blur', () => {
    previosTitle = document.title;
    document.title = '¡No te vayas! ¡Vuelve! 🥺';
})

window.addEventListener('focus', () => {
    document.title = previosTitle;
})