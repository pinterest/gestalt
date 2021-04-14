// @flow strict
import type { Node } from 'react';
import { Popover } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Popover"
    description={`
Popover is a floating view that contains a task related to the content on screen. It can be triggered when the user clicks or focuses on an element, typically [Button](/Button) or [IconButton](/IconButton). It can also be triggered automatically, as in the case of user education. Popover is non-modal and can be dismissed by interacting with another part of the screen or an item within Popover.

Popover is most appropriate for desktop screens and can contain a variety of elements, such as [Button](/Button) and [Images](/Images). Popover is also the container used to construct more complex elements like [Dropdown](/Dropdown) and the board picker, pictured below, which allow people to choose the board to save a Pin to.
`}
    defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        { title }
      </Text>
      <Flex direction="column" gap={4}>
        {[
          ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
          ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
          ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
        ].map((data, index) => (
            <TapArea key={index} onTap={() => {
              setSelectedBoard(data[1]);
              setOpen(false);
            }}>
              <Flex gap={2} alignItems="center">
                <Box height={50} width={50} overflow="hidden" rounding={2}>
                  <Mask rounding={2}>
                    <Image
                      alt={data[2]}
                      color="rgb(231, 186, 176)"
                      naturalHeight={50}
                      naturalWidth={50}
                      src={data[0]}
                    />
                  </Mask>
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                  {data[1]}
                </Text>
              </Flex>
            </TapArea>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={2}>
        <Button
          accessibilityHaspopup={true}
          accessibilityExpanded={open}
          color="white"
          inline
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />
        <Button color="red" inline onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                <Flex direction="column" gap={6}>
                  <Text align="center" color="darkGray" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={8}>
                    <List title="Top choices"/>
                    <List title="All boards"/>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
  `}
  />,
);

// Specifying Component gives auto warnings about missing props
card(
  <PropTable
    Component={Popover}
    props={[
      {
        name: 'anchor',
        type: '?HTMLElement',
        required: true,
        description:
          'The reference element, typically [Button](/Button) or [IconButton](/IconButton), that Popover uses to set its position',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        description: `Callback fired when Popover requests to be closed. Must be used to control Popover’s on/off display state.`,
        required: true,
      },

      {
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description:
          'Specifies the preferred position of Popover relative to its anchor element. See the [ideal direction](#Ideal-direction) variant to learn more.',
      },
      {
        name: 'children',
        type: 'React.Node',
        description: 'The content shown in Popover',
      },
      {
        name: 'positionRelativeToAnchor',
        type: 'boolean',
        defaultValue: true,
        description:
          'Properly positions Popover relative to its anchor element. Set to false when used within [Layer](/Layer). See the [with Layer](#With-layer) variant to learn more.',
      },
      {
        name: 'color',
        type: `"blue" | "orange" | "red" | "white" | "darkGray"`,
        defaultValue: 'white',
        description:
          'The background color of Popover. See the [color and caret](#Color-and-caret) variant to learn more.',
      },
      {
        name: 'shouldFocus',
        type: 'boolean',
        defaultValue: true,
        description:
          'Puts the focus on Popover when it’s triggered. See [accessibility](#Accessibility) to learn more.',
      },
      {
        name: 'showCaret',
        type: 'boolean',
        defaultValue: false,
        description:
          'Shows a caret on Popover. See the [color and caret](#Color-and-caret) variant to learn more.',
      },
      {
        name: 'size',
        type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number`,
        description: 'The maximum width of Popover. See the [size](#Size) variant to learn more.',
        defaultValue: 'sm',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Popover to display a lightweight task related to the content on screen."
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        { title }
      </Text>
      <Flex direction="column" gap={4}>
        {[
          ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
          ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
          ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
        ].map((data, index) => (
            <TapArea key={index} onTap={() => {
              setSelectedBoard(data[1]);
              setOpen(false);
            }}>
              <Flex gap={2} alignItems="center">
                <Box height={50} width={50} overflow="hidden" rounding={2}>
                  <Mask rounding={2}>
                    <Image
                      alt={data[2]}
                      color="rgb(231, 186, 176)"
                      naturalHeight={50}
                      naturalWidth={50}
                      src={data[0]}
                    />
                  </Mask>
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                  {data[1]}
                </Text>
              </Flex>
            </TapArea>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={2}>
        <Button
          accessibilityHaspopup={true}
          accessibilityExpanded={open}
          color="white"
          inline
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />
        <Button color="red" inline onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                <Flex direction="column" gap={6}>
                  <Text align="center" color="darkGray" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={8}>
                    <List title="Top choices"/>
                    <List title="All boards"/>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
  `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use Popover to communicate critical information, such as an error or interaction feedback. Instead, use the error supplied directly to the form element. See [related](#Related) to learn more."
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
}

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" ref={viewRef} height={200}>
        <TextField
          id="field"
          onChange={() => {}}
          label="Name"
          value="Cats"
          ref={anchorRef}
        />
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="red"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box padding={3}>
              <Text color="white" align="center">
                You already have a board with that name
              </Text>
            </Box>
          </Popover>
        </Layer>}
    </React.Fragment>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Popover to educate users on a new or existing feature. When Popover is triggered automatically, like in the case of user education, be sure to use a blue background and include a caret pointing to the feature. See the [color and caret](#Color-and-caret) variant to learn more."
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <React.Fragment>
      <IconButton
        accessibilityLabel="Default IconButton"
        iconColor="darkGray"
        icon="filter"
        onClick={() => {}}
        ref={anchorRef}
        size="lg"
      />
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box padding={3}>
              <Text color="white" align="center">
                Filter your board to see your favorite Pins, and more
              </Text>
            </Box>
          </Popover>
        </Layer>}
    </React.Fragment>
  );
}`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Include a caret if Popover was triggered by user interaction, such as clicking or focusing on [Button](/Button) or [IconButton](/IconButton)."
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        { title }
      </Text>
      <Flex direction="column" gap={4}>
        {[
          ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
          ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
          ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
        ].map((data, index) => (
            <TapArea key={index} onTap={() => {
              setSelectedBoard(data[1]);
              setOpen(false);
            }}>
              <Flex gap={2} alignItems="center">
                <Box height={50} width={50} overflow="hidden" rounding={2}>
                  <Mask rounding={2}>
                    <Image
                      alt={data[2]}
                      color="rgb(231, 186, 176)"
                      naturalHeight={50}
                      naturalWidth={50}
                      src={data[0]}
                    />
                  </Mask>
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                  {data[1]}
                </Text>
              </Flex>
            </TapArea>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={2}>
        <Button
          accessibilityHaspopup={true}
          accessibilityExpanded={open}
          color="white"
          inline
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />
        <Button color="red" inline onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            showCaret
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                <Flex direction="column" gap={6}>
                  <Text align="center" color="darkGray" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={8}>
                    <List title="Top choices"/>
                    <List title="All boards"/>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
  `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Keyboard interaction"
      description={`
- When Popover opens, focus moves to the first focusable element in the Popover container.
- Popovers are also a focus trap, so users should only be able to interact with the content inside the Popover container.
- Popover should always be dismissible using the ESC key. It could also be dismissed by interacting with another part of the screen, or by interacting with an element inside Popover.
- When Popover is closed, focus returns to the anchor element that triggered Popover.
`}
    />
    <MainSection.Subsection
      title="ARIA attributes"
      description={`
To assist screen readers, we recommend passing the following ARIA attributes to the anchor element:

- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover attached to the anchor element. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether Popover is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        { title }
      </Text>
      <Flex direction="column" gap={4}>
        {[
          ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
          ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
          ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
        ].map((data, index) => (
            <TapArea key={index} onTap={() => {
              setSelectedBoard(data[1]);
              setOpen(false);
            }}>
              <Flex gap={2} alignItems="center">
                <Box height={50} width={50} overflow="hidden" rounding={2}>
                  <Mask rounding={2}>
                    <Image
                      alt={data[2]}
                      color="rgb(231, 186, 176)"
                      naturalHeight={50}
                      naturalWidth={50}
                      src={data[0]}
                    />
                  </Mask>
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                  {data[1]}
                </Text>
              </Flex>
            </TapArea>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={2}>
        <Button
          accessibilityHaspopup={true}
          accessibilityExpanded={open}
          color="white"
          inline
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />
        <Button color="red" inline onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                <Flex direction="column" gap={6}>
                  <Text align="center" color="darkGray" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={8}>
                    <List title="Top choices"/>
                    <List title="All boards"/>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
  `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description="Be sure to localize any text elements within Popover. Note that localization can lengthen text by 20 to 30 percent."
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Size"
      description={`
The maximum width of Popover. Popover has different size configurations:
- \`"xs"\`: 180px
- \`"sm"\`: 230px
- \`"md"\`: 284px
- \`"lg"\`: 320px
- \`"xl"\`: 360px
- \`number\`: Use this prop to create custom-size Popovers in pixels.
- \`flexible\`: Use this configuration for larger Popovers. Without a defined maximum width, Popover grows to fit the content in \`children\`.

We recommend using \`"xs\`" for education Popovers and \`"xl\`" for more complex Popovers. Avoid using other configurations whenever possible as they are legacy sizes.
      `}
    />

    <MainSection.Subsection
      title="Color and caret"
      description={`
When building in-product education, be sure to pass in \`color="blue"\` and \`showCaret="true"\`, as seen in the first example, and use [Experience HQ](https://ehq.pinadmin.com/) for the configuration. For Popovers that aren’t education, use the default \`color="white"\` and \`showCaret="false"\`, as seen in the second example. Avoid using any other configurations as they are legacy colors.
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <React.Fragment>
      <IconButton
        accessibilityLabel="Default IconButton"
        icon="filter"
        iconColor="darkGray"
        onClick={() => {}}
        ref={anchorRef}
        size="lg"
      />
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box padding={3}>
              <Text color="white" align="center">
                Filter your board to see your favorite Pins, and more
              </Text>
            </Box>
          </Popover>
        </Layer>}
    </React.Fragment>
  );
}`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        { title }
      </Text>
      <Flex direction="column" gap={4}>
        {[
          ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
          ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
          ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
        ].map((data, index) => (
            <TapArea key={index} onTap={() => {
              setSelectedBoard(data[1]);
              setOpen(false);
            }}>
              <Flex gap={2} alignItems="center">
                <Box height={50} width={50} overflow="hidden" rounding={2}>
                  <Mask rounding={2}>
                    <Image
                      alt={data[2]}
                      color="rgb(231, 186, 176)"
                      naturalHeight={50}
                      naturalWidth={50}
                      src={data[0]}
                    />
                  </Mask>
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                  {data[1]}
                </Text>
              </Flex>
            </TapArea>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <React.Fragment>
      <Flex alignItems="center" gap={2}>
        <Button
          accessibilityHaspopup={true}
          accessibilityExpanded={open}
          color="white"
          inline
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />
        <Button color="red" inline onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                <Flex direction="column" gap={6}>
                  <Text align="center" color="darkGray" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={8}>
                    <List title="Top choices"/>
                    <List title="All boards"/>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
  `}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      title="Anchor"
      description={`
Popover requires a reference element, typically [Button](/Button) or [IconButton](/IconButton), to set its position. The \`anchor\` ref can be directly set on the reference component itself. If the components don’t support \`ref\`, the anchor ref can be set to a parent [Box](/Box).

Popover calculates its position based on the bounding box of the \`anchor\`. Therefore, the \`anchor\` ref should only include the trigger element itself, usually [Button](/Button) or [IconButton](/IconButton), or the specific feature component that requires an educational Popover.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
  }

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef} width={300} height={220}>
        <Box display="flex" justifyContent="center" ref={anchorRef} role="tablist">
          <Tabs
            activeTabIndex={1}
            onChange={() => {}}
            tabs={[{ href: '#Anchor', text: 'Created'}]}
            size="lg"
          />
        </Box>
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size={240}
          >
            <Box padding={3}>
              <Flex alignItems="center" direction="column" gap={4}>
                <Text color="white" align="center">
                  New look! Click Created to see Pins you've published. Click Saved to see your saved Pins and boards.
                </Text>
                <Button
                  color="white"
                  inline
                  onClick={() => setOpen(false)}
                  size="lg"
                  text="Got it!"
                />
              </Flex>
            </Box>
          </Popover>
        </Layer>}
    </ScrollBoundaryContainer>
  )
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="With Layer"
      description={`
Popover is typically used within [Layer](/Layer). Layer renders Popover outside the DOM hierarchy of the parent allowing it to overlay surrounding content. Popover calculates its position based on the bounding box of the \`anchor\`. Within Layer, Popover no longer shares a relative root with the \`anchor\` and requires \`positionRelativeToAnchor=false\` to properly calculate its position relative to the anchor element.

Using \`Layer\` with Popover eliminates the need to use \`z-index\` to solve stacking context conflicts. Popovers within Modals and Sheets with z-indexes don't require \`zIndex\` in \`Layer\` thanks to the built-in ScrollBoundaryContainer.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showSheet, setShowSheet] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorDropdownRef = React.useRef(null);
  const handleSelect = ({ item }) => setSelected(item);

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const SelectBoard = () => {
    const [openPopover, setOpenPopover] = React.useState(false);
    const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
    const anchorRef = React.useRef();

    const List = ({ title }) => (
      <Flex direction="column" gap={4}>
        <Text color="darkGray" size="sm">
          { title }
        </Text>
        <Flex direction="column" gap={4}>
          {[
            ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
            ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
            ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
          ].map((data, index) => (
              <TapArea
                key={index}
                onTap={() => {
                  setSelectedBoard(data[1]);
                  setOpenPopover(false);
                }}
                rounding={2}
              >
                <Flex gap={2} alignItems="center">
                  <Box height={50} width={50} overflow="hidden" rounding={2}>
                    <Mask rounding={2}>
                      <Image
                        alt={data[2]}
                        color="rgb(231, 186, 176)"
                        naturalHeight={50}
                        naturalWidth={50}
                        src={data[0]}
                      />
                    </Mask>
                  </Box>
                  <Text align="center" color="darkGray" weight="bold">
                    {data[1]}
                  </Text>
                </Flex>
              </TapArea>
          ))}
        </Flex>
      </Flex>
    );

    return (
      <React.Fragment>
          <Flex direction="column" gap={2}>
            <Text size="sm">Board</Text>
            <Button
              iconEnd="arrow-down"
              label="Select Board"
              onClick={() => setOpenPopover(!openPopover)}
              text={selectedBoard}
              ref={anchorRef}
            />
          </Flex>
        {openPopover && (
          <Layer>
            <Popover
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => setOpenPopover(false)}
              positionRelativeToAnchor={false}
              size="xl"
            >
              <Box width={360}>
                <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                  <Flex direction="column" gap={6}>
                    <Text align="center" color="darkGray" weight="bold">
                      Save to board
                    </Text>
                    <SearchBoardField/>
                  </Flex>
                </Box>
                <Box height={300} overflow="scrollY">
                  <Box marginEnd={4} marginStart={4}>
                    <Flex direction="column" gap={8}>
                      <List title="Top choices"/>
                      <List title="All boards"/>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Popover>
          </Layer>
        )}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Button
        inline
        text="Edit Pin"
        onClick={() => setShowSheet(true)}
        size="lg"
      />
      {showSheet && (
        <Layer zIndex={new FixedZIndex(11)}>
          <Sheet
            accessibilityDismissButtonLabel="Close edit Pin sheet"
            accessibilitySheetLabel="Edit your Pin details"
            heading="Edit Pin"
            footer={
                <Flex>
                  <Flex.Item
                    flex="grow"
                  >
                    <Button
                      color="white"
                      text="Delete"
                      size="lg"
                      inline
                      onClick={() => setShowSheet(false)}
                    />
                  </Flex.Item>
                  <Flex gap={2}>
                    <Button
                      text="Cancel"
                      size="lg"
                      inline
                      onClick={() => setShowSheet(false)}
                    />
                    <Button
                      inline
                      text="Done"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setShowSheet(false)}
                    />
                  </Flex>
                </Flex>
            }
            onDismiss={() => setShowSheet(false)}
            size="lg"
          >
            <Box display="flex" height={400} paddingX={8}>
              <Flex gap={8} width="100%">
                <Box width={200} paddingX={2} rounding={4}>
                  <Mask rounding={4}>
                    <Image
                      alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                      color="rgb(231, 186, 176)"
                      naturalHeight={751}
                      naturalWidth={564}
                      src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                    />
                  </Mask>
                </Box>
                <Flex.Item flex="grow">
                  <Flex direction="column" gap={8}>
                    <SelectBoard/>
                    <TextArea
                      id="note"
                      onChange={() => {}}
                      placeholder="Add note"
                      label="Note"
                      value=""
                    />
                  </Flex>
                </Flex.Item>
              </Flex>
              </Box>
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  )
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Ideal direction"
      description={`
Pass in \`idealDirection\` to specify the preferred position of Popover relative to the anchor, such as [Button](/Button) or [IconButton](/IconButton), that triggered it.

Adjust the \`idealDirection\` as necessary to ensure the visibility of Popover and its contextual information. The default direction is "up", although Popover should be center-aligned directly below the element in most cases. The actual position may change given the available space around the anchor element.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
  }

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <ScrollBoundaryContainer>
      <Box
        color="white"
        display="flex"
        alignItems="center"
        ref={viewRef}
        padding={4}
        width={600}
        height={200}
      >
        <Flex gap={2}>
          <Box width={300}>
            <Text>
              You need to add your data source URL to Pinterest so we can access your data source file and create Pins for your products. Before you do this, make sure you have prepared your data source and that you have claimed your website.
            </Text>
          </Box>
          <Button
            accessibilityHaspopup={true}
            accessibilityExpanded={open}
            ref={anchorRef}
            href="https://help.pinterest.com/en/business/article/data-source-ingestion"
            inline
            iconEnd="visit"
            onClick={() => setOpen(false)}
            role="link"
            size="lg"
            target="blank"
            text="Help"
          />
        </Flex>
      </Box>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="right"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            showCaret
            size="xs"
          >
            <Box
              padding={3}
              display="flex"
              alignItems="center"
              direction="column"
            >
              <Text color="white" align="center">
                Need help with something? Check out our Help Center.
              </Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </ScrollBoundaryContainer>
    )
}`}
        shaded
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Within scrolling containers"
      description={`
[ScrollBoundaryContainer](/ScrollBoundaryContainer) is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Popover remains attached to its anchor when scrolling.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
  }

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <ScrollBoundaryContainer height={200}>
      <Box color="white" ref={viewRef} padding={4} width={600}>
        <Flex gap={4}>
          <Box width={200}>
            <Text>
              You need to add your data source URL to Pinterest so we can access your data source file and create Pins for your products. Before you do this, make sure you have prepared your data source and that you have claimed your website. If there are any errors with your data source file, you can learn how to troubleshoot them below. After you click Create Pins, you'll land back at the main data source page while your feed is being processed. Wait for a confirmation email from Pinterest about the status of your data source submission.
            </Text>
          </Box>
          <Button
            ref={anchorRef}
            href="https://help.pinterest.com/en/business/article/data-source-ingestion"
            inline
            iconEnd="visit"
            onClick={() => setOpen(false)}
            role="link"
            size="lg"
            target="blank"
            text="Help"
          />
          {open && (
            <Layer>
              <Popover
                anchor={anchorRef.current}
                color="blue"
                idealDirection="right"
                onDismiss={() => {}}
                positionRelativeToAnchor={false}
                showCaret
                size="xs"
              >
                <Box
                  padding={3}
                  display="flex"
                  alignItems="center"
                  direction="column"
                >
                  <Text color="white" align="center">
                    Need help with something? Check out our Help Center.
                  </Text>
                </Box>
              </Popover>
            </Layer>
          )}
        </Flex>
      </Box>
    </ScrollBoundaryContainer>
)}`}
        shaded
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Writing">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`
- Be clear and predictable so that people anticipate what will happen when they interact with an item.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- Use sentence case while always capitalizing the word “Pin.”
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
- Describe the interface element, like “button,” “icon” or “menu” in education messaging, unless it’s absolutely necessary for clarity.
- Use words like “click” or “tap” in education messaging, if possible, or assume universal accessibility.
- Use Popover to communicate critical information, such as an error or interaction feedback.
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Dropdown](/Dropdown)**
Dropdown is an element constructed using Popover as its container. Use Dropdown to display a list of actions or options in a Popover.

**[Toast](/Toast)**
Toast provides feedback on an interaction. One example of Toast is the confirmation that appears when a Pin has been saved. Toasts appear at the bottom of a desktop screen or top of a mobile screen instead of being attached to any particular element on the interface.

**[Tooltip](/Tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/IconButton), on hover. While Popovers offer broader content options, such as [Button](/Button) and [Images](/Images), Tooltips are purely text-based.

**[Layer](/Layer)**
Layer renders Popover outside the DOM hierarchy of the parent and prevents surrounding components overlaying Popover. See the [with Layer](#With-layer) variant to learn more.

**[ScrollBoundaryContainer](/ScrollBoundaryContainer)**
ScrollBoundaryContainer is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures that Popover remains attached to its anchor when scrolling. See the [within scrolling containers](#Within-scrolling-containers) variant to learn more.
    `}
    />
  </MainSection>,
);

export default cards;
