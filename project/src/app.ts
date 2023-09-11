import { Logger } from './scripts/common/logger'

class App {
  private logger: Logger

  constructor() {
    this.logger = new Logger()
  }

  run() {
    const self = this
    self.logger.line('App.run')
  }
}

const app = new App()
app.run()
