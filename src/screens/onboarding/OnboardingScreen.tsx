import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { JourneyArrowButton } from '../../components/common/JourneyArrowButton';
import { AVATARS, AvatarId } from '../../constants/avatars';
import {
  flechasColors,
  flechasSpacing,
  flechasTypography,
} from '../../theme/flechasTheme';

const BACKGROUND = require('../../../assets/images/heroes/onboarding.png');
const AVATAR_SIZE = 72;
const SPARK_COUNT = 6;
const STAR_COUNT = 4;

interface OnboardingScreenProps {
  onContinue?: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  const { width, height } = useWindowDimensions();
  const [selected, setSelected] = useState<AvatarId>('davi');

  // Character body fade
  const bodyOpacity = useRef(new Animated.Value(1)).current;

  // Avatar ring scales — davi starts selected
  const scaleDavi = useRef(new Animated.Value(1.08)).current;
  const scaleAna = useRef(new Animated.Value(1.0)).current;
  const scaleSamuel = useRef(new Animated.Value(1.0)).current;
  const scaleMap: Record<AvatarId, Animated.Value> = {
    davi: scaleDavi,
    ana: scaleAna,
    samuel: scaleSamuel,
  };

  // Beam pulse
  const beamOpacity = useRef(new Animated.Value(0.15)).current;
  const beamScaleY = useRef(new Animated.Value(1.0)).current;

  // Sparks
  const sparkYs = useRef(
    Array.from({ length: SPARK_COUNT }, () => new Animated.Value(0)),
  ).current;
  const sparkOpacities = useRef(
    Array.from({ length: SPARK_COUNT }, () => new Animated.Value(0)),
  ).current;

  // Stars
  const starOpacities = useRef(
    Array.from({ length: STAR_COUNT }, () => new Animated.Value(0)),
  ).current;

  // Shooting star
  const shootX = useRef(new Animated.Value(-60)).current;
  const shootY = useRef(new Animated.Value(0)).current;
  const shootOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loops: Animated.CompositeAnimation[] = [];

    // 1. Beam opacity pulse
    const beamOpacityLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(beamOpacity, {
          toValue: 0.42,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(beamOpacity, {
          toValue: 0.12,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loops.push(beamOpacityLoop);
    beamOpacityLoop.start();

    // Beam vertical scale pulse
    const beamScaleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(beamScaleY, {
          toValue: 1.05,
          duration: 3400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(beamScaleY, {
          toValue: 0.96,
          duration: 3400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loops.push(beamScaleLoop);
    beamScaleLoop.start();

    // 2. Sparks — rise + fade per particle
    sparkYs.forEach((sparkY, i) => {
      const opacity = sparkOpacities[i];
      const delay = i * 320;
      const duration = 2200 + i * 220;

      const sparkLoop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(sparkY, {
              toValue: -105,
              duration,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(opacity, {
                toValue: 0.88,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(opacity, {
                toValue: 0,
                duration: duration - 200,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.parallel([
            Animated.timing(sparkY, { toValue: 0, duration: 0, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
          ]),
        ]),
      );
      loops.push(sparkLoop);
      sparkLoop.start();
    });

    // 3. Stars twinkle
    starOpacities.forEach((opacity, i) => {
      const delay = i * 1100;
      const halfDuration = 1600 + i * 400;
      const starLoop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: halfDuration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.05,
            duration: halfDuration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      );
      loops.push(starLoop);
      starLoop.start();
    });

    // 4. Shooting star (manual loop)
    let shootAnim: Animated.CompositeAnimation | null = null;
    const shoot = () => {
      shootX.setValue(-60);
      shootY.setValue(0);
      shootOpacity.setValue(0);
      shootAnim = Animated.sequence([
        Animated.parallel([
          Animated.timing(shootX, {
            toValue: width + 60,
            duration: 680,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shootY, {
            toValue: 90,
            duration: 680,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(shootOpacity, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shootOpacity, {
              toValue: 0,
              duration: 580,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.delay(4400),
      ]);
      shootAnim.start(({ finished }) => {
        if (finished) shoot();
      });
    };

    const firstShot = setTimeout(shoot, 1800);

    return () => {
      clearTimeout(firstShot);
      loops.forEach(loop => loop.stop());
      shootAnim?.stop();
    };
  }, []);

  function selectAvatar(id: AvatarId) {
    if (id === selected) return;

    Animated.timing(bodyOpacity, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }).start(() => {
      setSelected(id);
      Animated.timing(bodyOpacity, {
        toValue: 1,
        duration: 210,
        useNativeDriver: true,
      }).start();
    });

    AVATARS.forEach(av => {
      Animated.spring(scaleMap[av.id], {
        toValue: av.id === id ? 1.08 : 1.0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }).start();
    });
  }

  function handleContinue() {
    // TODO: navigate to Home screen when ready
    console.log('Continuar — avatar selecionado:', selected);
    onContinue?.();
  }

  function handleSkip() {
    // TODO: navigate to Home screen when ready
    console.log('Pular — avatar selecionado:', selected);
  }

  const selectedAvatar = AVATARS.find(av => av.id === selected)!;
  const statusBarOffset = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

  // Beam center
  const beamLeft = width * 0.5 - 28;

  // Spark positions (scattered near beam center, lower half of upper area)
  const sparkBaseX = width * 0.5;
  const sparkBaseY = height * 0.38;
  const sparkPositions = [
    { x: sparkBaseX - 18, y: sparkBaseY },
    { x: sparkBaseX + 10, y: sparkBaseY + 15 },
    { x: sparkBaseX - 6, y: sparkBaseY + 30 },
    { x: sparkBaseX + 20, y: sparkBaseY - 5 },
    { x: sparkBaseX - 24, y: sparkBaseY + 20 },
    { x: sparkBaseX + 4, y: sparkBaseY - 12 },
  ];

  const starPositions = [
    { x: width * 0.12, y: height * 0.10, size: 3 },
    { x: width * 0.82, y: height * 0.16, size: 2 },
    { x: width * 0.72, y: height * 0.06, size: 4 },
    { x: width * 0.28, y: height * 0.05, size: 2 },
  ];

  return (
    <ImageBackground source={BACKGROUND} style={styles.root} resizeMode="cover">

      {/* Feixe de luz pulsante */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.beam,
          {
            left: beamLeft,
            opacity: beamOpacity,
            transform: [{ scaleY: beamScaleY }],
          },
        ]}
      />

      {/* Faíscas douradas */}
      {sparkYs.map((sparkY, i) => (
        <Animated.View
          key={`spark-${i}`}
          pointerEvents="none"
          style={[
            styles.spark,
            {
              left: sparkPositions[i].x,
              top: sparkPositions[i].y,
              opacity: sparkOpacities[i],
              transform: [{ translateY: sparkY }],
            },
          ]}
        />
      ))}

      {/* Estrelinhas */}
      {starOpacities.map((opacity, i) => (
        <Animated.View
          key={`star-${i}`}
          pointerEvents="none"
          style={[
            styles.star,
            {
              left: starPositions[i].x,
              top: starPositions[i].y,
              width: starPositions[i].size,
              height: starPositions[i].size,
              borderRadius: starPositions[i].size,
              opacity,
            },
          ]}
        />
      ))}

      {/* Estrela cadente */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shootingStarWrap,
          {
            top: height * 0.07,
            opacity: shootOpacity,
            transform: [{ translateX: shootX }, { translateY: shootY }],
          },
        ]}
      >
        <View style={styles.shootingStarTrail} />
        <View style={styles.shootingStarDot} />
      </Animated.View>

      <SafeAreaView style={[styles.safe, { paddingTop: statusBarOffset }]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Pressable hitSlop={12} onPress={handleSkip} style={styles.skipBtn}>
            <Text style={styles.skipText}>Pular</Text>
          </Pressable>
        </View>

        {/* Título */}
        <View style={styles.titleSection}>
          <Text style={styles.appName}>Flechas do Rei</Text>
          <Text style={styles.appSubtitle}>Sua jornada com Deus começa agora.</Text>
        </View>

        {/* Personagem grande */}
        <View style={styles.characterArea}>
          <Animated.View style={{ opacity: bodyOpacity }}>
            <Image
              resizeMode="contain"
              source={selectedAvatar.body}
              style={styles.characterImage}
            />
          </Animated.View>
        </View>

        {/* Painel inferior */}
        <View style={styles.bottomPanel}>
          <Text style={styles.chooseTitle}>Escolha seu companheiro de jornada</Text>
          <Text style={styles.chooseSubtitle}>
            Ele estará com você em todas as suas aventuras bíblicas.
          </Text>

          <View style={styles.avatarRow}>
            {AVATARS.map(av => {
              const isSelected = av.id === selected;
              return (
                <Pressable key={av.id} onPress={() => selectAvatar(av.id)} hitSlop={8}>
                  <Animated.View
                    style={[
                      styles.avatarContainer,
                      { transform: [{ scale: scaleMap[av.id] }] },
                    ]}
                  >
                    {isSelected && <View style={styles.avatarGlow} />}
                    <View
                      style={[
                        styles.avatarRing,
                        isSelected ? styles.avatarRingSelected : styles.avatarRingDefault,
                      ]}
                    >
                      <Image
                        resizeMode="cover"
                        source={av.avatar}
                        style={styles.avatarImage}
                      />
                    </View>
                  </Animated.View>
                  <Text
                    style={[styles.avatarName, isSelected && styles.avatarNameSelected]}
                  >
                    {av.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <JourneyArrowButton label="CONTINUAR" onComplete={handleContinue} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: flechasColors.background,
  },
  safe: {
    flex: 1,
  },

  // Beam
  beam: {
    position: 'absolute',
    top: 0,
    width: 56,
    height: '65%',
    backgroundColor: 'rgba(246, 185, 74, 0.13)',
    borderRadius: 28,
  },

  // Sparks
  spark: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: flechasColors.goldLight,
  },

  // Stars
  star: {
    position: 'absolute',
    backgroundColor: '#FFFDE8',
  },

  // Shooting star
  shootingStarWrap: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shootingStarTrail: {
    width: 26,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 215, 122, 0.55)',
  },
  shootingStarDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: flechasColors.goldLight,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: flechasSpacing.screen,
    paddingTop: 6,
    paddingBottom: 2,
  },
  headerSpacer: {
    flex: 1,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skipText: {
    color: flechasColors.textSecondary,
    fontSize: flechasTypography.label,
    fontWeight: '500',
  },

  // Title
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: flechasSpacing.screen,
    paddingTop: 2,
    gap: 4,
  },
  appName: {
    color: flechasColors.gold,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    color: flechasColors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },

  // Character
  characterArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: 200,
    height: 270,
  },

  // Bottom panel
  bottomPanel: {
    paddingHorizontal: flechasSpacing.screen,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 10,
    backgroundColor: 'rgba(2, 8, 23, 0.82)',
    borderTopWidth: 1,
    borderTopColor: flechasColors.lineSoft,
  },
  chooseTitle: {
    color: flechasColors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  chooseSubtitle: {
    color: flechasColors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },

  // Avatar row
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 2,
  },
  avatarContainer: {
    width: AVATAR_SIZE + 8,
    height: AVATAR_SIZE + 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlow: {
    position: 'absolute',
    width: AVATAR_SIZE + 8,
    height: AVATAR_SIZE + 8,
    borderRadius: (AVATAR_SIZE + 8) / 2,
    backgroundColor: 'rgba(246, 185, 74, 0.18)',
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 2,
  },
  avatarRingSelected: {
    borderColor: flechasColors.gold,
    borderWidth: 2.5,
  },
  avatarRingDefault: {
    borderColor: 'rgba(246, 185, 74, 0.28)',
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  avatarName: {
    color: flechasColors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  avatarNameSelected: {
    color: flechasColors.gold,
    fontWeight: '600',
  },
});
