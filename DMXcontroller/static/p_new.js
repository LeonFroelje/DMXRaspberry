function nodeScriptClone(node){
    let script  = document.createElement(node.tagName);
    script.text = node.innerHTML;

    let i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          script.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return script;
}


document.querySelectorAll('input.Lampen-typ').forEach(radio => {
    radio.onclick = () => {
        fetch(`/${radio.id}`).then(res => {
            res.text().then(text => {
                document.getElementById('mainframe').innerHTML = text
            }).then(() => {
                document.getElementById('mainframe').childNodes.forEach(node => {
                if(node.tagName === 'SCRIPT' || node.tagName === 'LINK'){
                    document.getElementById('mainframe').replaceChild(nodeScriptClone(node), node)
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