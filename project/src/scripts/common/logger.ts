export class Logger {
  private isDebug: boolean = false

  constructor() {
    // location.hostnameがlocalhostの場合はデバッグモードにする
    this.isDebug = location.hostname === 'localhost'
  }

  line(message: string = '') {
    const self = this
    if (!self.isDebug) return
    console.trace(`[LINE] ------------------- ${message} -------------------`)
  }

  debug(value?: any) {
    const self = this
    if (!self.isDebug) return
    console.debug('[DEBUG]', value)
  }
}
