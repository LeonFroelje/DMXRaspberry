class Player{
  constructor(pages){
      this.pages = pages
      this.curr_page = 0 
  }

  get next_page(){
    this.curr_page++
    if(this.curr_page === this.pages.length){
      this.curr_page = 0
    }
    fetch(`/Abspielmodus/player/${this.pages[this.curr_page]}`).then(res => {
      return res.text()
      }).then(text => {
        document.getElementById("player-main").innerHTML = text
      })
  }

  get prev_page(){
    this.curr_page--
    if(this.curr_page < 0){
      this.curr_page = this.pages.length - 1
    }
    fetch(`/Abspielmodus/player/${this.pages[this.curr_page]}`).then(res => {
      return res.text()
      }).then(text => {
        document.getElementById("player-main").innerHTML = text
      })
  }
}


player = new Player(["program_table", "MIDI_buttons", "music_player"])

document.getElementsByClassName("fa-arrow-circle-left")[0].addEventListener("click", evt => {
  player.prev_page
})

document.getElementsByClassName("fa-arrow-circle-right")[0].addEventListener("click", evt => {
  player.next_page
})

document.getElementById('stop').addEventListener('click', () => {
  fetch('/stop').then(res => {
    return res.text()
    }).then(text => {
      console.log(text)
    })
})

document.querySelectorAll(".program-row").forEach(program_row => {
  program_row.addEventListener("click", evt => {
    fetch(`/Play/${program_row.firstElementChild.id}`).then(res => {
      document.querySelectorAll(".program-row").forEach(row => {
        if(row.classList.contains("selected")){
          row.classList.remove("selected")
        }
      })
      program_row.classList.add("selected")
    })
  })
})

document.getElementById('scenetime').addEventListener('input', () => {
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

document.getElementById("fadetime").addEventListener("input", evt => {
  fetch("/change/fadetime", {
    method : "PUT",
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify(`{"fadetime":${evt.target.value}}`)
  })
})

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