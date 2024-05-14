const { APP_ENV } = require('./env')

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: process.env.PROJECT_ID,
      },
      API_URL: process.env.REACT_APP_API_ENDPOINT,
      TEAM_ACCESS_KEY: process.env.REACT_APP_API_TEAM_ACCESS_KEY,
      API_KEY: process.env.REACT_APP_API_KEY,
      AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
      PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
      STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
      APP_ID: process.env.REACT_APP_APP_ID,
      OTHER_PROJECT_ID: process.env.REACT_APP_OTHER_PROJECT_ID,
      APP_ENV: APP_ENV,
      BLOG_URL: process.env.REACT_APP_BLOG,
    },
    android: {
      ...config.android,
      versionCode: 1,
      package: 'com.wen.wenapp',
      googleServicesFile: './google-services.json',
    },
  }
}
