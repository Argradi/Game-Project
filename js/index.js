const player = new Player()

const enemies = []
const bullets = []
const coins = []

setInterval(() => {
    const enemy =  new Enemy(enemies)
    enemies.push(enemy)
}, 1000)

let currentCoins = 0

document.addEventListener('keydown',(e) => {
    player.keys[e.code] = true
    if(e.code === 'ArrowUp'){
        player.jump()
    }

    if(e.code === 'Space'){
        const bullet = new Bullet(player.positionX, player.width, player.positionY, player.height, player.scaleX, bullets)
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

    enemies.forEach((enemy) => {
        enemy.move()
    })

    bullets.forEach((bullet) => {
        bullet.move()
    })

    enemies.forEach((enemy) => {

        if(
            player.positionX < enemy.positionX + enemy.width && 
            player.positionX + player.width > enemy.positionX &&
            player.positionY < enemy.positionY + enemy.height &&
            player.positionY + player.height > enemy.positionY
        ){
            localStorage.setItem('puntos_finales', points);
            location.href = './gameover.html'
        }

        bullets.forEach((bullet) => {
            if(
                bullet.positionX < enemy.positionX + enemy.width && 
                bullet.positionX + bullet.width > enemy.positionX &&
                bullet.positionY < enemy.positionY + enemy.height &&
                bullet.positionY + bullet.height > enemy.positionY
            ){
                enemy.removeEnemy()
                bullet.removeBullet()
                points += 10
            }
        })
    })

    coins.forEach((coin) => {
        if(
            player.positionX < coin.positionX + coin.width && 
            player.positionX + player.width > coin.positionX &&
            player.positionY < coin.positionY + coin.height &&
            player.positionY + player.height > coin.positionY
        ){
            coin.removeCoin()
            currentCoins--
            points += 5
        }
    })

    if(frames % 60 === 0){
        points++
        puntosDiv.innerText = points
        if(points % 5 === 0 && currentCoins < 2){
            const coin = new Coin(coins);
            coins.push(coin);
            currentCoins++;
        }
    }

    frames++

    requestAnimationFrame(animate)
}

animate()