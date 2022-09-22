

const Circle = require('./circle')
const Rect = require('./rect')
const Ellipse = require('./ellipse')
const Path = require('./path')
const Line = require('./line')

export default function hemyProgress (container, options) {
    const type = options.type
    if (type === 'circle') {
        return new Circle(container, options)
    }
    if (type === 'rect') {
        return new Rect(container, options)
    }
    if (type === 'ellipse') {
        return new Ellipse(container, options)
    }
    if (type === 'path') {
        return new Path(container, options)
    }
    if (type === 'line') {
        return new Line(container, options)
    }
}