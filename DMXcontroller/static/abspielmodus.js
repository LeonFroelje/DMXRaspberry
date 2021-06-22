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
        fetch(`/Play/${row.id}`).then(res => {
            console.log(res.text())
        })
    }
})