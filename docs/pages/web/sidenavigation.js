// @flow strict
import { type Node } from 'react';
import { SideNavigation, SlimBanner } from 'gestalt';
import MainSection from '../../docs-components/MainSection.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import { multipledocgen, type DocGen } from '../../docs-components/docgen.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import mainExample from '../../examples/sidenavigation/mainExample.js';
import correctLengthExample from '../../examples/sidenavigation/correctLengthExample.js';
import incorrectLengthExample from '../../examples/sidenavigation/incorrectLengthExample.js';
import correctGroupingExample from '../../examples/sidenavigation/correctGroupingExample.js';
import incorrectGroupingExample from '../../examples/sidenavigation/incorrectGroupingExample.js';
import correctIconExample from '../../examples/sidenavigation/correctIconExample.js';
import incorrectIconExample from '../../examples/sidenavigation/incorrectIconExample.js';
import correctHeadingExample from '../../examples/sidenavigation/correctHeadingExample.js';
import incorrectHeadingExample from '../../examples/sidenavigation/incorrectHeadingExample.js';
import activeItemExample from '../../examples/sidenavigation/activeItemExample.js';
import localizationExample from '../../examples/sidenavigation/localizationExample.js';
import sectionsExample from '../../examples/sidenavigation/sectionsExample.js';
import badgeExample from '../../examples/sidenavigation/badgeExample.js';
import borderExample from '../../examples/sidenavigation/borderExample.js';
import counterExample from '../../examples/sidenavigation/counterExample.js';
import customIconsExample from '../../examples/sidenavigation/customIconsExample.js';
import iconsExample from '../../examples/sidenavigation/iconsExample.js';
import headerExample from '../../examples/sidenavigation/headerExample.js';
import nestedExample from '../../examples/sidenavigation/nestedExample.js';
import notificationsExample from '../../examples/sidenavigation/notificationsExample.js';
import mobileExample from '../../examples/sidenavigation/mobileExample.js';

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
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning"
            message="This component is in the alpha phase and is still under development. The component will support three nested levels and accessibility keyboard navigation. The component will change behavior and the API might also change in future component version releases."
          />
        }
      >
        <SandpackExample
          code={mainExample}
          name="SideNavigation Main Example"
          showEditor={false}
          previewHeight={208}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.SideNavigation} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- When [Tabs](/web/tabs) or a top navigation cannot accommodate the number of links or sections you need to navigate through
- When a deep hierarchy of navigation items is needed
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- When you only have two to five items to navigate through. Use [Tabs](/web/tabs) instead
- When you need to open a menu of external links and actions via a button. Use [Dropdown](/web/dropdown) instead
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
            sandpackExample={
              <SandpackExample
                code={correctLengthExample}
                name="Correct length example"
                showEditor={false}
                previewHeight={230}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use long text labels that end up wrapping, especially in certain languages. Don’t shorten labels so much that they are hard to understand."
            sandpackExample={
              <SandpackExample
                code={incorrectLengthExample}
                name="Incorrect length example"
                showEditor={false}
                previewHeight={230}
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Group related items and use section headings to help users parse information and help with redundancy."
            sandpackExample={
              <SandpackExample
                code={correctGroupingExample}
                name="Correct grouping example"
                showEditor={false}
                previewHeight={286}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Provide an unordered “kitchen sink” of features that is hard to parse and creates redundancy."
            sandpackExample={
              <SandpackExample
                code={incorrectGroupingExample}
                name="Incorrect grouping example"
                showEditor={false}
                previewHeight={286}
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use icons that clearly match their text labels and serve as bullet points for the content."
            sandpackExample={
              <SandpackExample
                code={correctIconExample}
                name="Correct icon example"
                showEditor={false}
                previewHeight={164}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use icons if you’ll be forced to include icons that don’t quite reinforce their text labels."
            sandpackExample={
              <SandpackExample
                code={incorrectIconExample}
                name="Incorrect icon example"
                showEditor={false}
                previewHeight={164}
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Place under the PageHeader when SideNav is used to navigate urls that are sub-sections of a main page"
            sandpackExample={
              <SandpackExample
                code={correctHeadingExample}
                name="Correct heading example"
                showEditor={false}
                layout="column"
                previewHeight={230}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Omit a PageHeader and make it seem like each SideNav item is a primary, independent page."
            sandpackExample={
              <SandpackExample
                code={incorrectHeadingExample}
                name="Incorrect heading example"
                showEditor={false}
                layout="column"
                previewHeight={210}
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.SideNavigation?.displayName}>
        <MainSection.Subsection
          title="Active item"
          description={`SideNavigation.TopItem has an "active" state that visually identifies it. To set SideNavigation.TopItem to "active" set 'active="page"' (page redirect) or 'active="section"'. Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the SideNavigation.TopItem href, set SideNavigation.TopItem to "page". Use the example below as a reference.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={activeItemExample} name="Active item example" />
            }
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
          sandpackExample={
            <SandpackExample code={localizationExample} name="Localization example" />
          }
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
            sandpackExample={
              <SandpackExample code={sectionsExample} name="Sections example" previewHeight={470} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Header"
          description="Headers allow for sorting filters or another UI control to be included at the top of the navigation."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={headerExample} name="Header example" previewHeight={380} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Footer"
          description="Footers allow for filters, additional external links or other UI controls to be included at the bottom of the navigation."
        >
          <MainSection.Card
            defaultCode={`
<Box width="100%" height="100%">
  <Box height="100%" width={280} overflow="scroll">
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
            label: 'Active',
            counter: { number: '200', accessibilityLabel: '200 Pins' },
          },
          {
            label: 'Draft',
            counter: { number: '100', accessibilityLabel: '100 Pins' },
          },
        ].map(({ label, counter }, idx) => (
          <SideNavigation.TopItem
            key={idx}
            href="#"
            label={label}
            icon="ads-stats"
            counter={counter}
          />
        ))}
      </SideNavigation.Section>
    </SideNavigation>
  </Box>
</Box>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Badge"
          description="A badge can be added to a menu label with information that may be useful to a person, such as whether a page is new or is a beta or deprecated feature. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={badgeExample} name="Badge example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Border"
          description="A border can be added to the end edge of the navigation on dense surfaces with tight spacing where it helps to visually separate the nav from other content."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={borderExample} name="Border example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Icons"
          columns={2}
          description="Icons are used when simple, clear icons help users with scanning the content of a menu. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            title="Gestalt icon"
            sandpackExample={<SandpackExample code={iconsExample} name="Icons example" />}
          />
          <MainSection.Card
            title="Custom icon"
            sandpackExample={
              <SandpackExample code={customIconsExample} name="Custom icon example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Notification"
          description="A red indicator dot can be added to signify new items on a page or things that need your attention. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={notificationsExample} name="Notifications example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Counters"
          description="Counters can be included as indicators of the number of items on a page or section. Only include counters if it’s information that’s useful to the user to know before clicking on a menu item. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={counterExample} name="Counters example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Nested directory"
          description="SideNavigation supports three navigation levels. The top level is composed of [SideNavigation.TopItem](#SideNavigation.TopItem) and [SideNavigation.Group](#SideNavigation.Group). The second nested level is composed of [SideNavigation.NestedGroup](#SideNavigation.NestedGroup) and [SideNavigation.Item](#SideNavigation.Item). The third nested level is composed of SideNavigation.Item"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={nestedExample} name="Nested directory example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Mobile">
        <MainSection.Card
          sandpackExample={
            <SandpackExample code={mobileExample} name="Mobile example" previewHeight={500} />
          }
        />
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
**[Tabs](/web/tabs)**
Used to navigate between urls and placed horizontally. Tabs can be used when there are 2–5 URLs to navigate between and can be used as a sub-navigation after the top nav bar or after a SideNav.
`}
        />
        <MainSection.Subsection
          description={`
**[SegmentedControl](/web/segmentedcontrol)**
SegmentedControl is used to select between different views or arrangements of related content. Like Tabs, this control is horizontal, but unlike tabs, it doesn’t navigated between URLs.
`}
        />
        <MainSection.Subsection
          description={`
**[Dropdown](/web/dropdown)**
A custom menu to select URLs to navigate to, or actions to take. This is always triggered by a button.
`}
        />
        <MainSection.Subsection
          description={`
**[PageHeader](/web/pageheader)**
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
