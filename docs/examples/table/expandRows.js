// @flow strict
import { type Node as ReactNode, useState } from 'react';
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
}: {
  name: string,
  team: string,
  src: string,
  teamRole: string,
  hours: string,
  active: boolean,
  setActive: (active: boolean) => void,
}) {
  return (
    <Table.RowExpandable
      accessibilityCollapseLabel="Collapse"
      accessibilityExpandLabel="Expand"
      expandedContents={
        <Box
          column={12}
          display="flex"
          justifyContent="center"
          maxWidth={236}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          padding={2}
        >
          <WashAnimated
            active={active}
            image={
              <Box column={12} display="flex" justifyContent="center" maxWidth={236} padding={2}>
                <Avatar name={`${name}avatar`} size="md" src={src} />
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
      id={name}
      onExpand={() => {}}
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

export default function Example(): ReactNode {
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
          hours="Monday, Friday"
          name="Ayesha Teng"
          setActive={setActiveA}
          src="https://i.ibb.co/QY9qR7h/luna.png"
          team="Gestalt"
          teamRole="Engineer"
        />
        <BaseRow
          active={activeB}
          hours="Wednesdays"
          name="Ryan Costa"
          setActive={setActiveB}
          src="https://i.ibb.co/Hzcfxjt/draco.png"
          team="Analytics"
          teamRole="Designer"
        />
        <BaseRow
          active={activeC}
          hours="Tuesdays, Thursdays"
          name="Kate Steele"
          setActive={setActiveC}
          src="https://i.ibb.co/JvY9DKK/neville.png"
          team="Monetization"
          teamRole="Design Technologist"
        />
      </Table.Body>
    </Table>
  );
}
