document.querySelector('dropbtn-p').addEventListener('click', () => {
  document.getElementById("droptable-p").classList.toggle("show");
})

let curr_program = ""

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn-p')) {
      let dropdowns = document.getElementsByClassName("dropdown-content-p");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

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

document.querySelector('dropbtn-s').addEventListener('click', () => {
  document.getElementById("droptable-s").classList.toggle("show");
})


document.querySelectorAll(".dropdown-data-s").forEach(row => {
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