// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import dontUseIfDisplayingFewerThanTwo from '../../examples/list/dontUseIfDisplayingFewerThanTwo.js';
import dontUseIfWholeItemIsSelectable from '../../examples/list/dontUseIfWholeItemIsSelectable.js';
import includeLinksIfRelevant from '../../examples/list/includeLinksIfRelevant.js';
import labelsExample from '../../examples/list/labelsExample.js';
import labelsExample1 from '../../examples/list/labelsExample1.js';
import mainExample from '../../examples/list/mainExample.js';
import nestingExample from '../../examples/list/nestingExample.js';
import nestingExample1 from '../../examples/list/nestingExample1.js';
import nestingExample2 from '../../examples/list/nestingExample2.js';
import nestingExample3 from '../../examples/list/nestingExample3.js';
import spacingExample from '../../examples/list/spacingExample.js';
import spacingExample1 from '../../examples/list/spacingExample1.js';
import subcomponentComposabilityExample from '../../examples/list/subcomponentComposabilityExample.js';
import textAndLabelExample from '../../examples/list/textAndLabelExample.js';
import textAndLabelExample1 from '../../examples/list/textAndLabelExample1.js';
import textAndLabelExample2 from '../../examples/list/textAndLabelExample2.js';
import typeExample from '../../examples/list/typeExample.js';
import typeExample1 from '../../examples/list/typeExample1.js';
import typeExample2 from '../../examples/list/typeExample2.js';
import useWhenDisplayingMoreThanTwo from '../../examples/list/useWhenDisplayingMoreThanTwo.js';

export default function ListPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.List.displayName}>
      <PageHeader
        name={generatedDocGen?.List.displayName}
        description={generatedDocGen?.List.description}
      >
        <SandpackExample
          name="Main Example"
          code={mainExample}
          layout="column"
          hideEditor
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.List} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To present a grouping of simple, related information. For more complex data, use [Table](/web/table).
- To break up related content into easily digestable chunks.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- When whole list items are navigational. Use a navigational component like [Tabs](/web/tabs) or [SideNavigation](/web/sidenavigation) instead.
- When list items require interaction. Use [RadioGroup](/web/radiogroup) or [CheckBox](/web/checkbox) with [FieldSet](/web/fieldset) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use List when you are displaying more than two items or points."
            sandpackExample={
              <SandpackExample
                name="Use When Displaying More Than Two"
                code={useWhenDisplayingMoreThanTwo}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use List if you are displaying fewer than two items. Instead, consider how to present the information as plain text on the page."
            sandpackExample={
              <SandpackExample
                name="Don't Use If Displaying Fewer Than Two"
                code={dontUseIfDisplayingFewerThanTwo}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Include links if they are relevent to better understanding the context of the list."
            sandpackExample={
              <SandpackExample
                name="Include Links If Relevant To Understanding Context"
                code={includeLinksIfRelevant}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use List if the whole list item is selectable. Instead use a navigational component or [FieldSet](/web/fieldset)."
            sandpackExample={
              <SandpackExample
                name="Don't Use If Whole Item Is Selectable"
                code={dontUseIfWholeItemIsSelectable}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.List.displayName}>
        <MainSection.Subsection
          title="Labels"
          columns={2}
          description={`
List comes with a label built-in: just use the \`label\` prop.

We recommend using a \`label\` prop in all lists. The label will be announced by the screenreader describing the purpose or contents of the list. Even though text preceding the list can introduce the list, screenreaders will read both pieces of information in sequential order. When using the \`label\` prop, the information is embedded into the list announcement supporting the comprehension of the list.

However, if List is labeled by content elsewhere on the page or a more descriptive label is needed, the \`labelDisplay\` prop can be set to 'hidden'. In this case, it is still available to screen reader users, but will not appear visually on the screen.

The following examples showcase different cases where labels need to be hidden.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Labels Example" code={labelsExample} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Labels Example (1)" code={labelsExample1} layout="column" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen.ListItem?.displayName}
          description={generatedDocGen.ListItem?.description}
        >
          <GeneratedPropTable
            name={generatedDocGen.ListItem?.displayName}
            id={generatedDocGen.ListItem?.displayName}
            generatedDocGen={generatedDocGen.ListItem}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Type"
          columns={2}
          description={`
__1. Bare__: An unordered list without any bullets or alphanumeric sequence.
__2. Unordered__: An unordered list that does not have a sequential order. List items include a bullet point.
__3. Ordered__: An ordered list that contains items in a sequential order or priority. List items follow an alphanumeric sequence.
        `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Type Example" code={typeExample} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Type Example (1)" code={typeExample1} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Type Example (2)" code={typeExample2} layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Spacing"
          description={`
__1. Default__: Space between lines defaults at 16px.
__2. Condensed__: Space between lines is reduced for all style varients to 8px for more condensed screens.
        `}
          columns={2}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Spacing Example" code={spacingExample} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Spacing Example (1)" code={spacingExample1} layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Nesting"
          description={`
List allows a maximum of six nested list items levels. Unordered lists alternate between a filled and hollow dots. Ordered lists alternate a sequence of numbers, uppercase letters, and lowercase letters.

List.Items can be nested into each other to created nested levels. Choosing to explicitly set List on each new nested level has the same effect. Gestalt List makes sure to build the right \`<ul>\`/\`<ol>\` > \`<li>\` structure under the hood in both cases. Ommiting nested Lists reduces the amount of (nested) code improving readability and faster development.

Unordered and ordered lists can be combined in the same list as well. However, to combine them, we must explicitly set List in the level with the new \`type\`.`}
          columns={2}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Nesting Example" code={nestingExample} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Nesting Example (1)" code={nestingExample1} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Nesting Example (2)" code={nestingExample2} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Nesting Example (3)" code={nestingExample3} layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Text and label"
          columns={2}
          description={`
List's \`label\` prop and ListItem's \`text\` prop accept either a string or [Text](/web/text). Use a string when no visual style is needed. List will handle the text style and adherence to design guidelines.

If custom styles are required, such as bold text, a different size, or inline links, use Text to wrap the content with any additional Text or Link components as needed. If using a Text component, do not specify \`color\`. Toast will automatically pick the correct text color for the given \`variant\`.

List's \`label\` prop is used for accessibility purposes. See the [accessibility guidelines section](/web/list#Accessibility) for more information.`}
        >
          <MainSection.Card
            cardSize="lg"
            title="Default label with strings"
            sandpackExample={
              <SandpackExample
                name="Text and Label Example"
                code={textAndLabelExample}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Custom label with Text"
            sandpackExample={
              <SandpackExample
                name="Text and Label Example (1)"
                code={textAndLabelExample1}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Hidden label"
            sandpackExample={
              <SandpackExample
                name="Text and Label Example (2)"
                code={textAndLabelExample2}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Subcomponent composability"
          description={`
List requires its own subcomponents as children to build the list.

When building List, we might want to render different combinations of subcomponents conditionally. List supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Subcomponent Composability Example"
                code={subcomponentComposabilityExample}
              />
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
- __Length.__ Content should be short and to the point. Text can be sentence fragments. If you are looking to present more complex information, use [Table](/web/table) instead.
- __Formatting.__ Text should be in sentence case, with a capital letter at the beginning of the phrase.
- __Phrasing.__ Phrase items in a similar way. For example, use a verb for the first word in each sentence (Download, Get, Book).
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- __Puctuation.__ For short phrases, do not use periods, commas, semicolons, or any sort of punctuation at the end of each line. If the content is longer than two sentences, add a period at the end of all sentences.

- __Phrasing.__ Avoid repeating the first word in each list item. Instead of "Take a nap, Take a hike, Take a lap", try something like "Lie down for a nap, Go on a hike, Run a lap".

`}
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

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipleDocGen(['List', 'ListItem']);

  docGen.List.props.children.flowType.raw = '<Element<typeof List.Item>>';
  docGen.ListItem.props.children.flowType.raw = '<Element<typeof List | typeof List.Item>>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
