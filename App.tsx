import { useEffect, useState } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { styles } from './styles'

import * as LocalAuthentication from 'expo-local-authentication'

export default function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    console.log(compatible)

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()

    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    )
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login',
        'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo.'
      )
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida',
    })

    setIsAuthenticate(auth.success)
  }

  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticate ? 'Sim' : 'Não'} </Text>
      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  )
}
