class Bullet {
    constructor(positionX, width, positionY, height, scaleX, bulletArray) {
        this.width = 2
        this.height = 3
        this.positionX = positionX + (width / 3)
        this.positionY = positionY + (height / 2)
        this.scaleX = scaleX
        this.bullElem = null
        this.bulletArray = bulletArray

        setTimeout(() => {
            this.removeBullet();
        }, 750);

        this.createBullet()
        this.updateUi()
    }

    createBullet() {
        this.bullElem = document.createElement('div')
        this.bullElem.style.transform = `scaleX(${this.scaleX})`
        this.bullElem.className = 'bullet'

        const parent = document.getElementById('board')
        parent.appendChild(this.bullElem)
    }

    updateUi() {
        this.bullElem.style.width = this.width + 'vw'
        this.bullElem.style.height = this.height + 'vh'
        this.bullElem.style.left = this.positionX + 'vw'
        this.bullElem.style.bottom = this.positionY + 'vh'
    }

    move() {
        if(this.scaleX === 1)
            this.positionX++
        else if(this.scaleX === -1)
            this.positionX--

        this.updateUi()
    }

    removeBullet() {
        this.bullElem.remove()
        this.bullElem = null;

        const index = this.bulletArray.indexOf(this)
        this.bulletArray.splice(index, 1)
    }
}