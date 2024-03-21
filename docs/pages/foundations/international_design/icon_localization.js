// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="Icons localization">
      <PageHeader
        description={`
        When choosing and designing icons, consider picking symbols that work well across languages and cultures without having to create new icons to adapt to each localization.
        `}
        name="Icon localization"
        type="guidelines"
      />
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use an icon that can be universally understood. An example is showing bills to depict money without depicting a specific currency. Or a safe to depict wealth generation."
            title="Do"
            type="do"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A simple, one-color icon of a sparkly, generic currency bill."
                fit="contain"
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/81/14/37/8114374d1792dd36686d721da69138f0.png"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            description="Use an icon that depicts currency not used in other countries, or that may be offensive in other cultures. For example, while a piggy bank might appropriately signify wealth generation on an English site or app, it might not suit a culture where pigs have a negative connotation."
            title="Don't"
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A one-color icon of a piggy bank with a dollar sign on it."
                fit="contain"
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/ec/59/ef/ec59efa6106579fab88f857f361d6a01.png"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description={`
In general, we avoid using text in icons so that we don’t have to adapt icons to every language. However, there are times when using a particular script is necessary in an icon. Examples are text-editing UIs that communicate a script-related concept, like font-size choice. Consider creating an adapted version of those icons that'd include an RTL script.

Some icons might need to be removed because they don’t apply to an RTL language—for example, icons representing capitalization don't apply to Arabic.
        `}
        name="Using letters and scripts in icons"
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[RTL iconography](rtl_guidelines/iconography)**
        See how to use icons in right-to-left and bi-directional languages
      `}
        />
        <MainSection.Subsection
          description={`
          **[Iconography guidelines](https://gestalt.pinterest.systems/foundations/iconography/library)**
          Usage guidelines and best practices for our product icon library
          `}
        />
        <MainSection.Subsection
          description={`
          **[Icon component](https://gestalt.pinterest.systems/web/icon)**
          A component for using icons in product interfaces
          `}
        />
        <MainSection.Subsection
          description={`
          **[Icon requests](https://gestalt.pinterest.systems/team_support/component_request#Filling-a-request-form)**
          How to request an icon if it doesn't exist in our library
          `}
        />
      </MainSection>
    </Page>
  );
}
