import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <article aria-label="test" onMouseEnter={() => {}} width={100}></article>
      <aside data-test-id="test" aria-label="test"></aside>
      <caption data-test-id="test" aria-label="test"></caption>
      <details data-test-id="test" aria-label="test"></details>
      <figcaption data-test-id="test" aria-label="test"></figcaption>
      <figure data-test-id="test" aria-label="test"></figure>
      <footer data-test-id="test" aria-label="test"></footer>
      <header data-test-id="test" aria-label="test"></header>
      <main data-test-id="test" aria-label="test"></main>
      <nav data-test-id="test" aria-label="test"></nav>
      <section data-test-id="test" aria-label="test"></section>
      <summary data-test-id="test" aria-label="test"></summary>
    </Box>
  );
}
