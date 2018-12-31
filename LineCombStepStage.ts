const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const lines : number = 5
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.8
const color : string = "#43A047"
const backColor : string = "#bdbdbd"

const maxScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.max(0, scale - i / n)
}

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1/n, maxScale(scale, i, n)) * n
}

const scaleFactor : Function = (scale : number) => Math.floor(scale / scDiv)

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}

const updateScale : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * dir * scGap
}

const drawLCSNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = w / (nodes + 1)
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    const size : number = gap / sizeFactor
    const xGap : number = size / lines
    context.strokeStyle = color
    context.lineWidth = Math.min(w, h) / strokeFactor
    context.lineCap = 'round'
    context.save()
    context.translate(gap * (i + 1), h/2)
    context.rotate(Math.PI/2 * sc1)
    context.translate(-size, 0)
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(2 * size, 0)
    context.stroke()
    for (var j = 0; j < lines; j++) {
        const sc = divideScale(sc1, j, lines)
        context.save()
        context.translate(xGap * j, 0)
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(0, -xGap)
        context.stroke()
        context.restore()
    }
    context.restore()
}

class LineCombStepStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : LineCombStepStage = new LineCombStepStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}

class Animator {
    animated : boolean = false
    interval : number

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

class State {
    scale : number = 0
    dir : number = 0
    prevScale : number = 0

    update(cb : Function) {
        this.scale += updateScale(this.scale)
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}
