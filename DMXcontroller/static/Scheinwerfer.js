function move_to_trash(evt){
    let row_clone = evt.target.parentElement.parentElement.cloneNode()
    row_clone.style.display = "none"
    evt.target.parentElement.parentElement.remove()
    try{
    fetch(`/remove/${evt.target.parentElement.previousSibling.previousSibling.id}`).then(res => {
        document.getElementsByClassName("fa-trash")[0].appendChild(row_clone)
    })}
    catch(e){
        if(e instanceof TypeError){
            fetch(`/remove/${evt.target.parentElement.previousSibling.id}`).then(res => {
                document.getElementsByClassName("fa-trash")[0].appendChild(row_clone)
            })
        }
    }/*Undo-button
    finally{
        document.getElementsByClassName("fa-undo")[0].style.display = "inline-block"
    }*/
}

function submit(event){
    let form = document.getElementById('scene')
    if (form.action !== '/savescene'){
        form.action = '/savescene'
    }
    let icons = document.querySelectorAll(".checkdiv > i")
    let i = 0
    for(i; i < icons.length; i++){
        if(icons[i].classList.contains("fa-times-circle")){
            event.preventDefault()
            alert(icons[i].nextElementSibling.innerHTML)
            return "Penis"
        }
    }
    alert("Szene gespeichert")
    let new_row = document.createElement("TR")
    new_row.classList.add("table-row")

    let new_data = document.createElement("TD")
    new_data.classList.add("table-data")
    new_data.id = document.getElementById("scenename").value
    new_data.draggable = "true"
    new_data.innerHTML = document.getElementById("scenename").value

    let new_icon_td = document.createElement("TD")
    new_icon_td.classList.add("mobile")
    
    let new_icon = document.createElement("I")
    new_icon.classList.add("fas")
    new_icon.classList.add("fa-minus-square")
    new_icon.classList.add("mobile")
    
    new_icon_td.appendChild(new_icon)

    new_row.appendChild(new_data)
    new_row.appendChild(new_icon_td)
    document.getElementById("scene-table").childNodes[1].insertBefore(new_row, document.getElementById("submitprogram"))

    new_icon.addEventListener("click", move_to_trash)        
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
        document.querySelectorAll(".Scheinwerfer").forEach(fixture =>{
            if(fixture.classList.contains("current")){
                lampen.push(fixture.id)
                }
            })
        fetch('/Scheinwerferdmx', {
            method : "PUT",
            headers : {
                    "Content-type" : "application/json"
                },
            body : JSON.stringify(`{"channels" : {"rot" : "${document.getElementById("r-slider").value}",
            "gruen" : "${document.getElementById("g-slider").value}",
            "blau" : "${document.getElementById("b-slider").value}",
            "weiss" : "${document.getElementById("weiss-slider").value}",
            "helligkeit" : "${document.getElementById("dim-slider").value}",
            "strobo" : "${document.getElementById("strobo-slider").value}"},
            "fixtures" : "${lampen.join()}"}`)                                    
        }).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            })
        };
    });

document.getElementById('scene').addEventListener('submit', submit)

document.querySelectorAll(".table-data").forEach(row => {
    row.addEventListener("click", (evt) => {
        document.querySelectorAll(".table-data").forEach(row => {
            if(row !== evt.target){
                if(row.classList.contains("selected-row")){
                    row.classList.remove("selected-row")
                }
            }
        })

        evt.target.classList.toggle("selected-row")
        if(evt.target.classList.contains("selected-row")){
            fetch(`/load/scene/${row.id}`).then((res) => {
                let button = document.getElementById('submit');
                button.innerHTML = 'Szene updaten <i class="fas fa-sync"></i>';

                let form = document.getElementById('scene')
                form.removeEventListener('submit', submit);
                form.action = '/update/scene'
                form.addEventListener('submit', update)
            })
        }
        else{
            document.getElementById("submit").innerHTML = 'Szene speichern <i class="far fa-save"></i>'
            let form = document.getElementById("scene")
            form.removeEventListener("submit", update)
            form.action = "/savescene"
            form.addEventListener("submit", submit)
        }
    })
    
})

document.getElementById("scenename").addEventListener("focus", evt => {
    document.querySelectorAll(".checkdiv").forEach(check_query => {
        check_query.classList.toggle("show")
    })
    if(document.querySelectorAll(".fa-check-circle").length === 3){
        evt.target.style.border = "#00d200 solid 3px"
    }
    else{
        evt.target.style.border = "#AD0000 solid 3px"
    }

})

document.getElementById("scenename").addEventListener("focusout", evt => {
    document.querySelectorAll(".checkdiv").forEach(check_query => {
        check_query.classList.toggle("show")
    })
    evt.target.style.border = "none"
})


document.getElementById("scenename").addEventListener("input", (evt) => {
    let scenename = evt.target.value
    if(scenename.length >= 3){
            document.getElementById("length").childNodes[1].classList.replace("fa-times-circle", "fa-check-circle");
            document.getElementById("length").childNodes[3].innerHTML = "Szenenname ist länger als drei Zeichen lang"          
    }
    else{
        document.getElementById("length").childNodes[1].classList.replace("fa-check-circle", "fa-times-circle")
        document.getElementById("length").childNodes[3].innerHTML = "Szenenname muss länger als drei Zeichen lang sein"          
    }
    let match = scenename.match(new RegExp(/[^\w]/, "i"))
    if(match === null){
            document.getElementById("specials").childNodes[1].classList.replace("fa-times-circle", "fa-check-circle")
            document.getElementById("specials").childNodes[3].innerHTML = "Szenenname beinhaltet keine Sonderzeichen"
    }
    else{
        document.getElementById("specials").childNodes[1].classList.replace("fa-check-circle", "fa-times-circle")
        document.getElementById("specials").childNodes[3].innerHTML = "Szenenname darf keine Sonderzeichen beinhalten"

    }
    let szenen = document.querySelectorAll(".dropdown-data-s")
    let _ = szenen.length
    let unique = document.getElementById("unique")
    for(let i = 0; i < _; i++){
        if(szenen[i].id === scenename){
            unique.childNodes[1].classList.replace("fa-check-circle", "fa-times-circle")
            unique.childNodes[3].innerHTML = "Szenenname muss einzigartig sein"
            break
        }
        else{
            if(unique.childNodes[1].classList.contains("fa-times-circle")){
                unique.childNodes[1].classList.replace("fa-times-circle", "fa-check-circle")
                unique.childNodes[3].innerHTML = "Szenenname ist einzigartig"
            }
        }
    }   
    if(document.querySelectorAll(".fa-check-circle").length === 3){
        evt.target.style.border = "#3ec22c solid 3px"
    }
    else{
        evt.target.style.border = "#a02222 solid 3px"
    }
})


document.querySelectorAll(".table-row").forEach(row => {row.addEventListener("dragstart", evt => {
        evt.dataTransfer.setData("text/plain", evt.target.id)
        let img = new Image();
        img.src = 'C:\Users\User\Pictures\Philipp_Amthor.jpg';
        evt.dataTransfer.setDragImage(img, 10, 10);
        evt.dataTransfer.dropEffect = "move";
    })
})

document.getElementsByClassName("fa-trash")[0].addEventListener("dragover", evt => {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = "move";
    evt.target.style.color = "#3ec22c"
})

document.getElementsByClassName("fa-trash")[0].addEventListener("dragenter", evt => {
    evt.preventDefault()
})

document.getElementsByClassName("fa-trash")[0].addEventListener("dragleave", evt => {
    evt.target.style.color = "#a02222"
})

document.getElementsByClassName("fa-trash")[0].addEventListener("drop", evt => {
    evt.preventDefault()
    evt.target.style.color = "#a02222"
    const data = evt.dataTransfer.getData("text/plain")
    console.log(data)
})

document.querySelectorAll(".fa-minus-square").forEach(icon => {
    icon.addEventListener("click", move_to_trash)
})

document.getElementById("program-name").addEventListener("input",evt => {
    let curr_target = evt.currentTarget
    let match = curr_target.value.match(new RegExp(/[^\w]/, "i"))
    duplicate = false
    document.querySelectorAll(".program").forEach(program => {
        if(program.id === curr_target.value){
            duplicate = true
        }
    })
    if(curr_target.value.length >= 3 && curr_target.value.length <= 25 && match === null && !duplicate){
        curr_target.style.border = "3px solid #3ec22c"
        document.getElementById("submitprogram").disabled = false
    }
    else{
        curr_target.style.border = "3px solid #a02222"
        document.getElementById("submitprogram").disabled = true
    }
})

document.getElementById("submitprogram").addEventListener("click", evt => {
    fetch("/saveprogram", {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : `{"p_name" : "${document.getElementById("program-name").value}"}`
    }).then(res => {
        return res.text()
    }).then(text => {
        console.log(text)
        location.reload()
    })
})
/*TODO: Undo button
document.getElementsByClassName("fa-undo")[0].addEventListener("click", evt => {
    document.getElementsByClassName("fa-trash")[0].lastChild.
})*/

document.getElementsByClassName("fa-play")[0].addEventListener("click", evt => {
    evt.currentTarget.classList.add("icon-clicked")
})