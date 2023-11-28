// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import activeItemExample from '../../examples/sidenavigation/activeItemExample';
import badgeExample from '../../examples/sidenavigation/badgeExample';
import borderExample from '../../examples/sidenavigation/borderExample';
import correctGroupingExample from '../../examples/sidenavigation/correctGroupingExample';
import correctHeadingExample from '../../examples/sidenavigation/correctHeadingExample';
import correctIconExample from '../../examples/sidenavigation/correctIconExample';
import correctLengthExample from '../../examples/sidenavigation/correctLengthExample';
import counterExample from '../../examples/sidenavigation/counterExample';
import customIconsExample from '../../examples/sidenavigation/customIconsExample';
import displayExpandable from '../../examples/sidenavigation/displayExpandable';
import displayExpanded from '../../examples/sidenavigation/displayExpanded';
import displayStatic from '../../examples/sidenavigation/displayStatic';
import footerVariant from '../../examples/sidenavigation/footerVariant';
import headerExample from '../../examples/sidenavigation/headerExample';
import iconsExample from '../../examples/sidenavigation/iconsExample';
import incorrectGroupingExample from '../../examples/sidenavigation/incorrectGroupingExample';
import incorrectHeadingExample from '../../examples/sidenavigation/incorrectHeadingExample';
import incorrectIconExample from '../../examples/sidenavigation/incorrectIconExample';
import incorrectLengthExample from '../../examples/sidenavigation/incorrectLengthExample';
import localizationLabels from '../../examples/sidenavigation/localizationLabels';
import mainExample from '../../examples/sidenavigation/mainExample';
import mobileExample from '../../examples/sidenavigation/mobileExample';
import nestedExample from '../../examples/sidenavigation/nestedExample';
import notificationsExample from '../../examples/sidenavigation/notificationsExample';
import primaryAction from '../../examples/sidenavigation/primaryAction';
import sectionsExample from '../../examples/sidenavigation/sectionsExample';
import subcomponent from '../../examples/sidenavigation/subcomponent';

export default function SideNavigationPage({
  generatedDocGen,
}: {
  generatedDocGen: { [string]: DocGen },
}): ReactNode {
  return (
    <Page title={generatedDocGen.SideNavigation?.displayName ?? ''}>
      <PageHeader
        name={generatedDocGen.SideNavigation?.displayName}
        description={generatedDocGen.SideNavigation?.description}
      >
        <SandpackExample
          code={mainExample}
          name="SideNavigation Main Example"
          hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
                hideEditor
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
          description={`SideNavigation.TopItem and SideNavigation.NestedItem have an "active" state that visually identifies it. To set them to "active" set 'active="page"' (page redirect) or 'active="section"'. Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the SideNavigation.TopItem href, set SideNavigation.TopItem to "page". Use the example below as a reference.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={activeItemExample} name="Active item example" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen.SideNavigationSection?.displayName}
        notes={`
When the text of the SideNav.Item becomes longer than the width of the menu, either intentionally or through localization, will wrap as needed to display the full text. Keep this in mind when selecting wording for your SideNavigation menu items.

Note that \`dismissButton.accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.
        `}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen.SideNavigationSection?.displayName}
          description={generatedDocGen.SideNavigationSection?.description}
        >
          <GeneratedPropTable
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
            sandpackExample={<SandpackExample name="Footer Variant Example" code={footerVariant} />}
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
          description="Icons are used when simple, clear icons help users with scanning the content of a menu. Only supported in SideNavigation.TopItem and SideNavigation.Group."
        >
          <MainSection.Card
            cardSize="lg"
            title="Gestalt icon"
            sandpackExample={<SandpackExample code={iconsExample} name="Icons example" />}
          />
          <MainSection.Card
            cardSize="lg"
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
          description="Counters can be included as indicators of the number of items on a page or section.

Only include counters if the information is useful for the user to know before clicking on a menu item.

To prevent visual overload, do not include counters in the parent if the children have counters.
"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={counterExample} name="Counters example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Primary action"
          description={`SideNavigation.TopItem and SideNavigation.Group support an optional \`primaryAction\`.

\`primaryAction\` can be a simple [IconButton](https://gestalt.pinterest.systems/web/iconbutton) or a [Dropdown](https://gestalt.pinterest.systems/web/dropdown). For the latter, set \`dropdownItems\` using an array of [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Dropdown.Item).
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={primaryAction}
                name="Primary action example"
                previewHeight={500}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Nested directory"
          description="SideNavigation supports three navigation levels. The top level is composed of [SideNavigation.TopItem](#SideNavigation.TopItem) and [SideNavigation.Group](#SideNavigation.Group). The second nested level is composed of [SideNavigation.NestedGroup](#SideNavigation.NestedGroup) and [SideNavigation.Item](#SideNavigation.Item). The third nested level is composed of SideNavigation.Item"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={nestedExample} name="Nested example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Group display"
          columns={2}
          description="Group display can be \:
1. static: groups are expanded by default and there isn't expanding/collapsing behavior
2. expandable: group is expandable and all items are initially collapsed except groups with active children
3. expandableExpanded: group is expandable and all items are initially expanded"
        >
          <MainSection.Card
            title="display='static'"
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={displayStatic} name="Static display example" layout="column" />
            }
          />
          <MainSection.Card
            title="display='expandable'"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                layout="column"
                code={displayExpandable}
                name="Expandable display example"
              />
            }
          />
          <MainSection.Card
            title="display='expandableExpanded'"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                layout="column"
                code={displayExpanded}
                name="Expanded display example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Subcomponent composability"
          description={`SideNavigation requires its own subcomponents as children to build the list of navigation items.

When building SideNavigation, we might want to render different combinations of subcomponents conditionally. SideNavigation supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases. More logic complexity might break the correct SideNavigation behavior.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={subcomponent}
                name="Subcomponent reusability example"
                previewHeight={500}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Mobile"
          description={`SideNavigation requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

For mobile, \`title\` and \`dismissButton\` become required props.

Notice that the mobile UI requires logic to hide and show SideNavigation full width. If [Button](/web/button) or [TapArea](/web/taparea) control the visibility of SideNavigation, use \`accessibilityControls\` so that screen reader users can identify the relationship between elements.
  `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobileExample} name="Mobile example" layout="mobileRow" />
            }
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

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: { [string]: DocGen } },
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen([
        'SideNavigation',
        'SideNavigationSection',
        'SideNavigationTopItem',
        'SideNavigationNestedItem',
        'SideNavigationGroup',
        'SideNavigationNestedGroup',
      ]),
    },
  };
}
