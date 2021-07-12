document.querySelectorAll('input.rgb-slider').forEach(input => {
        input.oninput = () => {
            let lampen = []
            document.querySelectorAll("input.Lampe-Leiste").forEach(checkbox =>{
                if(checkbox.checked){
                    lampen.push(checkbox.id)
                }
            })

            let segmente = {
                leiste_seg_1 : "0,0,0,",
                leiste_seg_2 : "0,0,0,",
                leiste_seg_3 : "0,0,0,",
                leiste_seg_4 : "0,0,0,",
                leiste_seg_5 : "0,0,0,",
                leiste_seg_6 : "0,0,0,",
                leiste_seg_7 : "0,0,0,",
                leiste_seg_8 : "0,0,0,"
            };
            let rgb = `${document.getElementById("r-slider").value},${document.getElementById("g-slider").value},${document.getElementById("b-slider").value},`
            document.querySelectorAll(".selected").forEach(seg => {
                    segmente[seg.id] = rgb;
                }
            )

            let data = `{"leisten":"${lampen.join()}", "data":"`
            for(let i = 1; i <= 8; i++){
                data += segmente[`leiste_seg_${i}`]
            }
            console.log(data)
            
            fetch('/Leisten_rgb', {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(data + '"}'                        
            )}).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            })
        };
    });



/*
document.getElementById("canvas-slide").style.left = "0px"
document.getElementById("canvas-slide").style.top = "0px"

document.getElementById("colour-picker").addEventListener("drop", (evt) => {
    console.log("Kek")
})
function onMouseMove (e){
    let circle = document.getElementById("canvas-slide")
    circle.style.left = `${parseInt(circle.style.left.slice(0, -2)) + e.offsetX -10}px`;
    circle.style.top = `${parseInt(circle.style.top.slice(0, -2)) + e.offsetY - 10}px`;
    document.getElementById("rgb-value").innerHTML = circle.style.left + " " + circle.style.top
}
  

document.getElementById("canvas-slide").addEventListener("mousedown", (evt) => {
    document.addEventListener("mouseup", (evt) => {
        evt.target.removeEventListener("mousemove", onMouseMove)
    })
    evt.target.addEventListener('mousemove', onMouseMove)
})
document.getElementById("canvas-slide").addEventListener("mouseup", (evt) => {
    evt.target.removeEventListener("mousemove", onMouseMove)
})



function  slider_value_converter(evt){
    let slider = document.getElementById("colour-slide");
    let slider_value = parseInt(slider.value);
    let rgbspan = document.getElementById("rgb-value");
    let converted;
    let canvas = document.getElementById("colour-picker");
    if(slider_value <= 1*256 -1){
        converted = `255,${slider_value},0`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.background = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
}
    else if(slider_value > 1*256 -1 && slider_value <= 2*256 -1){
        converted = `${256 - (slider_value - 1*256 +1)},255,0`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.backgroundImage = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
    }
            
    else if(slider_value > 2*256 -1 && slider_value <= 3*256 -1){
        converted = `0,255,${slider_value - (2*256)}`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.backgroundImage = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
    }

    else if(slider_value > 3*256 -1 && slider_value <= 4*256 -1){
        converted = `0,${256 - (slider_value - 3*256 +1)},255`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.backgroundImage = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
    }
    else if(slider_value > 4*256 -1 && slider_value <= 5*256 -1){
        converted = `${slider_value - 4*256},0,255`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.backgroundImage = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
    }

    else if(slider_value > 5*256 -1 && slider_value <= 6*256 -1){
        converted = `255,0,${256 - (slider_value - 5*256 +1)}`;
        rgbspan.innerHTML = `rgb(${converted})`;
        canvas.style.backgroundImage = `linear-gradient(to right, rgb(255,255,255), rgb(${converted}))`;
        return converted;
    }
        
    
}*/

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

document.querySelectorAll(".LeistenSegmente").forEach(seg => {
    seg.addEventListener("click", (evt) => {
        evt.target.classList.toggle("selected")
    })
})


document.getElementById('scene').addEventListener('submit', () => {
    if (document.getElementById('scenename').value === ''){
        alert('Szenenname muss angegeben werden')
        return false
    }
    else{
        return true
    }
})

document.querySelectorAll(".table-data").forEach(row => {
    row.addEventListener("click", () => {
        fetch(`/load/scene/${row.id}`)
    })
})