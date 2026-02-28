const player = new Player()

document.addEventListener('keydown',(e) => {
    console.log(e.code)
    player.teclas[e.code] = true
    if(e.code === 'ArrowUp'){
        player.jump()
    }
})

document.addEventListener('keyup',(e) => {
    player.teclas[e.code] = false
})

function animate(){
    player.applyMovement()
    player.applyGravity()
    requestAnimationFrame(animate)
}

animate()