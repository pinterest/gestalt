// @flow strict
import { useState, type Node } from 'react';
import { Box, ComboBox, Flex, Icon, TapArea, Layer, Toast, Tooltip } from 'gestalt';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function IconPage(): Node {
  const { icons } = Icon;
  const [showToastText, setShowToastText] = useState(false);

  const iconOptions = icons.map((name, index) => ({
    label: name,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(iconOptions);
  const [inputValue, setInputValue] = useState();
  const [selected, setSelected] = useState();

  const handleOnChange = ({ value }) => {
    setSelected();
    if (value) {
      setInputValue(value);
      const filteredOptions = iconOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      setSuggestedOptions(iconOptions);
    }
  };

  const handleSelect = ({ item }) => {
    setInputValue(item.label);
    setSuggestedOptions(iconOptions);
    setSelected(item);
  };

  const ClickableIcon = ({ iconName }: {| iconName: string |}) => {
    return (
      <Tooltip text={iconName}>
        <TapArea
          rounding="circle"
          tapStyle="compress"
          onTap={() => {
            try {
              navigator.clipboard.writeText(iconName);
              setShowToastText(`Icon name ("${iconName}") successfully copied!`);
              setTimeout(() => setShowToastText(), 3000);
            } catch (err) {
              return undefined;
            }
            return undefined;
          }}
        >
          <Box padding={2}>
            {/* $FlowFixMe[prop-missing] */}
            <Icon color="darkGray" accessibilityLabel="" icon={iconName} />
          </Box>
        </TapArea>
      </Tooltip>
    );
  };

  return (
    <Page title="Iconography and SVGs">
      <PageHeader name="Iconography and SVGs" folderName="icons" />
      <MainSection
        name="Search icon library"
        description="The combobox on the left allows to search icons by name. On the right, the icon list renders the filtered results. Furthermore, the icon list can be used to visually search for icons. On hover, each tooltip displays their name. On click, the icon name will be copied."
      >
        <Box width="100%" display="flex">
          <Box width="50%">
            <ComboBox
              accessibilityClearButtonLabel="Clear the current value"
              label="Search icon by name"
              id="controlled"
              inputValue={inputValue}
              noResultText="No results for your selection"
              options={suggestedOptions}
              onBlur={() => {
                if (!selected) setInputValue('');
                setSuggestedOptions(iconOptions);
              }}
              onClear={() => {
                setInputValue('');
                setSelected();
                setSuggestedOptions(iconOptions);
              }}
              selectedOption={selected}
              placeholder="Search icon by name"
              onChange={handleOnChange}
              onSelect={handleSelect}
            />
          </Box>
          <Box
            borderStyle="shadow"
            height={400}
            width="50%"
            overflow="auto"
            padding={4}
            marginStart={4}
          >
            <Flex gap={1} wrap>
              {selected?.label ? (
                <ClickableIcon iconName={selected.label} />
              ) : (
                (suggestedOptions || iconOptions).map(({ label: iconName }, index) => (
                  <ClickableIcon key={index} iconName={iconName} />
                ))
              )}
            </Flex>
          </Box>
        </Box>
        {showToastText && (
          <Layer>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  bottom: 50,
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }}
              fit
              paddingX={1}
              position="fixed"
            >
              <Toast text={showToastText} />
            </Box>
          </Layer>
        )}
      </MainSection>
      <MainSection name="Custom SVG icons">
        <MainSection.Subsection
          description={`
If you need a new icon for an experiment that is not listed on our [Icon](/Icon) documentation, use the \`dangerouslySetSvgPath\` prop on [Icon](/Icon), [IconButton](/IconButton), and [Pog](/Pog).

However, \`dangerouslySetSvgPath\` only works with one SVG path. For icons with multiple paths and groups, use [Box](/Box) and \`dangerouslySetInlineStyle\` to pass the custom icon as \`backgroundImage\`.

Once your experiment ships to 100%, ask your designer to follow the directions in the [Icon kit](https://www.figma.com/file/N60WnDx9j6Moz3Dt1rNsq9/Icon-Kit). Once the asset is ready, we can add the Icon to Gestalt.

Gestalt Icon svg files follow a particular format and use automatic file validation testing.

\`<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
<path d="_______________"/>
</svg>\`

We override the color in the Gestalt Icon component and Gestalt only uses the \`d\` attribute in the \`path\` tag and the basic attributes for visualizing the raw file in the \`svg\` tag . For consistency, we don't include unnecessary attributes in the \`svg\` and \`path\` tags.

We recommend streamlining (removing strokes, transforms, ...) and optimizing the SVGs to improve the performance and the pinner experience using the tools [svgo](https://github.com/svg/svgo) or [ImageOptim](https://imageoptim.com/mac)

To use svgo, install

\`npm -g install svgo\`

and run

\`svgo -f packages/gestalt/src/icons --config=packages/gestalt/src/icons/svgo.config.js\`.`}
        />
      </MainSection>
      <MainSection
        name="Accessibility"
        description="- Icons must meet the [Non-Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) requirement.
- Avoid using unfamiliar icons. Always refer to Gestalt available icons. A new icon needs to be user tested to evaluate comprehension.
- Icons should be universal across cultures, regions, ages, and backgrounds without need for translation. Be mindful of your audience and use symbols and labels that resonate with them.
- Some icons don’t translate well in all cultures, so it's preferred to user-test each Icon before it gets added to Gestalt.
"
      />
    </Page>
  );
}
