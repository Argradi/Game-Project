class Player {
    constructor(){
        this.width = 10
        this.height = 10
        this.positionX = 50 - (this.width / 2)
        this.positionY = 0
        this.velocidadY = 0
        this.gravedad = 0.5
        this.isJumping = false
        this.playerElem = null
        this.teclas = []

        this.updateUi()
    }

    updateUi(){
        this.playerElem = document.getElementById('player')

        this.playerElem.style.width = this.width + 'vw'
        this.playerElem.style.height = this.height + 'vh'
        this.playerElem.style.left = this.positionX + 'vw'
        this.playerElem.style.bottom = this.positionY + 'vh'
    }

    applyMovement(){
        if(this.teclas['ArrowRight'] && this.positionX < (100 - this.width)){
            this.positionX++
        }

        if(this.teclas['ArrowLeft'] && this.positionX > 0){
            this.positionX--
        }

        if(this.teclas['ArrowDown']){
            this.height = 5
        } else {
            this.height = 10
        }

        this.updateUi()
    }

    jump(){
        if(!this.isJumping){
            this.velocidadY = 5
            this.isJumping = true
        }  
    }

    applyGravity(){
        this.velocidadY -= this.gravedad

        this.positionY += this.velocidadY

        if(this.positionY <= 0){
            this.positionY = 0
            this.velocidadY = 0
            this.isJumping = false
        }

    }
}