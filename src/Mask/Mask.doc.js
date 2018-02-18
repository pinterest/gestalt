// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Mask from './Mask';
import { ns, card, md, PropTable } from '../../.corkboard/src/cards';

ns(
  'Mask',
  `If you have an item you need to fit into a shape, you can achieve this by
  putting a \`Mask\` on it.
  `
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
  'Shapes',
  md`
    There are 3 different shapes that you can achieve using a Mask. The default shape is \`Square\`.

    ~~~js
    <Mask height={70} shape="circle" width={70}>
      <div style={{ backgroundColor: '#0084ff', width: 70, height: 70 }} />
    </Mask>
    ~~~

    ~~~js
    <Mask height={70} shape="rounded" width={70}>
      <div style={{ backgroundColor: '#fbb6ac', width: 70, height: 70 }} />
    </Mask>
    ~~~

    ~~~js
    <Mask height={70} width={70}>
      <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
    </Mask>
    ~~~
  `,
  <Box>
    <Box padding={2}>
      <Mask height={70} shape="circle" width={70}>
        <div style={{ backgroundColor: '#0084ff', width: 70, height: 70 }} />
      </Mask>
    </Box>

    <Box padding={2}>
      <Mask height={70} shape="rounded" width={70}>
        <div style={{ backgroundColor: '#fbb6ac', width: 70, height: 70 }} />
      </Mask>
    </Box>

    <Box padding={2}>
      <Mask height={70} width={70}>
        <div style={{ backgroundColor: '#e3780c', width: 70, height: 70 }} />
      </Mask>
    </Box>
  </Box>
);

card(
  'Masking other content',
  md`
    You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles.

    ~~~js
    <Mask shape="circle">
      <img
        alt="weakendclub.com"
        src="https://s-media-cache-ak0.pinimg.com/..."
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>
    ~~~

    ~~~js
    <Mask shape="rounded">
      <img
        alt="weakendclub.com"
        src="https://s-media-cache-ak0.pinimg.com/..."
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>
    ~~~
  `,
  <Box display="flex" marginLeft={-2} marginRight={-2}>
    <Box column={6} paddingX={2}>
      <h5>Circle</h5>
      <Mask shape="circle">
        <img
          alt="weakendclub.com"
          src="https://s-media-cache-ak0.pinimg.com/564x/4f/cb/61/4fcb610ae43cddd68086c85eec9c413e.jpg"
          style={{ maxWidth: '100%', display: 'block' }}
        />
      </Mask>
    </Box>
    <Box column={6} paddingX={2}>
      <h5>Rounded</h5>
      <Mask shape="rounded">
        <img
          alt="weakendclub.com"
          src="https://s-media-cache-ak0.pinimg.com/564x/74/25/6b/74256b2ebc2263939d929c83786f8df6.jpg"
          style={{ maxWidth: '100%', display: 'block' }}
        />
      </Mask>
    </Box>
  </Box>
);

card(
  'Washes',
  md`
    If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask.

    ~~~js
    <Mask shape="rounded">
      <img
        alt="subliming.tumblr.com"
        src="https://s-media-cache-ak0.pinimg.com/..."
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>

    <Mask shape="rounded" wash>
      <img
        alt="subliming.tumblr.com"
        src="https://s-media-cache-ak0.pinimg.com/..."
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>
    ~~~
  `,
  <Box>
    <h5>Unwashed</h5>
    <Mask shape="rounded">
      <img
        alt="subliming.tumblr.com"
        src="https://s-media-cache-ak0.pinimg.com/564x/d0/c1/f6/d0c1f69316b4e61b3ccc7b1731f028b8.jpg"
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>
  </Box>,
  <Box>
    <h5>Washed</h5>
    <Mask shape="rounded" wash>
      <img
        alt="subliming.tumblr.com"
        src="https://s-media-cache-ak0.pinimg.com/564x/d0/c1/f6/d0c1f69316b4e61b3ccc7b1731f028b8.jpg"
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Mask>
  </Box>
);
