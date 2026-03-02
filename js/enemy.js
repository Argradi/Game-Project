class Enemy{
    constructor(){
        this.width = 5
        this.height = 15
        this.positionX = -(this.width) +1
        this.positionY = Math.round(Math.random() * 100)
        this.enemyElem = null

        this.createEnemy()
        this.updateUi()
    }

    createEnemy(){
        this.enemyElem = document.createElement('div')
        this.enemyElem.className = 'enemy'

        const parent = document.getElementById('board')
        parent.appendChild(this.enemyElem)
    }

    updateUi(){
        this.enemyElem.style.width = this.width + 'vw'
        this.enemyElem.style.height = this.height + 'vh'
        this.enemyElem.style.left = this.positionX + 'vw'
        this.enemyElem.style.bottom = this.positionY + 'vh'
    }

    move(){
        this.positionX++

        this.updateUi()
    }
}