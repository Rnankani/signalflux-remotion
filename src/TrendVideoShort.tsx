import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

interface Props {
  title: string;
  score: number;
  niche: string;
  hook: string;
  accentColor: string;
}

export const TrendVideoShort: React.FC<Props> = ({
  title, score, niche, hook, accentColor
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleIn = spring({ fps, frame, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
  const hookIn = spring({ fps, frame: frame - 10, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const scoreIn = spring({ fps, frame: frame - 20, from: 0, to: 1, config: { damping: 10, stiffness: 80 } });
  const ctaIn = spring({ fps, frame: frame - 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });

  const animatedScore = Math.round(
    interpolate(frame, [20, 35], [0, score], { extrapolateRight: 'clamp' })
  );

  const fmt = (n: number) =>
    n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M'
    : n >= 1_000 ? (n / 1_000).toFixed(0) + 'K'
    : String(n);

  return (
    <AbsoluteFill style={{ background: '#050505', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* Background glow */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at 50% 40%, ${accentColor}18 0%, transparent 65%)`,
      }}/>

      {/* Niche badge */}
      <Sequence from={0}>
        <div style={{
          position: 'absolute', top: 100, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            background: `${accentColor}22`,
            border: `2px solid ${accentColor}55`,
            borderRadius: 40, padding: '10px 28px',
            fontSize: 28, fontWeight: 700,
            color: accentColor, letterSpacing: '0.08em',
          }}>
            {niche.toUpperCase()}
          </div>
        </div>
      </Sequence>

      {/* Score counter */}
      <Sequence from={20}>
        <div style={{
          position: 'absolute', top: 220, left: 0, right: 0,
          textAlign: 'center',
          opacity: scoreIn,
          transform: `scale(${interpolate(scoreIn, [0, 1], [0.7, 1])})`,
        }}>
          <div style={{
            fontSize: 140, fontWeight: 900, color: accentColor,
            lineHeight: 1, fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 60px ${accentColor}44`,
          }}>
            {fmt(animatedScore)}
          </div>
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            signals detected
          </div>
        </div>
      </Sequence>

      {/* Hook */}
      <Sequence from={10}>
        <div style={{
          position: 'absolute', top: 520, left: 80, right: 80,
          textAlign: 'center',
          opacity: hookIn,
          transform: `translateY(${interpolate(hookIn, [0, 1], [30, 0])}px)`,
        }}>
          <div style={{
            fontSize: 58, fontWeight: 800, color: '#fff',
            lineHeight: 1.2, letterSpacing: '-0.02em',
          }}>
            "{hook}"
          </div>
        </div>
      </Sequence>

      {/* Title bar */}
      <Sequence from={0}>
        <div style={{
          position: 'absolute', bottom: 280, left: 60, right: 60,
          opacity: titleIn,
          transform: `translateX(${interpolate(titleIn, [0, 1], [-40, 0])}px)`,
        }}>
          <div style={{ fontSize: 36, fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
            {title.length > 70 ? title.slice(0, 67) + '...' : title}
          </div>
        </div>
      </Sequence>

      {/* CTA */}
      <Sequence from={30}>
        <div style={{
          position: 'absolute', bottom: 140, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: ctaIn,
        }}>
          <div style={{
            background: accentColor, borderRadius: 50,
            padding: '18px 56px',
            fontSize: 36, fontWeight: 800, color: '#000',
          }}>
            SignalFlux AI →
          </div>
        </div>
      </Sequence>

      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: 50, left: 0, right: 0,
        textAlign: 'center', fontSize: 24,
        color: 'rgba(255,255,255,0.2)', fontWeight: 500,
      }}>
        signalflux.ai
      </div>
    </AbsoluteFill>
  );
};
