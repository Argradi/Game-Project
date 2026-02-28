const player = new Player()

document.addEventListener('keydown',(e) => {
    console.log(e.code)
    player.teclas[e.code] = true
})

document.addEventListener('keyup',(e) => {
    player.teclas[e.code] = false
})

function animate(){
    player.applyMovement()
    requestAnimationFrame(animate)
}

animate()