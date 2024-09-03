export class Logger {
  private isDebug = false

  constructor() {
    // location.hostnameがlocalhostの場合はデバッグモードにする
    this.isDebug = location.hostname === 'localhost'
  }

  line(message = '') {
    if (this.isDebug) return
    console.trace(`[LINE] ------------------- ${message} -------------------`)
  }

  debug(value?: any) {
    if (this.isDebug) return
    console.debug('[DEBUG]', value)
  }
}
