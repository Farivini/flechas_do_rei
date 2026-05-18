import {
  Blur,
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Path,
  RadialGradient,
  Skia,
  useClock,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type PremiumAuraProps = {
  // footprint visível da aura
  size?: number;
  // 0 = idle, 1 = pico de energia (controlado pelo Onboarding no swap)
  boost?: SharedValue<number>;
};

const PARTICLE_COUNT = 6;
// Canvas bem maior que o footprint visível: nenhum shape opaco chega perto da
// borda retangular do Canvas → sem retângulo, SEM precisar de Mask.
const OVERSCAN = 1.6;

export function PremiumAura({ size = 320, boost }: PremiumAuraProps) {
  const canvasSize = size * OVERSCAN;
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;
  const center = vec(cx, cy);

  const clock = useClock();
  const internalBoost = useSharedValue(0);
  const energy = boost ?? internalBoost;

  // Anel de chama orgânico (polígono suavizado pelo Blur).
  const makeFlame = (
    t: number,
    e: number,
    baseR: number,
    stretch: number,
    yShift: number,
    phase: number,
    f1: number,
    f2: number,
    f3: number,
  ) => {
    'worklet';
    const path = Skia.Path.Make();
    const N = 20;
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const wob =
        Math.sin(a * f1 + t * 2.0 + phase) * 0.06 +
        Math.sin(a * f2 - t * 1.6 + phase) * 0.04 +
        Math.sin(a * f3 + t * 1.1) * 0.03;
      const amp = 1 + wob + e * 0.18;
      const x = cx + Math.cos(a) * baseR * amp;
      const y = cy + Math.sin(a) * baseR * amp * stretch - yShift;
      if (i === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    path.close();
    return path;
  };

  const flameOuter = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return makeFlame(t, energy.value, size * 0.32, 1.25, size * 0.04, 0, 3, 5, 2);
  });

  const flameInner = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return makeFlame(t, energy.value, size * 0.24, 1.22, size * 0.05, 1.7, 4, 6, 3);
  });

  // Respiração geral + pico no swap.
  const groupTransform = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    const s = 1 + 0.03 * Math.sin(t * 1.2) + energy.value * 0.12;
    return [{ scale: s }];
  });

  const coreR = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return size * 0.16 * (1 + 0.07 * Math.sin(t * 1.8) + energy.value * 0.26);
  });

  const haloOpacity = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return 0.42 + 0.12 * Math.sin(t * 1.4) + energy.value * 0.25;
  });

  const flameOpacity = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return 0.6 + 0.1 * Math.sin(t * 2.1) + energy.value * 0.28;
  });

  const boostFlashOpacity = useDerivedValue(() => energy.value * 0.55);

  // Espectros girando lentamente.
  const spectraTransform = useDerivedValue(() => {
    const t = (clock.value || 0) / 1000;
    return [{ rotate: t * 0.35 }];
  });

  // Partículas energéticas subindo.
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const cxp = useDerivedValue(() => {
      const t = (clock.value || 0) / 1000;
      return cx + Math.sin(t * 1.3 + i * 1.7) * size * 0.06 + (i - PARTICLE_COUNT / 2) * size * 0.018;
    });
    const cyp = useDerivedValue(() => {
      const t = (clock.value || 0) / 1000;
      const speed = 0.16 + i * 0.012 + energy.value * 0.12;
      const progress = (t * speed + i / PARTICLE_COUNT) % 1;
      return cy + size * 0.3 - progress * size * 0.58;
    });
    const op = useDerivedValue(() => {
      const t = (clock.value || 0) / 1000;
      const speed = 0.16 + i * 0.012 + energy.value * 0.12;
      const progress = (t * speed + i / PARTICLE_COUNT) % 1;
      return Math.sin(progress * Math.PI) * (0.5 + energy.value * 0.4);
    });
    return { cxp, cyp, op, r: 1.6 + (i % 3) };
  });

  return (
    <Canvas style={{ width: canvasSize, height: canvasSize, backgroundColor: 'transparent' }}>
      <Group transform={groupTransform} origin={center}>
        {/* Halo de energia externo */}
        <Group opacity={haloOpacity}>
          <Circle cx={cx} cy={cy} r={size * 0.42}>
            <RadialGradient
              c={center}
              r={size * 0.42}
              colors={[
                'rgba(90, 180, 255, 0.55)',
                'rgba(45, 120, 220, 0.22)',
                'rgba(20, 60, 150, 0.0)',
              ]}
              positions={[0, 0.55, 1]}
            />
            <Blur blur={22} />
          </Circle>
        </Group>

        {/* Espectros / ondas de energia */}
        <Group transform={spectraTransform} origin={center} opacity={0.6}>
          <Circle cx={cx} cy={cy} r={size * 0.38} style="stroke" strokeWidth={2.5} color="rgba(120, 200, 255, 0.45)">
            <Blur blur={6} />
          </Circle>
          <Circle cx={cx} cy={cy} r={size * 0.3} style="stroke" strokeWidth={2} color="rgba(170, 220, 255, 0.4)">
            <Blur blur={5} />
          </Circle>
        </Group>

        {/* Corpo de chama externo */}
        <Group opacity={flameOpacity}>
          <Path path={flameOuter}>
            <LinearGradient
              start={vec(cx, cy + size * 0.32)}
              end={vec(cx, cy - size * 0.32)}
              colors={[
                'rgba(30, 90, 200, 0.9)',
                'rgba(70, 165, 255, 0.85)',
                'rgba(185, 228, 255, 0.78)',
              ]}
              positions={[0, 0.55, 1]}
            />
            <Blur blur={18} />
          </Path>
        </Group>

        {/* Chama interna mais clara */}
        <Group opacity={flameOpacity}>
          <Path path={flameInner}>
            <LinearGradient
              start={vec(cx, cy + size * 0.24)}
              end={vec(cx, cy - size * 0.24)}
              colors={[
                'rgba(95, 185, 255, 0.9)',
                'rgba(195, 232, 255, 0.88)',
                'rgba(248, 253, 255, 0.82)',
              ]}
              positions={[0, 0.5, 1]}
            />
            <Blur blur={12} />
          </Path>
        </Group>

        {/* Núcleo brilhante branco-azulado */}
        <Circle cx={cx} cy={cy - size * 0.03} r={coreR}>
          <RadialGradient
            c={vec(cx, cy - size * 0.03)}
            r={size * 0.2}
            colors={[
              'rgba(255, 255, 255, 0.98)',
              'rgba(195, 232, 255, 0.62)',
              'rgba(120, 200, 255, 0.0)',
            ]}
            positions={[0, 0.45, 1]}
          />
          <Blur blur={10} />
        </Circle>

        {/* Flash radial branco/azul no swap */}
        <Circle cx={cx} cy={cy} r={size * 0.3} opacity={boostFlashOpacity}>
          <RadialGradient
            c={center}
            r={size * 0.3}
            colors={[
              'rgba(240, 250, 255, 0.95)',
              'rgba(155, 212, 255, 0.42)',
              'rgba(120, 200, 255, 0.0)',
            ]}
            positions={[0, 0.5, 1]}
          />
          <Blur blur={13} />
        </Circle>

        {/* Partículas / centelhas */}
        {particles.map((p, i) => (
          <Circle key={i} cx={p.cxp} cy={p.cyp} r={p.r} opacity={p.op} color="rgba(200, 235, 255, 0.95)">
            <Blur blur={2} />
          </Circle>
        ))}
      </Group>
    </Canvas>
  );
}
