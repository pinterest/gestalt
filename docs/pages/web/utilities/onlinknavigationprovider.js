// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import examplesCalloutUpsell from '../../../examples/onlinknavigationprovider/examplesCalloutUpsell.js';
import examplesDropdown from '../../../examples/onlinknavigationprovider/examplesDropdown.js';
import examplesLinkButton from '../../../examples/onlinknavigationprovider/examplesLinkButton.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage">
        <MainSection.Subsection
          title="Custom link navigation context"
          description={`
Components with links use simple \`<a>\` tags. In order to replace the default link behavior with custom ones (e.g. [react-router](https://www.google.com/search?q=react-router&oq=react-router&aqs=chrome..69i57j0l9.2115j0j7&sourceid=chrome&ie=UTF-8)), \`onNavigation\` provides an interface to pass external logic into the 'onClick' event handler in children links.

This example illustrates a custom navigation implementations to externally control the link functionality of Link: setting a default navigation logic with OnLinkNavigationProvider.

If \`onNavigation\` prop is passed to OnLinkNavigationProvider, it's passed down to all children links and sets a customized default link navigation behavior. \`onNavigation\` is a higher-order function: it takes named arguments: \`href\` and \`target\` and returns an event handler function. In the component's \`onClick\` event handler, the \`onClick\` prop gets called first, followed by the function passed down by the OnLinkNavigationProvider.

If \`onNavigation\` is a hook function, it can contain complex logic, including [React hooks](https://reactjs.org/docs/hooks-reference.html), to perform side effects.

In this example, the \`useOnNavigation\` hook function is passed to OnLinkNavigationProvider and executes the following actions:
- Disable the default link behavior
- Show an alert message
- Open a different URL in a new window

The returned \`onNavigationClick\` function inside the hook function uses the event access to [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It could also be used to [stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
      `}
        >
          <SlimBanner
            iconAccessibilityLabel="Localize the default label"
            message="Accessible links in Gestalt announce to assistive technologies that the link opens in a new tab. Always make sure your external logic aligns with the 'target' prop values. For example, if your external logic opens a url in a new tab, set 'target' to 'blank'. Localize the default label with DefaultLabelProvider."
            type="warning"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Examples">
        <MainSection.Subsection title="Link, Button, IconButton, TapArea">
          <MainSection.Card
            title="Examples from start to end: Link, Button, IconButton, TapArea"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={examplesLinkButton}
                name="Example - Link, Button, IconButton, TapArea"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Callout, Upsell, ActivationCard">
          <MainSection.Card
            title="Examples from top to bottom: Callout, Upsell, ActivationCard"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={examplesCalloutUpsell}
                name="Example - Callout, Upsell, ActivationCard"
                layout="column"
                previewHeight={650}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Dropdown">
          <MainSection.Card
            title="With a Dropdown"
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={examplesDropdown} name="Example - Dropdown" layout="column" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Link](/web/link)** / **[Button](/web/button)** / **[IconButton](/web/iconbutton)** / **[TapArea](/web/taparea)**  / **[DropDown](/web/dropdown)** / **[Callout](/web/callout)** / **[Upsell](/web/upsell)** / **[ActivationCard](/web/activationcard)**
      If these components are under a OnLinkNavigationProvider, their link behavior defaults to the logic defined in OnLinkNavigationProvider. In order to disable the onNavigation logic, we can return "dangerouslyDisableOnNavigation" in the \`onClick\` callback. See each component page for more information.
    `}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'OnLinkNavigationProvider',
      }),
    },
  };
}
