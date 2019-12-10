const Settings = require('../models/settings')


const configureSettings = async (name, defaultOptions) => {

  // Search for the provided settings document
  const settings = await Settings.findOne({ name })

  // If we found one
  if (settings) {
    appSettings = settings
  } else {
    // If we did not find one, create one
    appSettings = new Settings({ name, options: defaultOptions })
    appSettings.save()
  }

  return appSettings.options
}


module.exports = {
  configureSettings
}