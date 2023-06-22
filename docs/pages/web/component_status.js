// @flow strict
import { Fragment, type Node } from 'react';
import { Badge, Box, Column, Flex, Link, Table, Text } from 'gestalt';
import COMPONENT_DATA from '../../docs-components/COMPONENT_DATA.js';
import { STATUS_DESCRIPTION } from '../../docs-components/data/componentStatusMessaging.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import StatusData from '../../docs-components/StatusData.js';

function DeprecatedStatus() {
  return <StatusData text="Deprecated" status="deprecated" />;
}

export default function ComponentStatus(): Node {
  const componentSortedList = [
    ...COMPONENT_DATA.buildingBlockComponents,
    ...COMPONENT_DATA.generalComponents,
    ...COMPONENT_DATA.utilityComponents,
  ].sort(({ name: aName }, { name: bName }) => {
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });

  return (
    <Page title="Component status" hideSideNav hideEditLink>
      <PageHeader
        name="Component status"
        description="A detailed synopsis of our components and their implementation status."
        type="guidelines"
      />
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 12,
        }}
      >
        <Column span={8}>
          <Table accessibilityLabel="Component status legend">
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <Box display="visuallyHidden">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text>Status</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text>Description</Text>
                  </Table.HeaderCell>
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
            <col style={{ width: '17.5%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
            <col style={{ width: '16.6%' }} />
          </colgroup>
          <Table.Header>
            <Table.Row>
              {[
                'Component',
                'Figma Library',
                'Documentation',
                'Responsive Web',
                'iOS',
                'Android',
              ].map((header) => (
                <Table.HeaderCell key={header.replace(' ', '_')}>
                  <Text weight="bold">{header}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {componentSortedList.map((item) => {
              const {
                badge,
                android,
                deprecated,
                documentation,
                iOS,
                figma,
                figmaOnly,
                responsive,
              } = item.status || {};

              return (
                <Table.Row key={item.name}>
                  <Table.Cell>
                    <Text size="200" inline>
                      {figmaOnly ? (
                        <Fragment>
                          {item.name}
                          {badge ? (
                            <Box display="inlineBlock" marginStart={2}>
                              <Badge type="info" text={badge} />
                            </Box>
                          ) : null}
                        </Fragment>
                      ) : (
                        <Link
                          href={
                            item?.path ??
                            `/web/${item.name.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`
                          }
                          display="inlineBlock"
                        >
                          {item.name}
                          {badge ? (
                            <Box display="inlineBlock" marginStart={2}>
                              <Badge type="info" text={badge} />
                            </Box>
                          ) : null}
                        </Link>
                      )}
                    </Text>
                  </Table.Cell>
                  {[figma, documentation, responsive, iOS, android].map((status) =>
                    deprecated ? (
                      <Table.Cell key={status}>
                        <DeprecatedStatus />
                      </Table.Cell>
                    ) : (
                      <Table.Cell key={status}>
                        <StatusData status={status || 'notAvailable'} />
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
