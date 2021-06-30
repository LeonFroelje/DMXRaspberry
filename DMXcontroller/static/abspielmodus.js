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
            return res.text()
          }).then(text => {alert(text)})
    }
})

document.getElementById('stop').addEventListener('click', () => {
fetch('/stop').then(res => {
  return res.text()
  }).then(text => {
    console.log(text)
  })
})

document.getElementById('scenetime').addEventListener('input', () => {
  document.getElementById('timer').innerHTML = (0.001 * 1.044 ** (document.getElementById('scenetime').value)).toPrecision(3)
  fetch('/change/scenetime', {
    method : "PUT",
    headers : {
        "Content-type" : "application/json"
    },
    body : JSON.stringify(`{"scenetime":${document.getElementById('scenetime').value}}`)
  }).then(res => {
    return res.text()
  }).then(text => {
    console.log(text)
  })
})