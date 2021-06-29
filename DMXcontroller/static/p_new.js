document.getElementById('addscene').addEventListener('click', () => {
    fetch('/add/scene').then(res => {
        return res.text()
    }).then(text => {
        alert(text)})
})