// @ts-nocheck
import { Box } from 'gestalt';

export default function TestComponent() {
  return <Box alignContent="start" display={true ? 'inlineBlock' : 'block'} />;
}
