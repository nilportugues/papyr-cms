const moment = require('moment')

class Controller {

  constructor(server, app) {

    if (this.constructor === Controller) {
      throw new TypeError('Abstract class "Controller" cannot be instantiated directly.')
    }

    this.server = server
    this.app = app
  }

  registerSettings() {}
  registerRoutes() {}

  configureDate(date) {
    return moment(date).tz('America/Chicago').toISOString()
  }
}

module.exports = Controller