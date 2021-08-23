// @flow strict
import type { Node } from 'react';
import { Mask } from 'gestalt';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import Combination from '../components/Combination.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Mask"
    description={`If you have an item you need to fit into a shape, you can achieve this by
putting a \`Mask\` on it.
`}
  />,
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
        description: `Use numbers for pixels: height={100} and strings for percentages: height="100%"`,
      },
      {
        name: 'width',
        type: `number | string`,
        href: 'basicExample',
        description: `Use numbers for pixels: width={100} and strings for percentages: width="100%"`,
      },
      {
        name: 'rounding',
        type: `"circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
        defaultValue: 0,
        href: 'roundingCombinations',
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
  />,
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
<Mask height={70} rounding="circle" width={70}>
  <div style={{ backgroundColor: '#0fa573', width: 70, height: 70 }} />
</Mask>
`}
  />,
);

card(
  <Example
    description="
    You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles.
  "
    name="Example: Masking other content"
    defaultCode={`
<Box maxWidth={300}>
  <Mask rounding="circle">
    <img
      alt="weakendclub.com"
      src="https://i.ibb.co/121JJzC/stock7.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />,
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
  <Mask rounding={2} wash>
    <img
      alt="subliming.tumblr.com"
      src="https://i.ibb.co/8BSrgzX/stock8.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />,
);

card(
  <Combination
    id="roundingCombinations"
    name="Rounding Combinations"
    rounding={['circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}
  >
    {(props) => (
      <Mask height={70} width={70} {...props}>
        <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
      </Mask>
    )}
  </Combination>,
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
  <Mask rounding={2} willChangeTransform={false}>
    <img
      alt="subliming.tumblr.com"
      src="https://i.ibb.co/8BSrgzX/stock8.jpg"
      style={{ maxWidth: '100%', display: 'block' }}
    />
  </Mask>
</Box>
`}
  />,
);

export default function MaskPage(): Node {
  return <CardPage cards={cards} page="Mask" />;
}
