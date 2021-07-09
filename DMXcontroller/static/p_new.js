function nodeScriptClone(node){
    let script  = document.createElement(node.tagName);
    script.text = node.innerHTML;

    let i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          script.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return script;
}

//When one of the radio buttons is clicked, a request is sent to the server which fetches the according HTML code to load into the mainframe
document.querySelectorAll('input.Lampen-typ').forEach(radio => {
    radio.onclick = () => {
        //checks for anything but the default scripts and deletes them to prevent issues
        let scripts = document.getElementsByTagName("script")
        let i = 0
        for(i; i < scripts.length; i++){
            if( !scripts[i].src.includes("p_new.js") && !scripts[i].src.includes("main.js") && !scripts[i].src.includes("fontawesome")){
                scripts[i].remove();
                }
            }
        i = 0
        let links = document.getElementsByTagName("link")
        for(i; i< links.length; i++){
            if(!links[i].href.includes("index.css")){
                links[i].remove();
                }
            }
        fetch(`/${radio.id}`).then(res => {
            res.text().then(text => {
                document.getElementById('mainframe').innerHTML = text
            }).then(() => {
                //The HTML of the response is now being searched for scripts or stylesheets,
                //because they need to be reinserted to the DOM to be loaded properly.
                //That is also why I need to delete them first and reinsert them at the end of the HTML body
                //By default every stylesheet/script contained in the response should be deleted and reinserted at the end of the body
                document.getElementById('mainframe').childNodes.forEach(node => {
                if(node.tagName === 'SCRIPT' || node.tagName === 'LINK'){
                    //if either a script or a link is found this code is executed
                    document.getElementsByTagName("body")[0].appendChild(nodeScriptClone(node))
                    node.remove()   
                    //if it does it is simply removed
                }
                })
            })
        })
    }
})

function close_dropdown(evt){
    let btns = document.querySelectorAll('.dropbtn')
    let l = btns.length
    if (!evt.target.matches('.dropbtn')){
      document.querySelectorAll(".dropdown-content").forEach(row => {
        if (row.classList.contains("show")){
            row.classList.toggle("show")
          }
        })    
      }   
}


document.querySelectorAll('.dropbtn').forEach(dropbtn => {
  dropbtn.addEventListener('click', (evt) => {
    document.getElementById(`droptable-${evt.target.classList[1]}`).classList.toggle("show");
    window.addEventListener('click', close_dropdown, once=true)
  })
})

document.querySelectorAll(".dropdown-data-s").forEach(row => {
    row.onclick = () => {
        document.getElementById('addscene').classList.remove('hide')
        fetch(`/load/scene/${row.id}`).then(res => {
            return res.text()
          }).then(text => {console.log(text)})
    }
})


document.getElementById('addscene').addEventListener('click', () => {
    fetch(`/add/scene`).then(res => {
        document.getElementById('addscene').classList.add('hide')
        return res.text()
    }).then(text => {
        alert(text)})
  })