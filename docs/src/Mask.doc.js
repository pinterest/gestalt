// @flow
import * as React from 'react';
import { Mask } from 'gestalt';
import stock7 from './images/stock7.jpg';
import stock8 from './images/stock8.jpg';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

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
        type: 'React.Node',
      },
      {
        name: 'height',
        type: `number | string`,
        href: 'basicExample',
      },
      {
        name: 'width',
        type: `number | string`,
        href: 'basicExample',
      },
      {
        name: 'shape',
        type: `"circle" | "rounded" | "square"`,
        defaultValue: 'square',
        href: 'shapeCombinations',
      },
      {
        name: 'wash',
        type: 'boolean',
        defaultValue: false,
        href: 'wash',
      },
      {
        name: 'willChangeTransform',
        type: 'boolean',
        defaultValue: true,
        href: 'willChangeTransform',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
<Mask height={70} shape="circle" width={70}>
  <div style={{ backgroundColor: '#0fa573', width: 70, height: 70 }} />
</Mask>
`}
  />
);

card(
  <Example
    description="
    You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles.
  "
    name="Example: Masking other content"
    defaultCode={`
<Box maxWidth={300}>
  <Mask shape="circle">
    <img
      alt="weakendclub.com"
      src="${stock7}"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />
);

card(
  <Example
    id="wash"
    description="
    If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask.
  "
    name="Example: Adding a wash"
    defaultCode={`
<Box maxWidth={300}>
  <Mask shape="rounded" wash>
    <img
      alt="subliming.tumblr.com"
      src="${stock8}"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />
);

card(
  <Combination
    id="shapeCombinations"
    name="Shape Combinations"
    shape={['circle', 'rounded', 'square']}
  >
    {props => (
      <Mask height={70} width={70} {...props}>
        <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
      </Mask>
    )}
  </Combination>
);

card(
  <Example
    id="willChangeTransform"
    description="
  If you want to turn off the `willChange:transform` property for rendering reasons, you can set this to false.
  "
    name="Example: willChangeTransform"
    defaultCode={`
<Box maxWidth={300}>
  <Mask shape="rounded" willChangeTransform="false">
    <img
      alt="subliming.tumblr.com"
      src="${stock8}"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />
);

export default cards;
