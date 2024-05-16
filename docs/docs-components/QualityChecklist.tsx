import { ReactNode } from 'react';
import { BannerSlim, Flex, Link, Status, Table, Text } from 'gestalt';
import componentData from './data/components';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging';
import getByPlatform from './data/utils/getByPlatform';
import InternalOnlyIconButton from './InternalOnlyIconButton';
import MainSection from './MainSection';
import StatusData from './StatusData';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

type Props = {
  component: string;
};

export default function QualityChecklist({ component }: Props) {
  const data = webComponentData.find((cmpName) => cmpName.name === component);

  return (
    <MainSection name="Component quality checklist">
      {data?.status.status === 'deprecated' ? (
        <BannerSlim
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
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ComponentStatus'.
              const componentStatus = data?.status?.[item] ?? 'notAvailable';
              return (
                <Table.Row key={item}>
                  {data?.status.knownIssues ? (
                    <Table.Cell>
                      <Text />
                    </Table.Cell>
                  ) : null}

                  <Table.Cell>
                    {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ accessible: { shortTitle: string; title: string; }; documentation: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; figmaStatus: { shortTitle: string; title: string; ready: string; partial: string; notAvailable: string; planned: string; }; mobileAdaptive: { ...; }...'. */}
                    <Text>{COMPONENT_STATUS_MESSAGING[item].title}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusData
                      status={componentStatus}
                      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Readonly<{ ready: { title: string; description: string; }; partial: { title: string; description: string; }; notAvailable: { title: string; description: string; }; planned: { title: string; description: string; }; deprecated: { ...; }; }>'.
                      text={STATUS_DESCRIPTION[componentStatus].title}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ accessible: { shortTitle: string; title: string; }; documentation: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; figmaStatus: { shortTitle: string; title: string; ready: string; partial: string; notAvailable: string; planned: string; }; mobileAdaptive: { ...; }...'. */}
                    <Text>{COMPONENT_STATUS_MESSAGING[item][componentStatus]}</Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            {data?.status.knownIssues ? (
              <Table.RowExpandable
                accessibilityCollapseLabel="Collapse"
                accessibilityExpandLabel="Expand"
                expandedContents={
                  <Flex direction="column" gap={6}>
                    {data?.status.knownIssues.map(
                      ({ title, description, codesandboxUrl, internalDocUrl }) => (
                        <Flex key={title} direction="column" gap={1}>
                          <Flex gap={2}>
                            <Text inline weight="bold">
                              {title}
                            </Text>
                            {codesandboxUrl ? (
                              <Text inline>
                                <Link
                                  accessibilityLabel={`Example in CodeSandbox :${title} issue`}
                                  display="inline"
                                  externalLinkIcon="default"
                                  href={codesandboxUrl}
                                  rel="nofollow"
                                  target="blank"
                                  underline="always"
                                >
                                  Example in CodeSandbox
                                </Link>
                              </Text>
                            ) : null}
                            {internalDocUrl ? (
                              <Text inline>
                                <Link
                                  accessibilityLabel={`Internal document:${title} issue`}
                                  display="inline"
                                  externalLinkIcon="default"
                                  href={internalDocUrl}
                                  rel="nofollow"
                                  target="blank"
                                  underline="always"
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
                id="known_issues"
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
