import { Fragment, ReactNode } from 'react';
import { Box } from 'gestalt';
import Card from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

interface AccessibilityStatus {
  status: string;
  reviewDate: string;
}

type Props = {
  children?: ReactNode;
  design?: AccessibilityStatus;
  code?: AccessibilityStatus;
  description?: string;
};

function getTooltipText(status: string, reviewDate: string) {
  switch (status) {
    case 'success':
      return `The component has successfully met the Gestalt accessibility requirements. \n Last review: ${reviewDate}`
    case 'issues':
      return 'Issues have been reported with component and are logged in Jira.'
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
  design,
  code,
  description,
}: Props) {
  return (
    <Fragment>
      <Card
        badge={(design) ? {
          text: "Design",
          tooltipText: getTooltipText(design.status, design.reviewDate),
          type: getTooltipStatus(design.status)
        } : undefined}
        badgeSecondary={(code) ? {
          text: "Code",
          tooltipText: getTooltipText(code.status, code?.reviewDate),
          type: getTooltipStatus(code.status)
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
