// @flow strict
import { type Node, useState } from 'react';
import { Avatar, Box, Link, Table, Text, WashAnimated } from 'gestalt';

function HeaderRow() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Text weight="bold">Open/Close row</Text>
          </Box>
        </Table.HeaderCell>
        {['Name', 'Team', 'Role', 'Office Hours'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text weight="bold">{title}</Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

function BaseRow({
  name,
  team,
  src,
  teamRole,
  hours,
  active,
  setActive,
}: {|
  name: string,
  team: string,
  src: string,
  teamRole: string,
  hours: string,
  active: boolean,
  setActive: (active: boolean) => void,
|}) {
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
              <Box display="flex" justifyContent="center" maxWidth={236} padding={2} column={12}>
                <Avatar size="md" name={`${name}avatar`} src={src} />
              </Box>
            }
          >
            <Text align="center" weight="bold">
              <Link href="https://pinterest.com" target="blank">
                <Box paddingX={3} paddingY={2}>
                  {`${name}'s Info`}
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
        <Text>{teamRole}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>{hours}</Text>
      </Table.Cell>
    </Table.RowExpandable>
  );
}

export default function Example(): Node {
  const [activeA, setActiveA] = useState(false);
  const [activeB, setActiveB] = useState(false);
  const [activeC, setActiveC] = useState(false);

  const tableID = "Another Example of a 'do' for table content";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow />
      <Table.Body>
        <BaseRow
          active={activeA}
          setActive={setActiveA}
          name="Ayesha Teng"
          team="Gestalt"
          src="https://i.ibb.co/QY9qR7h/luna.png"
          teamRole="Engineer"
          hours="Monday, Friday"
        />
        <BaseRow
          active={activeB}
          setActive={setActiveB}
          name="Ryan Costa"
          team="Analytics"
          src="https://i.ibb.co/Hzcfxjt/draco.png"
          teamRole="Designer"
          hours="Wednesdays"
        />
        <BaseRow
          active={activeC}
          setActive={setActiveC}
          name="Kate Steele"
          team="Monetization"
          src="https://i.ibb.co/JvY9DKK/neville.png"
          teamRole="Design Technologist"
          hours="Tuesdays, Thursdays"
        />
      </Table.Body>
    </Table>
  );
}
