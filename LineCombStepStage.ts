const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const lines : number = 5
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.8
const color : string = "#43A047"
const backColor : string = "#bdbdbd"

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
