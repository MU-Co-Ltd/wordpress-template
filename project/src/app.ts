import { Logger } from './scripts/common/logger'

class App {
  private logger: Logger

  constructor() {
    this.logger = new Logger()
  }

  run() {
    this.logger.line('App.run')
  }
}

new App().run()
