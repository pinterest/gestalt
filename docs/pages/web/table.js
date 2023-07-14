// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import alignContent from '../../examples/table/alignContent.js';
import avoidOverStylingText from '../../examples/table/avoidOverStylingText.js';
import bottomCaptionExample from '../../examples/table/bottomCaptionExample.js';
import controlledExpandable from '../../examples/table/controlledExpandable.js';
import dontAddSoMuchContent from '../../examples/table/dontAddSoMuchContent.js';
import dontAlignContent from '../../examples/table/dontAlignContent.js';
import dontMixTextAndGraphics from '../../examples/table/dontMixTextAndGraphics.js';
import dontOverStyleText from '../../examples/table/dontOverStyleText.js';
import dontUseExpandForDenseContent from '../../examples/table/dontUseExpandForDenseContent.js';
import drawerRowExample from '../../examples/table/drawerRowExample.js';
import expandRows from '../../examples/table/expandRows.js';
import main from '../../examples/table/main.js';
import makeContentDigestable from '../../examples/table/makeContentDigestable.js';
import multipleStickyColumnsExample from '../../examples/table/multipleStickyColumnsExample.js';
import rowExpandableWithStickyColumns from '../../examples/table/rowExpandableWithStickyColumns.js';
import selected from '../../examples/table/selected.js';
import separateUnitType from '../../examples/table/separateUnitType.js';
import sortableHeaderCellsWithStickyColumns from '../../examples/table/sortableHeaderCellsWithStickyColumns.js';
import sortableTableCells from '../../examples/table/sortableTableCells.js';
import stickyColumnExample from '../../examples/table/stickyColumnExample.js';
import stickyHeaderColumnExample from '../../examples/table/stickyHeaderColumnExample.js';
import stickyHeaderFooterExample from '../../examples/table/stickyHeaderFooterExample.js';
import topCaptionExample from '../../examples/table/topCaptionExample.js';
import uncontrolledExpandable from '../../examples/table/uncontrolledExpandable.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.Table?.displayName}>
      <PageHeader
        name={generatedDocGen.Table?.displayName}
        description={generatedDocGen.Table?.description}
      >
        <SandpackExample code={main} name="Main Table example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Table} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Displaying a set of structured data in a scannable way, that populates 2 or more rows.
          - Allowing users to compare information in rows and columns.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - There will never be enough data to populate at least 2 rows.
          - Displaying content that doesn’t follow a consistent pattern and can't be broken down into columns.
          - Providing robust data that doesn't fit in a tabular format. If there is a need to display a more complex data relationship, consider an info-graphic or a non-tabular format.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection title="Style" columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use accessible Gestalt grays for table text, and reserve colors to sparingly accent important status and information. Avoid over-styling text."
            sandpackExample={
              <SandpackExample
                name="Do - Use accessible Gestalt grays for table text"
                code={avoidOverStylingText}
                hideEditor
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Overuse color and styling for text in tables; it can make it hard to scan for important status updates and crucial information."
            sandpackExample={
              <SandpackExample
                name="Don't - Overuse color and styling for text in tables"
                code={dontOverStyleText}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Alignment" columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`Align content so that it’s easy to scan, read and compare:
- Start-align text and combo-content (combinations of text, numbers and/or graphics)
- End-align numbers only
- Align headers with their corresponding content
- Use tabular lining for numbers`}
            sandpackExample={
              <SandpackExample
                name="Do - Align content"
                code={alignContent}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Align content so that it makes it harder to scan, read, and compare.
- Center-align content
- Use proportional figures for numbers as they don’t quite align
- End-align text and combo-content (combinations of text, numbers and/or graphics)
- Misalign headers with their corresponding content
`}
            sandpackExample={
              <SandpackExample
                name="Align content so that it makes it harder to scan, read, and compare.\n- Center-align content\n- Use proportional figures for numbers as they don’t quite align\n- End-align text and combo-content (combinations of text, numbers and/or graphics)\n- Misalign headers with their corresponding content"
                code={dontAlignContent}
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
            description="Place unit type on a separate column so that amounts can still align and be compared."
            sandpackExample={
              <SandpackExample
                name="Do - Place unit type on a separate column"
                code={separateUnitType}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix text and graphics with numbers that need to be compared with each other."
            sandpackExample={
              <SandpackExample
                name="Don't - Mix text and graphics with numbers"
                code={dontMixTextAndGraphics}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Content" columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Make content digestible and scannable:
- Keep headers clear and concise
- Include an a visual indicator for cells that don’t have content.
- Give enough space for content to account for localization.
- Wrap important content to multiple lines
- Truncate secondary information, especially if a user is going to get the full content upon click of a link in the table.
"
            sandpackExample={
              <SandpackExample
                name="Do - Make content digestible and scannable:\n- Keep headers clear and concise\n- Include an a visual indicator for cells that don’t have content.\n- Give enough space for content to account for localization.\n- Wrap important content to multiple lines\n- Truncate secondary information, especially if a user is going to get the full content upon click of a link in the table.\n"
                code={makeContentDigestable}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add so much content that it’s hard for a user to read, examine and scan:
- Don’t truncate content that a user needs to examine in relation to other content in the table.
- Leave cells blank so that it isn’t clear if all data has loaded."
            sandpackExample={
              <SandpackExample
                name="Don't - Add so much content"
                code={dontAddSoMuchContent}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Expand rows if the additional content is simple, doesn’t contain a lot of interaction and doesn’t take up more than 50% of the screen."
            sandpackExample={
              <SandpackExample
                name="Do - Expand rows"
                code={expandRows}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use an expand to display dense, highly-interactive content. Use a new page or [OverlayPanel](/web/overlaypanel) for that."
            sandpackExample={
              <SandpackExample
                name="Don't - Use an expand for dense content"
                code={dontUseExpandForDenseContent}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Localization"
        description={`Be sure to localize \`text\` and \`accessibilityLabel\`.

Note that localization can lengthen text by 20 to 30 percent; follow our guidelines on concise content and headings to account for localization.

Wrap important table content instead of truncating. Use truncation only for secondary content, and include a tooltip to show the full text on hover.
`}
      />
      <AccessibilitySection name={generatedDocGen.Table?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
Use  \`accessibilityLabel\` to properly announce the content of the table. For example, use "Campaign Status Information".

Don’t include the word “table” as part of the label to prevent redundancy: the VoiceOver already appends “table” to the label and the Category “Table” in the rotor already describes the nature of the component.

In terms of structure and content, HTML tables already provide accessible ways to navigate content via cells \`<td>\` and headers \`<th>\`.
  `}
        />
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
The Tab key should only place the focus on interactive elements like sortable headers, expands and links. If a cell does not contain interactive content, tabbing should skip the cell. Enter, Space and Return activate buttons and other controls after focusing. Arrow keys can be used to scroll table content vertically and horizontally.`}
        />
        <MainSection.Subsection
          columns={2}
          title="Other considerations"
          description={`
Internally, Gestalt Table implements \`visually-hidden\` captions through the \`accessibilityLabel\` prop. Therefore, if we want to add visual captions (at the top or bottom of the Table), we must prevent redundancy. Any top or bottom text that describes the Table should be removed from navigation using \`aria-hidden\`.

See the examples below for more details.`}
        >
          <MainSection.Card
            cardSize="md"
            title="Top captions"
            sandpackExample={
              <SandpackExample
                name="Top caption example"
                code={topCaptionExample}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Bottom captions"
            sandpackExample={
              <SandpackExample
                name="Bottom caption example"
                code={bottomCaptionExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.TableHeader?.displayName}
          description={generatedDocGen?.TableHeader?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableHeader}
            name={generatedDocGen?.TableHeader?.displayName}
            id={generatedDocGen?.TableHeader?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableBody?.displayName}
          description={generatedDocGen?.TableBody?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableBody}
            name={generatedDocGen?.TableBody?.displayName}
            id={generatedDocGen?.TableBody?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableFooter?.displayName}
          description={generatedDocGen?.TableFooter?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableFooter}
            name={generatedDocGen?.TableFooter?.displayName}
            id={generatedDocGen?.TableFooter?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableCell?.displayName}
          description={generatedDocGen?.TableCell?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableCell}
            name={generatedDocGen?.TableCell?.displayName}
            id={generatedDocGen?.TableCell?.displayName}
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableHeaderCell?.displayName}
          description={generatedDocGen?.TableHeaderCell?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableHeaderCell}
            name={generatedDocGen?.TableHeaderCell?.displayName}
            id={generatedDocGen?.TableHeaderCell?.displayName}
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableSortableHeaderCell?.displayName}
          description={generatedDocGen?.TableSortableHeaderCell?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableSortableHeaderCell}
            name={generatedDocGen?.TableSortableHeaderCell?.displayName}
            id={generatedDocGen?.TableSortableHeaderCell?.displayName}
            excludeProps={['shouldBeSticky', 'previousTotalWidth', 'shouldHaveShadow']}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableRow?.displayName}
          description={generatedDocGen?.TableRow?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRow}
            name={generatedDocGen?.TableRow?.displayName}
            id={generatedDocGen?.TableRow?.displayName}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title={generatedDocGen?.TableRowExpandable?.displayName}
          description={generatedDocGen?.TableRowExpandable?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRowExpandable}
            name={generatedDocGen?.TableRowExpandable?.displayName}
            id={generatedDocGen?.TableRowExpandable?.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.TableRowDrawer?.displayName}
          description={generatedDocGen?.TableRowDrawer?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableRowDrawer}
            name={generatedDocGen?.TableRowDrawer?.displayName}
            id={generatedDocGen?.TableRowDrawer?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Sticky header & footer">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Sticky header & footer example"
                code={stickyHeaderFooterExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sticky Column"
          description="Try scrolling horizontally to see the first column remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Sticky column example"
                code={stickyColumnExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Multiple sticky columns"
          description="Try scrolling horizontally to see the first 3 columns remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Multiple sticky columns example"
                code={multipleStickyColumnsExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sticky header and sticky columns"
          description="Try scrolling horizontally and vertically to see the columns and header remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Sticky header and sticky columns example"
                code={stickyHeaderColumnExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Controlled/Uncontrolled Table.RowExpandable"
          description={`To set Table.RowExpandable to be a controlled component, use the \`expanded\` prop. When \`expanded\` is not passed (\`expanded\` set to undefined), Table.RowExpandable stays uncontrolled. Use \`onExpand\` prop to have access to the internal state of the component via render props <code>({ event, expanded }) => { expanded }</code>"

When Table.RowExpandable is uncontrolled, use the clickable expand/collapse icon button to hide/show the content.`}
          columns={2}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={controlledExpandable}
                name="Controlled Table.RowExpandable example"
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={uncontrolledExpandable}
                name="Uncontrolled Table.RowExpandable example"
                hideEditor
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Table.RowExpandable with Sticky Columns"
          description="When specifying `stickyColumns` with expandable rows, include the column of arrows in your count. This example sets `stickyColumns` to 3."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Table.RowExpandable with Sticky Columns example"
                code={rowExpandableWithStickyColumns}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Table.RowDrawer implementation"
          description="Drawer row that is able to hold additional content."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Drawer row that is able to hold additional content"
                code={drawerRowExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sortable header cells"
          description={`Sortable header cells are clickable in an accessible way and have an icon to display whether the table is currently being sorted by that column.  <br/>
          Depending on the table contents, use the \`align\` property to set the alignment of the header cell and sort icon position.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Sortable header cells example"
                code={sortableTableCells}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Sortable header cells with sticky columns">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Sortable header cells with sticky columns"
                code={sortableHeaderCellsWithStickyColumns}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Selected & hovered state"
          description={`Table.Row, Table.RowExpandable and Table.RowDrawer support hovered and selected states.

If a row subcomponent is selectable, toggle the \`selected\` prop between "selected" and "unselected" to keep a constant border space in the row that is only visible when the row is selected.

If the row is not selectable, the \`selected\` prop should not be set. In this case, it doesn't set a side border.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={selected} name="Selected example" layout="column" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen.Table?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Module](/web/module)**
Modules are another way to stack multiple rows of content. However, they are used to show 2 to 3 blocks of related content, whereas Tables are used for large data sets that can be easily scanned and compared across multiple rows and columns.

**[Checkbox](/web/checkbox)**
Checkboxes are often used in tables to allow for selecting and editing of multiple rows at once.
          `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipleDocGen([
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
  ]);

  docGen.Table.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Body | typeof Table.Footer | typeof Table.Header>>';
  docGen.TableHeader.props.children.flowType.raw = 'React.Element<typeof Table.Row>';
  docGen.TableBody.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Row | typeof Table.RowExpandable>>';
  docGen.TableFooter.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Row | typeof Table.RowExpandable>>';
  docGen.TableRow.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Cell | typeof Table.HeaderCell | typeof Table.SortableHeaderCell>>';
  docGen.TableRowExpandable.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Cell>>';
  docGen.TableRowDrawer.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof Table.Cell>>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
