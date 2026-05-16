import { StyleSheet, Text, TextInput, View } from 'react-native';

import { flechasColors, flechasRadii, flechasTypography } from '../../theme/flechasTheme';

type AppTextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  compact?: boolean;
};

export function AppTextInput({
  placeholder,
  value,
  onChangeText,
  compact = false,
}: AppTextInputProps) {
  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={flechasColors.muted}
        style={[styles.input, compact && styles.inputCompact]}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 120, 0.32)',
    borderRadius: flechasRadii.input,
    backgroundColor: flechasColors.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  wrapperCompact: {
    minHeight: 48,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    color: flechasColors.textPrimary,
    fontSize: 16,
    paddingVertical: 8,
  },
  inputCompact: {
    fontSize: 15,
    paddingVertical: 7,
  },
});
