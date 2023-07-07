// @flow strict
import { type Node } from 'react';
import { type ComponentCategory, type Platform, type PlatformData } from './data/types.js';
import IllustrationCard from './IllustrationCard.js';
import IllustrationSection from './IllustrationSection.js';

const getIllustrationCardColor = (category: ComponentCategory, hasDarkBackground?: boolean) => {
  const tealBackgrounds = ['Foundations'];
  const grayBackgrounds = ['Utilities', 'Building blocks'];

  if (hasDarkBackground) {
    return 'gray-roboflow-600';
  }

  if (tealBackgrounds.includes(category)) {
    return 'teal-spabattical-700';
  }

  if (grayBackgrounds.includes(category)) {
    return 'gray-roboflow-100';
  }

  return 'green-matchacado-0';
};

type Props = {|
  components: $ReadOnlyArray<PlatformData>,
  headingLevel: 2 | 3,
  platform: Platform,
  title?: string,
|};

export default function OverviewList({
  components,
  headingLevel,
  platform,
  title = '',
}: Props): Node {
  return (
    <IllustrationSection title={title} grid="auto-fill" min={312}>
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
            color={getIllustrationCardColor(category[0], hasDarkBackground)}
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
