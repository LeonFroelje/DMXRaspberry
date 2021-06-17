document.querySelectorAll('input.selector').forEach(button => {
    button.onclick = () => {
        location.href = `/${button.id}`
    }
})

document.querySelectorAll('input.Lampen-typ').forEach(radio => {
    radio.onclick = () => {
        fetch(`/${radio.id}`).then(res => {
            res.text().then(text => {
                document.getElementById('mainframe').srcdoc = text
            })
        })
    }
})
