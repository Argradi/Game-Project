class Player {
    constructor() {
        this.playerElem = document.getElementById('player')
        if (!this.playerElem)
            return

        this.width = 6
        this.heightNormal = 17;
        this.heightCrouch = this.heightNormal / 1.5;
        this.height = this.heightNormal;
        this.positionX = 50 - (this.width / 2)
        this.positionY = 0
        this.velocityY = 0
        this.velocityX = 1
        this.gravity = 0.5
        this.scaleX = 1
        this.isJumping = false
        this.isCrounching = false
        this.isInFloor = true
        this.isRunning = false
        this.keys = []
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
        let currentClass = ''

        if (!this.isInFloor) {
            if(this.velocityY < 0) {
                currentClass = 'hit'
            } else{
                currentClass = 'jump'
            }
        } else if (this.isCrounching) {
            currentClass = 'duck'
        } else if (this.isRunning) {
            currentClass = 'walk'
        } else {
            currentClass = 'stand'
        }

        this.playerElem.classList.remove('hit', 'jump', 'duck', 'walk', 'stand')

        this.playerElem.classList.add(currentClass);
    }

    applyMovement() {
        if (this.keys['ArrowRight'] && this.positionX < (100 - this.width)) {
            this.positionX += this.velocityX
            this.scaleX = 1
            this.isRunning = true
        } else if (this.keys['ArrowLeft'] && this.positionX > 0) {
            this.positionX -= this.velocityX
            this.scaleX = -1
            this.isRunning = true
        } else {
            this.isRunning = false
        }

        if (this.keys['ArrowDown'] && !this.isJumping) {
            this.height = this.heightCrouch
            this.isCrounching = true
            this.velocityX = 0.4
        } else {
            this.height = this.heightNormal
            this.isCrounching = false
            this.velocityX = 1
        }

        this.updateUi()
        this.changeImage()
    }

    jump() {
        if (!this.isJumping && !this.isCrounching && this.isInFloor) {
            this.velocityY = 6.5
            this.isJumping = true
            this.isInFloor = false
        }

        this.changeImage()
    }

    applyGravity() {
        this.velocityY -= this.gravity

        if (this.velocityY < 0) {
            this.isInFloor = false
        }

        this.positionY += this.velocityY

        const platforms = document.querySelectorAll('.platform')

        platforms.forEach((platform) => {
            const style = window.getComputedStyle(platform)
            const platBottom = this.pxToVh(style.bottom)
            const platHeight = this.pxToVh(style.height)
            const platLeft = this.pxToVw(style.left)
            const platWidth = this.pxToVw(style.width)

            if (
                this.velocityY < 0 &&
                this.positionY <= platBottom + platHeight &&
                this.positionY > platBottom &&
                this.positionX + this.width > platLeft &&
                this.positionX < platLeft + platWidth
            ) {
                this.positionY = platBottom + platHeight
                this.velocityY = 0
                this.isJumping = false
                this.isInFloor = true
            }
        })

        if (this.positionY <= 0) {
            this.positionY = 0
            this.velocityY = 0
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