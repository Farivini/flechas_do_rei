import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { InviteAccessCard } from '../../components/auth/InviteAccessCard';
import { LoginFooter } from '../../components/auth/LoginFooter';
import { LoginHero } from '../../components/auth/LoginHero';
import { ManualAccessInfoCard } from '../../components/auth/ManualAccessInfoCard';
import { AppScreen } from '../../components/ui/AppScreen';
import { flechasColors, flechasSpacing } from '../../theme/flechasTheme';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const { height } = useWindowDimensions();
  const isCompactHeight = height < 760;
  const isShortHeight = height < 700;
  const heroHeight = Math.max(300, Math.min(340, height * (isShortHeight ? 0.43 : 0.4)));

  function handleEmailAccess() {
    if (!email.trim()) return;
    console.log('Entrar com e-mail:', email);
    onLoginSuccess?.();
  }

  return (
    <AppScreen>
      <LoginHero height={heroHeight} />

      <View style={[styles.content, isCompactHeight && styles.contentCompact]}>
        <View style={[styles.inviteCard, isCompactHeight && styles.inviteCardCompact]}>
          <InviteAccessCard
            compact={isCompactHeight}
            email={email}
            onChangeEmail={setEmail}
            onSubmit={handleEmailAccess}
          />
        </View>

        <Text style={[styles.description, isCompactHeight && styles.descriptionCompact]}>
          Jornada bíblica interativa para crianças e famílias.
        </Text>

        <ManualAccessInfoCard compact={isCompactHeight} />
        <LoginFooter compact={isCompactHeight} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: flechasSpacing.screen,
    paddingBottom: 8,
    gap: 14,
  },
  contentCompact: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 11,
  },
  inviteCard: {
    marginTop: -10,
  },
  inviteCardCompact: {
    marginTop: -8,
  },
  description: {
    color: flechasColors.cream,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  descriptionCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
});
