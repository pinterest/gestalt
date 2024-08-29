import { type ReactNode } from 'react';
import { BannerSlim } from 'gestalt';
import MainSection from './MainSection';
import SandpackExample from './SandpackExample';

type Props = {
  notes?: string;
  name: string;
  code?: () => ReactNode;
  layout?: 'row' | 'column';
  previewHeight?: number;
  children?: ReactNode;
  noDefaultLabelProvider?: boolean;
  noBaseText?: boolean;
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
}: Props) {
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
    <MainSection description={description} name="Localization">
      {!noDefaultLabelProvider ? (
        <BannerSlim
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Recommendation"
          message={`${name} depends on DefaultLabelProvider for internal text strings. Localize the texts via DefaultLabelProvider.`}
          type="recommendationBare"
        />
      ) : null}
      {code ? (
        <MainSection.Subsection>
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={code}
                layout={layout}
                name="Localization"
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
