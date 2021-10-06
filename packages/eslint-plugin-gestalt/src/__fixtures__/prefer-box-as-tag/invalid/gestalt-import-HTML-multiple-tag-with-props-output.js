import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box aria-label="test" as="article" onMouseEnter={() => {}} width={100}></Box>
      <Box aria-label="test" as="aside" data-test-id="test"></Box>
      <Box aria-label="test" as="caption" data-test-id="test"></Box>
      <Box aria-label="test" as="details" data-test-id="test"></Box>
      <Box aria-label="test" as="figcaption" data-test-id="test"></Box>
      <Box aria-label="test" as="figure" data-test-id="test"></Box>
      <Box aria-label="test" as="footer" data-test-id="test"></Box>
      <Box aria-label="test" as="header" data-test-id="test"></Box>
      <Box aria-label="test" as="main" data-test-id="test"></Box>
      <Box aria-label="test" as="nav" data-test-id="test"></Box>
      <Box aria-label="test" as="section" data-test-id="test"></Box>
      <Box aria-label="test" as="summary" data-test-id="test"></Box>
    </Box>
  );
}
