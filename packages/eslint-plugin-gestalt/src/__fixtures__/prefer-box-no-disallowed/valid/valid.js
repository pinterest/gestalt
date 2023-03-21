import { Box } from 'gestalt';
export default function TestElement() {
  const props = { onBlur: () => {} };
  return (
    <Box>
      <Box ref="test" />
      <div className="test" />
      <div onClick={() => {}} />
      <div tabIndex={-1} />
      <div role="button" />
      <div onMouseOver={() => {}} />
      <div accessKey="test" />
      <div autoFocus />
      <div dangerouslySetInnerHTML={{__html: 'hi'}}/>
      <div {...props} />
    </Box>
  );
}
