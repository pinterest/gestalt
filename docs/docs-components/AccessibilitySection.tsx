import { Fragment, ReactNode } from 'react';
import { Box } from 'gestalt';
import Card from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode;
  designStatus: string;
  designReviewDate: string;
  codeStatus: string;
  codeReviewDate: string;
  description?: string;
};

function getTooltipText(status: string, reviewDate: string) {
  switch (status) {
    case 'pass':
      return `The component has successfully met the Gestalt accessibility requirements. Last review: ${
        reviewDate || 'Unknown'
      }`;
    case 'issues':
      return `Issues have been reported with component and are logged in Jira. Last review: ${
        reviewDate || 'Unknown'
      }`;
    case 'backlogged':
      return 'Testing on this component has not yet started. Reach out to Gestalt support for an update.';
    default:
      return 'Something went wrong';
  }
}

function getTooltipStatus(status: string) {
  switch (status) {
    case 'pass':
      return 'success';
    case 'issues':
      return 'warning';
    case 'backlogged':
      return 'info';
    default:
      return 'info';
  }
}

export default function AccessibilitySection({
  children,
  designStatus,
  designReviewDate,
  codeStatus,
  codeReviewDate,
  description,
}: Props) {
  return (
    <Fragment>
      <Card
        badge={
          designStatus
            ? {
                text: 'Design',
                tooltipText: getTooltipText(designStatus, designReviewDate),
                type: getTooltipStatus(designStatus),
              }
            : undefined
        }
        badgeSecondary={
          codeStatus
            ? {
                text: 'Code',
                tooltipText: getTooltipText(codeStatus, codeReviewDate),
                type: getTooltipStatus(codeStatus),
              }
            : undefined
        }
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
