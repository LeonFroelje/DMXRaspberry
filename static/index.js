document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input.rgb').forEach(input => {
        input.oninput = () => {
            let lampen = []
            document.querySelectorAll("input.Lampe").forEach(checkbox =>{
                if(checkbox.checked){
                    lampen.push(checkbox.id)
                }
            })
            fetch(`/${input.id}`, {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(`{"r":${document.getElementById("r").value},
"g":${document.getElementById("g").value},
"b":${document.getElementById("b").value},
"lampen":"${lampen.join()}"}`)                        
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            })
        };
    });
});
