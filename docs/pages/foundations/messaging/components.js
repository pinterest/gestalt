// @flow strict
import { Text, Flex, Box, Link } from 'gestalt';
import { type Node } from 'react';
import Example from '../../../docs-components/Example.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import defaultExample from '../../../examples/modal/defaultExample.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function ToolingPage(): Node {
  return (
    <Page title="Messaging components">
      <PageHeader name="Messaging components" type="guidelines" />
      <MainSection name="Callout">

      <Example id="calloutExample" name="Callout example" showCode={false} showHeading={false} defaultCode={`<Callout
  title='Your tag is not working'
  message='Data may be outdated because your tag is not sendng information. Fix your tag for the most accurate metrics.'
  type='error'
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Error"
  primaryAction={{
    accessibilityLabel: 'Fix tag',
    label: 'Fix tag',
    onClick: () => {},
  }}
/>`} />
      <Flex direction="column" gap={4}>
        <Text>Banners sit on a page or surface and provide status alerts, information or recommendations to a user. They are used for highest priority messages, usually at the top of a page.</Text>

        <Text><Link href='https://gestalt.pinterest.systems/web/callout'>Go to the Callout component</Link></Text>
        </Flex>
      </MainSection>
      <MainSection name="SlimBanner">
        <Example id="slimbannerExample" name="SlimBanner example" showCode={false} showHeading={false} defaultCode={`<SlimBanner
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Information"
  message="Idea Pins are now available across platforms."
  primaryAction={{
    accessibilityLabel: 'Apply for access',
    label: 'Apply for access',
    onClick: () => {},
  }}
  type="info"
/>`} />
      <Flex direction="column" gap={4}>
        <Text>SlimBanner conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. SlimBanners are used to reference a specific section of a page, or in any dense interface where space is a concern.</Text>

        <Text><Link href='https://gestalt.pinterest.systems/web/slimbanner'>Go to the SlimBanner componen</Link></Text>
        </Flex>
      </MainSection>
      <MainSection name="Modal">
        <SandpackExample code={defaultExample} name="Modal Main Example" hideEditor />
        <Text>A modal dialog can be used to alert a user of an issue, or to request confirmation after a user-generated action. AlertModal overlays and blocks Page content until it is dismissed by the user.</Text>

        <Text><Link href='https://gestalt.pinterest.systems/web/modal'>Go to the Modal component</Link></Text>
      </MainSection>
      <MainSection name="Toast">
      <Example
          id="toastExamples"
          name="Toast examples"
          showCode={false}
          showHeading={false}
          defaultCode={`
<Flex justifyContent="center" alignItems="center" direction="column" width="100%">
  <Toast
    button={<Button key="button-key" text="Undo" size="lg" />}
    text={
      <React.Fragment>
        Saved to{' '}
        <Text inline weight="bold">
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor" underline="hover">
            Home decor
          </Link>
        </Text>
      </React.Fragment>
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
  <Toast
    button={<Button key="button-key" text="Save to a board" size="lg" />}
    text="Saved"
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
    thumbnailShape="circle"
  />
  <Toast
    text="You’re not connected to the internet"
    variant="error"
  />
</Flex>
`}
        />
        <Flex direction="column" gap={4}>
          <Text>Toasts are the least disruptive of messages in that they are ephemeral and don’t require a user to act or dismiss them. They appear opposite  a surface’s main navigation and overlay content without fully blocking it. They can be used to:</Text>
          <Text>
            <ul>
              <li>Acknowledge a user action immediately after it happens</li>
              <li>Acknowledge a user action while nudging them to improve their experience</li>
              <li>Alert users of connectivity issues or unknown errors without disrupting their flow</li>
            </ul>
          </Text>
          <Text><Link href='https://gestalt.pinterest.systems/web/toast'>Go to the Toast component</Link></Text>
        </Flex>
      </MainSection>
      <MainSection name="What component should I use?">
        <Flex direction="column" gap={4}>
          <Text>Here is a quick diagram to help you make a decision on what Messaging component to use. If you don’t see it here, perhaps you need a related component.</Text>

          <Box>
          <iFrame style={{border:'none'}} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FXxaqjsGExBDWWs7HDRhaYW%2FMessaging-decision-tree-H2%3Fnode-id%3D102%253A1092" allowFullScreen />
          </Box>

          <Text>View in Figma</Text>
        </Flex>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Sheet](/web/sheet)**
To allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page, use Sheet.

**[Toast](/web/toast)**
Toast provides temporary feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of blocking the entire page.
      `}
        />
      </MainSection>
    </Page>
  );
}
