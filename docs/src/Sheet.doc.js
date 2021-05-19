// @flow strict
import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Sheet"
    description="Sheets are surfaces that allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page. The most common example of Sheet displays content in a panel that opens from the side of the screen for the user to read or input information. Sheets have a default internal padding for content."
    defaultCode={`
    <iframe src="https://codesandbox.io/embed/magical-christian-2kk1c?fontsize=14&hidenavigation=1&theme=light&view=preview"
    style={{width: '100%', height:'600px', border:'1', borderRadius: '4px', overflow:'hidden'}}
    title="Main Sheet Demo"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityDismissButtonLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description:
          'Supply a short, descriptive label for screen-readers as a text alternative to the Dismiss button. See the [Accessibility section](#Accessibility) for more info.',
      },
      {
        name: 'accessibilitySheetLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description:
          'Supply a short, descriptive label for screen-readers to contextualize the purpose of Sheet. See the [Accessibility section](#Accessibility) for more info.',
      },
      {
        name: 'children',
        type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
        required: false,
        defaultValue: null,
        description:
          "Supply the container element(s) or render prop that will be used as the Sheet's main content. See the [animation variant](#Animation) for info on how to add exit animations to Sheet content.",
      },
      {
        name: 'closeOnOutsideClick',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description:
          'Indicate whether clicking on the backdrop (gray area) outside of the Sheet will automatically close it. See the [outside click variant](#Preventing-close-on-outside-click) for more info.',
      },
      {
        name: 'footer',
        type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
        required: false,
        defaultValue: null,
        description:
          "Supply the container element(s) or render prop that will be used as the Sheet's custom footer. See the [footer variant](#Footer) for more info.",
      },
      {
        name: 'heading',
        type: `string`,
        required: false,
        defaultValue: null,
        description:
          "Supply the text that is going to be placed as the Sheet's text heading. Be sure to localize this text. See the [heading variant](#Heading) for more info.",
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        defaultValue: null,
        description:
          'Callback fired when the Sheet is dismissed by clicking on the Dismiss button, pressing the ESC key, or clicking on the backdrop outside of the Sheet (if `closeOnOutsideClick` is true).',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'sm',
        description:
          'Determine the width of the Sheet component. See the [size variant](#Sizes) for more info.',
      },
      {
        name: 'subHeading',
        type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
        required: false,
        defaultValue: null,
        description:
          'Supply the container element(s) or render prop that will be used as the Sheet sub-heading docked under the heading. See the [sub-heading variant](#Sub-heading) for more info.',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        showCode={false}
        type="do"
        description="Use Sheet for sub-tasks within a large workflow that are optional, like creating a new audience list while creating a campaign."
        defaultCode={`
          <iframe src="https://codesandbox.io/embed/magical-christian-2kk1c?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'600px', border:'1', borderRadius: '4px', overflow:'hidden'}}
          title="Sheets for sub-tasks"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        `}
      />

      <MainSection.Card
        cardSize="lg"
        type="do"
        description="Use Sheet for quick edits within libraries or tables of content where you expect users to be making multiple edits in one session."
        defaultCode={`
        <iframe src="https://codesandbox.io/embed/compassionate-darkness-vpsc9?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'600px', border:'0', borderRadius: '4px', overflow:'hidden'}}
          title="Sheets for quick edits"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use the same size Sheet on a product surface. For example, if filling out a form requires multiple Sheets to be opened to complete different subtasks, then all Sheets in that form should be the same width. When in doubt, pick the widest size needed for the entire flow."
        defaultCode={`

`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description="Use Sheet for required tasks or main tasks, like logging in. Put those tasks within the content of the page instead."
        defaultCode={`

`}
      />
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description="Use Sheet if edits or sub-tasks require more than two steps. Bring users to a full page experience or consider using [Modules](/Module) to section out content."
        defaultCode={`

`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use Sheet to confirm actions or display alerts. Use a [Modal](/Modal) or [Toast](/Toast) instead."
        defaultCode={`

`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
- \`accessibilityDismissButtonLabel\`: provides a short, descriptive label for screen readers as a text alternative to the Dismiss button. Populates the \`aria-label\` attribute on the Dismiss button.
- \`accessibilitySheetLabel\`: provides a short, descriptive label for screen readers to contextualize the purpose of Sheet. Please don’t repeat the same text being passed in the heading prop, but instead provide something that summarizes the Sheet’s purpose. For instance, if the \`heading\` is "Pin Builder", the \`accessibilitySheetLabel\` can be "Create a new Pin". Populates the \`aria-label\` attribute on the entire dialog.
`}
    >
      <MainSection.Card
        cardSize="lg"
        iframeContent={`
        <iframe src="https://codesandbox.io/embed/magical-christian-2kk1c?fontsize=14&hidenavigation=1&theme=light&view=preview"
        style={{width: '100%', height:'600px', border:'0', borderRadius: '4px', overflow:'hidden'}}
        title="Accessibility Labels"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
        `}
        defaultCode={`
function AccessibilityExample(props) {
  const SheetWithAccessibilityLabels = ({
    onDismiss,
  }) => {

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close audience creation sheet"
        accessibilitySheetLabel="Audience list creation for new campaign"
        heading="Create a new audience list"
        onDismiss={onDismiss}
        footer={({ onDismissStart }) => (
          <Flex alignItems="center" justifyContent="end">
            <Button inline color="red" text="Create" onClick={onDismissStart} />
          </Flex>
        )}
        size="md"
      >
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 1:</Text>
              <Text inline> Audience list details</Text>
            </Box>
            <TextField id="audience-name" label="Audience name" placeholder="Name your audience" onChange={() => {}}/>
            <TextField id="desc" label="Audience description" placeholder="Describe your audience" onChange={() => {}}/>
            <Fieldset legend="When adding this audience list to an ad group:">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Include list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                  id="include"
                />
                <RadioButton
                  label="Exclude list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                  id="exclude"
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 2:</Text>
              <Text inline> Select conversion source</Text>
            </Box>
            <Text>To use a conversion source other than a Pinterest Tag, add a filter and configure the source of this event.</Text>
            <Fieldset legend="Select conversion source:" legendDisplay="hidden">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Pinterest Tag"
                  name="source"
                  value="pin"
                  onChange={() => {}}
                  id="tag"
                />
                <RadioButton
                  label="Mobile Measurement Partners (MMP)"
                  name="source"
                  value="mmp"
                  onChange={() => {}}
                  id="mmp"
                />
                <RadioButton
                  label="Conversion Upload"
                  name="source"
                  value="conversion"
                  onChange={() => {}}
                  id="upload"
                />
                <RadioButton
                  label="API"
                  name="source"
                  value="api"
                  onChange={() => {}}
                  id="api"
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 3:</Text>
              <Text inline> Set a filter</Text>
            </Box>
            <TextField id="users" label="Users in the past few days" placeholder="Ex. 4" onChange={() => {}}/>
            <Checkbox label="Include past traffic data" name="traffic" id="traffic" onChange={() => {}}/>
          </Flex>
        </Flex>
      </Sheet>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="View example Sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithAccessibilityLabels onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Focus management"
      description={`
When Sheet opens, focus should be placed on the first interactive element within the Sheet. When Sheet is closed, focus should be placed back on the button that triggered the Sheet.
`}
    />
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`heading\`, \`accessibilityDismissButtonLabel\` and \`accessibilitySheetLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Heading"
      description={`As a default, Sheet consists of a \`heading\` and content passed as \`children\`. The \`heading\` of Sheet will have a drop shadow when content scrolls under it.`}
    >
      <MainSection.Card
        cardSize="lg"
        iframeContent={`
        <iframe src="https://codesandbox.io/embed/magical-christian-2kk1c?fontsize=14&hidenavigation=1&theme=light&view=preview"
        style={{width: '100%', height:'600px', border:'0', borderRadius: '4px', overflow:'hidden'}}
        title="Sheet with Heading"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
        `}
        defaultCode={`
function AccessibilityExample(props) {
  const SheetWithAccessibilityLabels = ({
    onDismiss,
  }) => {

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close audience creation sheet"
        accessibilitySheetLabel="Audience list creation for new campaign"
        heading="Create a new audience list"
        onDismiss={onDismiss}
        footer={({ onDismissStart }) => (
          <Flex alignItems="center" justifyContent="end">
            <Button inline color="red" text="Create" onClick={onDismissStart}/>
          </Flex>
        )}
        size="md"
      >
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 1:</Text>
              <Text inline> Audience list details</Text>
            </Box>
            <TextField label="Audience name" placeholder="Name your audience"/>
            <TextField label="Audience description" placeholder="Describe your audience"/>
            <Fieldset legend="When adding this audience list to an ad group:">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Include list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Exclude list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 2:</Text>
              <Text inline> Select conversion source</Text>
            </Box>
            <Text>To use a conversion source other than a Pinterest Tag, add a filter and configure the source of this event.</Text>
            <Fieldset legend="Select conversion source:" legendDisplay="hidden">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Pinterest Tag"
                  name="source"
                  value="pin"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Mobile Measurement Partners (MMP)"
                  name="source"
                  value="mmp"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Conversion Upload"
                  name="source"
                  value="conversion"
                  onChange={() => {}}
                />
                <RadioButton
                  label="API"
                  name="source"
                  value="api"
                  onChange={() => {}}
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 3:</Text>
              <Text inline> Set a filter</Text>
            </Box>
            <TextField label="Users in the past few days" placeholder="Ex. 4"/>
            <Checkbox label="Include past traffic data" name="traffic"/>
          </Flex>
        </Flex>
      </Sheet>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="View example Sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithAccessibilityLabels onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Sub-heading"
      description={`A \`subHeading\` is a container that can be used for additional navigation or sub-text. The sub-heading sits at the top under the heading, and will always remain visible if the content scrolls.`}
    >
      <MainSection.Card
        cardSize="lg"
        iframeContent={`
          <iframe src="https://codesandbox.io/embed/wonderful-thunder-y2fr6?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'600px', border:'0', borderRadius: '4px', overflow:'hidden'}}
          title="Sheet with sub-heading"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        `}
        defaultCode={`
function SubheadingExample(props) {
  const SheetWithSubheading = ({
    onDismiss,
  }) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    const enRef = React.useRef();
    const esRef = React.useRef();
    const ptRef = React.useRef();
    const chRef = React.useRef();
    const refs = [enRef, esRef, ptRef, chRef];

    const handleChangeTab = ({ activeTabIndex, event }) => {
      event.preventDefault();
      setActiveTabIndex(activeTabIndex);
      refs[activeTabIndex].current.scrollIntoView({
        behavior: 'smooth'
      });
    }

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close"
        accessibilitySheetLabel="Example sheet to demonstrate subHeading"
        heading="Sheet with subHeading"
        onDismiss={onDismiss}
        footer={
          <Flex justifyContent="end">
            <Button inline color="red" text="Apply changes"/>
          </Flex>
        }
        size="md"
        subHeading={
          <Box marginBottom={4} marginStart={8} marginEnd={8}>
            <Tabs
              tabs={[
                {
                  text: "English",
                  href: "#"
                },
                {
                  text: "Español",
                  href: "#"
                },
                {
                  text: "Português",
                  href: "#"
                },
                {
                  text: '普通话',
                  href: '#'
                }
              ]}
              activeTabIndex={activeTabIndex}
              onChange={handleChangeTab}
            />
          </Box>
        }
      >
        <Box marginBottom={8} ref={enRef}>
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
        <Box marginBottom={8} ref={esRef}>
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
        <Box marginBottom={8} ref={ptRef}>
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
        <Box marginBottom={8} ref={chRef}>
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
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="View subheading example"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithSubheading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Footer"
      description={`The \`footer\` is used for Sheet tasks that require additional actions, such as submitting or deleting information.`}
    >
      <MainSection.Card
        cardSize="lg"
        iframeContent={`
          <iframe src="https://codesandbox.io/embed/compassionate-darkness-vpsc9?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'600px', border:'0', borderRadius: '4px', overflow:'hidden'}}
          title="Sheet with Footer"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        `}
        defaultCode={`
function FooterExample(props) {
  const SheetWithFooter = ({
    onDismiss,
  }) => {

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close"
        accessibilitySheetLabel="Bulk edit for 5 ad groups of Nordstrom Account"
        heading="Editing 5 ad groups"
        onDismiss={onDismiss}
        footer={({ onDismissStart }) => (
          <Flex alignItems="center" justifyContent="between">
            <Button inline color="transparent" text="Delete"/>
            <Button inline color="red" text="Apply changes" onClick={onDismissStart}/>
          </Flex>
        )}
        size="md"
      >
        <Flex direction="column" gap={8}>
          <Text weight="bold">Bids</Text>
          <Flex gap={4}>
            <Text>Adjust bids for the selected ad groups below. Changes made here will apply to all selected ad groups.</Text>
            <Flex.Item flex="none">
              <Button text="Reset bids" disabled/>
            </Flex.Item>
          </Flex>
          <Module.Expandable
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            id="ModuleExample - default"
            expandedIndex={0}
            items={[
              {
                children: <Fieldset legend="What bid campaign do you want to run?" legendDisplay="hidden">
                    <Flex direction="column" gap={2}>
                      <RadioButton
                        checked={true}
                        id="favoriteDog"
                        label="No change"
                        name="favorite"
                        onChange={() => {}}
                        value="dogs"
                      />
                      <RadioButton
                        checked={false}
                        id="favoriteCat"
                        label="Automatic (recommended)"
                        subtext="Pinterest aims to get the most clicks for your budget"
                        name="favorite"
                        onChange={() => {}}
                        value="cats"
                      />
                      <RadioButton
                        checked={false}
                        id="favoritePlants"
                        label="Custom"
                        subtext="You control how much to bid at auctions"
                        name="favorite"
                        onChange={() => {}}
                        value="plants"
                      />
                    </Flex>
                  </Fieldset>,
                summary: ['Custom'],
                title: 'Bid',
              }]}>
          </Module.Expandable>
          <Module.Expandable
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            id="ModuleExample - preview"
            items={[
              {
                children: <Text> Preview table of changes here</Text>,
                summary: ['5 ad groups changing'],
                title: 'Preview bid changes',
              }]}>
          </Module.Expandable>
        </Flex>
      </Sheet>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="View footer example"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithFooter onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Sizes"
      description={`
Sheet comes in 3 sizes: small (\`sm\`), medium (\`md\`), and large (\`lg\`).
- Small Sheets (540px) are primarily used for displaying information or acting as a point to link to other content. They are the least commonly used.
- Medium Sheets (720px) are the standard size offered for content.
- Large Sheets (900px) should be used in cases where there may be columns of content or navigation where the additional space is required to keep the content at a comfortable reading width.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SizesExample(props) {
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
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
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
        <Layer zIndex={sheetZIndex}>
          <Sheet
            accessibilityDismissButtonLabel="Dismiss"
            accessibilitySheetLabel="Example sheet to demonstrate different sizes"
            footer={
              <Flex justifyContent="end">
                <Button text="Apply changes" inline color="red"/>
              </Flex>
            }
            heading={state.heading}
            onDismiss={() => { dispatch({ type: 'none' }) }}
            size={state.size}
          >
          <Flex direction="column" gap={8}>
            <Text weight="bold">Bids</Text>
            <Flex gap={4}>
              <Text>Adjust bids for the selected ad groups below. Changes made here will apply to all selected ad groups.</Text>
              <Flex.Item flex="none">
                <Button text="Reset bids" disabled/>
              </Flex.Item>
            </Flex>
            <Module.Expandable
              accessibilityExpandLabel="Expand the module"
              accessibilityCollapseLabel="Collapse the module"
              id="ModuleExample - default"
              expandedIndex={0}
              items={[
                {
                  children: <Fieldset legend="What bid campaign do you want to run?" legendDisplay="hidden">
                      <Flex direction="column" gap={2}>
                        <RadioButton
                          checked={true}
                          id="favoriteDog"
                          label="No change"
                          name="favorite"
                          onChange={() => {}}
                          value="dogs"
                        />
                        <RadioButton
                          checked={false}
                          id="favoriteCat"
                          label="Automatic (recommended)"
                          subtext="Pinterest aims to get the most clicks for your budget"
                          name="favorite"
                          onChange={() => {}}
                          value="cats"
                        />
                        <RadioButton
                          checked={false}
                          id="favoritePlants"
                          label="Custom"
                          subtext="You control how much to bid at auctions"
                          name="favorite"
                          onChange={() => {}}
                          value="plants"
                        />
                      </Flex>
                    </Fieldset>,
                  summary: ['Custom'],
                  title: 'Bid',
                }]}>
            </Module.Expandable>
            <Module.Expandable
              accessibilityExpandLabel="Expand the module"
              accessibilityCollapseLabel="Collapse the module"
              id="ModuleExample - preview"
              items={[
                {
                  children: <Text> Preview table of changes here</Text>,
                  summary: ['5 ad groups changing'],
                  title: 'Preview bid changes',
                }]}>
            </Module.Expandable>
          </Flex>
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Preventing close on outside click"
      description={`
      By default, users can click outside Sheet (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. This may be implemented in order to prevent users from accidentally clicking out of the Sheet and losing information they’ve entered. The \`ESC\` key can still be used to close the Sheet.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ClosingExample(props) {
  const SheetWithoutOutsideClick = ({
    onDismiss,
  }) => {

    return (
      <Sheet
        accessibilityDismissButtonLabel="Close"
        accessibilitySheetLabel="Example sheet for demonstration"
        heading="Create new audience list"
        closeOnOutsideClick={false}
        onDismiss={onDismiss}
        footer={({ onDismissStart }) => (<Flex alignItems="center" justifyContent="end"><Button inline color="red" text="Create" onClick={onDismissStart}/></Flex>)}
        size="md"
      >
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 1:</Text>
              <Text inline> Audience list details</Text>
            </Box>
            <TextField label="Audience name" placeholder="Name your audience"/>
            <TextField label="Audience description" placeholder="Describe your audience"/>
            <Fieldset legend="When adding this audience list to an ad group:">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Include list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Exclude list"
                  name="audience"
                  value="include"
                  onChange={() => {}}
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 2:</Text>
              <Text inline> Select conversion source</Text>
            </Box>
            <Text>To use a conversion source other than a Pinterest Tag, add a filter and configure the source of this event.</Text>
            <Fieldset legend="Select conversion source:" legendDisplay="hidden">
              <Flex direction="column" gap={3}>
                <RadioButton
                  label="Pinterest Tag"
                  name="source"
                  value="pin"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Mobile Measurement Partners (MMP)"
                  name="source"
                  value="mmp"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Conversion Upload"
                  name="source"
                  value="conversion"
                  onChange={() => {}}
                />
                <RadioButton
                  label="API"
                  name="source"
                  value="api"
                  onChange={() => {}}
                />
              </Flex>
            </Fieldset>
          </Flex>
          <Flex direction="column" gap={4}>
            <Box>
              <Text inline weight="bold">Step 3:</Text>
              <Text inline> Set a filter</Text>
            </Box>
            <TextField label="Users in the past few days" placeholder="Ex. 4"/>
            <Checkbox label="Include past traffic data" name="traffic"/>
          </Flex>
        </Flex>
      </Sheet>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="View Sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithoutOutsideClick onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Animation"
      description={`
      By default, Sheet animates *in*, with the initial render process from the entry-point, and *out*, when the \`ESC\` key is pressed, the header close button is pressed, or the user clicks outside of the Sheet. However, to trigger the exit-animation from other elements within the \`children\` or \`footer\`, the following render prop can be used:

      ~~~jsx
      ({ onDismissStart }) => ( ... )
      ~~~

      When using this render prop, just pass the argument \`onDismissStart\` to your exit-point action elements. In the example below, we've added the exit animation to the:
      - Close button (subHeading)
      - Right arrow icon red button (children)
      - Done red button (children)
      - Left arrow red icon button (children)
      - Close button (footer)
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function AnimationExample() {
  const [shouldShow, setShouldShow] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        inline
        text="Open example sheet"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <Sheet
            accessibilityDismissButtonLabel="Close"
            accessibilitySheetLabel="Animated sheet"
            footer={({ onDismissStart }) => (
              <Flex justifyContent="end">
                <Button inline onClick={onDismissStart} text="Close on Footer" />
              </Flex>
            )}
            heading="Animated Sheet"
            onDismiss={() => setShouldShow(false)}
            size="md"
            subHeading={({ onDismissStart }) => (
              <Box marginBottom={4} marginStart={8} marginEnd={8}>
                <Button color="blue" inline onClick={onDismissStart} text="Close on Sub-heading" />
              </Box>
            )}
          >
            {({ onDismissStart }) => (
              <Flex justifyContent="center" alignItems="center" height="100%">
                <IconButton
                  accessibilityLabel="Done icon left"
                  icon="directional-arrow-right"
                  iconColor="red"
                  inline
                  onClick={onDismissStart}
                  size="lg"
                />
                <Button color="red" inline onClick={onDismissStart} size="lg" text="Done on Children" />
                <IconButton
                  accessibilityLabel="Done icon right"
                  icon="directional-arrow-left"
                  iconColor="red"
                  inline
                  onClick={onDismissStart}
                  size="lg"
                />
              </Flex>
            )}
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  );
}`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Modal](/Modal)**
For alerts, actions or acknowledgments that should block the user’s current flow, use Modal.

**[Toast](/Toast)**
Toast provides feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of being attached to any particular element on the interface.
    `}
    />
  </MainSection>,
);

export default cards;
