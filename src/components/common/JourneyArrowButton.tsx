import { useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { flechasColors, flechasRadii } from '../../theme/flechasTheme';

type JourneyArrowButtonProps = {
  label: string;
  onComplete: () => void;
  disabled?: boolean;
  compact?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const PARTICLE_COUNT = 4;

export function JourneyArrowButton({
  label,
  onComplete,
  disabled = false,
  compact = false,
  style,
  textStyle,
}: JourneyArrowButtonProps) {
  const { width } = useWindowDimensions();
  const isAnimating = useRef(false);

  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const birthGlow = useRef(new Animated.Value(0)).current;
  const birthGlowScale = useRef(new Animated.Value(0.4)).current;
  const arrowOpacity = useRef(new Animated.Value(0)).current;
  const arrowScale = useRef(new Animated.Value(0.7)).current;
  const arrowX = useRef(new Animated.Value(0)).current;
  const trailGrow = useRef(new Animated.Value(0)).current;
  const trailOpacity = useRef(new Animated.Value(1)).current;
  const particleX = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => new Animated.Value(0)),
  ).current;
  const particleOpacity = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => new Animated.Value(0)),
  ).current;

  function reset() {
    buttonOpacity.setValue(1);
    buttonScale.setValue(1);
    buttonGlow.setValue(0);
    textOpacity.setValue(1);
    birthGlow.setValue(0);
    birthGlowScale.setValue(0.4);
    arrowOpacity.setValue(0);
    arrowScale.setValue(0.7);
    arrowX.setValue(0);
    trailGrow.setValue(0);
    trailOpacity.setValue(1);
    particleX.forEach(v => v.setValue(0));
    particleOpacity.forEach(v => v.setValue(0));
    isAnimating.current = false;
  }

  function handlePress() {
    if (disabled || isAnimating.current) return;
    isAnimating.current = true;

    const travel = width;

    const particleAnims = particleX.map((x, i) => {
      const op = particleOpacity[i];
      return Animated.sequence([
        Animated.delay(360 + i * 90),
        Animated.parallel([
          Animated.timing(x, {
            toValue: travel * (0.7 + i * 0.08),
            duration: 560,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(op, { toValue: 0.85, duration: 140, useNativeDriver: true }),
            Animated.timing(op, { toValue: 0, duration: 420, useNativeDriver: true }),
          ]),
        ]),
      ]);
    });

    Animated.sequence([
      // A — Loading mágico (0→180ms): texto sai, leve pulse, brilho interno cresce
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0.96,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(buttonGlow, {
          toValue: 0.45,
          duration: 180,
          useNativeDriver: true,
        }),
      ]),
      // B — Transformação (180→320ms): pílula dissolve, clarão à esquerda, flecha nasce
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0.88,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(buttonGlow, {
          toValue: 0.7,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(birthGlow, {
          toValue: 0.9,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(birthGlowScale, {
          toValue: 1.2,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(arrowOpacity, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(arrowScale, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.back(1.6)),
          useNativeDriver: true,
        }),
      ]),
      // C — Disparo (320→950ms): flecha cruza fluida da esquerda à direita
      Animated.parallel([
        Animated.timing(arrowX, {
          toValue: travel,
          duration: 630,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(trailGrow, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(birthGlow, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(birthGlowScale, {
            toValue: 1.6,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(buttonGlow, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        ...particleAnims,
      ]),
      // D — Dissolve (950→1100ms): rastro e flecha somem suavemente
      Animated.parallel([
        Animated.timing(trailOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(arrowOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        onComplete();
        reset();
      }
    });
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={style}
    >
      <View style={[styles.wrap, compact && styles.wrapCompact]}>
        {/* Camada do botão (dissolve como energia ao clicar) */}
        <Animated.View
          style={[
            styles.buttonLayer,
            compact && styles.buttonLayerCompact,
            {
              opacity: disabled ? 0.5 : buttonOpacity,
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.buttonGlow, { opacity: buttonGlow }]}
          />
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.label,
              compact && styles.labelCompact,
              textStyle,
              { opacity: textOpacity },
            ]}
          >
            {label}
          </Animated.Text>
        </Animated.View>

        {/* Camada de voo: clarão + rastro + flecha (não recortada pelo botão) */}
        <View style={styles.flightLayer} pointerEvents="none">
          {/* Clarão de nascimento (esquerda) */}
          <Animated.View
            style={[
              styles.birthGlow,
              {
                opacity: birthGlow,
                transform: [{ scale: birthGlowScale }],
              },
            ]}
          />

          {/* Rastro: luz dourada suave (3 camadas) */}
          <Animated.View
            style={[
              styles.trailGroup,
              {
                opacity: trailOpacity,
                transform: [{ translateX: arrowX }, { scaleX: trailGrow }],
              },
            ]}
          >
            <View style={styles.trailHaze} />
            <View style={styles.trailMid} />
            <View style={styles.trailCore} />
          </Animated.View>

          {/* Partículas douradas */}
          {particleX.map((x, i) => (
            <Animated.View
              key={`p-${i}`}
              style={[
                styles.particle,
                {
                  marginTop: (i - 1.5) * 11,
                  opacity: particleOpacity[i],
                  transform: [{ translateX: x }],
                },
              ]}
            />
          ))}

          {/* Flecha — TODO: trocar por <Animated.Image source={arrowPng}> (opacity/translateX/scale/rotate já prontos) */}
          <Animated.Text
            style={[
              styles.arrow,
              {
                opacity: arrowOpacity,
                transform: [{ translateX: arrowX }, { scale: arrowScale }],
              },
            ]}
          >
            {'➳'}
          </Animated.Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  wrapCompact: {
    minHeight: 50,
  },
  buttonLayer: {
    alignSelf: 'stretch',
    minHeight: 52,
    borderRadius: flechasRadii.pill,
    backgroundColor: flechasColors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  buttonLayerCompact: {
    minHeight: 50,
    paddingHorizontal: 16,
  },
  buttonGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: flechasColors.goldLight,
  },
  label: {
    color: '#3D2608',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  labelCompact: {
    fontSize: 14,
  },
  flightLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 14,
    overflow: 'visible',
  },
  birthGlow: {
    position: 'absolute',
    left: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 215, 122, 0.55)',
  },
  arrow: {
    color: flechasColors.goldLight,
    fontSize: 38,
    fontWeight: '700',
    textShadowColor: 'rgba(246, 185, 74, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  trailGroup: {
    position: 'absolute',
    left: -34,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailHaze: {
    position: 'absolute',
    width: 80,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(246, 185, 74, 0.10)',
  },
  trailMid: {
    position: 'absolute',
    width: 72,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(246, 185, 74, 0.26)',
  },
  trailCore: {
    position: 'absolute',
    width: 64,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 215, 122, 0.5)',
  },
  particle: {
    position: 'absolute',
    left: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: flechasColors.goldLight,
  },
});
