import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import alignContent from '../../examples/table/alignContent';
import avoidOverStylingText from '../../examples/table/avoidOverStylingText';
import bottomCaptionExample from '../../examples/table/bottomCaptionExample';
import controlledExpandable from '../../examples/table/controlledExpandable';
import dontAddSoMuchContent from '../../examples/table/dontAddSoMuchContent';
import dontAlignContent from '../../examples/table/dontAlignContent';
import dontMixTextAndGraphics from '../../examples/table/dontMixTextAndGraphics';
import dontOverStyleText from '../../examples/table/dontOverStyleText';
import dontUseExpandForDenseContent from '../../examples/table/dontUseExpandForDenseContent';
import drawerRowExample from '../../examples/table/drawerRowExample';
import expandRows from '../../examples/table/expandRows';
import main from '../../examples/table/main';
import makeContentDigestable from '../../examples/table/makeContentDigestable';
import multipleStickyColumnsExample from '../../examples/table/multipleStickyColumnsExample';
import rowExpandableWithStickyColumns from '../../examples/table/rowExpandableWithStickyColumns';
import selected from '../../examples/table/selected';
import separateUnitType from '../../examples/table/separateUnitType';
import sortableHeaderCellsWithStickyColumns from '../../examples/table/sortableHeaderCellsWithStickyColumns';
import sortableTableCells from '../../examples/table/sortableTableCells';
import stickyColumnExample from '../../examples/table/stickyColumnExample';
import stickyHeaderColumnExample from '../../examples/table/stickyHeaderColumnExample';
import stickyHeaderFooterExample from '../../examples/table/stickyHeaderFooterExample';
import topCaptionExample from '../../examples/table/topCaptionExample';
import uncontrolledExpandable from '../../examples/table/uncontrolledExpandable';

const DOC_NAMES = [
  'Table',
  'TableHeader',
  'TableBody',
  'TableFooter',
  'TableCell',
  'TableHeaderCell',
  'TableSortableHeaderCell',
  'TableRow',
  'TableRowExpandable',
  'TableRowDrawer',
] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen.Table?.displayName}>
      <PageHeader
        description={generatedDocGen.Table?.description}
        name={generatedDocGen.Table?.displayName}
      >
        <SandpackExample code={main} hideEditor name="Main Table example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Table} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Displaying a set of structured data in a scannable way, that populates 2 or more rows.
          - Allowing users to compare information in rows and columns.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - There will never be enough data to populate at least 2 rows.
          - Displaying content that doesn’t follow a consistent pattern and can't be broken down into columns.
          - Providing robust data that doesn't fit in a tabular format. If there is a need to display a more complex data relationship, consider an info-graphic or a non-tabular format.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2} title="Style">
          <MainSection.Card
            cardSize="md"
            description="Use accessible Gestalt grays for table text, and reserve colors to sparingly accent important status and information. Avoid over-styling text."
            sandpackExample={
              <SandpackExample
                code={avoidOverStylingText}
                hideEditor
                layout="column"
                name="Do - Use accessible Gestalt grays for table text"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Overuse color and styling for text in tables; it can make it hard to scan for important status updates and crucial information."
            sandpackExample={
              <SandpackExample
                code={dontOverStyleText}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Overuse color and styling for text in tables"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2} title="Alignment">
          <MainSection.Card
            cardSize="md"
            description={`Align content so that it’s easy to scan, read and compare:
- Start-align text and combo-content (combinations of text, numbers and/or graphics)
- End-align numbers only
- Align headers with their corresponding content
- Use tabular lining for numbers`}
            sandpackExample={
              <SandpackExample
                code={alignContent}
                hideEditor
                layout="column"
                name="Do - Align content"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`Align content so that it makes it harder to scan, read, and compare.
- Center-align content
- Use proportional figures for numbers as they don’t quite align
- End-align text and combo-content (combinations of text, numbers and/or graphics)
- Misalign headers with their corresponding content
`}
            sandpackExample={
              <SandpackExample
                code={dontAlignContent}
                hideControls
                hideEditor
                layout="column"
                name="Align content so that it makes it harder to scan, read, and compare.\n- Center-align content\n- Use proportional figures for numbers as they don’t quite align\n- End-align text and combo-content (combinations of text, numbers and/or graphics)\n- Misalign headers with their corresponding content"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place unit type on a separate column so that amounts can still align and be compared."
            sandpackExample={
              <SandpackExample
                code={separateUnitType}
                hideEditor
                layout="column"
                name="Do - Place unit type on a separate column"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Mix text and graphics with numbers that need to be compared with each other."
            sandpackExample={
              <SandpackExample
                code={dontMixTextAndGraphics}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Mix text and graphics with numbers"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2} title="Content">
          <MainSection.Card
            cardSize="md"
            description="Make content digestible and scannable:
- Keep headers clear and concise
- Include an a visual indicator for cells that don’t have content.
- Give enough space for content to account for localization.
- Wrap important content to multiple lines
- Truncate secondary information, especially if a user is going to get the full content upon click of a link in the table.
"
            sandpackExample={
              <SandpackExample
                code={makeContentDigestable}
                hideEditor
                layout="column"
                name="Do - Make content digestible and scannable:\n- Keep headers clear and concise\n- Include an a visual indicator for cells that don’t have content.\n- Give enough space for content to account for localization.\n- Wrap important content to multiple lines\n- Truncate secondary information, especially if a user is going to get the full content upon click of a link in the table.\n"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Add so much content that it’s hard for a user to read, examine and scan:
- Don’t truncate content that a user needs to examine in relation to other content in the table.
- Leave cells blank so that it isn’t clear if all data has loaded."
            sandpackExample={
              <SandpackExample
                code={dontAddSoMuchContent}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Add so much content"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Expand rows if the additional content is simple, doesn’t contain a lot of interaction and doesn’t take up more than 50% of the screen."
            sandpackExample={
              <SandpackExample
                code={expandRows}
                hideEditor
                layout="column"
                name="Do - Expand rows"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use an expand to display dense, highly-interactive content. Use a new page or [OverlayPanel](/web/overlaypanel) for that."
            sandpackExample={
              <SandpackExample
                code={dontUseExpandForDenseContent}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Use an expand for dense content"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.Table?.displayName}>
        <MainSection.Subsection
          description={`
Use  \`accessibilityLabel\` to properly announce the content of the table. For example, use "Campaign Status Information".

Don’t include the word “table” as part of the label to prevent redundancy: the VoiceOver already appends “table” to the label and the Category “Table” in the rotor already describes the nature of the component.

In terms of structure and content, HTML tables already provide accessible ways to navigate content via cells \`<td>\` and headers \`<th>\`.
  `}
          title="Labels"
        />
        <MainSection.Subsection
          description={`
The Tab key should only place the focus on interactive elements like sortable headers, expands and links. If a cell does not contain interactive content, tabbing should skip the cell. Enter, Space and Return activate buttons and other controls after focusing. Arrow keys can be used to scroll table content vertically and horizontally.`}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          columns={2}
          description={`
Internally, Gestalt Table implements \`visually-hidden\` captions through the \`accessibilityLabel\` prop. Therefore, if we want to add visual captions (at the top or bottom of the Table), we must prevent redundancy. Any top or bottom text that describes the Table should be removed from navigation using \`aria-hidden\`.

See the examples below for more details.`}
          title="Other considerations"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={topCaptionExample}
                layout="column"
                name="Top caption example"
              />
            }
            title="Top captions"
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={bottomCaptionExample}
                layout="column"
                name="Bottom caption example"
              />
            }
            title="Bottom captions"
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.TableHeader?.displayName}
        noDefaultLabelProvider
        notes={`Follow our guidelines on concise content and headings to account for localization.

        Wrap important table content instead of truncating. Use truncation only for secondary content, and include a tooltip to show the full text on hover.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.TableHeader?.description}
          title={generatedDocGen?.TableHeader?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableHeader}
            id={generatedDocGen?.TableHeader?.displayName}
            name={generatedDocGen?.TableHeader?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableBody?.description}
          title={generatedDocGen?.TableBody?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableBody}
            id={generatedDocGen?.TableBody?.displayName}
            name={generatedDocGen?.TableBody?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableFooter?.description}
          title={generatedDocGen?.TableFooter?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableFooter}
            id={generatedDocGen?.TableFooter?.displayName}
            name={generatedDocGen?.TableFooter?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableCell?.description}
          title={generatedDocGen?.TableCell?.displayName}
        >
          <GeneratedPropTable
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
            generatedDocGen={generatedDocGen.TableCell}
            id={generatedDocGen?.TableCell?.displayName}
            name={generatedDocGen?.TableCell?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableHeaderCell?.description}
          title={generatedDocGen?.TableHeaderCell?.displayName}
        >
          <GeneratedPropTable
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
            generatedDocGen={generatedDocGen.TableHeaderCell}
            id={generatedDocGen?.TableHeaderCell?.displayName}
            name={generatedDocGen?.TableHeaderCell?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableSortableHeaderCell?.description}
          title={generatedDocGen?.TableSortableHeaderCell?.displayName}
        >
          <GeneratedPropTable
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
            generatedDocGen={generatedDocGen.TableSortableHeaderCell}
            id={generatedDocGen?.TableSortableHeaderCell?.displayName}
            name={generatedDocGen?.TableSortableHeaderCell?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableRow?.description}
          title={generatedDocGen?.TableRow?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRow}
            id={generatedDocGen?.TableRow?.displayName}
            name={generatedDocGen?.TableRow?.displayName}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={generatedDocGen?.TableRowExpandable?.description}
          title={generatedDocGen?.TableRowExpandable?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRowExpandable}
            id={generatedDocGen?.TableRowExpandable?.displayName}
            name={generatedDocGen?.TableRowExpandable?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.TableRowDrawer?.description}
          title={generatedDocGen?.TableRowDrawer?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRowDrawer}
            id={generatedDocGen?.TableRowDrawer?.displayName}
            name={generatedDocGen?.TableRowDrawer?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Sticky header & footer">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={stickyHeaderFooterExample}
                layout="column"
                name="Sticky header & footer example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Try scrolling horizontally to see the first column remain in place."
          title="Sticky Column"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={stickyColumnExample}
                layout="column"
                name="Sticky column example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Try scrolling horizontally to see the first 3 columns remain in place."
          title="Multiple sticky columns"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={multipleStickyColumnsExample}
                layout="column"
                name="Multiple sticky columns example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Try scrolling horizontally and vertically to see the columns and header remain in place."
          title="Sticky header and sticky columns"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={stickyHeaderColumnExample}
                layout="column"
                name="Sticky header and sticky columns example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`To set Table.RowExpandable to be a controlled component, use the \`expanded\` prop. When \`expanded\` is not passed (\`expanded\` set to undefined), Table.RowExpandable stays uncontrolled. Use \`onExpand\` prop to have access to the internal state of the component via render props <code>({ event, expanded }) => { expanded }</code>"

When Table.RowExpandable is uncontrolled, use the clickable expand/collapse icon button to hide/show the content.`}
          title="Controlled/Uncontrolled Table.RowExpandable"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={controlledExpandable}
                hideEditor
                name="Controlled Table.RowExpandable example"
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={uncontrolledExpandable}
                hideEditor
                name="Uncontrolled Table.RowExpandable example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="When specifying `stickyColumns` with expandable rows, include the column of arrows in your count. This example sets `stickyColumns` to 3."
          title="Table.RowExpandable with Sticky Columns"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={rowExpandableWithStickyColumns}
                layout="column"
                name="Table.RowExpandable with Sticky Columns example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Drawer row that is able to hold additional content."
          title="Table.RowDrawer implementation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={drawerRowExample}
                layout="column"
                name="Drawer row that is able to hold additional content"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Sortable header cells are clickable in an accessible way and have an icon to display whether the table is currently being sorted by that column.  <br/>
          Depending on the table contents, use the \`align\` property to set the alignment of the header cell and sort icon position.`}
          title="Sortable header cells"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={sortableTableCells}
                layout="column"
                name="Sortable header cells example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Sortable header cells with sticky columns">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={sortableHeaderCellsWithStickyColumns}
                layout="column"
                name="Sortable header cells with sticky columns"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Table.Row, Table.RowExpandable and Table.RowDrawer support hovered and selected states.

If a row subcomponent is selectable, toggle the \`selected\` prop between "selected" and "unselected" to keep a constant border space in the row that is only visible when the row is selected.

If the row is not selectable, the \`selected\` prop should not be set. In this case, it doesn't set a side border.
          `}
          title="Selected & hovered state"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={selected} layout="column" name="Selected example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen.Table?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Accordion](/web/accordion)**
Modules are another way to stack multiple rows of content. However, they are used to show 2 to 3 blocks of related content, whereas Tables are used for large data sets that can be easily scanned and compared across multiple rows and columns.

**[Checkbox](/web/checkbox)**
Checkboxes are often used in tables to allow for selecting and editing of multiple rows at once.
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
  const docGen = await multipleDocGen(DOC_NAMES);

  docGen.Table.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';
  docGen.TableHeader.props.children.tsType.raw = 'ReactElement';
  docGen.TableBody.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';
  docGen.TableFooter.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';
  docGen.TableRow.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';
  docGen.TableRowExpandable.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';
  docGen.TableRowDrawer.props.children.tsType.raw = 'React.ChildrenArray<ReactElement>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
