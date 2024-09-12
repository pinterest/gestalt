import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import dontUseIfDisplayingFewerThanTwo from '../../examples/list/dontUseIfDisplayingFewerThanTwo';
import dontUseIfWholeItemIsSelectable from '../../examples/list/dontUseIfWholeItemIsSelectable';
import fontSize from '../../examples/list/fontSize';
import includeLinksIfRelevant from '../../examples/list/includeLinksIfRelevant';
import labelsExample from '../../examples/list/labelsExample';
import labelsExample1 from '../../examples/list/labelsExample1';
import mainExample from '../../examples/list/mainExample';
import nestingExample from '../../examples/list/nestingExample';
import nestingExample1 from '../../examples/list/nestingExample1';
import nestingExample2 from '../../examples/list/nestingExample2';
import nestingExample3 from '../../examples/list/nestingExample3';
import spacingExample from '../../examples/list/spacingExample';
import spacingExample1 from '../../examples/list/spacingExample1';
import subcomponentComposabilityExample from '../../examples/list/subcomponentComposabilityExample';
import textAndLabelExample from '../../examples/list/textAndLabelExample';
import textAndLabelExample1 from '../../examples/list/textAndLabelExample1';
import textAndLabelExample2 from '../../examples/list/textAndLabelExample2';
import typeExample from '../../examples/list/typeExample';
import typeExample1 from '../../examples/list/typeExample1';
import typeExample2 from '../../examples/list/typeExample2';
import useWhenDisplayingMoreThanTwo from '../../examples/list/useWhenDisplayingMoreThanTwo';

const DOC_NAMES = ['List', 'ListItem'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function ListPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.List.displayName}>
      <PageHeader
        description={generatedDocGen?.List.description}
        name={generatedDocGen?.List.displayName}
      >
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.List} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- To present a grouping of simple, related information. For more complex data, use [Table](/web/table).
- To break up related content into easily digestable chunks.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- When whole list items are navigational. Use a navigational component like [Tabs](/web/tabs) or [SideNavigation](/web/sidenavigation) instead.
- When list items require interaction. Use [RadioGroup](/web/radiogroup) or [CheckBox](/web/checkbox) with [FieldSet](/web/fieldset) instead.
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
            description="Use List when you are displaying more than two items or points."
            sandpackExample={
              <SandpackExample
                code={useWhenDisplayingMoreThanTwo}
                hideEditor
                layout="column"
                name="Use When Displaying More Than Two"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use List if you are displaying fewer than two items. Instead, consider how to present the information as plain text on the page."
            sandpackExample={
              <SandpackExample
                code={dontUseIfDisplayingFewerThanTwo}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use If Displaying Fewer Than Two"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Include links if they are relevent to better understanding the context of the list."
            sandpackExample={
              <SandpackExample
                code={includeLinksIfRelevant}
                hideEditor
                layout="column"
                name="Include Links If Relevant To Understanding Context"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use List if the whole list item is selectable. Instead use a navigational component or [FieldSet](/web/fieldset)."
            sandpackExample={
              <SandpackExample
                code={dontUseIfWholeItemIsSelectable}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use If Whole Item Is Selectable"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.List.displayName}>
        <MainSection.Subsection
          columns={2}
          description={`
List comes with a label built-in: just use the \`label\` prop.

We recommend using a \`label\` prop in all lists. The label will be announced by the screenreader describing the purpose or contents of the list. Even though text preceding the list can introduce the list, screenreaders will read both pieces of information in sequential order. When using the \`label\` prop, the information is embedded into the list announcement supporting the comprehension of the list.

However, if List is labeled by content elsewhere on the page or a more descriptive label is needed, the \`labelDisplay\` prop can be set to 'hidden'. In this case, it is still available to screen reader users, but will not appear visually on the screen.

The following examples showcase different cases where labels need to be hidden.`}
          title="Labels"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={labelsExample} layout="column" name="Labels Example" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={labelsExample1} layout="column" name="Labels Example (1)" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen.ListItem?.description}
          title={generatedDocGen.ListItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.ListItem}
            id={generatedDocGen.ListItem?.displayName}
            name={generatedDocGen.ListItem?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`
__1. Bare__: An unordered list without any bullets or alphanumeric sequence.
__2. Unordered__: An unordered list that does not have a sequential order. List items include a bullet point.
__3. Ordered__: An ordered list that contains items in a sequential order or priority. List items follow an alphanumeric sequence.
        `}
          title="Type"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={typeExample} layout="column" name="Type Example" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={typeExample1} layout="column" name="Type Example (1)" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={typeExample2} layout="column" name="Type Example (2)" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
__1. Default__: Space between lines defaults at 16px.
__2. Condensed__: Space between lines is reduced for all style varients to 8px for more condensed screens.
        `}
          title="Spacing"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={spacingExample} layout="column" name="Spacing Example" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={spacingExample1} layout="column" name="Spacing Example (1)" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
List allows a maximum of six nested list items levels. Unordered lists alternate between a filled and hollow dots. Ordered lists alternate a sequence of numbers, uppercase letters, and lowercase letters.

List.Items can be nested into each other to created nested levels. Choosing to explicitly set List on each new nested level has the same effect. Gestalt List makes sure to build the right \`<ul>\`/\`<ol>\` > \`<li>\` structure under the hood in both cases. Ommiting nested Lists reduces the amount of (nested) code improving readability and faster development.

Unordered and ordered lists can be combined in the same list as well. However, to combine them, we must explicitly set List in the level with the new \`type\`.`}
          title="Nesting"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={nestingExample} layout="column" name="Nesting Example" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={nestingExample1} layout="column" name="Nesting Example (1)" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={nestingExample2} layout="column" name="Nesting Example (2)" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={nestingExample3} layout="column" name="Nesting Example (3)" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
List's \`label\` prop and ListItem's \`text\` prop accept either a string or [Text](/web/text). Use a string when no visual style is needed. List will handle the text style and adherence to design guidelines.

If custom styles are required, such as bold text, a different size, or inline links, use Text to wrap the content with any additional Text or Link components as needed. If using a Text component, do not specify \`color\`. Toast will automatically pick the correct text color for the given \`variant\`.

List's \`label\` prop is used for accessibility purposes. See the [accessibility guidelines section](/web/list#Accessibility) for more information.`}
          title="Text and label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={textAndLabelExample}
                layout="column"
                name="Text and Label Example"
              />
            }
            title="Default label with strings"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={textAndLabelExample1}
                layout="column"
                name="Text and Label Example (1)"
              />
            }
            title="Custom label with Text"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={textAndLabelExample2}
                layout="column"
                name="Text and Label Example (2)"
              />
            }
            title="Hidden label"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          List can be used with different font sizes. The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size). See the [Text sizes variant](https://gestalt.pinterest.systems/web/text#Sizes) for more details. `}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={fontSize} name="Font Sizing" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
List requires its own subcomponents as children to build the list.

When building List, we might want to render different combinations of subcomponents conditionally. List supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases.
          `}
          title="Subcomponent composability"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={subcomponentComposabilityExample}
                name="Subcomponent Composability Example"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- __Length.__ Content should be short and to the point. Text can be sentence fragments. If you are looking to present more complex information, use [Table](/web/table) instead.
- __Formatting.__ Text should be in sentence case, with a capital letter at the beginning of the phrase.
- __Phrasing.__ Phrase items in a similar way. For example, use a verb for the first word in each sentence (Download, Get, Book).
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- __Puctuation.__ For short phrases, do not use periods, commas, semicolons, or any sort of punctuation at the end of each line. If the content is longer than two sentences, add a period at the end of all sentences.

- __Phrasing.__ Avoid repeating the first word in each list item. Instead of "Take a nap, Take a hike, Take a lap", try something like "Lie down for a nap, Go on a hike, Run a lap".

`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Text](/web/text)**
The Text component is for all non-heading text on all surfaces.

**[Table](/web/table)**
Table is a set of structured data that is easy for users to scan, examine and compare.

**[Fieldset](/web/fieldset)**
Fieldset creates a fieldset and legend for a group of related form items, like [RadioGroup](/web/radiogroup) or [CheckBox](/web/checkbox).
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
  const docGen = await multipleDocGen(['List', 'ListItem']);

  docGen.List.props.children.tsType.raw = '<ReactElement>';
  docGen.ListItem.props.children.tsType.raw = '<ReactElement>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
