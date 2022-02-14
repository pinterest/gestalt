// @flow strict
import { type Node } from 'react';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function OnInteractionProviderPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title="ExperimentalOnInteractionProvider">
      <PageHeader
        name="ExperimentalOnInteractionProvider"
        description={generatedDocGen?.description}
        badge="alpha"
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Default onInteraction"
          description={`
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function OnNavigation() {
  const useOnInteraction = ({ componentName }) => {

   // eslint-disable-next-line no-alert
    const onInteractionClick = () => alert("You just interacted with a " + componentName + " component.");

    return onInteractionClick;
  }

  return (
    <ExperimentalOnInteractionProvider onInteraction={ useOnInteraction }>
      <Text>
        <Link href="https://pinterest.com" target="blank">Visit pinterest.com</Link>
      </Text>
    </ExperimentalOnInteractionProvider>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Default onInteraction with auxiliary data"
          description={`
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function OnNavigation() {
  const useOnInteraction = ({ componentName, onInteractionData }) => {

   // eslint-disable-next-line no-alert
    const onInteractionClick = () => alert("You just interacted with a " + componentName + " component which has the following id: " + onInteractionData.componentId);

    return onInteractionClick;
  }

  return (
    <ExperimentalOnInteractionProvider onInteraction={ useOnInteraction }>
      <Text>
        <Link aux={{ onInteractionData: { componentId: 'link-for-test'}}} href="https://pinterest.com" target="blank">Visit pinterest.com</Link>
      </Text>
    </ExperimentalOnInteractionProvider>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disabled default onInteraction"
          description={`
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function OnNavigation() {
  const useOnInteraction = ({ componentName, onInteractionData }) => {

    if (onInteractionData.disabled) {
      return () => {}
    }

    // eslint-disable-next-line no-alert
    const onInteractionClick = () => alert("You just interacted with a " + componentName + " component which has the following id: " + onInteractionData.componentId);

    return onInteractionClick;
  }

  return (
    <ExperimentalOnInteractionProvider onInteraction={ useOnInteraction }>
      <Text>
        <Link aux={{ onInteractionData: { disabled: true } }} href="https://pinterest.com" target="blank">Visit pinterest.com</Link>
      </Text>
    </ExperimentalOnInteractionProvider>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Link](/Link)**
      Links support onInteraction using the \`aux\` prop.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'OnInteractionProvider',
      }),
    },
  };
}
