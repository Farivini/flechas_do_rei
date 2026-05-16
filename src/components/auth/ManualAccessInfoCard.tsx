import { StyleSheet, Text, View } from 'react-native';

import { flechasColors } from '../../theme/flechasTheme';

type ManualAccessInfoCardProps = {
  compact?: boolean;
};

export function ManualAccessInfoCard({ compact = false }: ManualAccessInfoCardProps) {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View style={[styles.copy, compact && styles.copyCompact]}>
        <Text style={[styles.title, compact && styles.titleCompact]}>
          Acesso por convite
        </Text>
        <Text style={[styles.description, compact && styles.descriptionCompact]}>
          No momento, o Flechas do Rei não está aberto ao público.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(140, 129, 118, 0.22)',
    borderRadius: 20,
    backgroundColor: 'rgba(4, 11, 22, 0.82)',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  cardCompact: {
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  copy: {
    gap: 4,
  },
  copyCompact: {
    gap: 3,
  },
  title: {
    color: flechasColors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  titleCompact: {
    fontSize: 14,
  },
  description: {
    color: flechasColors.cream,
    fontSize: 13,
    lineHeight: 18,
  },
  descriptionCompact: {
    fontSize: 12,
    lineHeight: 17,
  },
});
