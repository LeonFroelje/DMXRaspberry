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
        console.log(curr_program, scenes)
      })
    }
})

document.querySelectorAll('input.Lampen-typ').forEach(radio => {
  radio.onclick = () => {
      fetch(`/${radio.id}/${curr_program}`).then(res => {
          res.text().then(text => {
              document.getElementById('mainframe').srcdoc = text
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