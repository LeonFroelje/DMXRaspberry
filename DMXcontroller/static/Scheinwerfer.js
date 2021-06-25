document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input.rgb').forEach(input => {
        input.oninput = () => {
            let lampen = []
            document.querySelectorAll("input.Lampe").forEach(checkbox =>{
                if(checkbox.checked){
                    lampen.push(checkbox.id)
                }
            })
            fetch('/rgbwds', {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(`{"r":${document.getElementById("r").value},
"g":${document.getElementById("g").value},
"b":${document.getElementById("b").value},
"ww":${document.getElementById("weiss").value},
"d":${document.getElementById("dim").value},
"s":${document.getElementById("strobo").value},
"lampen":"${lampen.join()}"}`)                        
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            })
        };
    });
});

form = document.getElementById('scene')
form.addEventListener('submit', () => {
    if (document.getElementById('scenename').value === ''){
        alert('Szenenname muss angegeben werden')
        return false
    }
    else{
        return true
    }
})

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
document.querySelectorAll("table-data").forEach(row => {
    row.addEventListener("click", () => {
        fetch(`/load/scene/${row.id}`)
    })
})