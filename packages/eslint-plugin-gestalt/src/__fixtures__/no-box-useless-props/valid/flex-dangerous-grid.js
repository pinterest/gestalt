import { Box } from 'gestalt';

export default function TestComponent() {
  return (
    <Box
      alignContent="start"
      dangerouslySetInlineStyle={{ __style: { display: 'grid', height: '50vh' } }}
    />
  );
}
