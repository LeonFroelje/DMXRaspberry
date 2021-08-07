function nodeScriptClone(node){
    let script  = document.createElement(node.tagName);
    script.text = node.innerHTML;

    let i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          script.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return script;
}

document.addEventListener("DOMContentLoaded", evt => {
    fetch(`/Scheinwerfer`).then(res => {
        return res.text()
    }).then(text => {
        document.getElementById('mainframe').innerHTML = text
    }).then(() => {
        document.getElementById("mainframe").childNodes.forEach(child => {
            if(child.tagName === "SCRIPT" || child.tagName === "LINK"){
                clone = nodeScriptClone(child)
                child.remove()
                document.getElementsByTagName("body")[0].appendChild(clone)
            }
        })
    })
})
document.getElementById("open_navbar").addEventListener("click", (evt) => {
    let button = document.getElementById("open_navbar")
    let navbar = document.getElementsByClassName("navbar")[0]

    if(document.getElementById("icon-open-navbar").classList.contains("fa-chevron-circle-up")){
        document.getElementsByClassName("fa-chevron-circle-up")[0].classList.replace("fa-chevron-circle-up", "fa-chevron-circle-down")
        document.getElementById("open_navbar").style.border = "3px solid #a54e4e"
        if(navbar.classList.contains("closed")){
            navbar.classList.replace("closed", "open")
        }
        else{
            navbar.classList.add("open")
        }
    }
    else{
        document.getElementsByClassName("fa-chevron-circle-down")[0].classList.replace("fa-chevron-circle-down", "fa-chevron-circle-up")
        document.getElementById("open_navbar").style.border = "3px solid #8db580"
        navbar.classList.replace("open", "closed")
    }
})

document.querySelectorAll(".fixture-container > li").forEach(fixture => {
    fixture.addEventListener("click", evt => {
        fixtures = document.querySelectorAll(`.fixture-container > li`)
        i = 0
        for(i; i < fixtures.length; i++){
            if(fixtures[i].classList[0] !== evt.currentTarget.classList[0]){
                fixtures[i].style.opacity = 0.4
                fixtures[i].nextElementSibling.style.opacity = 0.4
            }
            else{
                fixtures[i].style.opacity = 1
                fixtures[i].nextElementSibling.style.opacity = 1
            }
        }
        if(document.getElementsByClassName(`${evt.currentTarget.classList[0]} current`).length === 0){
            document.querySelectorAll(".current").forEach(selected => {
                selected.classList.remove("current")
            })
            evt.currentTarget.classList.add("current")
            evt.currentTarget.nextElementSibling.classList.add("current")

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
            fetch(`/${evt.currentTarget.classList[0]}`).then(res => {
                return res.text()
            }).then(text => {
                document.getElementById("mainframe").innerHTML = text
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
        }
        else{
            evt.currentTarget.classList.toggle("current")
            evt.currentTarget.nextElementSibling.classList.toggle("current")
            if(document.querySelectorAll(".current").length === 0){
                i = 0
                for(i; i < fixtures.length; i++){
                    fixtures[i].style.opacity = 1
                    fixtures[i].nextElementSibling.style.opacity = 1
                }
            }
        }
    })
})

document.querySelectorAll(".fa-check-square").forEach(check => {
    check.addEventListener("click", evt => {
        if(evt.currentTarget.classList.contains("current")){
            document.querySelectorAll(".current").forEach(curr => {
                curr.classList.remove("current")
            })
            document.querySelectorAll(".fixture-container > li").forEach(li => {
                li.style.opacity = 1
                li.nextElementSibling.style.opacity = 1
            })
        }
        else{
            document.querySelectorAll(".current").forEach(curr => {
                curr.classList.remove("current")
            })
            document.querySelectorAll(`.${evt.currentTarget.previousElementSibling.classList[0]}`).forEach(list_entry => {
                if(!list_entry.classList.contains("current")){
                    list_entry.classList.add("current")
                    list_entry.style.opacity = 1
                    list_entry.nextElementSibling.classList.add("current")
                    list_entry.nextElementSibling.style.opacity = 1
                }
            })
            document.querySelectorAll(".fixture-container > li").forEach(li => {
                if(!li.classList.contains("current")){
                    li.style.opacity = 0.4
                    li.nextElementSibling.style.opacity = 0.4
                }
            })
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
            fetch(`/${evt.currentTarget.previousElementSibling.classList[0]}`).then(res => {
                return res.text()
            }).then(text => {
                document.getElementById("mainframe").innerHTML = text
            }).then(()=> {
                document.getElementById('mainframe').childNodes.forEach(node => {
                    if(node.tagName === 'SCRIPT' || node.tagName === 'LINK'){
                        //if either a script or a link is found this code is executed
                        document.getElementsByTagName("body")[0].appendChild(nodeScriptClone(node))
                        node.remove()   
                        //if it does it is simply removed
                    }
                })
            })
        }
    })
})

document.querySelectorAll(".add-fixture").forEach(add_fixture => {
    add_fixture.addEventListener("click", evt => {
        document.querySelectorAll(".current").forEach(curr => {
            curr.classList.remove("current")
        })
        document.querySelectorAll(".fixture-container > li").forEach(li => {
            li.style.opacity = 1
            li.nextElementSibling.style.opacity = 1
        })
        let scripts = document.getElementsByTagName("script")

        for(let i = 0, n=scripts.length; i < n; i++){
            if( !scripts[i].src.includes("p_new.js") && !scripts[i].src.includes("main.js") && !scripts[i].src.includes("fontawesome")){
                scripts[i].remove();
                }
            }
        i = 0
        let links = document.getElementsByTagName("link")
        let l = links.length
        for(i; i < l; i++){
            if(!links[i].href.includes("index.css")){
                links[i].remove();
                }
            }

        evt.currentTarget.classList.add("current")
        fetch("/form/fixture").then(res => {
            return res.text()
        }).then(text => {
            document.getElementById("mainframe").innerHTML = text
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
                document.querySelectorAll(".radio-lampen").forEach(label => {
                    if(label.parentElement.classList.contains("current")){
                        label.parentElement.classList.remove("current")
                    }
                    if(label.childNodes[1] === radio){
                        label.parentElement.classList.add("current")
                    }
                })
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


document.getElementById("scene-dropbutton").addEventListener("click", evt => {
    document.getElementById(`droptable-s`).classList.toggle("show")
})

document.querySelectorAll(".dropdown-data-s").forEach(row => {
    row.onclick = () => {
        document.getElementById('addscene').classList.remove('hide')
        document.getElementById("droptable-s").classList.remove("show")
        fetch(`/load/scene/${row.id}`).then(res => {
            document.getElementById("scene-dropbutton").innerHTML = `${row.id} <i class="fas fa-chevron-down"></i>`
            return res.text()
          }).then(text => {console.log(text)})
    }
})


document.getElementById('addscene').addEventListener('click', () => {
    fetch(`/add/scene`).then(res => {
        document.getElementById('addscene').classList.add('hide')
        return res.text()
        }).then(text => {
        alert(text)
        })
})


document.getElementById("search-scene").addEventListener("input", evt => {
    let pattern = evt.currentTarget.value
    let scenes = document.querySelectorAll(".dropdown-data-s")
    let n = scenes.length
    for(let i=0; i < n; i++){
        scenes[i].parentNode.classList.remove("hide")
    }
    for(i=0; i < n; i++){
        scene = scenes[i]
        let match = scene.id.match(new RegExp(pattern, "i"))
        if(!match){
            scene.parentNode.classList.add("hide")
        }
    }
})
