// @flow strict
import { type Node } from 'react';
import { Link, Table, Text } from 'gestalt';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import noTranslations from '../../../examples/defaultlabelprovider/no-translations.js';
import translations from '../../../examples/defaultlabelprovider/translations.js';

// Function to generate the table below - need access to fallbackLabels to actually do so
function getLabelsTable(/* fallbackLabels: { [string]: { [string]: mixed } } */) {
  return [
    {
      'component': 'ActivationCard',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss',
    },
    {
      'component': 'Callout',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss Banner',
    },
    {
      'component': 'Callout',
      'prop': 'iconAccessibilityLabelError',
      'label': 'Error',
    },
    {
      'component': 'Callout',
      'prop': 'iconAccessibilityLabelInfo',
      'label': 'Information',
    },
    {
      'component': 'Callout',
      'prop': 'iconAccessibilityLabelRecommendation',
      'label': 'Recommendation',
    },
    {
      'component': 'Callout',
      'prop': 'iconAccessibilityLabelWarning',
      'label': 'Warning',
    },
    {
      'component': 'Callout',
      'prop': 'iconAccessibilityLabelSuccess',
      'label': 'Success',
    },
    {
      'component': 'ComboBox',
      'prop': 'noResultText',
      'label': 'No results',
    },
    {
      'component': 'ComboBox',
      'prop': 'accessibilityClearButtonLabel',
      'label': 'Clear input',
    },
    {
      'component': 'Link',
      'prop': 'accessibilityNewTabLabel',
      'label': 'Opens a new tab',
    },
    {
      'component': 'Modal',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss modal',
    },
    {
      'component': 'Popover',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss popover',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss overlay panel',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationMessage',
      'label': 'Are you sure you want to dismiss?',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationSubtext',
      'label': 'You will lose all of your changes. This cannot be undone',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationPrimaryActionText',
      'label': 'Yes, dismiss',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationPrimaryActionTextLabel',
      'label': 'Yes, dismiss the overlay panel',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationSecondaryActionText',
      'label': 'No, go back',
    },
    {
      'component': 'OverlayPanel',
      'prop': 'dismissConfirmationSecondaryActionTextLabel',
      'label': 'No, go back to the overlay panel',
    },
    {
      'component': 'SheetMobile',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss bottom sheet',
    },
    {
      'component': 'SheetMobile',
      'prop': 'accessibilityGrabberLabel',
      'label': 'Grabber',
    },
    {
      'component': 'SheetMobile',
      'prop': 'accessibilityLabel',
      'label': 'Bottom sheet',
    },
    {
      'component': 'SideNavigation',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss side navigation',
    },
    {
      'component': 'SlimBanner',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss banner',
    },
    {
      'component': 'SlimBanner',
      'prop': 'iconAccessibilityLabelError',
      'label': 'Error',
    },
    {
      'component': 'SlimBanner',
      'prop': 'iconAccessibilityLabelInfo',
      'label': 'Information',
    },
    {
      'component': 'SlimBanner',
      'prop': 'iconAccessibilityLabelRecommendation',
      'label': 'Recommendation',
    },
    {
      'component': 'SlimBanner',
      'prop': 'iconAccessibilityLabelWarning',
      'label': 'Warning',
    },
    {
      'component': 'SlimBanner',
      'prop': 'iconAccessibilityLabelSuccess',
      'label': 'Success',
    },
    {
      'component': 'Spinner',
      'prop': 'accessibilityLabel',
      'label': 'Loading',
    },
    {
      'component': 'Tag',
      'prop': 'accessibilityErrorIconLabel',
      'label': 'Error',
    },
    {
      'component': 'Tag',
      'prop': 'accessibilityRemoveIconLabel',
      'label': 'Remove tag',
    },
    {
      'component': 'Tag',
      'prop': 'accessibilityWarningIconLabel',
      'label': 'Warning',
    },
    {
      'component': 'TagData',
      'prop': 'accessibilityRemoveIconLabel',
      'label': 'Remove tag',
    },
    {
      'component': 'TextField',
      'prop': 'accessibilityHidePasswordLabel',
      'label': 'Hide password',
    },
    {
      'component': 'TextField',
      'prop': 'accessibilityShowPasswordLabel',
      'label': 'Show password',
    },
    {
      'component': 'HelpButton',
      'prop': 'tooltipMessage',
      'label': 'Click to learn more',
    },
    {
      'component': 'Toast',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss toast',
    },
    {
      'component': 'Toast',
      'prop': 'accessibilityIconSuccessLabel',
      'label': 'Success message',
    },
    {
      'component': 'Toast',
      'prop': 'accessibilityIconErrorLabel',
      'label': 'Error message',
    },
    {
      'component': 'Toast',
      'prop': 'accessibilityProcessingLabel',
      'label': 'Processing message',
    },
    {
      'component': 'Upsell',
      'prop': 'accessibilityDismissButtonLabel',
      'label': 'Dismiss banner',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityMaximizeLabel',
      'label': 'Maximize',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityMinimizeLabel',
      'label': 'Minimize',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityMuteLabel',
      'label': 'Mute',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityPauseLabel',
      'label': 'Pause',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityPlayLabel',
      'label': 'Play',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityProgressLabel',
      'label': 'Video progress',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityUnmuteLabel',
      'label': 'Unmute',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityHideCaptionsLabel',
      'label': 'Hide captions',
    },
    {
      'component': 'Video',
      'prop': 'accessibilityShowCaptionsLabel',
      'label': 'Show captions',
    },
  ];
}

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection
        name="Implementation"
        description={`
        To support internationalization and accessibility, Gestalt components have many required accessibility labels. This allows you to pass translated strings to ensure that users of all abilities and languages can use your app.

        However, certain labels are unlikely to change based on the specific implementation, e.g. the accessibility label for the close button on a modal. For supported labels on certain components, you can specify the label once, at the top level of your app, for use in all instances of that component throughout your app. This allows for certain accessibility label props to now be optional; the default label will be used unless overridden at the callsite.

        If your app supports internationalization, pass translated strings to the Provider. If your app does not support internationalization, you may pass untranslated strings, or you may omit the \`labels\` prop or pass \`null\` to use our default labels. See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.js) for the default English labels we provide.

        In the examples below, type a character to make the "clear input" icon button appear, then inspect that element and note the accessibility label.
        `}
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample code={translations} name="Translations example" previewHeight={320} />
          }
        />
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              code={noTranslations}
              name="No translations example"
              previewHeight={320}
            />
          }
        />
      </MainSection>
      <MainSection
        name="Default strings provided"
        description="The following strings are provided by default:"
      >
        <Table accessibilityLabel="Default strings provided table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Component</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Prop</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Default String</Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {getLabelsTable().map(({ component, prop, label }) => (
              <Table.Row key={`${component}-${prop}`}>
                <Table.Cell>
                  <Text>
                    <Link href={`/web/${component.toLowerCase()}`}>{component}</Link>
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>
                    <code>{prop}</code>
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{label}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'DefaultLabelProvider',
      }),
    },
  };
}
