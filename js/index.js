const player = new Player()

const enemies = []

setInterval(() => {
    const enemy =  new Enemy()
    enemies.push(enemy)
}, 1000)

document.addEventListener('keydown',(e) => {
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

    enemies.forEach((enemy) => {
        enemy.move()
        if(
            player.positionX < enemy.positionX + enemy.width && 
            player.positionX + player.width > enemy.positionX &&
            player.positionY < enemy.positionY + enemy.height &&
            player.positionY + player.height > enemy.positionY
        ){
            location.href = './gameover.html'
        }
    })

    requestAnimationFrame(animate)
}

animate()