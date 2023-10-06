// @flow strict
import { type Node } from 'react';
import { Box, Module, Table, Text } from 'gestalt';
import componentData from './data/components.js';
import {
  COMPONENT_A11Y_STATUS_MESSAGING,
  STATUS_DESCRIPTION,
} from './data/componentStatusMessaging.js';
import { type ComponentAccessibility } from './data/types.js';
import getByPlatform from './data/utils/getByPlatform.js';
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

function AccessibilityTable({
  accessibilityData,
}: {|
  accessibilityData?: ComponentAccessibility,
|}) {
  return (
    <Table accessibilityLabel="Component Accessibility Checklist">
      <colgroup>
        {['20%', '20%', '60%'].map((width) => (
          <col key={width} style={{ width }} />
        ))}
      </colgroup>
      <Box display="visuallyHidden">
        <Table.Header>
          <Table.Row>
            {['Accessibility item', 'Status', 'Status description'].map((header) => (
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

const webBuildingBlockComponents = getByPlatform(componentData, { platform: 'web' });

export default function AccessibilityChecklist({ component }: Props): Node {
  const data = webBuildingBlockComponents.find((cmpName) => cmpName.name === component);

  const a11ySummary = data?.status?.accessible?.summary;
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
            <AccessibilityTable accessibilityData={data?.status?.accessible} />
          ),
          icon: STATUS_ICON_EQUIVALENCY_MAP[a11ySummary ?? 'notAvailable'],
          iconAccessibilityLabel: 'title icon',
          title: a11ySummaryNotAvailable
            ? 'Accessibility not available'
            : STATUS_DESCRIPTION[a11ySummary ?? 'notAvailable'].title,
        },
      ]}
    />
  );
}
