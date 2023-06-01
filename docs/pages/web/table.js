// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { multipledocgen, type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import controlledExpandable from '../../examples/table/controlledExpandable.js';
import main from '../../examples/table/main.js';
import selected from '../../examples/table/selected.js';
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
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Status", "Campaign"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, text, campaign }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text>{text}</Text>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Text color={disabled ? "gray" : "darkGray"}>{campaign}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of a 'do' for table style";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID}/>
      <Table.Body>
        <BaseRow
          id={tableID}
          checked={true}
          text="The best ad"
          campaign="Engagement"
        />
        <BaseRow
          id={tableID}
          disabled
          text="This ad is great"
          campaign="Awareness"
        />
        <BaseRow
          id={tableID}
          checked={true}
          text="Mary's pincycle"
          campaign="Catalogs"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="Best Purchase Wins"
          campaign="Awareness"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          campaign="Conversions"
        />
      </Table.Body>
    </Table>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Overuse color and styling for text in tables; it can make it hard to scan for important status updates and crucial information."
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Status", "Campaign"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text color={ title === "Campaign" ? "red" : "blue"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, text, campaign, bold, underline, italic, color }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={ id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "") }
 onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text
              weight={bold ? "bold" : "regular"}
              underline={underline ? true : undefined}
              italic={italic ? true : undefined}
            >
              {text}
            </Text>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Text color={color}>{campaign}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

 const tableID = "Example of a Dont do for table style";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID}/>
      <Table.Body>
        <BaseRow
          id={tableID}
          checked={true}
          text="The best ad"
          campaign="Engagement"
          color="red"
        />
        <BaseRow
          id={tableID}
          disabled
          bold
          text="This ad is great"
          campaign="Awareness"
          color="blue"
        />
        <BaseRow
          id={tableID}
          checked={true}
          bold
          italic
          text="Mary's pincycle"
          campaign="Catalogs"
          color="red"
        />
        <BaseRow
          id={tableID}
          checked={false}
          underline
          text="BEST PURCHASE WINS"
          campaign="Awareness"
          color="purple"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          campaign="CONVERSIONS"
          color="green"
        />
      </Table.Body>
    </Table>
  );
}
`}
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
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Campaign", "Spend"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title === "Spend" ? "end" : "start"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, text, spend }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text>{text}</Text>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Text align="end">{spend}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of a 'do' for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID}/>
      <Table.Body>
       <BaseRow
          id={tableID}
          checked={true}
          text="The best ad"
          spend="$5.50"
        />
        <BaseRow
          id={tableID}
          disabled
          text="This ad is great"
          spend="$3,000.00"
        />
        <BaseRow
          id={tableID}
          checked={true}
          text="Mary's pincycle"
          spend="$1.75"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="Best Purchase Wins"
          spend="$51,650,500.54"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          spend="$67.60"
        />
      </Table.Body>
    </Table>
  );
}
`}
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
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Campaign", "Spend"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title === "Campaign" ? "center" : "start"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, text, subtext, spend }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text align="center">{text}</Text>
            <Text align="center">{subtext}</Text>
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Text align="end">{spend}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
       <BaseRow
          id={tableID}
          checked={true}
          text="The best ad"
          subtext="12/20/21"
          spend="$5"
        />
        <BaseRow
          id={tableID}
          disabled
          text="This ad is great"
          subtext="01/16/21"
          spend="$3,000.00"
        />
        <BaseRow
          id={tableID}
          checked={true}
          text="Mary's pincycle"
          subtext="07/15/22"
          spend="$1.750"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="Best Purchase Wins"
          subtext="06/15/22"
          spend="$51,650,500.54"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          subtext="06/24/22"
          spend="$67.60"
        />
      </Table.Body>
    </Table>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place unit type on a separate column so that amounts can still align and be compared."
            defaultCode={`
function Example() {
  const HeaderRow = () => {
    return (
      <Table.Header>
        <Table.Row>
          {["Status", "Rate", "Type"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title === "Rate" ? "end" : "start"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ disabled, type, title, subtext, rate, category }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Status type={type} title={title} subtext={subtext} />
        </Table.Cell>
        <Table.Cell>
          <Text align="end" color={disabled ? "gray" : "darkGray"}>{rate}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text color={disabled ? "gray" : "darkGray"}>{category}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Another example of a 'do' for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          type="inProgress"
          title="Active"
          subtext="Ends 11/20/2021"
          rate={100}
          category="CTR"
        />
        <BaseRow
          disabled
          type="halted"
          title="Paused"
          subtext="Ends 11/20/2021"
          rate="5,000"
          category="Engagement"
        />
        <BaseRow
          type="warning"
          title="Warning"
          subtext="Ends 11/20/2021"
          rate={2}
          category="Conversions"
        />
        <BaseRow
          checked={false}
          type="ok"
          title="Complete"
          subtext="Ends 11/20/2021"
          rate={50}
          category="CTR"
        />
      </Table.Body>
    </Table>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix text and graphics with numbers that need to be compared with each other."
            defaultCode={`
function Example() {
  const HeaderRow = () => {
    return (
      <Table.Header>
        <Table.Row>
          {["Status", "Rate"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title === "Rate" ? "end" : "start"}  weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ disabled, type, title, subtext, rate }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Status type={type} title={title} subtext={subtext} />
        </Table.Cell>
        <Table.Cell>
          <Text overflow="noWrap" align="end" color={disabled ? "gray" : "darkGray"}>{rate}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Another Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          type="inProgress"
          title="Active"
          subtext="Ends 11/20/2021"
          rate="100 CTR"
        />
        <BaseRow
          disabled
          type="halted"
          title="Paused"
          subtext="Ends 11/20/2021"
          rate="5,000 Engagement"
        />
        <BaseRow
          type="warning"
          title="Warning"
          subtext="Ends 11/20/2021"
          rate="2 Conversions"
        />
        <BaseRow
          type="ok"
          title="Complete"
          subtext="Ends 11/20/2021"
          rate="50 CTR"
        />
      </Table.Body>
    </Table>
  );
}
`}
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
            defaultCode={`
function Example() {
  const HeaderRow = () => {
    return (
      <Table.Header>
        <Table.Row>
          {["Name", "Total"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title === "Total" ? "end" : "start"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ name, subtext, total, lineClamp }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Text color="default">{name}</Text>
          <Text color="subtle" size="100" lineClamp={lineClamp}>{subtext}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text align="end">{total}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of a 'do' for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          name="Video views for all Q3 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="--"
          lineClamp={1}
        />
        <BaseRow
          name="Video views for all Q2 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda"
          total="5,000"
        />
        <BaseRow
          name="Video views for all Q2 ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="6,455,434"
          lineClamp={1}
        />
      </Table.Body>
    </Table>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add so much content that it’s hard for a user to read, examine and scan:
- Don’t truncate content that a user needs to examine in relation to other content in the table.
- Leave cells blank so that it isn’t clear if all data has loaded."
            defaultCode={`
function Example() {
  const HeaderRow = () => {
    return (
      <Table.Header>
        <Table.Row>
          {["Name", "Total amounts for 2021 through 2022"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text align={title.startsWith("Total") ? "end" : "start"} weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ name, subtext, total, lineClamp }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Text color="default">{name}</Text>
          <Text color="subtle" size="100" lineClamp={lineClamp}>{subtext}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text align="end" lineClamp={lineClamp}>{total}</Text>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of a 'don't' do for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          name="Video views for all Q3 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total=""
        />
        <BaseRow
          name="Video views for all Q2 campaigns and ad groups"
          subtext="David Brown, Carlota Ojeda"
          total="5,000"
        />
        <BaseRow
          name="Video views for all Q2 ad groups"
          subtext="David Brown, Carlota Ojeda, Olamide Olufemi, Rajesh Uttambai"
          total="6,455,434"
          lineClamp={1}
        />
      </Table.Body>
    </Table>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Expand rows if the additional content is simple, doesn’t contain a lot of interaction and doesn’t take up more than 50% of the screen."
            defaultCode={`
    function Example() {
      const [activeA, setActiveA] = React.useState(false);
      const [activeB, setActiveB] = React.useState(false);
      const [activeC, setActiveC] = React.useState(false);

      const HeaderRow = () => {
        return (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Box display="visuallyHidden">
                  <Text weight="bold">Open/Close row</Text>
                </Box>
              </Table.HeaderCell>
              {["Name", "Team", "Role", "Office Hours"].map((title, idx) => {
                return (
                  <Table.HeaderCell key={idx}>
                    <Text weight="bold">{title}</Text>
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
        );
      };

      const BaseRow = ({ name, team, src, role, hours, active, setActive }) => {
        return (
            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id={name}
              onExpand={() => {}}
              expandedContents={
                <Box
                  onMouseEnter={() => setActive(true)}
                  onMouseLeave={() => setActive(false)}
                  display="flex"
                  justifyContent="center"
                  maxWidth={236}
                  padding={2}
                  column={12}
                >
                  <WashAnimated
                    active={active}
                    image={
                      <Box
                        display="flex"
                        justifyContent="center"
                        maxWidth={236}
                        padding={2}
                        column={12}
                      >
                        <Avatar
                          size="md"
                          name={name+"avatar"}
                          src={src}
                        />
                      </Box>
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com" target="blank">
                        <Box paddingX={3} paddingY={2}>
                          {name+"'s Info"}
                        </Box>
                      </Link>
                    </Text>
                  </WashAnimated>
                </Box>
              }
            >
            <Table.Cell>
              <Text>{name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{team}</Text>
            </Table.Cell>
             <Table.Cell>
              <Text>{role}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{hours}</Text>
            </Table.Cell>
          </Table.RowExpandable>
        );
      };

    const tableID = "Another Example of a 'do' for table content";

      return(
    <Table accessibilityLabel={tableID}>
          <HeaderRow />
          <Table.Body>
           <BaseRow
              active={activeA}
              setActive={setActiveA}
              name="Ayesha Teng"
              team="Gestalt"
              src="https://i.ibb.co/QY9qR7h/luna.png"
              role="Engineer"
              hours="Monday, Friday"
            />
            <BaseRow
              active={activeB}
              setActive={setActiveB}
              name="Ryan Costa"
              team="Analytics"
              src="https://i.ibb.co/Hzcfxjt/draco.png"
              role="Designer"
              hours="Wednesdays"
            />
            <BaseRow
              active={activeC}
              setActive={setActiveC}
              name="Kate Steele"
              team="Monetization"
              src="https://i.ibb.co/JvY9DKK/neville.png"
              role="Design Technologist"
              hours="Tuesdays, Thursdays"
            />
          </Table.Body>
        </Table>);
    }
    `}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use an expand to display dense, highly-interactive content. Use a new page or [OverlayPanel](/web/overlaypanel) for that."
            defaultCode={`
function MainExample() {
  const ExpandedContents = () => {
    const [tabItem, setTabItem] = React.useState('campaign');
    const [extExpandedId, setExtExpandedId] = React.useState(null);
    const mapIds = {
      'first-0': 0,
      'first-1': 1,
      'first-2': 2,
    };
    return (
      <Flex direction="column" gap={{ column: 6, row: 0 }} width={800}>
        <Tabs
          activeTabIndex={tabItem === 'campaign' ? 0 : 1}
          bgColor="transparent"
          onChange={({ event }) => {
            setTabItem(tabItem !== 'analytics' ? 'analytics' : 'campaign');
            event.preventDefault();
          }}
          tabs={[
            { href: '', text: 'Campaign', indicator: tabItem === 'campaign' ? 'dot' : undefined },
            { href: '', text: 'Analytics', indicator: tabItem === 'analytics' ? 'dot' : undefined },
          ]}
        />
        {tabItem === 'campaign' ? (
          <Flex direction="column" gap={{ column: 6, row: 0 }} width="100%">
            <Heading size="400" accessibilityLevel={2}>
              Latest boards
            </Heading>
            <Flex gap={{ row: 6, column: 0 }} width="100%">
              <Flex.Item width="50%">
                <TapArea tapStyle="compress" onTap={() => {}}>
                  <Mask rounding={4}>
                    <Collage
                      columns={3}
                      height={300}
                      width={300}
                      renderImage={({ index, width, height }) => {
                        const images = [
                          {
                            color: 'rgb(111, 91, 77)',
                            naturalHeight: 751,
                            naturalWidth: 564,
                            src: 'https://i.ibb.co/Lx54BCT/stock1.jpg',
                          },
                          {
                            color: 'rgb(231, 186, 176)',
                            naturalHeight: 200,
                            naturalWidth: 98,
                            src: 'https://i.ibb.co/7bQQYkX/stock2.jpg',
                          },
                          {
                            color: '#000',
                            naturalHeight: 300,
                            naturalWidth: 200,
                            src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
                          },
                          {
                            color: '#000',
                            naturalHeight: 517,
                            naturalWidth: 564,
                            src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
                          },
                          {
                            color: '#000',
                            naturalHeight: 806,
                            naturalWidth: 564,
                            src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
                          },
                          {
                            color: '#000',
                            naturalHeight: 200,
                            naturalWidth: 200,
                            src: 'https://i.ibb.co/FY2MKr5/stock6.jpg',
                          },
                        ];
                        const image = images[index] || {};
                        return (
                          <Mask wash width={width} height={height}>
                            <Image
                              alt="collage image"
                              color={image.color}
                              fit="cover"
                              naturalHeight={image.naturalHeight}
                              naturalWidth={image.naturalWidth}
                              src={image.src}
                            />
                          </Mask>
                        );
                      }}
                    />
                  </Mask>
                  <Flex direction="column" gap={{ column: 2, row: 0 }}>
                    <Heading size="400" accessibilityLevel={0}>
                      Uniform
                    </Heading>
                    <Flex gap={{ column: 0, row: 5 }}>
                      <Text size="200">123 Pins</Text>
                      <Text size="200">4 sections</Text>
                    </Flex>
                  </Flex>
                </TapArea>
              </Flex.Item>
              <Flex direction="column" gap={{ column: 4, row: 0 }} width="100%">
                <TextField
                  id="name"
                  onChange={() => {}}
                  placeholder="Name"
                  label="Name"
                  value="December '21"
                />
                <TextArea
                  id="notes"
                  onChange={() => {}}
                  placeholder="Notes on updates..."
                  label="Notes"
                  value=""
                />
                <Flex gap={{ column: 0, row: 4 }}>
                  <NumberField
                    id="budget"
                    onChange={() => {}}
                    placeholder=""
                    label="Budget (USD)"
                    value="100000"
                  />
                  <TextField
                    id="scope"
                    onChange={() => {}}
                    placeholder=""
                    label="Scope"
                    value="Global"
                  />
                </Flex>
                <Label htmlFor="status">
                  <Text>Status</Text>
                </Label>
                <Switch onChange={() => {}} id="status" switched />
              </Flex>
            </Flex>
            <Flex gap={{ column: 0, row: 3 }}>
              <Button text="Cancel" />
              <Flex.Item flex="grow">
                <Button text="Pause" />
              </Flex.Item>
              <Button color="red" text="Edit" />
            </Flex>
          </Flex>
        ) : (
          <Flex gap={{ column: 0, row: 3 }}>
            <Module id="Analitycs Overview" title="Analitycs Overview">
              <Box width={300}>
                <Datapoint
                  size="lg"
                  tooltipText="The number of times your ads were seen, including earned impressions"
                  title="Total impressions"
                  value="1K"
                  trend={{ value: 30, accessibilityLabel: 'Trending up' }}
                />
                <Datapoint
                  size="lg"
                  tooltipText="The number of times your ads were seen, including earned impressions"
                  title="Saves"
                  value="5"
                  trend={{ value: 5, accessibilityLabel: 'Trending up' }}
                />
                <Datapoint
                  size="lg"
                  tooltipText="The number of times your ads were seen, including earned impressions"
                  title="Outbound clicks"
                  value="10"
                  trend={{ value: 10, accessibilityLabel: 'Trending up' }}
                />
              </Box>
            </Module>
            <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800}>
              <Module
                id="Ads Overview"
                title="Ads Overview"
                iconButton={
                  <IconButton
                    role="link"
                    href="https://analytics.pinterest.com/"
                    bgColor="lightGray"
                    icon="arrow-up-right"
                    iconColor="darkGray"
                    accessibilityLabel="Get help"
                    size="xs"
                    onClick={() => {}}
                    target="blank"
                  />
                }
              >
                <Box width={300}>
                  <Text size="200">Content</Text>
                </Box>
              </Module>
              <Module id="Top Pins" title="Top Pins">
                <Box width={300}>
                  <Text size="200">Content</Text>
                </Box>
              </Module>
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  };

  function Example() {
    const HeaderRow = () => (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden">
              <Text weight="bold">Open/Close row</Text>
            </Box>
          </Table.HeaderCell>
          {['Campaign', 'Status', 'Budget', 'Scope'].map((title, idx) => (
            <Table.HeaderCell key={idx}>
              <Text weight="bold">{title}</Text>
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );

    const BaseRow = ({ campaign, status, budget, scope }) => (
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Text weight="bold">Open/Close row</Text>
          </Box>
        </Table.HeaderCell>
        <Table.Cell>
          <Text>{campaign}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{status}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{budget}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{scope}</Text>
        </Table.Cell>
      </Table.Row>
    );

    const RowExpandable = ({ campaign, status, empty, budget, scope }) => (
      <Table.RowExpandable
        accessibilityExpandLabel="Expand"
        accessibilityCollapseLabel="Collapse"
        id="row1"
        onExpand={() => {}}
        expandedContents={
          empty ? (
            <Text>No metrics available. This campaign hasn't started yet.</Text>
          ) : (
            <ExpandedContents />
          )
        }
      >
        <Table.Cell>
          <Text>{campaign}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{status}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{budget}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{scope}</Text>
        </Table.Cell>
      </Table.RowExpandable>
    );

    const tableID = "Another example of a 'don't' do for table content";

    return (
      <Table accessibilityLabel={tableID}>
        <HeaderRow />
        <Table.Body>
          <RowExpandable campaign="December '21" status="Active" budget="$100,000" scope="Global" />
          <RowExpandable
            campaign="January '22"
            status="Draft"
            budget="$50,000"
            scope="Japan, Germany, Canada, Spain, Mexico, Thailand, Italy"
            empty
          />
          <RowExpandable
            campaign="February '22"
            status="Draft"
            budget="$50,000"
            scope="Japan, Germany, Canada"
            empty
          />
        </Table.Body>
      </Table>
    );
  }

  return <Example />;
}
    `}
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
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Status", "Campaign"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, type, text, subtext, campaign }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Status type={type} title={text} subtext={subtext} />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text color={disabled ? "gray" : "darkGray"}>{campaign}</Text>
          </Label>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of correct accessibility with top caption";

  return (
    <Flex gap={{ column: 2, row: 0 }} direction="column">
      <Box aria-hidden>
        <Text
          size="400"
          weight="bold"
        >
          Your Campaigns Summary
        </Text>
      </Box>
      <Table accessibilityLabel="Your campaigns summary">
        <HeaderRow id={tableID}/>
        <Table.Body>
          <BaseRow
            id={tableID}
            checked={true}
            type="inProgress"
            text="In progress"
            subtext="Ends 11/20/2021"
            campaign="Engagement"
          />
          <BaseRow
            id={tableID}
            disabled
            type="halted"
            text="Paused"
            subtext="Ends 11/20/2021"
            campaign="Awareness"
          />
          <BaseRow
            id={tableID}
            checked={true}
            type="warning"
            text="Warning"
            subtext="Ends 11/20/2021"
            campaign="Catalogs"
          />
          <BaseRow
            id={tableID}
            checked={false}
            type="ok"
            text="Complete"
            subtext="Ends 11/20/2021"
            campaign="Awareness"
          />
        </Table.Body>
      </Table>
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            title="Bottom captions"
            defaultCode={`
function Example() {
  const HeaderRow = ({ id }) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Box display="visuallyHidden"><Label htmlFor={id}>Not all checkboxes are checked</Label></Box>
            <Checkbox
              id={id}
   onChange={() => {}}
              indeterminate
              size="sm"
            />
          </Table.HeaderCell>
          {["Status", "Campaign"].map((title, idx) => {
            return (
              <Table.HeaderCell key={idx}>
                <Text weight="bold">{title}</Text>
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  const BaseRow = ({ id, checked, disabled, type, text, subtext, campaign }) => {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            id={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")} onChange={() => {}}
            disabled={disabled}
            size="sm"
            checked={checked}
          />
        </Table.Cell>
        <Table.Cell>
          <Status type={type} title={text} subtext={subtext} />
        </Table.Cell>
        <Table.Cell>
          <Label htmlFor={id.replace(/ /g, "_").replace(/'/g, "") + "_" + text.replace(/ /g, "_").replace(/'/g, "")}>
            <Text color={disabled ? "gray" : "darkGray"}>{campaign}</Text>
          </Label>
        </Table.Cell>
      </Table.Row>
    );
  };

  const tableID = "Example of correct accessibility with bottom caption";

  return (
    <Flex gap={{ column: 2, row: 0 }} direction="column">
      <Table accessibilityLabel="Your campaigns summary">
        <HeaderRow id={tableID}/>
        <Table.Body>
          <BaseRow
            id={tableID}
            checked={true}
            type="inProgress"
            text="In progress"
            subtext="Ends 11/20/2021"
            campaign="Engagement"
          />
          <BaseRow
            id={tableID}
            disabled
            type="halted"
            text="Paused"
            subtext="Ends 11/20/2021"
            campaign="Awareness"
          />
          <BaseRow
            id={tableID}
            checked={true}
            type="warning"
            text="Warning"
            subtext="Ends 11/20/2021"
            campaign="Catalogs"
          />
          <BaseRow
            id={tableID}
            checked={false}
            type="ok"
            text="Complete"
            subtext="Ends 11/20/2021"
            campaign="Awareness"
          />
        </Table.Body>
      </Table>
      <Box aria-hidden>
        <Text align="center" size="100">Your campaigns summary</Text>
      </Box>
    </Flex>
  );
}
`}
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
            defaultCode={`
<Table accessibilityLabel="Sticky footer" maxHeight={200}>
  <Table.Header sticky>
    <Table.Row>
      <Table.HeaderCell>
        <Text weight="bold">Campaign</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Impression</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Cost</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Text>Spring season</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>10,000</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>$500</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Autumn season</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>10,000</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>$500</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Summer season</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>10,000</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>$500</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text>Winter season</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>10,000</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>$500</Text>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer sticky>
    <Table.Row>
      <Table.Cell>
        <Text weight="bold">Total</Text>
      </Table.Cell>
      <Table.Cell>
        <Text weight="bold">40,000</Text>
      </Table.Cell>
      <Table.Cell>
        <Text weight="bold">$2,000</Text>
      </Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>;
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sticky Column"
          description="Try scrolling horizontally to see the first column remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width="50%">
  <Table accessibilityLabel="Sticky Column" maxHeight={200} stickyColumns={1}>

    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Birthday</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell>
          <Box width={200}><Text>May 29, 1970</Text></Box>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>December 28, 1995</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="T'Challa"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>November 28, 1977</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Multiple sticky columns"
          description="Try scrolling horizontally to see the first 3 columns remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width="60%">
  <Table accessibilityLabel="Multiple sticky columns" maxHeight={200} stickyColumns={3} borderStyle="none">

    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Powers</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Home</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Aliases</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Flight, Super strength</Text></Table.Cell>
        <Table.Cell><Text>New York</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Spidey senses, super strength, web shooters</Text></Table.Cell>
        <Table.Cell><Text>Brooklyn</Text></Table.Cell>
        <Table.Cell><Text>Friendly Neighborhood Spiderman</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Wanda"
                src="https://i.ibb.co/hV6Vpbf/scarlet.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Wanda Maximoff</Text></Table.Cell>
        <Table.Cell><Text>Scarlet Witch</Text></Table.Cell>
        <Table.Cell><Text>Vision</Text></Table.Cell>
        <Table.Cell><Text>Chicken paprikash</Text></Table.Cell>
        <Table.Cell><Text>Chaos magic, spells, reality warping</Text></Table.Cell>
        <Table.Cell><Text>Sokovia</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Black Panther"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Enhanced strength, speed, reflexes + Vibranium suit</Text></Table.Cell>
        <Table.Cell><Text>Wakanda</Text></Table.Cell>
        <Table.Cell><Text>King of the Dead</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sticky header and sticky columns"
          description="Try scrolling horizontally and vertically to see the columns and header remain in place."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box width="60%">
  <Table accessibilityLabel="Sticky header and sticky columns" maxHeight={200} stickyColumns={3} borderStyle="none">

    <Table.Header sticky>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Image</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Name</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Best Friend</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Favorite Food</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Super Powers</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Home</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Aliases</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Tony"
                src="https://i.ibb.co/r3R04Y9/ironman.jpg"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Tony Stark</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Shawarma</Text></Table.Cell>
        <Table.Cell><Text>Flight, Super strength</Text></Table.Cell>
        <Table.Cell><Text>New York</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Peter"
                src="https://i.ibb.co/64NxM43/spiderman.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Peter Parker</Text></Table.Cell>
        <Table.Cell><Text>Spiderman</Text></Table.Cell>
        <Table.Cell><Text>Iron Man</Text></Table.Cell>
        <Table.Cell><Text>Sandwiches</Text></Table.Cell>
        <Table.Cell><Text>Spidey senses, super strength, web shooters</Text></Table.Cell>
        <Table.Cell><Text>Brooklyn</Text></Table.Cell>
        <Table.Cell><Text>Friendly Neighborhood Spiderman</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Wanda"
                src="https://i.ibb.co/hV6Vpbf/scarlet.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>Wanda Maximoff</Text></Table.Cell>
        <Table.Cell><Text>Scarlet Witch</Text></Table.Cell>
        <Table.Cell><Text>Vision</Text></Table.Cell>
        <Table.Cell><Text>Chicken paprikash</Text></Table.Cell>
        <Table.Cell><Text>Chaos magic, spells, reality warping</Text></Table.Cell>
        <Table.Cell><Text>Sokovia</Text></Table.Cell>
        <Table.Cell><Text>N/A</Text></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Box width={50}>
            <Mask rounding="circle">
              <Image
                alt="Black Panther"
                src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                naturalHeight={50}
                naturalWidth={50}
              />
            </Mask>
          </Box>
        </Table.Cell>
        <Table.Cell><Text>T'Challa</Text></Table.Cell>
        <Table.Cell><Text>Black Panther</Text></Table.Cell>
        <Table.Cell><Text>Shuri</Text></Table.Cell>
        <Table.Cell><Text>Beef suya</Text></Table.Cell>
        <Table.Cell><Text>Enhanced strength, speed, reflexes + Vibranium suit</Text></Table.Cell>
        <Table.Cell><Text>Wakanda</Text></Table.Cell>
        <Table.Cell><Text>King of the Dead</Text></Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>

`}
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
            defaultCode={`
    function Example() {
      const [textShown, setTextShown] = React.useState(false);
      const showTextOnExpand = () => {
        return <Text>Row expanded</Text>;
      };

      return(
      <Box width="60%">
        <Table accessibilityLabel="Table.RowExpandable with Sticky Columns" stickyColumns={3}>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Box display="visuallyHidden">
                  <Text weight="bold">Open/Close row</Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Name</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Super Name</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Best Friend</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Favorite Food</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Home</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text weight="bold">Alias</Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box width={200}>
                  <Text weight="bold">Super Powers</Text>
                </Box>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row1"
              onExpand={() => setTextShown(!textShown)}
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <WashAnimated
                    image={
                      <Avatar
                        name="tony avatar"
                        src="https://i.ibb.co/8948ym5/avenge.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Tony's Info
                        </Box>
                      </Link>
                    </Text>
                    {textShown && showTextOnExpand()}
                  </WashAnimated>
                </Box>
              }
            >
              <Table.Cell>
                <Text>Tony Stark</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Iron Man</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Spiderman</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Shawarma</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>New York City</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>N/A</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Flight, Super strength</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row2"
              expandedContents={
                <Table maxWidth={800} maxHeight={500}>
                  <Table.Header sticky>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Text weight="bold">Name</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">Relationship</Text>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row colSpan={10}>
                      <Table.Cell>
                        <Text>Vision</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Husband</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Text>Wiccan</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Child</Text>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Text>Speed</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>Child</Text>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              }
            >
              <Table.Cell>
                <Text>Wanda Maximoff</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Scarlet Witch</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Vision</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Chicken paprikash</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Sokovia</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Wanda Frank</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Chaos magic, spells, reality warping</Text>
              </Table.Cell>
            </Table.RowExpandable>

            <Table.RowExpandable
              accessibilityExpandLabel="Expand"
              accessibilityCollapseLabel="Collapse"
              id="row3"
              expandedContents={
                <Box maxWidth={236} padding={2} column={12}>
                  <WashAnimated
                    image={
                      <Avatar
                        name="Black panther avatar"
                        src="https://i.ibb.co/GpNtW5N/black-Panther.png"
                      />
                    }
                  >
                    <Text align="center" weight="bold">
                      <Link href="https://pinterest.com">
                        <Box paddingX={3} paddingY={2}>
                          Black Panther's Info
                        </Box>
                      </Link>
                    </Text>
                  </WashAnimated>
                </Box>
              }
            >
              <Table.Cell>
                <Text>T'Challa</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Black Panther</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Shuri</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Beef suya</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Wakana</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>King of the Dead</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>Enhanced strength, speed, reflexes + Vibranium suit</Text>
              </Table.Cell>
            </Table.RowExpandable>

          </Table.Body>
        </Table>
      </Box> );
    }
    `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Table.RowDrawer implementation"
          description="Drawer row that is able to hold additional content."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const [showdrawer, setShowDrawer] = React.useState(true);

  return(
    <Box width="100%">
      <Table accessibilityLabel="Table.RowDrawer example">
        <colgroup>
          <col span="1" style={{ width: "60%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "15%" }} />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Campaign</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">Spend</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">Impressions</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">CTR</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.RowDrawer
            id="drawerExample"
            drawerContents={ showdrawer ? <SlimBanner
                type="recommendation"
                iconAccessibilityLabel="Recommendation"
                message="Increasing your daily spend could increase clicks by 20%"
                primaryAction={{
                  accessibilityLabel: 'Apply for increasing your daily spend',
                  label: 'Apply',
                  onClick: () => {},
                }}
                dismissButton={{
                  accessibilityLabel: "Dismiss",
                  onDismiss: () => setShowDrawer(false),
                }}
              /> : null }
          >
            <Table.Cell>
              <Text>Training treats</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$3,200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">3.4k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.07%</Text>
            </Table.Cell>
          </Table.RowDrawer>
          <Table.Row>
            <Table.Cell>
              <Text>Vegan cuisine</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$4,200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">5k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.40%</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Mexican cuisine</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$5,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">20k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.10%</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
)}
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sortable header cells"
          description="Sortable header cells are clickable in an accessible way and have an icon to display whether the table is currently being sorted by that column."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
    function SortableHeaderExample() {
      const [sortOrder, setSortOrder] = React.useState('desc');
      const [sortCol, setSortCol] = React.useState('name');

      const onSortChange = (col) => {
        if (sortCol !== col) {
          setSortCol(col);
          setSortOrder('desc');
        } else {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
      }

      return (
        <Table accessibilityLabel="Sortable header cells">
          <Table.Header>
            <Table.Row>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('name')} sortOrder={sortOrder} status={sortCol === 'name' ? 'active' : 'inactive'}>
                <Text weight="bold">Name</Text>
              </Table.SortableHeaderCell>
              <Table.SortableHeaderCell onSortChange={() => onSortChange('id')} sortOrder={sortOrder} status={sortCol === 'id' ? 'active' : 'inactive'}>
                <Text weight="bold">Id</Text>
              </Table.SortableHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );
    }
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Sortable header cells with sticky columns">
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
    function SortableHeaderExample() {
      const [sortOrder, setSortOrder] = React.useState('desc');
      const [sortCol, setSortCol] = React.useState('name');

      const onSortChange = (col) => {
        if (sortCol !== col) {
          setSortCol(col);
          setSortOrder('desc');
        } else {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
      }

      return (
        <Box width="70%">
          <Table accessibilityLabel="Sortable header cells with sticky columns" stickyColumns={2}>
            <Table.Header>
              <Table.Row>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('name')} sortOrder={sortOrder} status={sortCol === 'name' ? 'active' : 'inactive'}>
                  <Text weight="bold">Name</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('id')} sortOrder={sortOrder} status={sortCol === 'id' ? 'active' : 'inactive'}>
                  <Text weight="bold">Nickname</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('food')} sortOrder={sortOrder} status={sortCol === 'food' ? 'active' : 'inactive'}>
                  <Text weight="bold">Favorite Food</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('friend')} sortOrder={sortOrder} status={sortCol === 'friend' ? 'active' : 'inactive'}>
                  <Text weight="bold">Best Friend</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('birth')} sortOrder={sortOrder} status={sortCol === 'birth' ? 'active' : 'inactive'}>
                  <Text weight="bold">Birthdate</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('desc')} sortOrder={sortOrder} status={sortCol === 'desc' ? 'active' : 'inactive'}>
                  <Text weight="bold">Description</Text>
                </Table.SortableHeaderCell>
                <Table.SortableHeaderCell onSortChange={() => onSortChange('color')} sortOrder={sortOrder} status={sortCol === 'color' ? 'active' : 'inactive'}>
                  <Text weight="bold">Favorite Color</Text>
                </Table.SortableHeaderCell>
              </Table.Row>
            </Table.Header>

          </Table>
        </Box>
      );
    }
`}
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
            sandpackExample={<SandpackExample code={selected} name="Selected example" />}
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
  const docGen = await multipledocgen({
    componentName: [
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
    ],
  });

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
