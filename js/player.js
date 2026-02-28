class Player {
    constructor(){
        this.width = 10
        this.height = 10
        this.positionX = 50 - (this.width / 2)
        this.positionY = 0
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
        if(this.teclas['ArrowRight']){
            this.positionX++
        }

        if(this.teclas['ArrowLeft']){
            this.positionX--
        }

        this.updateUi()
    }
}