// @flow strict
import { type Node } from 'react';
import { SideNavigation, SlimBanner } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import { multipledocgen, type DocGen } from '../components/docgen.js';
import AccessibilitySection from '../components/AccessibilitySection.js';
import QualityChecklist from '../components/QualityChecklist.js';

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
        defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Main example" showBorder>
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Public profile"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Personal information"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Account management"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tune your home feed"
    />
  </SideNavigation>
</Box>
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

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- When [Tabs](/tabs) or a top navigation cannot accommodate the number of links or sections you need to navigate through
- When a deep hierarchy of navigation items is needed
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- When you only have two to five items to navigate through. Use [Tabs](/tabs) instead
- When you need to open a menu of external links and actions via a button. Use [Dropdown](/dropdown) instead
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep item labels brief and clear to keep them memorable and scannable."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Correct length example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Public profile"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Personal information"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Account management"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tune your home feed"
    />
  </SideNavigation>
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use long text labels that end up wrapping, especially in certain languages. Don’t shorten labels so much that they are hard to understand."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Incorrect length example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Your public profile: Hsiu Li user number 221"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Personal"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Account"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Make your home feed more relevant"
    />
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Group related items and use section headings to help users parse information and help with redundancy."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Correct grouping example">
    <SideNavigation.Section label="Pinterest tag">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tag manager"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tag health"
      />
    </SideNavigation.Section>
    <SideNavigation.Section label="Conversion upload">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Upload file"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Upload history"
      />
    </SideNavigation.Section>
  </SideNavigation>
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Provide an unordered “kitchen sink” of features that is hard to parse and creates redundancy."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Incorrect grouping example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Pinterest tag manager"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Conversion file upload"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Conversion upload history"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Pinterest tag health"
    />
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use icons that clearly match their text labels and serve as bullet points for the content."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Correct icon example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tag manager"
      icon="tag"
    />
    <SideNavigation.TopItem
      href="#"
      icon="arrow-circle-up"
      onClick={({ event }) => event.preventDefault()}
      label="Upload file"
    />
    <SideNavigation.TopItem
      href="#"
      icon="clock"
      onClick={({ event }) => event.preventDefault()}
      label="Upload history"
    />
  </SideNavigation>
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use icons if you’ll be forced to include icons that don’t quite reinforce their text labels."
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Incorrect icon example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tag manager"
      icon="margins-small"
    />
    <SideNavigation.TopItem
      href="#"
      icon="refresh"
      onClick={({ event }) => event.preventDefault()}
      label="Upload file"
    />
    <SideNavigation.TopItem
      href="#"
      icon="visit"
      onClick={({ event }) => event.preventDefault()}
      label="Upload history"
    />
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Place under the PageHeader when SideNav is used to navigate urls that are sub-sections of a main page"
            defaultCode={`
<Box direction="column" width="100%">
  <Box paddingY={4} paddingX={8} width="100%" dangerouslySetInlineStyle={{ __style: { borderBottom: "1px solid var(--color-border-container)"}}}>
    {/* This is replacing an actual PageHeader so we don't run into accessibility error in the page */}
    <Heading accessibilityLevel="none" size={500}>Tag manager</Heading>
  </Box>
  <Flex>
    <SideNavigation accessibilityLabel="Correct headings example" showBorder>
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tag manager"
        icon="margins-small"
        selected="section"
      />
      <SideNavigation.TopItem
        href="#"
        icon="refresh"
        onClick={({ event }) => event.preventDefault()}
        label="Upload file"
      />
      <SideNavigation.TopItem
        href="#"
        icon="visit"
        onClick={({ event }) => event.preventDefault()}
        label="Upload history"
      />
    </SideNavigation>
    <Box padding={4}>
      <Heading accessibilityLevel={2} size={400}>Tag manager</Heading>
    </Box>
  </Flex>
</Box>
`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Omit a PageHeader and make it seem like each SideNav item is a primary, independent page."
            defaultCode={`
<Flex width="100%">
  <SideNavigation accessibilityLabel="Incorrect headings example" showBorder>
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tag manager"
      icon="margins-small"
      selected="section"
    />
    <SideNavigation.TopItem
      href="#"
      icon="refresh"
      onClick={({ event }) => event.preventDefault()}
      label="Upload file"
    />
    <SideNavigation.TopItem
      href="#"
      icon="visit"
      onClick={({ event }) => event.preventDefault()}
      label="Upload history"
    />
  </SideNavigation>
  <Box paddingX={4}>
    <Heading accessibilityLevel="none" size={500}>Tag manager</Heading>
  </Box>
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.SideNavigation?.displayName}>
        <MainSection.Subsection
          title="Active item"
          description={`SideNavigation.TopItem has an "active" state that visually identifies it. To set SideNavigation.TopItem to "active" set 'active="page"' (page redirect) or 'active="section"'. Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the SideNavigation.TopItem href, set SideNavigation.TopItem to "page". Use the example below as a reference.`}
        >
          <MainSection.Card
            defaultCode={`
function Example() {
  const reactRouterPath = '/sidenavigation'

  return (
    <Box width="100%">
      <Box height={300} width={280} overflow="scroll">
        <SideNavigation accessibilityLabel="Active item example">
          <SideNavigation.Section label="Navigation">
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/pageheader"
              label="PageHeader"
            />
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/tabs"
              label="Tabs"
            />
            <SideNavigation.TopItem
              active={ reactRouterPath === '/sidenavigation' ? 'page' : undefined }
              href="https://gestalt.pinterest.systems/sidenavigation"
              label="SideNavigation"
              badge={{ text: 'New', type: 'info' }}
            />
          </SideNavigation.Section>
          <SideNavigation.Section label="Controls">
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/radiobutton"
              label="RadioButton"
              badge={{ text: 'Deprecated', type: 'warning' }}
            />
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/radiogroup"
              label="RadioGroup"
            />
          </SideNavigation.Section>
        </SideNavigation>
      </Box>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`
        Be sure to localize the \`accessibilityLabel\` in SideNavigation and all subcomponents as well. When the text of the SideNav.Item becomes longer than the width of the menu, either intentionally or through localization, will wrap as needed to display the full text. Keep this in mind when selecting wording for your SideNavigation menu items.
        `}
      >
        <MainSection.Card
          defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Localization example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="bell"
      label="Benachrichtigungen"
      counter={{ number: '20', accessibilityLabel: 'Sie haben 20 Benachrichtigungen' }}
      notificationAccessibilityLabel="Du hast neue Benachrichtigungen"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="speech"
      label="Mitteilungen"
      counter={{ number: '10', accessibilityLabel: 'Sie haben 10 Nachrichten' }}
      notificationAccessibilityLabel="Sie haben neue Nachrichten"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="cog"
      label="Einstellungen"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="lock"
      label="Geschäftszugriff"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="add-layout"
      label="Optimieren Sie Ihren Home-Feed"
      badge={{ text: 'New', type: 'info' }}
    />
  </SideNavigation>
</Box>
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
          title={generatedDocGen.SideNavigationTopItem?.displayName}
          description={generatedDocGen.SideNavigationTopItem?.description}
        >
          <GeneratedPropTable
            Component={SideNavigation?.TopItem}
            name={generatedDocGen.SideNavigationTopItem?.displayName}
            id={generatedDocGen.SideNavigationTopItem?.displayName}
            generatedDocGen={generatedDocGen.SideNavigationTopItem}
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
        <MainSection.Subsection
          title="Sections"
          description="Sections help with categorizing navigation menu items into groups and also avoid redundant language in labels."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <Box height={300} width={280} overflow="scroll">
    <SideNavigation accessibilityLabel="Sections example">
      <SideNavigation.Section label="Resources">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/eslint_plugin"
          label="Eslint plugin"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/faq"
          label="FAQ"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/how_to_hack_around_gestalt"
          label="How to hack around Gestalt"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tooling"
          label="Tooling"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Foundations">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/accessibility"
          label="Accessibility"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/elevation"
          label="Elevation"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/typography"
          label="Typography"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/color_palette"
          label="Color palette"
        />
      </SideNavigation.Section>
    </SideNavigation>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Header"
          description="Headers allow for sorting filters or another UI control to be included at the top of the navigation."
        >
          <MainSection.Card
            defaultCode={`
function Example() {
  const [organisedBy, setOrganisedBy] = React.useState('categorized');

  return (
    <Box width="100%">
      <Box height={300} width={280} overflow="scroll">
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
                <SideNavigation.TopItem
                  href="https://gestalt.pinterest.systems/pageheader"
                  label="PageHeader"
                />
                <SideNavigation.TopItem
                  href="https://gestalt.pinterest.systems/tabs"
                  label="Tabs"
                />
                <SideNavigation.TopItem
                  href="https://gestalt.pinterest.systems/tooling"
                  label="SideNavigation"
                  badge={{ text: 'New', type: 'info' }}
                />
              </SideNavigation.Section>
              <SideNavigation.Section label="Controls">
                <SideNavigation.TopItem
                  href="https://gestalt.pinterest.systems/radiobutton"
                  label="RadioButton"
                  badge={{ text: 'Deprecated', type: 'warning' }}
                />
                <SideNavigation.TopItem
                  href="https://gestalt.pinterest.systems/radiogroup"
                  label="RadioGroup"
                />
              </SideNavigation.Section>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SideNavigation.TopItem
                href="https://gestalt.pinterest.systems/pageheader"
                label="PageHeader"
              />
              <SideNavigation.TopItem
                href="https://gestalt.pinterest.systems/radiobutton"
                label="RadioButton"
                badge={{ text: 'Deprecated', type: 'warning' }}
              />
              <SideNavigation.TopItem
                href="https://gestalt.pinterest.systems/radiogroup"
                label="RadioGroup"
              />
              <SideNavigation.TopItem
                href="https://gestalt.pinterest.systems/tooling"
                label="SideNavigation"
                badge={{ text: 'New', type: 'info' }}
              />
              <SideNavigation.TopItem
                href="https://gestalt.pinterest.systems/tabs"
                label="Tabs"
              />
            </React.Fragment>
          )}
        </SideNavigation>
      </Box>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Footer"
          description="Footers allow for filters, additional external links or other UI controls to be included at the bottom of the navigation."
        >
          <MainSection.Card
            defaultCode={`
function Example() {
  const [active, setActive] = React.useState(null);

  return (
    <Box width="100%">
      <Box height={300} width={280} overflow="scroll">
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
            ].map(({ badge, label, counter }, idx) => (
              <SideNavigation.TopItem
                key={idx}
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
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Badge"
          description="A badge can be added to a menu label with information that may be useful to a person, such as whether a page is new or is a beta or deprecated feature. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <Box height={300} width={280} overflow="scroll">
    <SideNavigation accessibilityLabel="Badge example">
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/pageheader"
          label="PageHeader"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tabs"
          label="Tabs"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tooling"
          label="SideNavigation"
          badge={{ text: 'New', type: 'info' }}
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiobutton"
          label="RadioButton"
          badge={{ text: 'Deprecated', type: 'warning' }}
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiogroup"
          label="RadioGroup"
        />
      </SideNavigation.Section>
    </SideNavigation>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Border"
          description="A border can be added to the end edge of the navigation on dense surfaces with tight spacing where it helps to visually separate the nav from other content."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <Box height={300} width={280} overflow="scroll">
    <SideNavigation accessibilityLabel="Border example" showBorder>
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/pageheader"
          label="PageHeader"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tabs"
          label="Tabs"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tooling"
          label="SideNavigation"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiobutton"
          label="RadioButton"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiogroup"
          label="RadioGroup"
        />
      </SideNavigation.Section>
    </SideNavigation>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Icons"
          columns={2}
          description="Icons are used when simple, clear icons help users with scanning the content of a menu. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            title="Gestalt icon"
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Icons example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="bell"
      label="Notifications"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="speech"
      label="Messages"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="cog"
      label="Settings"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="lock"
      label="Business Access"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon="add-layout"
      label="Tune your home feed"
    />
  </SideNavigation>
</Box>
`}
          />
          <MainSection.Card
            title="Custom icon"
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Custom icons example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon={{ __path: 'M14 17.5c0 1.378-1.122 2.5-2.5 2.5A2.503 2.503 0 0 1 9 17.5V17h5v.5zm8.947-1.87L18.701 2.712a1.022 1.022 0 0 0-1.566-.521l-15.7 11.24c-.37.264-.525.744-.382 1.179l.551 1.678c.14.425.532.712.974.712H7v.5a4.5 4.5 0 0 0 9 0V17h5.973c.7 0 1.195-.696.974-1.37z'}}
      label="Notifications"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon={{ __path: 'M0 6a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4zm3.52-.88 7.53 6.16a1.5 1.5 0 0 0 1.9 0l7.53-6.16A1 1 0 0 0 20 5H4a1 1 0 0 0-.48.12zM3 8.57V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.57l-6.15 5.04a4.5 4.5 0 0 1-5.7 0z'}}
      label="Messages"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon={{ __path: 'm2.337 19.942 5.671-1.977L19.265 6.706c.981-.98.981-2.57 0-3.55l-1.42-1.421a2.51 2.51 0 0 0-3.55 0L3.036 12.992l-1.978 5.671a1.005 1.005 0 0 0 1.279 1.279M23 22c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1h20c.55 0 1 .45 1 1'}}
      label="Settings"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
      label="Business Access"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      icon={{ __path: 'M5 1h5.75v22H5c-2.2 0-4-1.8-4-4V5c0-2.2 1.8-4 4-4zm18 4v5.75h-9.75V1H19c2.2 0 4 1.8 4 4zm-9.75 8.25H23V19c0 2.2-1.8 4-4 4h-5.75z'}}
      label="Tune your home feed"
    />
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Notification"
          description="A red indicator dot can be added to signify new items on a page or things that need your attention. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Notification example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Notifications"
      counter={{ number: '20', accessibilityLabel: 'You have 20 notifications in your inbox' }}
      notificationAccessibilityLabel="New notifications"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Messages"
      counter={{ number: '10', accessibilityLabel: 'You have 10 messages in your inbox' }}
      notificationAccessibilityLabel="New messages"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Settings"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Business Access"
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Tune your home feed"
    />
  </SideNavigation>
</Box>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Counters"
          description="Counters can be included as indicators of the number of items on a page or section. Only include counters if it’s information that’s useful to the user to know before clicking on a menu item. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <SideNavigation accessibilityLabel="Counters example">
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Under review"
      counter={{ number: '20', accessibilityLabel: 'You have 20 Idea Pins under review' }}
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Drafts"
      counter={{ number: '5', accessibilityLabel: 'You have 5 Idea Pins drafts' }}
    />
    <SideNavigation.TopItem
      href="#"
      onClick={({ event }) => event.preventDefault()}
      label="Published"
      counter={{ number: '200', accessibilityLabel: 'You have published 200 Idea Pins' }}
    />
  </SideNavigation>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Nested directory"
          description="SideNavigation supports three navigation levels. The top level is composed of [SideNavigation.TopItem](#SideNavigation.TopItem) and [SideNavigation.Group](#SideNavigation.Group). The second nested level is composed of [SideNavigation.NestedGroup](#SideNavigation.NestedGroup) and [SideNavigation.Item](#SideNavigation.Item). The third nested level is composed of SideNavigation.Item"
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%">
  <Box height={300} width={280} overflow="scroll">
    <SideNavigation accessibilityLabel="Nested items example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Reporting"
        icon="ads-stats"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Conversions"
        icon="replace"
      />
      <SideNavigation.Section label="Audiences">
        <SideNavigation.TopItem
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
  </Box>
</Box>`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Keep menu item labels brief, remembering that length is language-dependent`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use complete sentences or lengthy descriptions
- Be redundant; use a section header if you find yourself repeating the same word over and over again in labels`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.SideNavigation.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Tabs](/tabs)**
Used to navigate between urls and placed horizontally. Tabs can be used when there are 2–5 URLs to navigate between and can be used as a sub-navigation after the top nav bar or after a SideNav.
`}
        />
        <MainSection.Subsection
          description={`
**[SegmentedControl](/segmentedcontrol)**
SegmentedControl is used to select between different views or arrangements of related content. Like Tabs, this control is horizontal, but unlike tabs, it doesn’t navigated between URLs.
`}
        />
        <MainSection.Subsection
          description={`
**[Dropdown](/dropdown)**
A custom menu to select URLs to navigate to, or actions to take. This is always triggered by a button.
`}
        />
        <MainSection.Subsection
          description={`
**[PageHeader](/pageheader)**
For pages with a main top nav bar, every SideNav should have a PageHeader to announce the main page that the navigation items belong to. Exceptions are internal tools or developer platform interfaces where the SideNav is the main navigation.
`}
        />
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
      'SideNavigationTopItem',
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
