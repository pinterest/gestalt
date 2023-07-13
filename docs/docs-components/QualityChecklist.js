// @flow strict
import { type Node } from 'react';
import { Flex, Link, SlimBanner, Status, Table, Text } from 'gestalt';
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
                  <Flex direction="column" gap={6}>
                    {data?.status.knownIssues.map(
                      ({ title, description, codesandboxUrl, internalDocUrl }) => (
                        <Flex key={title} gap={1} direction="column">
                          <Flex gap={2}>
                            <Text weight="bold" inline>
                              {title}
                            </Text>
                            {codesandboxUrl ? (
                              <Text inline>
                                <Link
                                  accessibilityLabel={`Example in CodeSandbox :${title} issue`}
                                  href={codesandboxUrl}
                                  underline="always"
                                  externalLinkIcon="default"
                                  target="blank"
                                  rel="nofollow"
                                  display="inline"
                                >
                                  Example in CodeSandbox
                                </Link>
                              </Text>
                            ) : null}
                            {internalDocUrl ? (
                              <Text inline>
                                <Link
                                  accessibilityLabel={`Internal document:${title} issue`}
                                  href={internalDocUrl}
                                  underline="always"
                                  externalLinkIcon="default"
                                  target="blank"
                                  rel="nofollow"
                                  display="inline"
                                >
                                  Internal document
                                </Link>
                                <InternalOnlyIconButton />
                              </Text>
                            ) : null}
                          </Flex>
                          <Text>{description}</Text>
                        </Flex>
                      ),
                    )}
                  </Flex>
                }
              >
                <Table.Cell>
                  <Text>Issues</Text>
                </Table.Cell>
                <Table.Cell>
                  <Status type="warning" />
                </Table.Cell>
                <Table.Cell>
                  <Text>This component has known issues.</Text>
                </Table.Cell>
              </Table.RowExpandable>
            ) : null}
          </Table.Body>
        </Table>
      )}
    </MainSection>
  );
}
