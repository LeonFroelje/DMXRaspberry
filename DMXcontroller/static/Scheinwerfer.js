function submit(event){
    let form = document.getElementById('scene')
    if (form.action !== '/savescene'){
        form.action = '/savescene'
    }
    if (document.getElementById('scenename').value === ''){
        alert('Szenenname muss angegeben werden')
        event.preventDefault();
        return false
        }
    else{
        return true
        }
    }


function update(){
        let butt = document.getElementById('submit')
        butt.innerHTML = 'Szene speichern'
        let form = document.getElementById('scene')
        form.removeEventListener('submit', update)
        form.addEventListener('submit', submit)
    }


document.querySelectorAll('input.rgb-slider').forEach(input => {
    input.oninput = () => {
        let lampen = []
        document.querySelectorAll("input.Lampe-Scheinwerfer").forEach(checkbox =>{
            if(checkbox.checked){
                lampen.push(checkbox.id)
                }
            })
        fetch('/rgbwds', {
            method : "PUT",
            headers : {
                    "Content-type" : "application/json"
                },
            body : JSON.stringify(`{"r":${document.getElementById("r-slider").value},
"g":${document.getElementById("g-slider").value},
"b":${document.getElementById("b-slider").value},
"ww":${document.getElementById("weiss-slider").value},
"d":${document.getElementById("dim-slider").value},
"s":${document.getElementById("strobo-slider").value},
"lampen":"${lampen.join()}"}`)                        
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            })
        };
    });

document.getElementById('scene').addEventListener('submit', submit)

document.querySelectorAll(".table-header").forEach(header =>{
    header.addEventListener("click", () => {
    document.querySelectorAll(".table-row").forEach(row => {
        if(row.classList.contains("show")){
            row.classList.remove("show")
        }
        else{
            row.classList.add("show")
        }
        })
})
})


document.querySelectorAll(".table-data").forEach(row => {
    row.addEventListener("click", () => {
        fetch(`/load/scene/${row.id}`).then((res) => {
            let button = document.getElementById('submit');
            button.innerHTML = 'Szene updaten';
            let form = document.getElementById('scene')
            form.removeEventListener('submit', submit);
            form.action = '/update/scene'
            form.addEventListener('submit', update)
            return res.text()
        })
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

document.querySelectorAll(".Lampe-Scheinwerfer").forEach(checkbox => {
    checkbox.addEventListener("click", evt => {
        if (evt.target.classList.contains("aus")){
            let label = evt.target.parentNode
            label.childNodes.forEach(node => {
                if (node.tagName === "IMG"){
                    node.classList.toggle("hide")
                }
            }) 
        }
    })
})

