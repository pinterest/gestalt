import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
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
import collapsibleExample from '../../examples/sidenavigation/collapsibleExample';
import collapsibleHeaderExample from '../../examples/sidenavigation/collapsibleHeaderExample';
import collapsibleWithMixedIconsExample from '../../examples/sidenavigation/collapsibleWithMixedIconsExample';
import collapsibleWithoutIconsExample from '../../examples/sidenavigation/collapsibleWithoutIconsExample';
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
import groupLinkDisplayExpadable from '../../examples/sidenavigation/groupLinkDisplayExpadable';
import groupLinkDisplayStatic from '../../examples/sidenavigation/groupLinkDisplayStatic';
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

const DOC_NAMES = [
  'SideNavigation',
  'SideNavigationSection',
  'SideNavigationTopItem',
  'SideNavigationNestedItem',
  'SideNavigationGroup',
  'SideNavigationNestedGroup',
] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function SideNavigationPage({
  generatedDocGen,
}: {
  generatedDocGen: GeneratedDocGen;
}) {
  return (
    <Page title={generatedDocGen.SideNavigation?.displayName ?? ''}>
      <PageHeader
        description={generatedDocGen.SideNavigation?.description}
        name={generatedDocGen.SideNavigation?.displayName}
      >
        <SandpackExample
          code={mainExample}
          hideEditor
          name="SideNavigation Main Example"
          previewHeight={208}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.SideNavigation} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- When [Tabs](/web/tabs) or a top navigation cannot accommodate the number of links or sections you need to navigate through
- When a deep hierarchy of navigation items is needed
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- When you only have two to five items to navigate through. Use [Tabs](/web/tabs) instead
- When you need to open a menu of external links and actions via a button. Use [Dropdown](/web/dropdown) instead
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep item labels brief and clear to keep them memorable and scannable."
            sandpackExample={
              <SandpackExample
                code={correctLengthExample}
                hideEditor
                name="Correct length example"
                previewHeight={230}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use long text labels that end up wrapping, especially in certain languages. Don’t shorten labels so much that they are hard to understand."
            sandpackExample={
              <SandpackExample
                code={incorrectLengthExample}
                hideControls
                hideEditor
                name="Incorrect length example"
                previewHeight={230}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Group related items and use section headings to help users parse information and help with redundancy."
            sandpackExample={
              <SandpackExample
                code={correctGroupingExample}
                hideEditor
                name="Correct grouping example"
                previewHeight={286}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Provide an unordered “kitchen sink” of features that is hard to parse and creates redundancy."
            sandpackExample={
              <SandpackExample
                code={incorrectGroupingExample}
                hideControls
                hideEditor
                name="Incorrect grouping example"
                previewHeight={286}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use icons that clearly match their text labels and serve as bullet points for the content."
            sandpackExample={
              <SandpackExample
                code={correctIconExample}
                hideEditor
                name="Correct icon example"
                previewHeight={164}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use icons if you’ll be forced to include icons that don’t quite reinforce their text labels."
            sandpackExample={
              <SandpackExample
                code={incorrectIconExample}
                hideControls
                hideEditor
                name="Incorrect icon example"
                previewHeight={164}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Place under the PageHeader when SideNav is used to navigate urls that are sub-sections of a main page"
            sandpackExample={
              <SandpackExample
                code={correctHeadingExample}
                hideEditor
                layout="column"
                name="Correct heading example"
                previewHeight={230}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="Omit a PageHeader and make it seem like each SideNav item is a primary, independent page."
            sandpackExample={
              <SandpackExample
                code={incorrectHeadingExample}
                hideControls
                hideEditor
                layout="column"
                name="Incorrect heading example"
                previewHeight={210}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.SideNavigation?.displayName}>
        <MainSection.Subsection
          description={`SideNavigation.TopItem and SideNavigation.NestedItem have an "active" state that visually identifies it. To set them to "active" set 'active="page"' (page redirect) or 'active="section"'. Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the SideNavigation.TopItem href, set SideNavigation.TopItem to "page". Use the example below as a reference.`}
          title="Active item"
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
          description={generatedDocGen.SideNavigationSection?.description}
          title={generatedDocGen.SideNavigationSection?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SideNavigationSection}
            id={generatedDocGen.SideNavigationSection?.displayName}
            name={generatedDocGen.SideNavigationSection?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen.SideNavigationTopItem?.description}
          title={generatedDocGen.SideNavigationTopItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SideNavigationTopItem}
            id={generatedDocGen.SideNavigationTopItem?.displayName}
            name={generatedDocGen.SideNavigationTopItem?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen.SideNavigationNestedItem?.description}
          title={generatedDocGen.SideNavigationNestedItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SideNavigationNestedItem}
            id={generatedDocGen.SideNavigationNestedItem?.displayName}
            name={generatedDocGen.SideNavigationNestedItem?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen.SideNavigationGroup?.description}
          title={generatedDocGen.SideNavigationGroup?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SideNavigationGroup}
            id={generatedDocGen.SideNavigationGroup?.displayName}
            name={generatedDocGen.SideNavigationGroup?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen.SideNavigationNestedGroup?.description}
          title={generatedDocGen.SideNavigationNestedGroup?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SideNavigationNestedGroup}
            id={generatedDocGen.SideNavigationNestedGroup?.displayName}
            name={generatedDocGen.SideNavigationNestedGroup?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Sections help with categorizing navigation menu items into groups and also avoid redundant language in labels."
          title="Sections"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={sectionsExample} name="Sections example" previewHeight={470} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Headers allow for sorting filters or another UI control to be included at the top of the navigation."
          title="Header"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={headerExample} name="Header example" previewHeight={380} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Footers allow for filters, additional external links or other UI controls to be included at the bottom of the navigation."
          title="Footer"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={footerVariant} name="Footer Variant Example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="A badge can be added to a menu label with information that may be useful to a person, such as whether a page is new or is a beta or deprecated feature. Only supported in SideNavigation.TopItem and SideNavigation.Group."
          title="Badge"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={badgeExample} name="Badge example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="A border can be added to the end edge of the navigation on dense surfaces with tight spacing where it helps to visually separate the nav from other content."
          title="Border"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={borderExample} name="Border example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Icons are used when simple, clear icons help users with scanning the content of a menu. Only supported in SideNavigation.TopItem and SideNavigation.Group."
          title="Icons"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={iconsExample} name="Icons example" />}
            title="Gestalt icon"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={customIconsExample} name="Custom icon example" />
            }
            title="Custom icon"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="A red indicator dot can be added to signify new items on a page or things that need your attention. Only supported in SideNavigation.TopItem and SideNavigation.Group."
          title="Notification"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={notificationsExample} name="Notifications example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Counters can be included as indicators of the number of items on a page or section.

Only include counters if the information is useful for the user to know before clicking on a menu item.

To prevent visual overload, do not include counters in the parent if the children have counters.
"
          title="Counters"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={counterExample} name="Counters example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`SideNavigation.TopItem and SideNavigation.Group support an optional \`primaryAction\`.

\`primaryAction\` can be a simple [IconButton](https://gestalt.pinterest.systems/web/iconbutton) or a [Dropdown](https://gestalt.pinterest.systems/web/dropdown). For the latter, set \`dropdownItems\` using an array of [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Dropdown.Item).
          `}
          title="Primary action"
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
          description="SideNavigation supports three navigation levels. The top level is composed of [SideNavigation.TopItem](#SideNavigation.TopItem) and [SideNavigation.Group](#SideNavigation.Group). The second nested level is composed of [SideNavigation.NestedGroup](#SideNavigation.NestedGroup) and [SideNavigation.Item](#SideNavigation.Item). The third nested level is composed of SideNavigation.Item"
          title="Nested directory"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={nestedExample} name="Nested example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`Group display can be:

1. static: Group is expanded by default and there isn't expanding/collapsing behavior
2. expandable: Group is expandable and all items are initially collapsed except groups with active children.

When \`display='expandable'\`, we can manage the state of each group's collapsing/expanded state by setting SideNavigation.Group and SideNavigation.NestedGroup as controlled components.

To work as controlled components, set \`expand\` prop to a boolean value. If not passed or set to "undefined", they stay uncontrolled.

Beware that when controlled, the list path to the active item is not automatically expanded.
`}
          title="Group display"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={displayStatic} layout="column" name="Static display example" />
            }
            title="display='static'"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={displayExpandable}
                layout="column"
                name="Expandable display example"
              />
            }
            title="display='expandable'"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={displayExpanded}
                layout="column"
                name="Controlled group display"
              />
            }
            title="Controlled group display"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description="Group items can also have links and navigate to a page."
          title="Group link display"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={groupLinkDisplayStatic}
                layout="column"
                name="Static display example"
              />
            }
            title="display='static'"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={groupLinkDisplayExpadable}
                layout="column"
                name="Expandable display example"
              />
            }
            title="display='expandable'"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`SideNavigation requires its own subcomponents as children to build the list of navigation items.

When building SideNavigation, we might want to render different combinations of subcomponents conditionally. SideNavigation supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases. More logic complexity might break the correct SideNavigation behavior.
          `}
          title="Subcomponent composability"
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
          description={`Providing \`collapsed\` prop to SideNavigation makes the component collapsible. Collapsible variant of SideNavigation is a controlled component and it has expand/collapse icon button at the top. Clicking the icon button reveals a complete list of navigation options when expanded and minimizes these options, often to a series of compact icons or completely hidden when collapsed. This variant is not available for mobile.

It is recommended the wrapper to be \`sticky\` (not \`fixed\`) so that it stays visible and keeps its position "relative" to other elements. Being sticky means SideNavigation's can naturally shift the adjacent elements/components.
          `}
          title="Collapsible"
        >
          <MainSection.Card
            cardSize="lg"
            description="When collapsed, if all the navigation items have icons, SideNavigation is displayed as a compact set of icons."
            sandpackExample={
              <SandpackExample
                code={collapsibleExample}
                name="Collapsible with icons example"
                previewHeight={500}
              />
            }
            title="Items with icons"
          />

          <MainSection.Card
            cardSize="lg"
            description="If some of the navigation items don't have icons, those items are collapsed into an ellipsis. Clicking on ellipses expands the SideNavigation in preview mode and when an item is selected, the component is collapsed again."
            sandpackExample={
              <SandpackExample
                code={collapsibleWithMixedIconsExample}
                name="Collapsible mixed icons example"
                previewHeight={500}
              />
            }
            title="Mixed items with and without icons"
          />

          <MainSection.Card
            cardSize="lg"
            description="When collapsed, the header and the footer of SideNavigation should be rendered accordingly."
            sandpackExample={
              <SandpackExample
                code={collapsibleHeaderExample}
                name="Collapsible header example"
                previewHeight={500}
              />
            }
            title="Collapsible header"
          />

          <MainSection.Card
            cardSize="lg"
            description="If none of the SideNavigation items have icons, the component is collapsed only with expand icon button."
            sandpackExample={
              <SandpackExample
                code={collapsibleWithoutIconsExample}
                name="Collapsible without icons example"
                previewHeight={500}
              />
            }
            title="Items without icons"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`SideNavigation requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

For mobile, \`title\` and \`dismissButton\` become required props.

Notice that the mobile UI requires logic to hide and show SideNavigation full width. If [Button](/web/button) or [TapArea](/web/taparea) control the visibility of SideNavigation, use \`accessibilityControls\` so that screen reader users can identify the relationship between elements.
  `}
          title="Mobile"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobileExample} layout="mobileRow" name="Mobile example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Keep menu item labels brief, remembering that length is language-dependent`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use complete sentences or lengthy descriptions
- Be redundant; use a section header if you find yourself repeating the same word over and over again in labels`}
            type="don't"
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
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(DOC_NAMES),
    },
  };
}
