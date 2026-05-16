import { StyleSheet, Text, View } from 'react-native';

import { flechasColors, flechasTypography } from '../../theme/flechasTheme';

type LoginFooterProps = {
  compact?: boolean;
};

export function LoginFooter({ compact = false }: LoginFooterProps) {
  return (
    <View style={[styles.footer, compact && styles.footerCompact]}>
      <View style={[styles.googleRow, compact && styles.googleRowCompact]}>
        <View style={styles.line} />
        <Text style={[styles.googleText, compact && styles.googleTextCompact]}>
          GOOGLE EM BREVE
        </Text>
        <View style={styles.line} />
      </View>
      <Text style={[styles.signature, compact && styles.signatureCompact]}>
        Flechas do Rei
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: 12,
    paddingTop: 0,
    paddingBottom: 14,
  },
  footerCompact: {
    gap: 9,
    paddingBottom: 10,
  },
  googleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  googleRowCompact: {
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(246, 185, 74, 0.08)',
  },
  googleText: {
    color: flechasColors.muted,
    fontSize: 12,
    letterSpacing: 4,
    textAlign: 'center',
  },
  googleTextCompact: {
    fontSize: 11,
    letterSpacing: 3,
  },
  signature: {
    color: flechasColors.goldLight,
    fontSize: 21,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  signatureCompact: {
    fontSize: 19,
  },
});
