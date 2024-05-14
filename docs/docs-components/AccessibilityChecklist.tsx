import { Accordion, Box, Table, Text } from 'gestalt';
import componentData from './data/components';
import {
  COMPONENT_A11Y_STATUS_MESSAGING,
  STATUS_DESCRIPTION,
} from './data/componentStatusMessaging';
import { ComponentAccessibility } from './data/types';
import getByPlatform from './data/utils/getByPlatform';
import StatusData from './StatusData';

export const STATUS_ICON_EQUIVALENCY_MAP = Object.freeze({
  ready: 'workflow-status-ok',
  notAvailable: 'dash',
  partial: 'workflow-status-in-progress',
  planned: 'workflow-status-unstarted',
});

type Props = {
  component: string;
};

function AccessibilityTable({ accessibilityData }: { accessibilityData?: ComponentAccessibility }) {
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
          // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ComponentAccessibility'.
          const componentStatus = accessibilityData?.[item] ?? 'notAvailable';

          return (
            <Table.Row key={item}>
              <Table.Cell>
                {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ a11yVisual: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; a11yNavigation: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; a11yScreenreader: { ...; }; a11yComprehension: { ...; }; }>'. */}
                <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item].title}</Text>
              </Table.Cell>
              <Table.Cell>
                <StatusData
                  status={componentStatus}
                  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Readonly<{ ready: { title: string; description: string; }; partial: { title: string; description: string; }; notAvailable: { title: string; description: string; }; planned: { title: string; description: string; }; deprecated: { ...; }; }>'.
                  text={STATUS_DESCRIPTION[componentStatus].title}
                />
              </Table.Cell>
              <Table.Cell>
                {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ a11yVisual: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; a11yNavigation: { title: string; ready: string; partial: string; notAvailable: string; planned: string; }; a11yScreenreader: { ...; }; a11yComprehension: { ...; }; }>'. */}
                <Text>{COMPONENT_A11Y_STATUS_MESSAGING[item][componentStatus]}</Text>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

const webBuildingBlockComponents = getByPlatform(componentData, {
  platform: 'web',
});

export default function AccessibilityChecklist({ component }: Props) {
  const data = webBuildingBlockComponents.find((cmpName) => cmpName.name === component);

  const a11ySummary = data?.status?.accessible?.summary;
  const a11ySummaryNotAvailable = a11ySummary === 'notAvailable';

  return (
    <Accordion.Expandable
      accessibilityCollapseLabel="Collapse"
      accessibilityExpandLabel="Expand"
      id="accessibility-accordion"
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
