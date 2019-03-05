// @flow
import * as React from 'react';
import stock3 from './images/stock3.jpg';
import stock4 from './images/stock4.jpg';
import stock5 from './images/stock5.jpg';
import stock6 from './images/stock6.jpg';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Letterbox"
    description={`
Letterboxes are useful if you have some source media which is larger than
the area you want to display it in. For instance, you might have a really
tall image and want it to be displayed in a neatly cropped square. While the
ideal solution to this problem is to update the source image, this might not
always be possible for either cost or performance reasons.

Letterbox should be used in situations where you would otherwise use the
CSS property \`background-size: cover\`.`}
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
        name: 'contentAspectRatio',
        type: 'number',
        required: true,
        description:
          'Proportional relationship between width and height of element',
      },
      {
        name: 'height',
        type: 'number',
        required: true,
        description: 'Desired final height of element',
      },
      {
        name: 'width',
        type: 'number',
        required: true,
        description: 'Desired final width of element',
      },
    ]}
  />
);

card(
  <Example
    name="Tall content (564:806)"
    defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
  <Image
    alt="tall"
    src="${stock5}"
    naturalWidth={564}
    naturalHeight={806}
  />
</Letterbox>
`}
  />
);

card(
  <Example
    name="Wide content (564:517)"
    defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
  <Image
    alt="wide"
    src="${stock4}"
    naturalWidth={564}
    naturalHeight={517}
  />
</Letterbox>
`}
  />
);

card(
  <Example
    name="Square content (1:1)"
    defaultCode={`
<Letterbox width={200} height={200} contentAspectRatio={1}>
  <Image
    alt="square"
    src="${stock6}"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
  />
);

card(
  <Example
    name="Square content (1:1) in a vertical frame"
    defaultCode={`
<Letterbox width={200} height={300} contentAspectRatio={1}>
  <Image
    alt="square"
    src="${stock3}"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
  />
);

card(
  <Example
    name="Square content (1:1) in a horizontal frame"
    defaultCode={`
<Letterbox width={300} height={200} contentAspectRatio={1}>
  <Image
    alt="square"
    src="${stock3}"
    naturalWidth={1}
    naturalHeight={1}
  />
</Letterbox>
`}
  />
);

export default cards;
