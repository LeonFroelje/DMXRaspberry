document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input.Lrgb').forEach(input => {
        input.oninput = () => {
            let lampen = []
            document.querySelectorAll("input.Lampe-Leiste").forEach(checkbox =>{
                if(checkbox.checked){
                    lampen.push(checkbox.id)
                }
            })
            let data = `{"leisten":"${lampen.join()}"`
            for(let i = 1; i <= 8; i++){
                data += `,"r${i}":${document.getElementById(`r${i}`).value},
                "g${i}":${document.getElementById(`g${i}`).value},
                "b${i}":${document.getElementById(`b${i}`).value}`
            }
            
            fetch('/Leisten_rgb', {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(data + '}'                        
            )}).then(response => {
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

document.querySelectorAll("table-data").forEach(row => {
    row.addEventListener("click", () => {
        fetch(`/load/scene/${row.id}`)
    })
})