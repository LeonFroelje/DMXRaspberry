document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input.uv').forEach(input => {
        input.oninput = () => {
            fetch('/Schwarzlichtdmx', {
                method : 'PUT',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(`{"dim":${document.getElementById('dim').value},"strobe":${document.getElementById('strobe').value},"dur":${document.getElementById('dur').value}}`)
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
            })
        }
    })
})
form = document.getElementById('scene')
form.addEventListener('submit', (event) => {
    if (document.getElementById('scenename').value === ''){
        alert('Szenenname muss angegeben werden')
        return false
    }
    else{
        alert('Szene gespeichert')
        return true
    }
})

document.querySelectorAll("table-data").forEach(row => {
    row.addEventListener("click", () => {
        fetch(`/load/scene/${row.id}`)
    })
})