// @flow strict
import { type Node } from 'react';
import { SlimBanner, Table, Text } from 'gestalt';
import componentData from './data/components.js';
import { COMPONENT_STATUS_MESSAGING, STATUS_DESCRIPTION } from './data/componentStatusMessaging.js';
import getByPlatform from './data/utils/getByPlatform.js';
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
            <col style={{ width: '20%' }} />
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
          </Table.Body>
        </Table>
      )}
    </MainSection>
  );
}
