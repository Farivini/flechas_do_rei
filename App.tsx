import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { LoginScreen } from './src/screens/auth/LoginScreen';
import { OnboardingScreen } from './src/screens/onboarding/OnboardingScreen';

type AppScreen = 'login' | 'onboarding';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');

  return (
    <>
      {screen === 'login' && (
        <LoginScreen onLoginSuccess={() => setScreen('onboarding')} />
      )}
      {screen === 'onboarding' && <OnboardingScreen />}
      <StatusBar backgroundColor="transparent" translucent style="light" />
    </>
  );
}
