import { Fragment,ReactNode } from 'react';
import { Badge,Box } from 'gestalt';
import Card from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode;
  designStatus?: string;
  codeStatus?: string;
  description?: string;
};

function getTooltipText(status: string) {
  switch (status) {
    case 'success':
      return 'The component has successfully met the Gestalt accessibility requirements.'
    case 'issues':
      return 'Issues have been reported with component and are logged in the following section.'
    case 'backlogged':
      return 'Testing on this component has not yet started. Reach out to Gestalt support for an update.'
    default:
      return 'Something went wrong'
  }
}

function getTooltipStatus(status: string) {
  switch (status) {
    case 'success':
      return 'success'
    case 'issues':
      return 'warning'
    case 'backlogged':
      return 'info'
    default:
      return 'Something went wrong'
  }
}

export default function AccessibilitySection({
  children,
  designStatus,
  codeStatus,
  description,
}: Props) {
  return (
    <Fragment>
      <Card
        badge={(designStatus) ? {
          text: "Design",
          tooltipText: getTooltipText(designStatus),
          type: getTooltipStatus(designStatus)
        } : undefined}
        badgeSecondary={(codeStatus) ? {
          text: "Code",
          tooltipText: getTooltipText(codeStatus),
          type: getTooltipStatus(codeStatus)
        } : undefined}
        name="Accessibility"
        showHeading
       >
        {}
      </Card>
      {description && (
        <Box marginBottom={8} marginTop={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Markdown text={description} />
        </Box>
      )}
      {children}
    </Fragment>
  );
}
