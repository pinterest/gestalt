// @flow strict
import { type Node } from 'react';
import { Box, Link, List, SlimBanner, Table, Text } from 'gestalt';
import componentData from './data/components.js';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging.js';
import getByPlatform from './data/utils/getByPlatform.js';
import InternalOnlyIconButton from './InternalOnlyIconButton.js';
import MainSection from './MainSection.js';
import StatusData from './StatusData.js';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

type Props = {|
  component: string,
|};

export default function QualityChecklist({ component }: Props): Node {
  const data = webComponentData.find((cmpName) => cmpName.name === component);

  return (
    <MainSection name="Component quality checklist">
      {data?.status.status === 'deprecated' ? (
        <SlimBanner
          iconAccessibilityLabel="Deprecated component"
          message="Deprecated: This component is no longer supported by Gestalt. "
          type="warningBare"
        />
      ) : (
        <Table accessibilityLabel="Component quality checklist">
          <colgroup>
            {data?.status.knownIssues ? <col style={{ width: '5%' }} /> : null}
            <col style={{ width: data?.status.knownIssues ? '15%' : '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '60%' }} />
          </colgroup>
          <Table.Header display="visuallyHidden">
            <Table.Row>
              {['Quality item', 'Status', 'Status description'].map((header) => (
                <Table.HeaderCell key={header.replace(' ', '_')}>
                  <Text weight="bold">{header}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {['figmaStatus', 'responsive'].map((item) => {
              const componentStatus = data?.status?.[item] ?? 'notAvailable';
              return (
                <Table.Row key={item}>
                  {data?.status.knownIssues ? (
                    <Table.Cell>
                      <Text />
                    </Table.Cell>
                  ) : null}

                  <Table.Cell>
                    <Text>{COMPONENT_STATUS_MESSAGING[item].title}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusData
                      text={STATUS_DESCRIPTION[componentStatus].title}
                      status={componentStatus}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{COMPONENT_STATUS_MESSAGING[item][componentStatus]}</Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            {data?.status.knownIssues ? (
              <Table.RowExpandable
                accessibilityExpandLabel="Expand"
                accessibilityCollapseLabel="Collapse"
                id="known_issues"
                expandedContents={
                  <List labelDisplay="hidden" label="Known issues for component" type="unordered">
                    {data?.status.knownIssues.map(
                      ({ title, description, codesandboxUrl, internalDocUrl }, idx) => (
                        <List.Item
                          key={`${idx + title}`}
                          text={
                            <Text inline>
                              <Text weight="bold" inline>
                                {title}.{' '}
                              </Text>
                              <Text inline>{description}</Text>
                            </Text>
                          }
                        >
                          {codesandboxUrl ? (
                            <List.Item
                              text={
                                <Text>
                                  <Link
                                    href={codesandboxUrl}
                                    underline="always"
                                    externalLinkIcon="default"
                                    target="blank"
                                    rel="nofollow"
                                  >
                                    Codesandbox link
                                  </Link>
                                </Text>
                              }
                            />
                          ) : null}
                          {internalDocUrl ? (
                            <List.Item
                              text={
                                <Text inline>
                                  <Link
                                    href={internalDocUrl}
                                    display="inline"
                                    underline="always"
                                    externalLinkIcon="default"
                                    target="blank"
                                    rel="nofollow"
                                  >
                                    Document link
                                  </Link>
                                  <InternalOnlyIconButton />
                                </Text>
                              }
                            />
                          ) : null}
                        </List.Item>
                      ),
                    )}
                  </List>
                }
              >
                <Table.Cell colSpan={1}>
                  <Text>Issues</Text>
                </Table.Cell>
                <Table.Cell colSpan={2}>
                  <SlimBanner type="warningBare" message="This component has known issues." />
                </Table.Cell>
                <Table.Cell>
                  <Box />
                </Table.Cell>
              </Table.RowExpandable>
            ) : null}
          </Table.Body>
        </Table>
      )}
    </MainSection>
  );
}
