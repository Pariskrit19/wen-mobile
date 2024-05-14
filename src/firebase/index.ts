import { Env } from '../env'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: Env.API_KEY,

  authDomain: Env.AUTH_DOMAIN,

  projectId: Env.PROJECT_ID,

  storageBucket: Env.STORAGE_BUCKET,

  messagingSenderId: Env.MESSAGING_SENDER_ID,

  appId: Env.APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)
