class Player {
    constructor() {
        this.playerElem = document.getElementById('player')
        if (!this.playerElem)
            return

        this.width = 5
        this.heightNormal = 17;
        this.heightCrouch = this.heightNormal / 1.5;
        this.height = this.heightNormal;
        this.positionX = 50 - (this.width / 2)
        this.positionY = 0
        this.velocidadY = 0
        this.velocidadX = 1
        this.gravedad = 0.5
        this.scaleX = 1
        this.isJumping = false
        this.isCrounching = false
        this.isInFloor = true
        this.isRunning = false
        this.teclas = []
        this.frames = 0

        this.updateUi()
        this.changeImage()
    }

    updateUi() {
        this.playerElem.style.width = this.width + 'vw'
        this.playerElem.style.height = this.height + 'vh'
        this.playerElem.style.left = this.positionX + 'vw'
        this.playerElem.style.bottom = this.positionY + 'vh'
        this.playerElem.style.transform = `scaleX(${this.scaleX})`;
    }

    changeImage() {
        if (!this.isInFloor) {
            this.playerElem.src = this.velocidadY < 0
                ? './assets/kenney_platformer-pack-redux/PNG/Players/Variable sizes/Blue/alienBlue_hit.png'
                : './assets/kenney_platformer-pack-redux/PNG/Players/Variable sizes/Blue/alienBlue_jump.png';
        } else if (this.isCrounching) {
            this.playerElem.src = './assets/kenney_platformer-pack-redux/PNG/Players/Variable sizes/Blue/alienBlue_duck.png'
        } else if (this.isRunning) {
            this.playerElem.src = './assets/kenney_platformer-pack-redux/PNG/Players/Variable sizes/Blue/alienBlue_walk1.png'
        } else {
            this.playerElem.src = './assets/kenney_platformer-pack-redux/PNG/Players/Variable sizes/Blue/alienBlue_stand.png'
        }
    }

    applyMovement() {
        if (this.teclas['ArrowRight'] && this.positionX < (100 - this.width)) {
            this.positionX += this.velocidadX
            this.scaleX = 1
            this.isRunning = true
        } else if (this.teclas['ArrowLeft'] && this.positionX > 0) {
            this.positionX -= this.velocidadX
            this.scaleX = -1
            this.isRunning = true
        } else {
            this.isRunning = false
        }

        if (this.teclas['ArrowDown'] && !this.isJumping) {
            this.height = this.heightCrouch
            this.isCrounching = true
            this.velocidadX = 0.4
        } else {
            this.height = this.heightNormal
            this.isCrounching = false
            this.velocidadX = 1
        }

        this.updateUi()
        this.changeImage()
    }

    jump() {
        if (!this.isJumping && !this.isCrounching && this.isInFloor) {
            this.velocidadY = 6.5
            this.isJumping = true
            this.isInFloor = false
        }

        this.changeImage()
    }

    applyGravity() {
        this.velocidadY -= this.gravedad

        if (this.velocidadY < 0) {
            this.isInFloor = false
        }

        this.positionY += this.velocidadY

        const platforms = document.querySelectorAll('.platform')

        platforms.forEach((platform) => {
            const style = window.getComputedStyle(platform)
            const platBottom = this.pxToVh(style.bottom)
            const platHeight = this.pxToVh(style.height)
            const platLeft = this.pxToVw(style.left)
            const platWidth = this.pxToVw(style.width)

            if (
                this.velocidadY < 0 &&
                this.positionY <= platBottom + platHeight &&
                this.positionY > platBottom &&
                this.positionX + this.width > platLeft &&
                this.positionX < platLeft + platWidth
            ) {
                this.positionY = platBottom + platHeight
                this.velocidadY = 0
                this.isJumping = false
                this.isInFloor = true
            }
        })

        if (this.positionY <= 0) {
            this.positionY = 0
            this.velocidadY = 0
            this.isJumping = false
            this.isInFloor = true
        }

        this.updateUi()
        this.changeImage()
    }

    pxToVh(px) {
        return (parseInt(px) / window.innerHeight) * 100
    }

    pxToVw(px) {
        return (parseInt(px) / window.innerWidth) * 100
    }
}