let curr_program = ""
let curr_scene = ""

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
  }
  else{
      document.getElementsByClassName("fa-chevron-circle-down")[0].classList.replace("fa-chevron-circle-down", "fa-chevron-circle-up")
  }
  document.getElementById("nav-1").style.display = "inline"
})

document.querySelectorAll('.dropbtn').forEach(dropbtn => {
  dropbtn.addEventListener('click', (evt) => {
    document.getElementById(`droptable-${evt.target.classList[1]}`).classList.toggle("show");
    window.addEventListener('click', close_dropdown, once=true)
  })
})

document.querySelectorAll(".dropdown-data-p").forEach(row => {
  row.onclick = () => {
    fetch(`/Programmiermodus/edit/${row.id}`).then(res => {
      return res.text()
      }).then(value => {
        let program = JSON.parse(value)
        curr_program = program.name
        let scenes = program.scenes
        let warn = document.getElementById("dropdown-warn")
        if (!warn.classList.contains("hide")){
          warn.classList.add("hide")
        }
        console.log(curr_program, scenes)
      })
    }
})

document.querySelectorAll('input.Lampen-typ').forEach(radio => {
  radio.onclick = () => {
      fetch(`/${radio.id}/${curr_program}`).then(res => {
          res.text().then(text => {
              document.getElementById('mainframe').innerHTML = text
          })
      })
  }
})


document.querySelectorAll(".dropdown-data-s").forEach(row => {
row.onclick = () => {
  fetch(`/load/scene/${row.id}`).then(res => {
    return res.text()
    }).then(value => {
      console.log(value)
      document.getElementById('addscene').classList.remove('hide')
    })
  }
})


document.getElementById('addscene').addEventListener('click', () => {
  fetch(`/add/scene/${curr_program}`).then(res => {
      document.getElementById('addscene').classList.add('hide')
      return res.text()
  }).then(text => {
      alert(text)})
})