class Coin{
    constructor(coinsArray) {
        this.width = 4
        this.height = 7.5
        this.positionX = 0
        this.positionY = 0
        this.coinElem = null
        this.coinsArray = coinsArray

        this.createCoin()
        this.updateUi()
    }

    createCoin(){
        this.coinElem = document.createElement('div')
        this.coinElem.className = 'coin'
        const platforms = document.querySelectorAll('.platform')
        let index = Math.floor(Math.random() * platforms.length)

        const style = window.getComputedStyle(platforms[index])
        const platBottom = this.pxToVh(style.bottom)
        const platHeight = this.pxToVh(style.height)
        const platLeft = this.pxToVw(style.left)
        const platWidth = this.pxToVw(style.width)

        this.positionX = platLeft + (platWidth / 2) - (this.width / 2)
        this.positionY = platBottom + platHeight + 3

        const parent = document.getElementById('board')
        parent.appendChild(this.coinElem)
    }

    updateUi(){
        this.coinElem.style.width = this.width + 'vw'
        this.coinElem.style.height = this.height + 'vh'
        this.coinElem.style.left = this.positionX + 'vw'
        this.coinElem.style.bottom = this.positionY + 'vh'
    }

    removeCoin(){
        this.coinElem.remove()
        this.coinElem = null

        const index = this.coinsArray.indexOf(this)
        this.coinsArray.splice(index, 1)
    }

    pxToVh(px) {
        return (parseInt(px) / window.innerHeight) * 100
    }

    pxToVw(px) {
        return (parseInt(px) / window.innerWidth) * 100
    }
}