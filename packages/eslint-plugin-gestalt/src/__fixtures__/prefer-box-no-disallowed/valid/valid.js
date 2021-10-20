import { Box } from 'gestalt';
export default function TestElement() {
  const props = { onBlur: () => {} };
  return (
    <Box>
      <Box ref="test" />
      <div ref="test" className="test" />
      <div ref="test" onClick={() => {}} />
      <div ref="test" tabIndex={-1} />
      <div ref="test" role="button" />
      <div ref="test" onMouseOver={() => {}} />
      <div ref="test" accessKey="test" />
      <div ref="test" autoFocus />
      <div ref="test" {...props} />
    </Box>
  );
}
