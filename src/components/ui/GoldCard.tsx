import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { flechasColors, flechasRadii, flechasSpacing } from '../../theme/flechasTheme';

type GoldCardProps = {
  children: ReactNode;
  compact?: boolean;
  style?: ViewStyle;
};

export function GoldCard({ children, compact = false, style }: GoldCardProps) {
  return <View style={[styles.card, compact && styles.cardCompact, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(246, 185, 74, 0.28)',
    borderRadius: flechasRadii.card,
    backgroundColor: flechasColors.card,
    padding: 18,
  },
  cardCompact: {
    padding: 16,
  },
});
