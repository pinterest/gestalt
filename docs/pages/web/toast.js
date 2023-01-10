// @flow strict
import { type Node } from 'react';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import {
  BareSlimBannerExperiment,
  SlimBannerExperiment,
} from '../../docs-components/SlimBannerExperiment.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
  <Toast
    primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
    text={
      <Text inline> Saved to
        <Link display="inline" target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
          Home decor
        </Link>
      </Text>
    }
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
  />
`}
        slimBanner={
          <SlimBannerExperiment
            componentName={generatedDocGen?.displayName}
            description="update its visual design: spacing, elements sizing, and a new error Icon for variant='error'"
            pullRequest={2508}
            section="#"
          />
        }
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Displaying non-critical feedback on the result of an action.
          - Reinforcing success at the surface level.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Providing an update related to anything other than confirmation of a successful action. Consider a [Callout](/web/callout) instead.
          - Presenting mandatory and/or critical actions to a user.
          - Displaying feedback at the element level (e.g., entered password doesn't meet requirements). Use inline text instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        name="Localization"
        description={`Remember to localize \`text\` and any string within \`primaryAction\`.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Toasts should be displayed in the center of the viewport, opposite the main navbar (e.g. at the top of the viewport on mobile, bottom of the viewport on desktop). Though not implemented here, Toasts are meant to be ephemeral and disappear after a few seconds."
          title="How to display"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ToastExample() {
  const [showToast, setShowToast] = React.useState(false);

  return (
    <Box>
      <Button
        onClick={() => setShowToast((currVal) => !currVal)}
        text={showToast ? 'Close toast' : 'Show toast'}
      />

      {showToast && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            width="100%"
            paddingX={1}
            position="fixed"
            display="flex"
            justifyContent="center"
          >
            <Toast
              primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
              text={
                <Text inline>
                  Saved to{' '}
                  <Link display="inline" target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
                    Home decor
                  </Link>
                </Text>
              }
              thumbnail={
                <Image
                  alt="Modern ceramic vase pin."
                  naturalHeight={564}
                  naturalWidth={564}
                  src="https://i.ibb.co/Lx54BCT/stock1.jpg"
                />
              }
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
The \`text\` prop accepts either a string or [Text](/web/text). Use a string for guide toasts without any visual style. Toast will handle the text style and adherence to design guidelines.

If  confirmation toast's text with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within. When passing in your own Text component for \`text\`, do not specify \`color\` on Text. Toast will automatically pick the correct text color for the given \`variant\`.
`}
          title="Text"
        >
          <BareSlimBannerExperiment componentName={generatedDocGen?.displayName} />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text={
      <Text inline>
        Saved to{' '}
        <Link display="inline" target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
          Home decor
        </Link>
      </Text>
    }
  />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Error">
          <BareSlimBannerExperiment componentName={generatedDocGen?.displayName} />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text="You're offline."
    variant="error"
    primaryAction={{ accessibilityLabel: 'Reconnect', label: 'Reconnect' }}
  />
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Thumbnail">
          <BareSlimBannerExperiment componentName={generatedDocGen?.displayName} />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text={
      <Text inline>
        Saved to{' '}
        <Link display="inline" target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
          Home decor
        </Link>
      </Text>
    }
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
  />
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Primary action">
          <BareSlimBannerExperiment componentName={generatedDocGen?.displayName} />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    primaryAction={{ accessibilityLabel: 'Test', label: 'Undo' }}
    text={
      <Text inline>
        Saved to{' '}
        <Link display="inline" target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
          Home decor
        </Link>
      </Text>
    }

  />
</Flex>`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Toast' }) },
  };
}
