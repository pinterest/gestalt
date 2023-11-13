// @flow strict
import { type Node as ReactNode } from 'react';
import { Box } from 'gestalt';
import AccessibilityChecklist from './AccessibilityChecklist';
import Card from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode,
  description?: string,
  hideChecklist?: boolean,
  name: string,
};

export default function AccessibilitySection({
  children,
  description,
  hideChecklist = false,
  name,
}: Props): ReactNode {
  return (
    <Card name="Accessibility" showHeading>
      {hideChecklist ? null : <AccessibilityChecklist component={name} />}
      {description && (
        <Box marginTop={6} marginBottom={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Markdown text={description} />
        </Box>
      )}
      {children}
    </Card>
  );
}
