// @flow
import * as React from 'react';
import { Mask } from 'gestalt';
import { card, md, PropTable, Example, Combination } from './cards';
import PageHeader from './components/PageHeader';

card(
  <PageHeader
    name="Mask"
    description={`If you have an item you need to fit into a shape, you can achieve this by
  putting a \`Mask\` on it.
  `}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'height',
        type: `number | string`,
      },
      {
        name: 'width',
        type: `number | string`,
      },
      {
        name: 'shape',
        type: `"circle" | "rounded" | "square"`,
        defaultValue: 'square',
      },
      {
        name: 'wash',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  <Example
    defaultCode={`
<Mask height={70} shape="circle" width={70}>
  <div style={{ backgroundColor: '#0fa573', width: 70, height: 70 }} />
</Mask>
`}
    scope={{ Mask }}
  />,
  { stacked: true }
);

card(
  'Example: Masking other content',
  md`
    You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles.
  `,
  <Example
    defaultCode={`
<Box maxWidth={300}>
  <Mask shape="circle">
    <img
      alt="weakendclub.com"
      src="https://s-media-cache-ak0.pinimg.com/564x/4f/cb/61/4fcb610ae43cddd68086c85eec9c413e.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
    scope={{ Mask }}
  />,
  { stacked: true }
);

card(
  'Example: Adding a wash',
  md`
    If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask.
  `,
  <Example
    defaultCode={`
<Box maxWidth={300}>
  <Mask shape="rounded" wash>
    <img
      alt="subliming.tumblr.com"
      src="https://s-media-cache-ak0.pinimg.com/564x/d0/c1/f6/d0c1f69316b4e61b3ccc7b1731f028b8.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
    scope={{ Mask }}
  />,
  { stacked: true }
);

card(
  'Shape Combinations',
  <Combination shape={['circle', 'rounded', 'square']}>
    {props => (
      <Mask height={70} width={70} {...props}>
        <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
      </Mask>
    )}
  </Combination>
);
