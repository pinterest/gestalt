import { Badge, Box, Column, Flex, Link, Table, Text } from 'gestalt';
import componentData from '../../docs-components/data/components';
import {
  COMPONENT_STATUS_MESSAGING,
  STATUS_DESCRIPTION,
} from '../../docs-components/data/componentStatusMessaging';
import getByPlatform from '../../docs-components/data/utils/getByPlatform';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import StatusData from '../../docs-components/StatusData';

function DeprecatedStatus() {
  return <StatusData status="deprecated" text="Deprecated" />;
}

const androidComponentData = getByPlatform(componentData, { platform: 'android' });
const sortedComponentList = [...androidComponentData].sort(({ name: aName }, { name: bName }) => {
  if (aName < bName) return -1;
  if (aName > bName) return 1;
  return 0;
});

const statusFields = ['figmaStatus', 'documentation', 'status'];

export default function ComponentStatus() {
  return (
    <Page hideEditLink hideSideNav title="Android component status">
      <PageHeader
        description="A detailed synopsis of our Android components and their implementation status."
        name="Android component status"
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
                    {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'StatusType | "deprecated"'. */}
                    <StatusData status={typeStatus} />
                  </Table.Cell>
                  <Table.Cell>
                    {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ ready: { title: string; description: string; }; partial: { title: string; description: string; }; notAvailable: { title: string; description: string; }; planned: { title: string; description: string; }; deprecated: { ...; }; }>'. */}
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
                  {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ accessible: { shortTitle: string; title: string; }; documentation: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; figmaStatus: { shortTitle: string; title: string; ready: string; partial: string; notAvailable: string; planned: string; }; mobileAdaptive: { ...; }...'. */}
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
                    <Text inline size="200">
                      <Link
                        display="inlineBlock"
                        href={
                          path ??
                          `/android/${name.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`
                        }
                      >
                        {name}
                        {badge ? (
                          <Box display="inlineBlock" marginStart={2}>
                            <Badge text={badge} type="info" />
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
                        {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ComponentStatus'. */}
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
