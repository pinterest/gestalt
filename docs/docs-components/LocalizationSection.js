// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import MainSection from './MainSection.js';
import SandpackExample from './SandpackExample.js';

type Props = {|
  notes?: string,
  name: string,
  code?: () => Node,
  layout?: 'row' | 'column',
  previewHeight?: number,
  children?: Node,
  noDefaultLabelProvider?: boolean,
|};

export default function AccessibilitySection({
  code,
  name,
  notes,
  layout = 'row',
  previewHeight,
  children,
  noDefaultLabelProvider,
}: Props): Node {
  const baseText =
    'Be sure to localize all text strings. Note that localization can lengthen text by 20 to 30 percent.';
  return (
    <MainSection
      name="Localization"
      description={
        notes
          ? `${baseText}

${notes}
        `
          : baseText
      }
    >
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
