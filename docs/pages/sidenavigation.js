// @flow strict
import { type Node } from 'react';
import { SideNavigation, SlimBanner } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import { multipledocgen, type DocGen } from '../components/docgen.js';
import AccessibilitySection from '../components/AccessibilitySection.js';

export default function SideNavigationPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.SideNavigation?.displayName ?? ''}>
      <PageHeader
        name={generatedDocGen.SideNavigation?.displayName}
        description={generatedDocGen.SideNavigation?.description}
        shadedCodeExample
        defaultCode={`
<SideNavigation accessibilityLabel="Main example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="bell"
    label="Notifications"
    counter={{ number: '20', accessibilityLabel: 'You have 20 notifications in your inbox' }}
    notificationAccessibilityLabel="New notifications"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="speech"
    label="Messages"
    counter={{ number: '10', accessibilityLabel: 'You have 10 messages in your inbox' }}
    notificationAccessibilityLabel="New messages"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="cog"
    label="Settings"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="lock"
    label="Business Access"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="add-layout"
    label="Tune your home feed"
    badge={{ text: 'New', type: 'info' }}
  />
</SideNavigation>
        `}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning"
            message="This component is in the alpha phase and is still under development. The component will support three nested levels and accessibility keyboard navigation. The component will change behavior and the API might also change in future component version releases."
          />
        }
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen.SideNavigation} />

      <AccessibilitySection name={generatedDocGen.SideNavigation?.displayName}>
        <MainSection.Subsection
          title="Active item"
          description='SideNavigation.Item has an "active" state that visually identifies it. To set SideNavigation.Item to active pass "page" (page redirect) or "section" (selected content section). Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the SideNavigation.Item href, set SideNavigation.Item to "page".'
        >
          <MainSection.Card
            shaded
            defaultCode={`
function Example() {
  const reactRouterPath = '/sidenavigation'

  return (
    <Box height={300} overflow="scroll">
      <SideNavigation accessibilityLabel="Active item example">
        <SideNavigation.Section label="Navigation">
          <SideNavigation.Item
            href="https://gestalt.pinterest.systems/pageheader"
            label="PageHeader"
          />
          <SideNavigation.Item
            href="https://gestalt.pinterest.systems/tabs"
            label="Tabs"
          />
          <SideNavigation.Item
            active={ reactRouterPath === '/sidenavigation' ? 'page' : undefined }
            href="https://gestalt.pinterest.systems/sidenavigation"
            label="SideNavigation"
            badge={{ text: 'New', type: 'info' }}
          />
        </SideNavigation.Section>
        <SideNavigation.Section label="Controls">
          <SideNavigation.Item
            href="https://gestalt.pinterest.systems/radiobutton"
            label="RadioButton"
            badge={{ text: 'Deprecated', type: 'warning' }}
          />
          <SideNavigation.Item
            href="https://gestalt.pinterest.systems/radiogroup"
            label="RadioGroup"
          />
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`accessibilityLabel\` in SideNavigation and all subcomponents as well. Note that localization can lengthen text by 20 to 30 percent.
        `}
      >
        <MainSection.Card
          shaded
          defaultCode={`
<SideNavigation accessibilityLabel="Localization example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="bell"
    label="Benachrichtigungen"
    counter={{ number: '20', accessibilityLabel: 'Sie haben 20 Benachrichtigungen' }}
    notificationAccessibilityLabel="Du hast neue Benachrichtigungen"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="speech"
    label="Mitteilungen"
    counter={{ number: '10', accessibilityLabel: 'Sie haben 10 Nachrichten' }}
    notificationAccessibilityLabel="Sie haben neue Nachrichten"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="cog"
    label="Einstellungen"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="lock"
    label="Geschäftszugriff"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="add-layout"
    label="Optimieren Sie Ihren Home-Feed"
    badge={{ text: 'New', type: 'info' }}
  />
</SideNavigation>
`}
        />
      </MainSection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationSection?.displayName}
          description={generatedDocGen.SideNavigationSection?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.Section}
            name={generatedDocGen.SideNavigationSection?.displayName}
            id={generatedDocGen.SideNavigationSection?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationSection}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationItem?.displayName}
          description={generatedDocGen.SideNavigationItem?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.Item}
            name={generatedDocGen.SideNavigationItem?.displayName}
            id={generatedDocGen.SideNavigationItem?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationItem}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationNestedItem?.displayName}
          description={generatedDocGen.SideNavigationNestedItem?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.NestedItem}
            name={generatedDocGen.SideNavigationNestedItem?.displayName}
            id={generatedDocGen.SideNavigationNestedItem?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationNestedItem}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationGroup?.displayName}
          description={generatedDocGen.SideNavigationGroup?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.Group}
            name={generatedDocGen.SideNavigationGroup?.displayName}
            id={generatedDocGen.SideNavigationGroup?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationGroup}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationNestedGroup?.displayName}
          description={generatedDocGen.SideNavigationNestedGroup?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.NestedGroup}
            name={generatedDocGen.SideNavigationNestedGroup?.displayName}
            id={generatedDocGen.SideNavigationNestedGroup?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationNestedGroup}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Sections">
          <MainSection.Card
            shaded
            defaultCode={`
<Box height={300} overflow="scroll">
  <SideNavigation accessibilityLabel="Sections example">
    <SideNavigation.Section label="Resources">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/eslint_plugin"
        label="Eslint plugin"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/faq"
        label="FAQ"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/how_to_hack_around_gestalt"
        label="How to hack around Gestalt"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/tooling"
        label="Tooling"
      />
    </SideNavigation.Section>
    <SideNavigation.Section label="Foundations">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/accessibility"
        label="Accessibility"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/elevation"
        label="Elevation"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/typography"
        label="Typography"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/color_palette"
        label="Color palette"
      />
    </SideNavigation.Section>
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Header">
          <MainSection.Card
            shaded
            defaultCode={`
function Example() {
  const [organisedBy, setOrganisedBy] = React.useState('categorized');

  return (
    <Box height={300} overflow="scroll">
      <SideNavigation
        accessibilityLabel="Header example"
        header={
          <RadioGroup legend="Sort by?" id="example-header">
            <Flex gap={2}>
              <RadioGroup.RadioButton
                checked={organisedBy === 'categorized'}
                id="category"
                label="Category"
                name="SortCategory"
                onChange={() => setOrganisedBy('categorized')}
                value="categorized"
                size="sm"
              />
              <RadioGroup.RadioButton
                checked={organisedBy === 'alphabetical'}
                id="alphabetical"
                label="Alphabetical"
                name="SortCAlphabetical"
                onChange={() => setOrganisedBy('alphabetical')}
                value="alphabetical"
                size="sm"
              />
            </Flex>
          </RadioGroup>
        }
      >
        {organisedBy === 'categorized' ? (
          <React.Fragment>
            <SideNavigation.Section label="Navigation">
              <SideNavigation.Item
                href="https://gestalt.pinterest.systems/pageheader"
                label="PageHeader"
              />
              <SideNavigation.Item
                href="https://gestalt.pinterest.systems/tabs"
                label="Tabs"
              />
              <SideNavigation.Item
                href="https://gestalt.pinterest.systems/tooling"
                label="SideNavigation"
                badge={{ text: 'New', type: 'info' }}
              />
            </SideNavigation.Section>
            <SideNavigation.Section label="Controls">
              <SideNavigation.Item
                href="https://gestalt.pinterest.systems/radiobutton"
                label="RadioButton"
                badge={{ text: 'Deprecated', type: 'warning' }}
              />
              <SideNavigation.Item
                href="https://gestalt.pinterest.systems/radiogroup"
                label="RadioGroup"
              />
            </SideNavigation.Section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SideNavigation.Item
              href="https://gestalt.pinterest.systems/pageheader"
              label="PageHeader"
            />
            <SideNavigation.Item
              href="https://gestalt.pinterest.systems/radiobutton"
              label="RadioButton"
              badge={{ text: 'Deprecated', type: 'warning' }}
            />
            <SideNavigation.Item
              href="https://gestalt.pinterest.systems/radiogroup"
              label="RadioGroup"
            />
            <SideNavigation.Item
              href="https://gestalt.pinterest.systems/tooling"
              label="SideNavigation"
              badge={{ text: 'New', type: 'info' }}
            />
            <SideNavigation.Item
              href="https://gestalt.pinterest.systems/tabs"
              label="Tabs"
            />
          </React.Fragment>
        )}
      </SideNavigation>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Footer">
          <MainSection.Card
            shaded
            defaultCode={`
function Example() {
  const [active, setActive] = React.useState(null);

  return (
    <Box height={300} overflow="scroll">
      <SideNavigation
        accessibilityLabel="Footer example"
        footer={
          <Flex direction="column" gap={4}>
            <Text size="300" weight="bold">
              Filters
            </Text>
            <Fieldset legend="Campaign filters" legendDisplay="hidden">
              <Flex direction="column" gap={4}>
                <DatePicker
                  id="example-start-date"
                  label="Start"
                  onChange={() => {}}
                  rangeSelector="start"
                  value={new Date()}
                />
                <DatePicker
                  id="example-end-date"
                  label="End"
                  onChange={() => {}}
                  rangeSelector="end"
                  value={new Date(+7)}
                />
              </Flex>
            </Fieldset>
          </Flex>
        }
      >
        <SideNavigation.Section label="Campaigns">
          {[
            {
              label:'Active',
              counter: { number: '200', accessibilityLabel: '200 Pins' },
            },
            {
              label: 'Draft',
              counter: { number: '100', accessibilityLabel: '100 Pins' },
            },
          ].map(({ badge, label, counter }) => (
            <SideNavigation.Item
              href="#"
              label={label}
              icon="ads-stats"
              badge={badge}
              counter={counter}
            />
          ))}
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Badge">
          <MainSection.Card
            shaded
            defaultCode={`
<Box height={300} overflow="scroll">
  <SideNavigation accessibilityLabel="Badge example">
    <SideNavigation.Section label="Navigation">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/pageheader"
        label="PageHeader"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/tabs"
        label="Tabs"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/tooling"
        label="SideNavigation"
        badge={{ text: 'New', type: 'info' }}
      />
    </SideNavigation.Section>
    <SideNavigation.Section label="Controls">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/radiobutton"
        label="RadioButton"
        badge={{ text: 'Deprecated', type: 'warning' }}
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/radiogroup"
        label="RadioGroup"
      />
    </SideNavigation.Section>
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Border">
          <MainSection.Card
            defaultCode={`
<Box height={300} overflow="scroll">
  <SideNavigation accessibilityLabel="Border example" showBorder>
    <SideNavigation.Section label="Navigation">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/pageheader"
        label="PageHeader"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/tabs"
        label="Tabs"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/tooling"
        label="SideNavigation"
      />
    </SideNavigation.Section>
    <SideNavigation.Section label="Controls">
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/radiobutton"
        label="RadioButton"
      />
      <SideNavigation.Item
        href="https://gestalt.pinterest.systems/radiogroup"
        label="RadioGroup"
      />
    </SideNavigation.Section>
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Icons" columns={2}>
          <MainSection.Card
            shaded
            title="Gestalt icon"
            defaultCode={`
<SideNavigation accessibilityLabel="Icons example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="bell"
    label="Notifications"
    counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="speech"
    label="Messages"
    counter={{ number: '10', accessibilityLabel: 'You have 10 messages' }}
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="cog"
    label="Settings"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="lock"
    label="Business Access"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon="add-layout"
    label="Tune your home feed"
  />
</SideNavigation>`}
          />
          <MainSection.Card
            shaded
            title="Custom icon"
            defaultCode={`
<SideNavigation accessibilityLabel="Custom icons example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon={{ __path: 'M14 17.5c0 1.378-1.122 2.5-2.5 2.5A2.503 2.503 0 0 1 9 17.5V17h5v.5zm8.947-1.87L18.701 2.712a1.022 1.022 0 0 0-1.566-.521l-15.7 11.24c-.37.264-.525.744-.382 1.179l.551 1.678c.14.425.532.712.974.712H7v.5a4.5 4.5 0 0 0 9 0V17h5.973c.7 0 1.195-.696.974-1.37z'}}
    label="Notifications"
    counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon={{ __path: 'M0 6a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4zm3.52-.88 7.53 6.16a1.5 1.5 0 0 0 1.9 0l7.53-6.16A1 1 0 0 0 20 5H4a1 1 0 0 0-.48.12zM3 8.57V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.57l-6.15 5.04a4.5 4.5 0 0 1-5.7 0z'}}
    label="Messages"
    counter={{ number: '10', accessibilityLabel: 'You have 10 messages' }}
    notificationAccessibilityLabel="You have new messages"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon={{ __path: 'm2.337 19.942 5.671-1.977L19.265 6.706c.981-.98.981-2.57 0-3.55l-1.42-1.421a2.51 2.51 0 0 0-3.55 0L3.036 12.992l-1.978 5.671a1.005 1.005 0 0 0 1.279 1.279M23 22c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1h20c.55 0 1 .45 1 1'}}
    label="Settings"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
    label="Business Access"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    icon={{ __path: 'M5 1h5.75v22H5c-2.2 0-4-1.8-4-4V5c0-2.2 1.8-4 4-4zm18 4v5.75h-9.75V1H19c2.2 0 4 1.8 4 4zm-9.75 8.25H23V19c0 2.2-1.8 4-4 4h-5.75z'}}
    label="Tune your home feed"
  />
</SideNavigation>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Notification">
          <MainSection.Card
            shaded
            defaultCode={`
<SideNavigation accessibilityLabel="Notification example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Notifications"
    counter={{ number: '20', accessibilityLabel: 'You have 20 notifications in your inbox' }}
    notificationAccessibilityLabel="New notifications"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Messages"
    counter={{ number: '10', accessibilityLabel: 'You have 10 messages in your inbox' }}
    notificationAccessibilityLabel="New messages"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Settings"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Business Access"
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Tune your home feed"
  />
</SideNavigation>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Counters">
          <MainSection.Card
            shaded
            defaultCode={`
<SideNavigation accessibilityLabel="Counters example">
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Under review"
    counter={{ number: '20', accessibilityLabel: 'You have 20 Idea Pins under review' }}
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Drafts"
    counter={{ number: '5', accessibilityLabel: 'You have 5 Idea Pins drafts' }}
  />
  <SideNavigation.Item
    href="#"
    onClick={({ event }) => event.preventDefault()}
    label="Published"
    counter={{ number: '200', accessibilityLabel: 'You have published 200 Idea Pins' }}
  />
</SideNavigation>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Nested directory">
          <MainSection.Card
            shaded
            defaultCode={`
<Box height={300} overflow="scroll">
  <SideNavigation accessibilityLabel="Nested items example">
    <SideNavigation.Item
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Reporting"
      icon="ads-stats"
    />
    <SideNavigation.Item
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Conversions"
      icon="replace"
    />
    <SideNavigation.Section label="Audiences">
      <SideNavigation.Item
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Thanksgiving"
        icon="people"
      />
      <SideNavigation.Group label="Christmas" icon="people">
        <SideNavigation.NestedItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Luxury Christmas"
        />
        <SideNavigation.NestedGroup label="Classic Christmas">
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="West Coast"
          />
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="East Coast"
          />
        </SideNavigation.NestedGroup>
        <SideNavigation.NestedGroup label="Alternative Christmas">
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="West Coast"
          />
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="East Coast"
          />
        </SideNavigation.NestedGroup>
      </SideNavigation.Group>
      <SideNavigation.Group label="Halloween" icon="people" display="static">
        <SideNavigation.NestedItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="East Coast"
        />
        <SideNavigation.NestedItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="West Coast"
        />
      </SideNavigation.Group>
    </SideNavigation.Section>
  </SideNavigation>
</Box>`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipledocgen({
    componentName: [
      'SideNavigation',
      'SideNavigationSection',
      'SideNavigationItem',
      'SideNavigationNestedItem',
      'SideNavigationGroup',
      'SideNavigationNestedGroup',
    ],
  });

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
