export default function TestElement() {
  return (
      <a aria-label={() => "test"} aria-selected={() => "test"} href='text' target="_blank" rel="noopener noreferrer nofollow" onBlur={(event) => {}} onFocus={() => {}} onClick={console.log} onKeyPress={console.log}>Text</a>
  );
}
