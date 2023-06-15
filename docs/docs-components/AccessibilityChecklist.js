// @flow strict
import { type Node } from 'react';
import { Box, Module, Table, Text } from 'gestalt';
import COMPONENT_DATA, { type AccessibleStatus } from './COMPONENT_DATA.js';
import {
  COMPONENT_A11Y_STATUS_MESSAGING,
  STATUS_DESCRIPTION,
} from './data/componentStatusMessaging.js';
import StatusData from './StatusData.js';

export const STATUS_ICON_EQUIVALENCY_MAP = Object.freeze({
  'ready': 'workflow-status-ok',
  'notAvailable': 'dash',
  'partial': 'workflow-status-in-progress',
  'planned': 'workflow-status-unstarted',
});

type Props = {|
  component: string,
|};

function QualityTable({ accessibilityData }: {| accessibilityData?: AccessibleStatus |}) {
  return (
    <Table accessibilityLabel="Component Quality Checklist">
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '60%' }} />
      </colgroup>
      <Box display="visuallyHidden">
        <Table.Header>
          <Table.Row>
            {['Quality item', 'Status', 'Status description'].map((header) => (
              <Table.HeaderCell key={header.replace(' ', '_')}>
                <Text weight="bold">{header}</Text>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
      </Box>
      <Table.Body>
        {['a11yVisual', 'a11yScreenreader', 'a11yNavigation', 'a11yComprehension'].map((item) => {
          const componentStatus = accessibilityData?.[item] ?? 'notAvailable';

          return (
            <Table.Row key={item}>
              <Table.Cell>
                <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item].title}</Text>
              </Table.Cell>
              <Table.Cell>
                <StatusData
                  text={STATUS_DESCRIPTION[componentStatus].title}
                  status={componentStatus}
                />
              </Table.Cell>
              <Table.Cell>
                <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item][componentStatus]}</Text>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default function QualityChecklist({ component }: Props): Node {
  const componentData = [
    ...COMPONENT_DATA.buildingBlockComponents,
    ...COMPONENT_DATA.generalComponents,
    ...COMPONENT_DATA.utilityComponents,
  ].find((cmpName) => cmpName.name === component);

  const a11ySummary = componentData?.status?.accessible?.summary;

  const a11ySummaryNotAvailable = a11ySummary === 'notAvailable';

  return (
    <Module.Expandable
      accessibilityExpandLabel="Expand the module"
      accessibilityCollapseLabel="Collapse the module"
      id="accessibility-module"
      items={[
        {
          children: a11ySummaryNotAvailable ? (
            <Text>
              Accessibility information is not available for this component. If you have any
              questions, please reach out to the Gestalt team for more information.
            </Text>
          ) : (
            <QualityTable accessibilityData={componentData?.status?.accessible} />
          ),
          icon: STATUS_ICON_EQUIVALENCY_MAP[a11ySummary ?? 'notAvailable'],
          iconAccessibilityLabel: 'title icon',
          title: a11ySummaryNotAvailable
            ? 'Accessibility not available'
            : STATUS_DESCRIPTION[a11ySummary || 'notAvailable'].title,
        },
      ]}
    />
  );
}
