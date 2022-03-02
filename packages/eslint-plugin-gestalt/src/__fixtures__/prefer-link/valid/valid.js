import { Link } from 'gestalt';
export default function TestElement() {
  const props = { onBlur: () => {} };
  return (
    <Link>
      <Link href={undefined} />
      <a href={undefined} aria-describedby={undefined}/>
      <a href={undefined} className={undefined} />
      <a href={undefined} style={undefined} />
      <a href={undefined} tabIndex={-1} />
      <a {...props} />
    </Link>
  );
}
