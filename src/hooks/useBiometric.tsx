import {
  authenticateAsync,
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import { useEffect, useState } from 'react'

export const useBiometric = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [authenticationType, setAuthenticationType] = useState([])
  const [fingerprint, setFingerprint] = useState(false)

  useEffect(() => {
    ;(async () => {
      const compatible = await hasHardwareAsync()
      const authType = await supportedAuthenticationTypesAsync()
      setAuthenticationType(authType)
      setIsBiometricSupported(compatible)
      const enroll = await isEnrolledAsync()
      if (enroll) {
        setFingerprint(true)
      }
    })()
  }, [])

  return { isBiometricSupported, fingerprint, authenticationType }
}
