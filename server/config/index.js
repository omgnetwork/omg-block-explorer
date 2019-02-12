import env from 'dotenv'
env.config()

export default {
  WATCHER_URL: process.env.WATCHER_URL || 'http://localhost:4000'
}
