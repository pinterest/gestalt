// @flow strict
import React, { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="About international design">
      <PageHeader name="About international design" type="guidelines" />
      <MainSection
        name="What's t9n, l10n, i18n and g11n?"
        description={`We use these abbreviations at Pinterest when referring to all the components needed to successfully reach and serve international audiences.
`}
      >
        <MainSection.Subsection
          title="Translation (t9n)"
          description={`
          Is the process of transforming source-text from one language into another to maintain the original message and meaning.
`}
        />
        <MainSection.Subsection
          title="Localization (l10n)"
          description="Is the process of adapting a content’s full meaning to a new region/locale to make it appropriate, easily understandable and comfortable to use for local native language speakers."
        />

        <MainSection.Subsection
          title="Internationalization (i18n)"
          description="Is the process of designing and developing software or products that can be adapted to different languages and cultures. Ideally, a product or service is developed so that localization is relatively easy to achieve."
        />
        <MainSection.Subsection
          title="Globalization (g11n)"
          description={`
Is the process by which businesses or other organizations develop international influence or start operating on an international scale.

A common misconception about creating global products is that we only need translation to get ready for international clients. However, we need to do more because the translation process only changes words from the source to the target language. Global products (including websites, apps and online services) need to be made usable and acceptable for people in their markets.

 The consensus for this term is: "Globalization is the integration of translation, internationalization and localization." The previous steps are all important in the quest to develop usable and acceptable global products. Issues will arise if any of these three aren&apos;t implemented, particularly if global products are marketed for more than one locale.'
 `}
        />
      </MainSection>
      <MainSection
        name="Why Internationalization (i18n) matters"
        description={`
It's never too early to start talking about what we need to do to globalize a product; the sooner we include localization and internationalization in a product/feature conception, the more successful we'll be at overcoming language barriers and reaching people.

Identifying what's needed regarding design and code adaptation will allow a smooth localization and a successful product release. When designers are doing their mock-ups and wireframes, it is the perfect time to explore with the Localization Team how those prototypes look in languages and markets with different needs. These differences include:
- Language (script, expansion, orientation)
- Culture (appropriate and representative images and media)
- Currency
- Metric systems
- Date and time formats
- Laws and regulations
- Human behavior

`}
      >
        <MainSection
          name="Testing designs for localization"
          description="There's no need to wait until the UI in English is finished to see how it will look in localized languages. Pseudo-localization in the design phase is a real option to minimize the time needed in the traditional LQA phases. For testing designs in Figma, refer to our [Figma x International guide](https://docs.google.com/presentation/d/1dCn4fKA6zJ8u-8PltB7rIQCFoT8P7IInbYiZM79pjME/edit?usp=sharing)"
        />
      </MainSection>
    </Page>
  );
}
