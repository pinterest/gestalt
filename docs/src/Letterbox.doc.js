// @flow
import * as React from 'react';
import { Box, Letterbox } from 'gestalt';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Letterbox"
    description={`
Letterboxes are useful if you have some source media which is larger than
the area you want to display it in. For instance, you might have a really
tall image and want it to be displayed in a neatly cropped square. While the
ideal solution to this problem is to update the source image, this mightn't
be always possible for either cost or performance reasons.

Letterbox should be used in situations where you would have otherwise used the
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
          'Proportional relationship between width and height of element.',
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
    heading={false}
  />
);

card(
  <Box
    description={`
    ~~~html
    <Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
      <img
        alt="tall"
        style={{ width: '100%', display: 'block' }}
        src="https://i.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg"
      />
    </Letterbox>

    <Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
      <img
        alt="wide"
        style={{ width: '100%', display: 'block' }}
        src="https://i.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg"
      />
    </Letterbox>

    <Letterbox width={200} height={200} contentAspectRatio={200 / 200}>
      <img
        alt="square"
        style={{ width: '100%', display: 'block' }}
        src="https://i.pinimg.com/564x/26/1b/2b/261b2b5b30706a2d59232dec0a4f86c3.jpg"
      />
    </Letterbox>
    ~~~
  `}
    name="Example"
    display="flex"
    direction="row"
    justifyContent="around"
    marginLeft={-2}
    marginRight={-2}
    wrap
  >
    <Box paddingX={2}>
      <h4>Tall content (564:806)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
        <img
          alt="tall"
          style={{ width: '100%', display: 'block' }}
          src="https://i.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg"
        />
      </Letterbox>
    </Box>

    <Box paddingX={2}>
      <h4>Wide content (564:517)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
        <img
          alt="wide"
          style={{ width: '100%', display: 'block' }}
          src="https://i.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg"
        />
      </Letterbox>
    </Box>

    <Box paddingX={2}>
      <h4>Square content (1:1)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={1}>
        <img
          alt="square"
          style={{ width: '100%', display: 'block' }}
          src="https://i.pinimg.com/564x/26/1b/2b/261b2b5b30706a2d59232dec0a4f86c3.jpg"
        />
      </Letterbox>
    </Box>

    <Box paddingX={2}>
      <h4>Square content (1:1) in a vertical frame</h4>
      <Letterbox width={200} height={300} contentAspectRatio={1}>
        <img
          alt="square"
          style={{ width: '100%', display: 'block' }}
          src="https://i.pinimg.com/564x/10/7d/99/107d993c7818ed41bc0afc27ab2a2f15.jpg"
        />
      </Letterbox>
    </Box>

    <Box paddingX={2}>
      <h4>Square content (1:1) in a horizontal frame</h4>
      <Letterbox width={300} height={200} contentAspectRatio={1}>
        <img
          alt="square"
          style={{ width: '100%', display: 'block' }}
          src="https://i.pinimg.com/564x/10/7d/99/107d993c7818ed41bc0afc27ab2a2f15.jpg"
        />
      </Letterbox>
    </Box>
  </Box>
);

export default () => <CardPage cards={cards} />;
