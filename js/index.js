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

const puntosDiv = document.getElementById('puntos')
let puntos = 0
let puntuacion = 0
let frames = 0

const puntuacionDiv = document.getElementById('puntuacion')
if (puntuacionDiv) {
    const puntajeFinal = localStorage.getItem('puntos_finales');
    puntuacionDiv.innerText = "Puntuación final: " + (puntajeFinal || 0);
}

function animate(){
    player.applyMovement()
    player.applyGravity()

    frames++
    if(frames % 60 === 0){
        puntos++
        puntosDiv.innerText = puntos
    }

    enemies.forEach((enemy) => {
        enemy.move()
        if(
            player.positionX < enemy.positionX + enemy.width && 
            player.positionX + player.width > enemy.positionX &&
            player.positionY < enemy.positionY + enemy.height &&
            player.positionY + player.height > enemy.positionY
        ){
            localStorage.setItem('puntos_finales', puntos);
            location.href = './gameover.html'
        }
    })

    requestAnimationFrame(animate)
}

animate()