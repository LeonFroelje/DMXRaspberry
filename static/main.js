document.querySelectorAll('input.selector').forEach(button => {
    button.onclick = () => {
        location.href = `/${button.id}`
    }
})
