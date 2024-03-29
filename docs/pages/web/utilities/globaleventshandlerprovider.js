// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim } from 'gestalt';
import docGen, { type DocGen } from '../../../docs-components/docgen';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../../docs-components/InternalDocumentationSection';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import linkHandlersBannerCalloutUpsell from '../../../examples/globaleventshandlerprovider/linkHandlersBannerCalloutUpsell';
import linkHandlersDangerouslyDisableOnNavigation from '../../../examples/globaleventshandlerprovider/linkHandlersDangerouslyDisableOnNavigation';
import linkHandlersDropdown from '../../../examples/globaleventshandlerprovider/linkHandlersDropdown';
import linkHandlersLinkButton from '../../../examples/globaleventshandlerprovider/linkHandlersLinkButton';
import sheetMobileHandlers from '../../../examples/globaleventshandlerprovider/sheetMobileHandlers';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="SheetMobile handlers">
        <MainSection.Subsection title="onOpen, onClose">
          <MainSection.Card
            cardSize="lg"
            description={`GlobalEventsHandlerProvider has one prop for each component subscribing to the provider.

GlobalEventsHandlerProvider's \`sheetMobileHandlers\` props only subscribes SheetMobile and those adaptive components that use SheetMobile in their mobile UI (Modal, Dropdown.)

In the example below, SheetMobile's logs when opens and closes.
`}
            sandpackExample={
              <SandpackExample
                code={sheetMobileHandlers}
                name="GlobalEventsHandlerProvider in SheetMobile"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Link handlers">
        <MainSection.Subsection
          description={`
Components with links use simple \`<a>\` tags. In order to replace the default link behavior with custom ones (e.g. [react-router](https://www.google.com/search?q=react-router&oq=react-router&aqs=chrome..69i57j0l9.2115j0j7&sourceid=chrome&ie=UTF-8)), \`onNavigation\` provides an interface to pass external logic into the 'onClick' event handler in children links.

This example illustrates a custom navigation implementations to externally control the link functionality of Link: setting a default navigation logic with GlobalEventsHandlerProvider.

If \`onNavigation\` prop is passed to GlobalEventsHandlerProvider, it's passed down to all children links and sets a customized default link navigation behavior. \`onNavigation\` is a higher-order function: it takes named arguments: \`href\` and \`target\` and returns an event handler function. In the component's \`onClick\` event handler, the \`onClick\` prop gets called first, followed by the function passed down by the GlobalEventsHandlerProvider.

If \`onNavigation\` is a hook function, it can contain complex logic, including [React hooks](https://reactjs.org/docs/hooks-reference.html), to perform side effects.

In this example, the \`useOnNavigation\` hook function is passed to GlobalEventsHandlerProvider and executes the following actions:
- Disable the default link behavior
- Show an alert message
- Open a different URL in a new window

The returned \`onNavigationClick\` function inside the hook function uses the event access to [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It could also be used to [stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
      `}
          title="onNavigation: custom navigation"
        >
          <BannerSlim
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
            iconAccessibilityLabel="Localize the default label"
            message="Accessible links in Gestalt announce to assistive technologies that the link opens in a new tab. Always make sure your external logic aligns with the 'target' prop values. For example, if your external logic opens a url in a new tab, set 'target' to 'blank'. Localize the default label with DefaultLabelProvider."
            type="warning"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
All components that consume from the GlobalEventsHandlerProvider also allow to disable the default navigation logic set in the provider from the component itself.

The triggering events, like \`onClick\`, provide access to the event and "dangerouslyDisableOnNavigation".

"dangerouslyDisableOnNavigation" is a callback function that, when called, disables the logic set in GlobalEventsHandlerProvider in that component instance.

"dangerouslyDisableOnNavigation" can be used to use the native anchor element directly or to use an alternative navigation
logic.

Don't forget to call <code>event.preventDefault</code> when implementing an alternative navigation, e.g. router logic inside the onClick event. <code>event.preventDefault</code> will prevent your underlying anchor and the alternative navigation to act at the same time, having two navigations occurring at the same time.

The example below demonstrates the correct use of "dangerouslyDisableOnNavigation".
`}
          title="onNavigation: disabling default navigation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={linkHandlersDangerouslyDisableOnNavigation}
                layout="column"
                name="Example - dangerouslyDisableOnNavigation"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Implementation in Link, ButtonLink, IconButtonLink, TapAreaLink">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={linkHandlersLinkButton}
                layout="column"
                name="Example - Link, Button, IconButton, TapArea"
              />
            }
            title="Examples from start to end: Link, Button, IconButton, TapArea"
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Implementation in BannerCallout, BannerUpsell, ActivationCard">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={linkHandlersBannerCalloutUpsell}
                layout="column"
                name="Example - BannerCallout, BannerUpsell, ActivationCard"
                previewHeight={650}
              />
            }
            title="Examples from top to bottom: BannerCallout, BannerUpsell, ActivationCard"
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Implementation in Dropdown">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={linkHandlersDropdown}
                layout="column"
                name="Example - Dropdown"
              />
            }
            title="Examples: Dropdown.Link"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Other handlers">
        <BannerSlim
          iconAccessibilityLabel="Experimental feature"
          message={`Experimental feature: The "onRender" prop is experimental and might be removed in the future.`}
          type="warningBare"
        />
        <MainSection.Subsection
          description={`\`onRender\` is only called when the component mounts for the first time.

It's implemented in the following components:

- DateField: \`dateFieldHandlers\`
- DatePicker: \`datePickerHandlers\`
- DateRange: \`dateRangeHandlers\`

`}
          title="onRender"
        />
      </MainSection>

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-providers#globaleventshandlerprovider',
            text: 'Gestalt Providers in Pinboard',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: {
      generatedDocGen: await docGen('GlobalEventsHandlerProvider'),
    },
  };
}
