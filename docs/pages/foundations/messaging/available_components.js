// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import callout from '../../../examples/callout/main.js';
import modalalert from '../../../examples/modalalert/main.js';
import slimbanner from '../../../examples/slimbanner/main.js';
import toast from '../../../examples/toast/main.js';

export default function DocsPage(): Node {
  return (
    <Page title="Available messaging components">
      <PageHeader name="Available messaging components" type="guidelines" />

      <MainSection name="Components">
        <MainSection.Subsection
          title="Callout"
          description={`Callouts sit on a page or surface and provide status alerts, information or recommendations to a user. They are used for highest priority messages, usually at the top of a page.

[Go to the Callout component](/web/callout)`}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={callout} name="Callout example" hideEditor />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="SlimBanner"
          description={`SlimBanner conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. SlimBanners are used to reference a specific section of a page, or in any dense interface where space is a concern.

[Go to the SlimBanner component](/web/slimbanner)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={slimbanner} name="SlimBanner example" hideEditor />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="ModalAlert"
          description={`A modal dialog can be used to alert a user of an issue, or to request confirmation after a user-generated action. ModalAlert overlays and blocks page content until it is dismissed by the user.

[Go to the ModalAlert component](/web/modalalert)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={modalalert}
                name="ModalAlert example"
                hideEditor
                previewHeight={450}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Toast"
          description={`Toasts are the least disruptive of messages in that they are ephemeral and don’t require a user to act or dismiss them. They appear opposite a surface’s main navigation and overlay content without fully blocking it.

Toasts can be used to:
- Acknowledge a user action immediately after it happens"
- Acknowledge a user action while nudging them to improve their experience"
- Alert users of connectivity issues or unknown errors without disrupting their flow"

[Go to the Toast component](/web/toast)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={toast} name="Toast example" hideEditor previewHeight={150} />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="What component should I use?">
        <Flex direction="column" gap={4}>
          <Text>
            Here is a quick diagram to help you make a decision on what Messaging component to use.
            If you don’t see it here, perhaps you need a related component.
          </Text>

          <Box>
            <iframe
              title="Messaging Figma decision tree"
              style={{ border: 'none' }}
              width="100%"
              height="450"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FXxaqjsGExBDWWs7HDRhaYW%2FMessaging-decision-tree-H2%3Fnode-id%3D102%253A1092"
              allowFullScreen
            />
          </Box>

          <Text>
            <Link
              href="https://www.figma.com/file/XxaqjsGExBDWWs7HDRhaYW/Messaging-decision-tree-H2?node-id=102%3A1092"
              underline="always"
              externalLinkIcon="default"
            >
              View in Figma
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Popover](/web/popover)**
A popover can be formatted to provide help and guidance around new features, or features a user may not be aware of.

**[Upsell](/web/upsell)**
Upsells are on-page banners that encourage more ad spend and upgrades. They can also be used to promote and market new features.

**Error message variants**
Variants for other non-messaging components that provide a way to show an error message (simple error status indicators are not included)..

- [Text field error message](/web/textfield#Error-message)
- [RadioGroup error message](/web/radiogroup#With-an-error)
- [Checkbox error message](/web/checkbox#Error-message)
      `}
        />
      </MainSection>
    </Page>
  );
}
