import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { flechasColors, flechasRadii } from '../../theme/flechasTheme';

type AppScreenProps = {
  children: ReactNode;
};

export function AppScreen({ children }: AppScreenProps) {
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.outerFrame}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: flechasColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 10,
  },
  outerFrame: {
    flexGrow: 1,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: 'rgba(246, 185, 74, 0.08)',
    borderRadius: 0,
    backgroundColor: flechasColors.backgroundDeep,
  },
});
