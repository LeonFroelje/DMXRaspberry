function showdropdown() {
    document.getElementById("droptable").classList.toggle("show");
}

let curr_program = ""

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

document.querySelectorAll(".dropdown-data").forEach(row => {
  row.onclick = () => {
    fetch(`/Programmiermodus/edit/${row.id}`).then(res => {
      return res.text()
      }).then(value => {
        data = value.split(" ")
        curr_program = data[3].replace(",", "")
        scenes = data[5]
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
