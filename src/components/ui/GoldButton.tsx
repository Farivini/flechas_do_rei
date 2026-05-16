import { Pressable, StyleSheet, Text, View } from 'react-native';

import { flechasColors, flechasRadii, flechasTypography } from '../../theme/flechasTheme';

type GoldButtonProps = {
  label: string;
  onPress: () => void;
  compact?: boolean;
};

export function GoldButton({ label, onPress, compact = false }: GoldButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.buttonCompact,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
      <View style={styles.chevronSlot}>
        <Text style={[styles.chevron, compact && styles.chevronCompact]}>{'>'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: flechasRadii.pill,
    backgroundColor: flechasColors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  buttonCompact: {
    minHeight: 50,
    paddingHorizontal: 16,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  label: {
    flex: 1,
    color: '#3D2608',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  labelCompact: {
    fontSize: 14,
  },
  chevronSlot: {
    width: 22,
    alignItems: 'flex-end',
  },
  chevron: {
    color: '#3D2608',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
  chevronCompact: {
    fontSize: 20,
    lineHeight: 22,
  },
});
