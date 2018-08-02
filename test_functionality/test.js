window.onload = function() {
    let body = $('body')

    const NUMBER = 100
    const WIDTH = document.body.clientWidth
    const HEIGHT = document.documentElement.scrollHeight


    let dropsArray = []

    for(let i = 0; i < NUMBER; i++) {
        let drop = new Drop(WIDTH, HEIGHT, i)

        body.append(`<i id=${i}_drop class="rain">`)
        drop.show()
        dropsArray.push(drop)
    }

    window.setInterval(function() {
        dropsArray.map((drop) => {
            drop.fall()
            drop.draw()
        })
    }, 100)
}


class Drop {
    constructor(width, height, index) {
        this.x = Math.floor(Math.random() * width)
        this.y = Math.floor(Math.random() * -1400) + -100
        this.height = height
        this.index = index
        this.yspeed = Math.floor(Math.random() * 150) + 50
        this.length = Math.floor(Math.random() * 50)
    }

    fall() {
        if (this.y > this.height) {
            this.y = Math.floor(Math.random() * -1400) + -100
            this.yspeed = Math.floor(Math.random() * 150) + 50
        } else {
            this.y = this.y + this.yspeed
        }
    }

    show() {
        $(`#${this.index}_drop`).offset({ top: this.y, left: this.x }).height(this.length)
    }

    draw() {
        $(`#${this.index}_drop`).offset({ top: this.y, left: this.x })
        this.yspeed = this.yspeed + 5
    }
}