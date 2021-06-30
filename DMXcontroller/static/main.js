document.querySelectorAll('input.Lampen-typ').forEach(radio => {
    radio.onclick = () => {
        fetch(`/${radio.id}`).then(res => {
            res.text().then(text => {
                document.getElementById('mainframe').srcdoc = text
            })
        })
    }
})

function showdropdown() {
    document.getElementById("droptable").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
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
        fetch(`/load/scene/${row.id}`).then(res => {
            return res.text()
          }).then(text => {console.log(text)})
    }
})
