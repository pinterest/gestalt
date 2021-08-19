import { Box } from 'gestalt';
export default function TestElement() {
  const props = { onBlur: () => {} };
  return (
    <Box>
      <Box ref={undefined} />
      <div ref={undefined} className={undefined} />
      <div ref={undefined} onClick={() => {}} />
      <div ref={undefined} tabIndex={-1} />
      <div ref={undefined} role="button" />
      <div ref={undefined} onMouseOver={() => {}} />
      <div ref={undefined} accessKey="test" />
      <div ref={undefined} autoFocus />
      <div ref={undefined} {...props} />
    </Box>
  );
}
