import { Composition } from 'remotion';
import { TrendVideoShort } from './TrendVideoShort';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="TrendShort"
      component={TrendVideoShort}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        title: 'OpenAI releases breakthrough AI model',
        score: 124000,
        niche: 'AI Tools',
        hook: 'This AI tool just changed everything...',
        accentColor: '#ADFF2F',
      }}
    />
    <Composition
      id="TrendHorizontal"
      component={TrendVideoShort}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: 'OpenAI releases breakthrough AI model',
        score: 124000,
        niche: 'AI Tools',
        hook: 'This AI tool just changed everything...',
        accentColor: '#2E5BFF',
      }}
    />
  </>
);
