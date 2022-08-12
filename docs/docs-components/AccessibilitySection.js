// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import Card from './Card.js';
import AccessibilityChecklist from './AccessibilityChecklist.js';
import Markdown from './Markdown.js';

type Props = {|
  children?: Node,
  description?: string,
  name: string,
|};

function AccessibilityMainSection({ children, description, name }: Props): Node {
  return (
    <Card name="Accessibility" showHeading>
      <AccessibilityChecklist component={name} />
      {description && (
        <Box marginTop={6} marginBottom={8} maxWidth={572}>
          <Markdown text={description} />
        </Box>
      )}
      {children}
    </Card>
  );
}
export default AccessibilityMainSection;
