import Linebot from './core/Linebot'

const linebot = new Linebot()

// Expose Linebot class to allow class inheritance
linebot.Linebot = Linebot

linebot.create = (...args) => new Linebot(...args)

export default linebot
