import { ReactNode } from 'react';
import { Box } from 'gestalt';
import AccessibilityChecklist from './AccessibilityChecklist';
import Card from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode;
  description?: string;
  hideChecklist?: boolean;
  name: string;
};

export default function AccessibilitySection({
  children,
  description,
  hideChecklist = false,
  name,
}: Props) {


  let override = hideChecklist

  override = true
  return (
    <Card name="Accessibility" showHeading>
      { }
      {override  ? null : <AccessibilityChecklist component={name} />}
      {description && (
        <Box marginBottom={8} marginTop={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Markdown text={description} />
        </Box>
      )}
      {children}
    </Card>
  );
}
