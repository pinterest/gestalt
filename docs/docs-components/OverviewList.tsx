import {
  TOKEN_COLOR_GRAY_ROBOFLOW_100,
  TOKEN_COLOR_GRAY_ROBOFLOW_600,
  TOKEN_COLOR_GREEN_MATCHACADO_50,
  TOKEN_COLOR_TEAL_SPABATTICAL_700,
} from 'gestalt-design-tokens';
import { ComponentCategory, Platform, PlatformData } from './data/types';
import IllustrationCard from './IllustrationCard';
import IllustrationSection from './IllustrationSection';

const getIllustrationCardColor = (category?: ComponentCategory, hasDarkBackground?: boolean) => {
  const tealBackgrounds = ['Foundations'];
  const grayBackgrounds = ['Utilities', 'Building blocks'];

  if (hasDarkBackground) {
    return TOKEN_COLOR_GRAY_ROBOFLOW_600;
  }

  if (category && tealBackgrounds.includes(category)) {
    return TOKEN_COLOR_TEAL_SPABATTICAL_700;
  }

  if (category && grayBackgrounds.includes(category)) {
    return TOKEN_COLOR_GRAY_ROBOFLOW_100;
  }

  return TOKEN_COLOR_GREEN_MATCHACADO_50;
};

type Props = {
  components: ReadonlyArray<PlatformData>;
  headingLevel: 2 | 3;
  platform: Platform;
  title?: string;
};

export default function OverviewList({ components, headingLevel, platform, title = '' }: Props) {
  return (
    <IllustrationSection grid="auto-fill" min={312} title={title}>
      {[...components]
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        .map(({ name, visual: { svg, hasDarkBackground }, category, description, path }) => (
          <IllustrationCard
            key={name}
            // This is kind of a hacky assumption
            // We should consider better ways to handle components with multiple categories
            backgroundColor={getIllustrationCardColor(category[0], hasDarkBackground)}
            description={description}
            headingLevel={headingLevel}
            href={path ?? `/${platform}/${name.replace(/\s/g, '_').toLowerCase()}`}
            image={svg}
            title={name}
          />
        ))}
    </IllustrationSection>
  );
}
