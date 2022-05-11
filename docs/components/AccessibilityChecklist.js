// @flow strict
import { type Node } from 'react';
import { Box, Text, Module, Table } from 'gestalt';
import StatusData from './StatusData.js';
import COMPONENT_DATA from './COMPONENT_DATA.js';
import {
  STATUS_DESCRIPTION,
  COMPONENT_A11Y_STATUS_MESSAGING,
} from './COMPONENT_STATUS_MESSAGING.js';

export const STATUS_ICON_EQUIVALENCY_MAP = Object.freeze({
  'ready': 'workflow-status-ok',
  'notAvailable': 'dash',
  'partial': 'workflow-status-in-progress',
  'planned': 'workflow-status-unstarted',
});

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
    <Module.Expandable
      accessibilityExpandLabel="Expand the module"
      accessibilityCollapseLabel="Collapse the module"
      id="accessibility-module"
      items={[
        {
          children:
            componentData?.status?.accessible?.summary === 'notAvailable' ? (
              <Text>
                Accessibility information is not available for this component. If you have any
                questions, please reach out to the Gestalt team for more information.
              </Text>
            ) : (
              <Table accessibilityLabel="Component Quality Checklist">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <Box display="visuallyHidden">
                  <Table.Header>
                    <Table.Row>
                      {['Quality item', 'Status', 'Status descripyion'].map((header) => (
                        <Table.HeaderCell key={header.replace(' ', '_')}>
                          <Text weight="bold">{header}</Text>
                        </Table.HeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Header>
                </Box>
                <Table.Body>
                  {['a11yVisual', 'a11yScreenreader', 'a11yNavigation', 'a11yComprehension'].map(
                    (item, index) => {
                      const componentStatus =
                        componentData?.status?.accessible?.[item] ?? 'notAvailable';

                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item].title}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <StatusData
                              text={STATUS_DESCRIPTION[componentStatus].title}
                              type={componentStatus}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item][componentStatus]}</Text>
                          </Table.Cell>
                        </Table.Row>
                      );
                    },
                  )}
                </Table.Body>
              </Table>
            ),
          icon: STATUS_ICON_EQUIVALENCY_MAP[
            componentData?.status?.accessible?.summary ?? 'notAvailable'
          ],
          iconAccessibilityLabel: 'title icon',
          title:
            componentData?.status?.accessible?.summary === 'notAvailable'
              ? 'Accessibility not available'
              : STATUS_DESCRIPTION[componentData?.status?.accessible.summary || 'notAvailable']
                  .title,
        },
      ]}
    />
  );
}
