import { Image, StyleSheet, View } from 'react-native';

const loginHero = require('../../../assets/images/heroes/login-hero-section.png');

type LoginHeroProps = {
  height: number;
};

export function LoginHero({ height }: LoginHeroProps) {
  return (
    <View style={[styles.hero, { height }]}>
      <Image source={loginHero} resizeMode="cover" style={styles.image} />
      <View pointerEvents="none" style={styles.bottomShadeSoft} />
      <View pointerEvents="none" style={styles.bottomShadeMid} />
      <View pointerEvents="none" style={styles.bottomShadeDeep} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomShadeSoft: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 92,
    height: 90,
    backgroundColor: 'rgba(1, 4, 13, 0.18)',
  },
  bottomShadeMid: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    height: 82,
    backgroundColor: 'rgba(1, 4, 13, 0.42)',
  },
  bottomShadeDeep: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
    backgroundColor: 'rgba(1, 4, 13, 0.76)',
  },
});
