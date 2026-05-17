import { StyleSheet, Text, View } from 'react-native';

import { flechasColors } from '../../theme/flechasTheme';
import { JourneyArrowButton } from '../common/JourneyArrowButton';
import { AppTextInput } from '../ui/AppTextInput';
import { GoldCard } from '../ui/GoldCard';

type InviteAccessCardProps = {
  email: string;
  onChangeEmail: (value: string) => void;
  onSubmit: () => void;
  compact?: boolean;
};

export function InviteAccessCard({
  email,
  onChangeEmail,
  onSubmit,
  compact = false,
}: InviteAccessCardProps) {
  return (
    <GoldCard compact={compact}>
      <View style={[styles.content, compact && styles.contentCompact]}>
        <Text style={[styles.title, compact && styles.titleCompact]}>
          Acesso por convite
        </Text>
        <AppTextInput
          compact={compact}
          onChangeText={onChangeEmail}
          placeholder="Seu melhor e-mail"
          value={email}
        />
        <JourneyArrowButton
          compact={compact}
          disabled={!email.trim()}
          label="ENTRAR COM E-MAIL"
          onComplete={onSubmit}
        />
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
  },
  contentCompact: {
    gap: 12,
  },
  title: {
    color: flechasColors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 24,
  },
});
