// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipledocgen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

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
        defaultCode={`
<List label="This application will be able to" type="unordered">
  <List.Item text="Access your follows and followers"/>
  <List.Item text="Create new Pins for you" />
  <List.Item text="Follow things for you" />
</List>
`}
      />
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
            defaultCode={`
<List label="Use the synchronous analytics endpoints if:" type="unordered">
  <List.Item text="You need data from the last 90 days" />
  <List.Item text="You want a quick response to load a user facing dashboard/component in real time" />
  <List.Item text="You want to avoid large report size/unnecessary data being returned" />
  <List.Item text="You need only basic key metrics for each campaign/ad/etc" />
</List>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use List if you are displaying fewer than two items. Instead, consider how to present the information as plain text on the page."
            defaultCode={`
<Flex gap={12} direction="column" gap={4} maxWidth={600}>
  <Heading accessibilityLevel="none">August 15, 2022</Heading>
  <List label={<Text weight="bold">Shopping</Text>} type="unordered">
    <List.Item text="Added new catalog endpoint to list filtered products." />
  </List>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Include links if they are relevent to better understanding the context of the list."
            defaultCode={`
<Flex gap={12} direction="column" gap={4} maxWidth={600}>
  <List label="With bulk actions, you can:" type="unordered">
    <List.Item text={
      <Text inline>Request an asynchronous bulk report on advertiser entities campaigns, ad groups, product groups, ads, keywords.
        <Link display="inline" accessibilityLabel="Learn more about async reports" href="#">Learn more</Link>
      </Text>}
    />
    <List.Item text="Create/update ad-related entities" />
  </List>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use List if the whole list item is selectable. Instead use a navigational component or [FieldSet](/web/fieldset)."
            defaultCode={`
<Flex gap={12} direction="column" gap={4} maxWidth={600}>
  <List label="Need more help?" type="unordered">
    <List.Item text={
      <Text>
        <TapArea onTap={() => {}}>
          <Box padding={2} rounding={2} color="secondary">Visit our Help Center</Box>
        </TapArea>
      </Text>}
    />
    <List.Item text={
      <Text>
        <TapArea onTap={() => {}}>
          <Box padding={2} rounding={2}>Request a demo</Box>
        </TapArea>
      </Text>}
    />
  </List>
</Flex>
`}
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
            defaultCode={`
<Flex gap={4} direction="column">
  <Heading accessibilityLevel="none" size="500">Asynchronous Analytics Endpoints</Heading>
  <List labelDisplay="hidden" label="Use the synchronous analytics endpoints if:" type="unordered">
    <List.Item text="You need data from the last 90 days" />
    <List.Item text="You want a quick response to load a user facing dashboard/component in real time" />
    <List.Item text="You want to avoid large report size/unnecessary data being returned" />
    <List.Item text="You need only basic key metrics for each campaign/ad/etc" />
  </List>
</Flex>
`}
          />
          <MainSection.Card
            defaultCode={`
<Flex gap={4} direction="column">
  <Text>The Save button is one of the best ways to get your content onto Pinterest —through visitors to your site. Make sure your Save button is doing the most for you by following our best practices.</Text>
  <List labelDisplay="hidden" label="Best practices for Save Button for developers" type="unordered">
    <List.Item text="Pin type settings: Include 'pinit.js' correctly" />
    <List.Item text="Use the Save button that’s best for your website" />
    <List.Item text="Multiple images on a page (like a blog)" />
  </List>
</Flex>
`}
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
            defaultCode={`
<List label={<Text weight="bold">Bare list</Text>} type="bare">
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
</List>
`}
          />
          <MainSection.Card
            defaultCode={`
<List label={<Text weight="bold">Unordered list</Text>} type="unordered">
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
</List>
`}
          />
          <MainSection.Card
            defaultCode={`
<List label={<Text weight="bold">Ordered list</Text>} type="ordered">
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
  <List.Item text="List item text" />
</List>`}
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
            defaultCode={`
<List label={<Text weight="bold">Regular spacing</Text>} type="unordered" spacing="regular">
  <List.Item text="List item text" />
  <List.Item text="List item text">
    <List.Item text="List item text">
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
    </List.Item>
    <List.Item text="List item text" />
    <List.Item text="List item text" />
  </List.Item>
  <List.Item text="List item text" />
</List>
`}
          />
          <MainSection.Card
            defaultCode={`
<List label={<Text weight="bold">Condensed spacing</Text>} type="unordered" spacing="condensed">
  <List.Item text="List item text" />
  <List.Item text="List item text">
    <List.Item text="List item text">
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
    </List.Item>
    <List.Item text="List item text" />
    <List.Item text="List item text" />
  </List.Item>
  <List.Item text="List item text" />
</List>
`}
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
            defaultCode={`
<List label={<Text weight="bold">Bare unordered nested</Text>} type="bare">
  <List.Item text="List item text">
    <List.Item text="List item text">
      <List.Item text="List item text">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text" />
          </List.Item>
        </List.Item>
      </List.Item>
    </List.Item>
  </List.Item>
</List>`}
          />
          <MainSection.Card
            defaultCode={`
<List label={<Text weight="bold">Unordered nested</Text>} type="unordered">
  <List.Item text="List item text">
    <List.Item text="List item text">
      <List.Item text="List item text">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text" />
          </List.Item>
        </List.Item>
      </List.Item>
    </List.Item>
  </List.Item>
</List>`}
          />
          <MainSection.Card
            defaultCode={`
<List label={<Text weight="bold">Ordered nested</Text>} type="ordered">
  <List.Item text="List item text">
    <List.Item text="List item text">
      <List.Item text="List item text">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text" />
          </List.Item>
        </List.Item>
      </List.Item>
    </List.Item>
  </List.Item>
</List>`}
          />
          <MainSection.Card
            defaultCode={`
<List spacing="condensed" label={<Text weight="bold">Mixed nested</Text>} type="ordered">
  <List.Item text="List item text" />
  <List.Item text="List item text">
    <List type="unordered">
      <List.Item text="List item text"/>
      <List.Item text="List item text">
          <List.Item text="List item text" />
          <List.Item text="List item text">
            <List type="ordered">
              <List.Item text="List item text" />
              <List.Item text="List item text" />
            </List>
          </List.Item>
      </List.Item>
      <List.Item text="List item text" />
    </List>
  </List.Item>
  <List.Item text="List item text" />
</List>`}
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
            title="Default label with strings"
            defaultCode={`
<List label="Button settings" type="unordered">
  <List.Item text="Pin type settings: Pin type settings control what content Pinners can save from your page" />
  <List.Item text="Button style settings: Button style settings control how your button looks" />
  <List.Item text="Source settings: Source settings control canonical sources, including descriptions, urls and images" />
</List>
`}
          />
          <MainSection.Card
            title="Custom label with Text"
            defaultCode={`
<List label={<Text size="400" weight="bold">Button settings</Text>} type="unordered">
  <List.Item text={
    <Text inline>
      <Text weight="bold" inline>Pin type settings: </Text>
      Pin type settings control what content Pinners can save from your page
    </Text>}
  />
  <List.Item text={
    <Text inline>
      <Text weight="bold" inline>Button style settings: </Text>
      Button style settings control how your button looks
    </Text>}
  />
  <List.Item text={
    <Text inline>
      <Text weight="bold" inline>Source settings: </Text>
      Source settings control canonical sources, including descriptions, urls and images
    </Text>}
  />
</List>
`}
          />
          <MainSection.Card
            title="Hidden label"
            defaultCode={`
<Flex direction="column" gap={4}>
  <Text>The Save button is one of the best ways to get your content onto Pinterest —through visitors to your site. Make sure your Save button is doing the most for you by following our best practices.</Text>
  <List labelDisplay="hidden" label="Best practices for Save Button for developers" type="unordered">
    <List.Item text="Pin type settings: Include 'pinit.js' correctly" />
    <List.Item text="Use the Save button that’s best for your website" />
    <List.Item text="Multiple images on a page (like a blog)" />
  </List>
</Flex>
`}
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
            defaultCode={`
function Example() {
  const someCondition = true;

  return (
    <List label="List with conditionals" type="unordered">
      { someCondition && <List.Item text="List item text z" /> }
      <List.Item text="List item text 0">
        { someCondition
          && <React.Fragment>
              <List.Item text="List item text 1" />
              <List.Item text="List item text 2" />
              <List.Item text="List item text 3" />
            </React.Fragment>
          }
      </List.Item>
      { someCondition
        && <React.Fragment>
            <List.Item text="List item text A" />
            <List.Item text="List item text B" />
          </React.Fragment>
      }
    </List>
  )
}
`}
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
  const docGen = await multipledocgen({
    componentName: ['List', 'ListItem'],
  });

  docGen.List.props.children.flowType.raw = '<Element<typeof List.Item>>';
  docGen.ListItem.props.children.flowType.raw = '<Element<typeof List | typeof List.Item>>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
