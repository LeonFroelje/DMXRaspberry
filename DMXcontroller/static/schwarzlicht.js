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


document.getElementById("scenename").addEventListener("focus", evt => {
    document.querySelectorAll(".checkdiv").forEach(check_query => {
        check_query.classList.toggle("show")
    })
})

document.getElementById("scenename").addEventListener("focusout", evt => {
    document.querySelectorAll(".checkdiv").forEach(check_query => {
        check_query.classList.toggle("show")
    })
})


document.getElementById("scenename").addEventListener("input", (evt) => {
    let scenename = evt.target.value
    if(scenename.length >= 3){
            document.getElementById("length").childNodes[0].classList.replace("fa-times-circle", "fa-check-circle");
            document.getElementById("length").childNodes[1].innerHTML = "Szenenname ist länger als drei Zeichen lang"          
    }
    if(scenename.match('^[\w+]')){
            document.getElementById("specials").childNodes[0].classList.replace("fa-times-circle", "fa-check-circle")
            document.getElementById("length").childNodes[1].innerHTML = "Szenenname beinhaltet keine Sonderzeichen"
    }
    let szenen = document.querySelectorAll(".dropdown-data-s")
    let _ = szenen.length
    let unique = document.getElementById("unique")
    for(let i = 0; i < _; i++){
        if(szenen[i].id === scenename){
            unique.childNodes[0].classList.replace("fa-check-circle", "fa-times-circle")
            unique.childNodes[1].innerHTML = "Szenenname muss einzigartig sein"
        }
    }
})
