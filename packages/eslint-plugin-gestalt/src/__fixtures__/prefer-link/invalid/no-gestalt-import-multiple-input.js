export default function TestElement() {
  const noop = () => {}
  return (
    <a aria-label={noop} aria-selected={noop} href="text" target="_blank" rel="noopener noreferrer nofollow" onBlur={(event) => {}} onFocus={() => {}} onClick={noop} onKeyPress={noop}>Text</a>
  );
}
