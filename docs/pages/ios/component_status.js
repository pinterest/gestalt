// @flow strict
import { type Node } from 'react';
import { Badge, Box, Column, Flex, Link, Table, Text } from 'gestalt';
import componentData from '../../docs-components/data/components.js';
import {
  COMPONENT_STATUS_MESSAGING,
  STATUS_DESCRIPTION,
} from '../../docs-components/data/componentStatusMessaging.js';
import getByPlatform from '../../docs-components/data/utils/getByPlatform.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import StatusData from '../../docs-components/StatusData.js';

function DeprecatedStatus() {
  return <StatusData text="Deprecated" status="deprecated" />;
}

const iosComponentData = getByPlatform(componentData, { platform: 'ios' });
const sortedComponentList = [...iosComponentData].sort(({ name: aName }, { name: bName }) => {
  if (aName < bName) return -1;
  if (aName > bName) return 1;
  return 0;
});

const statusFields = ['figmaStatus', 'documentation', 'status'];

export default function ComponentStatus(): Node {
  return (
    <Page title="iOS component status" hideSideNav hideEditLink>
      <PageHeader
        name="iOS component status"
        description="A detailed synopsis of our iOS components and their implementation status."
        type="guidelines"
      />
      <Flex direction="column" gap={12}>
        <Column span={8}>
          <Table accessibilityLabel="Component status legend">
            <colgroup>
              {['30%', '70%'].map((width) => (
                <col key={width} style={{ width }} />
              ))}
            </colgroup>
            <Box display="visuallyHidden">
              <Table.Header>
                <Table.Row>
                  {['Status', 'Description'].map((header) => (
                    <Table.HeaderCell key={header}>
                      <Text weight="bold">{header}</Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
            </Box>
            <Table.Body>
              {['ready', 'partial', 'planned', 'deprecated', 'notAvailable'].map((typeStatus) => (
                <Table.Row key={typeStatus}>
                  <Table.Cell>
                    <StatusData status={typeStatus} />
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{STATUS_DESCRIPTION[typeStatus].description}</Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Column>

        <Table accessibilityLabel="Component status legend">
          <colgroup>
            {['17.5%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'].map((width) => (
              <col key={width} style={{ width }} />
            ))}
          </colgroup>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text weight="bold">Component</Text>
              </Table.HeaderCell>
              {statusFields.map((header) => (
                <Table.HeaderCell key={header.replace(' ', '_')}>
                  <Text weight="bold">{COMPONENT_STATUS_MESSAGING[header].title}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedComponentList.map(({ name, path, status: statusObj }) => {
              const { badge, status } = statusObj;

              return (
                <Table.Row key={name}>
                  <Table.Cell>
                    <Text size="200" inline>
                      <Link
                        href={
                          path ?? `/ios/${name.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`
                        }
                        display="inlineBlock"
                      >
                        {name}
                        {badge ? (
                          <Box display="inlineBlock" marginStart={2}>
                            <Badge type="info" text={badge} />
                          </Box>
                        ) : null}
                      </Link>
                    </Text>
                  </Table.Cell>
                  {statusFields.map((item) =>
                    status === 'deprecated' ? (
                      <Table.Cell key={item}>
                        <DeprecatedStatus />
                      </Table.Cell>
                    ) : (
                      <Table.Cell key={item}>
                        <StatusData status={statusObj[item] ?? 'notAvailable'} />
                      </Table.Cell>
                    ),
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Flex>
    </Page>
  );
}
