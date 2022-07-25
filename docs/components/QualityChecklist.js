// @flow strict
import { type Node } from 'react';
import { Text, Table, SlimBanner } from 'gestalt';
import COMPONENT_DATA from './COMPONENT_DATA.js';
import MainSection from './MainSection.js';
import StatusData from './StatusData.js';
import { STATUS_DESCRIPTION, COMPONENT_STATUS_MESSAGING } from './COMPONENT_STATUS_MESSAGING.js';

type Props = {|
  component: string,
|};

export default function QualityChecklist({ component }: Props): Node {
  const componentData = [
    ...COMPONENT_DATA.buildingBlockComponents,
    ...COMPONENT_DATA.generalComponents,
    ...COMPONENT_DATA.utilityComponents,
  ].find((cmpName) => cmpName.name === component);

  return (
    <MainSection name="Component quality checklist">
      {componentData?.status?.deprecated ? (
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
            {['figma', 'responsive', 'iOS', 'android'].map((item, index) => {
              const componentStatus = componentData?.status?.[item] ?? 'notAvailable';
              return (
                <Table.Row key={index}>
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
