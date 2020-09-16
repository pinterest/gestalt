// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Sheet"
    description="Side sheets are surfaces that allow users to view information or complete sub-tasks in a workflow while keeping the context of the current page."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityDismissButtonLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers as a text alternative to the Dismiss button.',
          'Accessibility: It populates aria-label on the <button> element for the Dismiss button.',
        ],
        href: 'accessibilityExample',
      },
      {
        name: 'accessibilitySheetLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to contextualize the purpose of Sheet.',
          'Please do not repeat the same text being passed in the "heading" prop, but instead provide something that summarizes the Sheet. For instance, if the heading is "Pin Builder", the accessibilitySheetLabel can be "Create a new Pin".',
          'Accessibility: It populates aria-label on the <div role="dialog"> element which represents the Sheet component.',
        ],
        href: 'accessibilityExample',
      },
      {
        name: 'children',
        type: 'React.Node',
        required: false,
        defaultValue: null,
        description: [
          'Supply the children content of the Sheet.',
          'The container element that is going to be used as the Sheet main content.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'closeOnOutsideClick',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: [
          'Indicate whether clicking on the backdrop (gray area) outside of the Sheet will automatically close it.',
          'Possible values:',
          '- true: clicking on the backdrop will close the Sheet.',
          '- false: clicking on the backdrop will keep the Sheet open.',
        ],
        href: 'closeOnOutsideClickExample',
      },
      {
        name: 'footer',
        type: 'React.Node',
        required: false,
        defaultValue: null,
        description: [
          'Supply the footer content of the Sheet.',
          'The container element that is going to be used as the Sheet custom footer.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'heading',
        type: `string | React.Node`,
        required: false,
        defaultValue: null,
        description: [
          'Supply the heading content of the Sheet.',
          'Please do not repeat the same text being passed in the "accessibilitySheetLabel" prop, but instead provide something that identifies the Sheet. For instance, if the heading is "Pin Builder", the accessibilitySheetLabel can be "Create a new Pin".',
          'Possible values:',
          '- <string>: the text that is going to be placed as the Sheet text heading.',
          '- <React.Node>: the container element that is going to be used as the Sheet custom heading.',
        ],
        href: 'headingExample',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        defaultValue: null,
        description: [
          'Callback fired when the Sheet is dismissed from one of these ways:',
          '- Clicking on the Dismiss button.',
          '- Pressing the ESC key.',
          '- Clicking on the backdrop (gray area) outside of the Sheet when the prop "closeOnOutsideClick" is true.',
        ],
        href: 'defaultPaddingAndStylingExample',
      },
      {
        name: 'ref',
        type: "React.Ref<'div'>",
        description:
          'Forward the ref to the underlying <div role="dialog"> element which represents the Sheet component.',
        href: 'refExample',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg" | number`,
        defaultValue: 'sm',
        description: [
          'Determine the width of the Sheet component. Possible values:',
          '- sm: 540px',
          '- md: 720px',
          '- lg: 900px',
          '- <number> in px',
        ],
        href: 'sizesExample',
      },
    ]}
  />
);

card(
  <Example
    id="sizesExample"
    name="Sizes"
    description={`
      There are 3 different pre-selected widths available for a \`Sheet\`, as well as a last-resort option to set a custom width. Click on each button to view a sample Sheet of the specified size.
      All Sheets have a max width of 100%.
    `}
    defaultCode={`
function Example(props) {
  function reducer(state, action) {
    switch (action.type) {
      case 'small':
        return { heading: 'Small sheet', size: 'sm' };
      case 'medium':
        return { heading: 'Medium sheet', size: 'md' };
      case 'large':
        return { heading: 'Large sheet', size: 'lg' };
      case 'none':
        return { };
      default:
        throw new Error();
    }
  }

  const initialState = {};
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <Box padding={1}>
        <Button
          inline
          text="Small Sheet"
          onClick={() => { dispatch({ type: 'small' }) }}
        />        
      </Box>
      <Box padding={1}>
        <Button
          inline
          text="Medium Sheet"
          onClick={() => { dispatch({ type: 'medium' }) }}
        />
      </Box>
      <Box padding={1}>
        <Button
          inline
          text="Large Sheet"
          onClick={() => { dispatch({ type: 'large' }) }}
        />
      </Box>
      {state.size && (
        <Layer>
          <Sheet
            accessibilityDismissButtonLabel="Dismiss"
            accessibilitySheetLabel="Example sheet to demonstrate different sizes"
            footer={<Heading size="md">Footer</Heading>}
            heading={state.heading}
            onDismiss={() => { dispatch({ type: 'none' }) }}
            size={state.size}
          >
            <Box padding={8}>
              <Heading size="md">Children</Heading>
            </Box>
          </Sheet>
        </Layer>
      )}    
    </>
  );
}
`}
  />
);

card(
  <Example
    id="closeOnOutsideClickExample"
    name="Prevent close on outside click"
    description={`
      Sometimes we need the user to complete some required action at a Sheet. We can increase the user focus by preventing the user closing the sheet from clicking on the backdrop (gray area) outside of the Sheet.
      For that you can set: \`closeOnOutsideClick\` to \`false\`.
      PS: The user will still be able to close the Sheet via the Dismiss button and the ESC key.
    `}
    defaultCode={`
function Example(props) {
  const [showSheet, setShowSheet] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => { setShowSheet(!showSheet) }}
      />
      {showSheet && (
        <Layer>
          <Sheet
            accessibilityDismissButtonLabel="Dismiss"
            accessibilitySheetLabel="Example sheet to demonstrate preventing close on outside click"
            closeOnOutsideClick={false}
            heading="Sheet that can't be closed by clicking outside"
            onDismiss={() => { setShowSheet(!showSheet) }}
            size="lg"
          >
            <Box padding={8}>
              <Text>Click on the dismiss button or press the ESC key to close the sheet.</Text>
            </Box>
          </Sheet>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="defaultPaddingAndStylingExample"
    name="Default padding &amp; styling"
    description={`
      Some of the padding required to style your sheet has already been provided for ease of use. The sheet shown
      by clicking on the "View padding" button highlights the default behavior. 
      The shadow (when scrolling) between
      the \`heading\`, \`children\`, and \`footer\` are included as well. Please try scrolling up and down the children to verify the shadow.
    `}
    defaultCode={`
function Example(props) {
  const [showSheet, setShowSheet] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="View default padding & styling"
        onClick={() => { setShowSheet(!showSheet) }}
      />
      {showSheet && (
        <Layer>
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Example sheet to demonstrate default padding and styling"
            heading="Sheet default styling"
            onDismiss={() => { setShowSheet(!showSheet) }}
            footer={
              <Box color="lightGray">
                <Heading size="md">Footer</Heading>
              </Box>
            }
            size="md"
          >
            <Box marginBottom={2}>
              <Text weight="bold">English</Text>
              <Text>
                <ol>
                  <li>One</li>
                  <li>Two</li>
                  <li>Three</li>
                  <li>Four</li>
                  <li>Five</li>
                  <li>Six</li>
                  <li>Seven</li>
                  <li>Eight</li>
                  <li>Nine</li>
                  <li>Ten</li>
                </ol>
              </Text>
            </Box>
            <Box marginBottom={2}>
              <Text weight="bold">Español</Text>
              <Text>
                <ol>
                  <li>Uno</li>
                  <li>Dos</li>
                  <li>Tres</li>
                  <li>Cuatro</li>
                  <li>Cinco</li>
                  <li>Seis</li>
                  <li>Siete</li>
                  <li>Ocho</li>
                  <li>Nueve</li>
                  <li>Diez</li>
                </ol>
              </Text>
            </Box>
            <Box marginBottom={2}>
              <Text weight="bold">Português</Text>
              <Text>
                <ol>
                  <li>Um</li>
                  <li>Dois</li>
                  <li>Três</li>
                  <li>Quatro</li>
                  <li>Cinco</li>
                  <li>Seis</li>
                  <li>Sete</li>
                  <li>Oito</li>
                  <li>Nove</li>
                  <li>Dez</li>
                </ol>
              </Text>
            </Box>  
            <Box marginBottom={2}>
              <Text weight="bold">普通话</Text>
              <Text>
                <ol>
                  <li>一</li>
                  <li>二</li>
                  <li>三</li>
                  <li>四</li>
                  <li>五</li>
                  <li>六</li>
                  <li>七</li>
                  <li>八</li>
                  <li>九</li>
                  <li>十</li>
                </ol>
              </Text>
            </Box>            
          </Sheet>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    name="Empty Sheet"
    description={`
      The props children, footer and heading are all optional, so it's possible to have a completely empty Sheet.
    `}
    defaultCode={`
function Example(props) {
  const [showSheet, setShowSheet] = React.useState(false);
  return (
    <>
      <Button
        inline
        text="View empty sheet"
        onClick={() => { setShowSheet(!showSheet) }}
      />
      {showSheet && (
        <Layer>
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Example to demonstrate empty sheet"
            onDismiss={() => { setShowSheet(!showSheet) }}
            size="sm"
          />
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="headingExample"
    name="Custom heading"
    description="
      If you need more control over the Sheet heading besides a wrapped and centered text element, you can pass a custom React node as the heading prop and the Sheet will render that instead.
    "
    defaultCode={`
function HeadingExample(props) {
  const [showSheet, setShowSheet] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleChangeTab = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveTabIndex(activeTabIndex);
  }

  return (
    <>
      <Button
        inline
        text="View heading"
        onClick={() => { setShowSheet(!showSheet) }}
      />
      {showSheet && (
        <Layer>
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Example Sheet to demonstrate custom sheet heading"
            heading={
              <Box padding={8}>
                <Tabs
                  tabs={[
                    {
                      text: "Boards",
                      href: "#"
                    },
                    {
                      text: "Pins",
                      href: "#"
                    },
                    {
                      text: "Topics",
                      href: "#"
                    }
                  ]}
                  activeTabIndex={activeTabIndex}
                  onChange={handleChangeTab}
                />
              </Box>
            }
            onDismiss={() => { setShowSheet(!showSheet) }}
            size="md"
          >
            <Box padding={8}>
              <Text>Currently seeing tab: {activeTabIndex}</Text>
            </Box>
          </Sheet>
        </Layer>
      )}
    </>
  );
}
`}
  />
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`
    A \`Sheet\` with focus using refs
  `}
    defaultCode={`
function SheetRefExample() {
  const [showSheet, setShowSheet] = React.useState(false);

  const sheetRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (showSheet && sheetRef.current && buttonRef.current) {
      sheetRef.current.style.backgroundColor = '#004b91';
      buttonRef.current.focus();
    }
  }, [showSheet, sheetRef]);

  return (
    <>
      <Button
        inline
        text="Open sheet"
        onClick={() => { setShowSheet(!showSheet) }}
      />
      <Layer>
        {showSheet && (
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Focused sheet"
            onDismiss={() => { setShowSheet(!showSheet) }}
            ref={sheetRef}
            size="md"
          >
            <Box padding={4}>
              <Box color="white" minHeight={400} padding={4}>
                <Box marginBottom={4}>
                  <Heading size="md">Focused content</Heading>                
                </Box>
                <Button text="Focused button" inline ref={buttonRef} />
              </Box>
            </Box>
          </Sheet>
        )}
      </Layer>
    </>
  );
}`}
  />
);

card(
  <Card
    id="accessibilityExample"
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.

    - \`accessibilityDismissButtonLabel\` allows us to provide a short, descriptive label for screen-readers as a text alternative to the Dismiss button..
    - \`accessibilitySheetLabel\` allows us to provide a short, descriptive label for screen-readers to contextualize the purpose of Sheet.

    ~~~html
    <Sheet
      accessibilityDismissButtonLabel="Close"
      accessibilitySheetLabel="Edit the details about your board House and Home"
      heading="Edit board"
      onDismiss={handleSheetDismiss}
      footer={<Footer />}
      size="lg"
    >
      {children}
    </Sheet>
    ~~~
  `}
    name="Accessibility Props"
  />
);

export default cards;
