// @flow strict
import { type Node } from 'react';
import { ProgressBar } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function ProgressBarPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="ProgressBar">
      <PageHeader
        name="ProgressBar"
        description={generatedDocGen?.description}
        defaultCode="<ProgressBar value={.33} title='Fetching changes and correlated metrics...' helperText='Additional info' sentiment='good' />"
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Description about what you should Do. This will be 2-col layout because of the columns prop on Subsection. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)"
            defaultCode={`
<ProgressBar />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
          What not to do goes \`here\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)
        `}
            defaultCode={`
Code for this example goes here
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
        Description about what you should Do. This will be full-width. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)

        - You do not need code for these
        - You can instead use bulleted lists of Dos
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`\`Accessibility\` guidelines go here. Can also include SubSections and Cards for detailed examples (see Box). Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      />
      <MainSection
        name="Localization"
        description={`\`Localization\` guidelines go here. Can be examples in another language or truncation examples. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
          title="Variant name (sentence case)"
        >
          <MainSection.Card
            cardSize="md"
            title="Example title (optional)"
            defaultCode={`
Code for this example goes here
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
          title="Variant name (sentence case)"
        >
          <MainSection.Card
            cardSize="md"
            title="Example title (optional)"
            defaultCode={`
Code for this example goes here
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
          title="Variant using CombinationNew"
        >
          <ProgressBar />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Examples on what to do for writing
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Examples of what not to do for writing
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[ProgressBar](/ProgressBar)**
      Details about why to use this over current component.

      **[ProgressBar](/ProgressBar)**
      Details about why to use this over current component.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'ProgressBar' }) },
  };
}
