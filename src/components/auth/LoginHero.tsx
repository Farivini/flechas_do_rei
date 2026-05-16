import { Image, StyleSheet, View } from 'react-native';

const loginHero = require('../../../assets/images/heroes/login-hero-section.png');

type LoginHeroProps = {
  height: number;
};

export function LoginHero({ height }: LoginHeroProps) {
  return (
    <View style={[styles.hero, { height }]}>
      <Image source={loginHero} resizeMode="cover" style={styles.image} />
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
});
