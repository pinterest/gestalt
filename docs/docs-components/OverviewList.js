// @flow strict
import { type Node } from 'react';
import { type Category, type ListItemType } from './data/components.js';
import IllustrationCard from './IllustrationCard.js';
import IllustrationSection from './IllustrationSection.js';

const getIllustrationCardColor = (category: Category, hasDarkBackground?: boolean) => {
  const tealBackgrounds = ['Foundations'];
  const grayBackgrounds = ['Utilities', 'Building blocks'];
  const greenBackgrounds = [
    'Actions',
    'Avatars',
    'Controls',
    'Data',
    'Fields and forms',
    'Help and guidance',
    'Indicators',
    'Loading',
    'Messaging',
    'Navigation',
    'Overlays',
    'Pins and imagery',
    'Structure',
    'Text',
  ];

  if (hasDarkBackground) {
    return 'gray-roboflow-600';
  }

  if (tealBackgrounds.includes(category)) {
    return 'teal-spabattical-700';
  }

  if (grayBackgrounds.includes(category)) {
    return 'gray-roboflow-100';
  }

  if (greenBackgrounds.includes(category)) {
    return 'green-matchacado-0';
  }

  return 'green-matchacado-0';
};

export default function List({
  array,
  headingLevel,
  platform,
  title = '',
}: {|
  array: $ReadOnlyArray<ListItemType>,
  headingLevel: 2 | 3,
  platform: 'Web' | 'Android' | 'iOS',
  title?: string,
|}): Node {
  return (
    <IllustrationSection title={title} grid="auto-fill" min={312}>
      {[...array]
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        .map((element) => (
          <IllustrationCard
            headingLevel={headingLevel}
            key={element.name}
            href={
              element?.path ??
              `/${platform.toLowerCase()}/${element.name.replace(/\s/g, '_').toLowerCase()}`
            }
            title={element.name}
            description={element.description}
            color={getIllustrationCardColor(element.category, element?.hasDarkBackground)}
            image={element.svg}
          />
        ))}
    </IllustrationSection>
  );
}
