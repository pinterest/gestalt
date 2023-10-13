// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import MainSection from './MainSection.js';
import SandpackExample from './SandpackExample.js';

type Props = {
  notes?: string,
  name: string,
  code?: () => Node,
  layout?: 'row' | 'column',
  previewHeight?: number,
  children?: Node,
  noDefaultLabelProvider?: boolean,
  noBaseText?: boolean,
};

export default function LocalizationSection({
  code,
  name,
  notes,
  layout = 'row',
  previewHeight,
  children,
  noDefaultLabelProvider,
  noBaseText = false,
}: Props): Node {
  const baseText =
    'Be sure to localize all text strings. Note that localization can lengthen text by 20 to 30 percent.';

  let description = baseText;
  if (notes) {
    description = noBaseText
      ? notes
      : `${baseText}

${notes}
        `;
  }

  return (
    <MainSection name="Localization" description={description}>
      {!noDefaultLabelProvider ? (
        <SlimBanner
          iconAccessibilityLabel="Recommendation"
          message={`${name} depends on DefaultLabelProvider for internal text strings. Localize the texts via DefaultLabelProvider.`}
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      ) : null}
      {code ? (
        <MainSection.Subsection>
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={code}
                name="Localization"
                layout={layout}
                previewHeight={previewHeight}
              />
            }
          />
        </MainSection.Subsection>
      ) : null}
      {children}
    </MainSection>
  );
}
