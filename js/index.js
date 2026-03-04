const player = new Player()

const enemies = []

const bullets = []

// setInterval(() => {
//     const enemy =  new Enemy()
//     enemies.push(enemy)
// }, 1000)

document.addEventListener('keydown',(e) => {
    player.keys[e.code] = true
    if(e.code === 'ArrowUp'){
        player.jump()
    }

    if(e.code === 'Space'){
        const bullet = new Bullet(player.positionX, player.width, player.positionY, player.height, player.scaleX)
        bullets.push(bullet)
    }
})

document.addEventListener('keyup',(e) => {
    player.keys[e.code] = false
})

const puntosDiv = document.getElementById('points')
let points = 0
let score = 0
let frames = 0

const puntuacionDiv = document.getElementById('score')
if (puntuacionDiv) {
    const puntajeFinal = localStorage.getItem('puntos_finales');
    puntuacionDiv.innerText = "Puntuación final: " + (puntajeFinal || 0);
}

function animate(){
    player.applyMovement()
    player.applyGravity()

    frames++
    if(frames % 60 === 0){
        points++
        puntosDiv.innerText = points
    }

    enemies.forEach((enemy) => {
        enemy.move()
        if(
            player.positionX < enemy.positionX + enemy.width && 
            player.positionX + player.width > enemy.positionX &&
            player.positionY < enemy.positionY + enemy.height &&
            player.positionY + player.height > enemy.positionY
        ){
            localStorage.setItem('puntos_finales', points);
            location.href = './gameover.html'
        }
    })

    bullets.forEach((bullet) => {
        bullet.move()
    })

    requestAnimationFrame(animate)
}

animate()