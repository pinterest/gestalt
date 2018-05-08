// @flow
import * as React from 'react';
import Link from 'next/link';

const pages = [
  'MasonryExample',
  'ExperimentalMasonryExample',
  'FlexibleMasonry',
  'ExperimentalFlexibleMasonry',
  'A11y',
];

export default () => (
  <ul>
    {pages.map(page => (
      <li key={page}>
        <Link href={{ pathname: `/${page}` }}>
          <a href={`/${page}`}>{page}</a>
        </Link>
      </li>
    ))}
  </ul>
);
