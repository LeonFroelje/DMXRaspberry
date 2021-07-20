function nodeScriptClone(node){
    let script  = document.createElement(node.tagName);
    script.text = node.innerHTML;

    let i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          script.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return script;
}

document.getElementById("open_navbar").addEventListener("click", (evt) => {
    let button = document.getElementById("open_navbar")
    document.querySelectorAll(".navdiv").forEach(div => {
        if(div.classList.contains("show")){
            div.classList.remove("show")
            div.style.display = "none"
            //document.getElementById("open_navbar").style.bottom = "0px"
            button.style.position = "fixed"
            button.style.height = "6vh"
        }
        else{
            div.classList.add("show")
            div.style.display = "inline-block"
            //document.getElementById("open_navbar").style.bottom = "30vh"
            button.style.position = "relative"
            document.getElementById("nav-1").style.width = "100%"
            button.style.width = "100%"
            button.style.height = "6vh"
        }
    })
    if(document.getElementById("icon-open-navbar").classList.contains("fa-chevron-circle-up")){
        document.getElementsByClassName("fa-chevron-circle-up")[0].classList.replace("fa-chevron-circle-up", "fa-chevron-circle-down")
        document.getElementById("open_navbar").style.border = "3px solid #a54e4e"
    }
    else{
        document.getElementsByClassName("fa-chevron-circle-down")[0].classList.replace("fa-chevron-circle-down", "fa-chevron-circle-up")
        document.getElementById("open_navbar").style.border = "3px solid #8db580"

    }
    document.getElementById("nav-1").style.display = "inline"
})

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

document.querySelectorAll(".radio-lampen").forEach(label => {
    label.addEventListener("click", evt => {
        let i = 0
        let labels = document.querySelectorAll(".radio-lampen")
        let labels_l = labels.length
        for(i; i < labels_l; i++){
            if(labels[i].parentElement.classList.contains("current")){
                labels[i].parentElement.classList.remove("current")
            }
        }
        if(!evt.target.parentElement.classList.contains("current")){
            evt.target.parentElement.classList.add("current")
        }
    })
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