// @flow strict
import { useState, type Node, type ElementProps } from 'react';
import { Box, ComboBox, Flex, Icon, TapArea, Layer, Toast, Tooltip } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

const { icons } = Icon;
type IconName = $NonMaybeType<$ElementType<ElementProps<typeof Icon>, 'icon'>>;

function ClickableIcon({ iconName, onTap }: {| iconName: IconName, onTap: () => void |}) {
  return (
    <Tooltip text={iconName} accessibilityLabel="">
      <TapArea rounding="circle" tapStyle="compress" onTap={onTap}>
        <Box padding={2}>
          <Icon color="default" accessibilityLabel={iconName} icon={iconName} />
        </Box>
      </TapArea>
    </Tooltip>
  );
}

function findIcon(icon?: string): ?IconName {
  return icons.find((name) => name === icon);
}

export default function IconPage(): Node {
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
    setInputValue(value);
    setSuggestedOptions(
      value
        ? iconOptions.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()))
        : iconOptions,
    );
  };

  const handleSelect = ({ item }) => {
    setInputValue(item.label);
    setSuggestedOptions(iconOptions);
    setSelected(item);
  };

  const buildHandleIconClick = (iconName: string) => () => {
    try {
      navigator.clipboard.writeText(iconName);
      setShowToastText(`Icon name ("${iconName}") successfully copied!`);
      setTimeout(() => setShowToastText(), 3000);
    } catch (err) {
      // Not handling error
    }
  };

  const selectedIcon = findIcon(selected?.label);

  return (
    <Page title="Iconography and SVGs">
      <PageHeader name="Iconography and SVGs" folderName="icons" type="guidelines" />

      <MainSection
        name="Icon library"
        description="Use the combobox on the left to search icons by name. The icon list on the right renders the filtered results. You can also use the icon list to visually search for icons. On hover, a tooltip displays the icon name. On click, the icon name will be copied."
      >
        <Flex width="100%">
          <Box width="35%">
            <ComboBox
              accessibilityClearButtonLabel="Clear the current value"
              label="Search icons by name"
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
              placeholder="Search"
              onChange={handleOnChange}
              onSelect={handleSelect}
            />
          </Box>
          <Box borderStyle="shadow" marginStart={4} overflow="auto" padding={4} width="65%">
            <Flex
              gap={{
                row: 1,
                column: 0,
              }}
              wrap
            >
              {selectedIcon ? (
                <ClickableIcon iconName={selectedIcon} onTap={buildHandleIconClick(selectedIcon)} />
              ) : (
                (suggestedOptions || iconOptions).map(({ label: iconName }, index) => {
                  const icon = findIcon(iconName);
                  return icon ? (
                    <ClickableIcon key={index} iconName={icon} onTap={buildHandleIconClick(icon)} />
                  ) : null;
                })
              )}
            </Flex>
          </Box>
        </Flex>

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
If you need a new icon for an experiment that is not listed on our [Icon](/web/icon) documentation, use the \`dangerouslySetSvgPath\` prop on [Icon](/web/icon), [IconButton](/web/iconbutton), and [Pog](/web/pog).

However, \`dangerouslySetSvgPath\` only works with one SVG path. For icons with multiple paths and groups, use [Box](/web/box) and \`dangerouslySetInlineStyle\` to pass the custom icon as \`backgroundImage\`.

Once your experiment ships to 100%, ask your designer to follow the directions in the [Icon kit](https://www.figma.com/file/N60WnDx9j6Moz3Dt1rNsq9/Icon-Kit). Once the asset is ready, we can add the icon to Gestalt.

Gestalt icon svg files follow a particular format and use automatic file validation testing.

\`<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
<path d="_______________"/>
</svg>\`

We override the color in the Gestalt Icon component and Gestalt only uses the \`d\` attribute in the \`path\` tag and the basic attributes for visualizing the raw file in the \`svg\` tag . For consistency, we don't include unnecessary attributes in the \`svg\` and \`path\` tags.

We recommend streamlining (removing strokes, transforms, etc.) and optimizing the SVGs to improve performance and the pinner experience using the tools [svgo](https://github.com/svg/svgo) or [ImageOptim](https://imageoptim.com/mac)

To use svgo, install

\`npm -g install svgo\`

and run

\`svgo -f packages/gestalt/src/icons --config=packages/gestalt/src/icons/svgo.config.js\``}
        />
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          description="
- Icons must meet the [Non-Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) requirement.
- Avoid using unfamiliar icons. Always refer to Gestalt available icons. A new icon needs to be user tested to evaluate comprehension.
- Icons should be universal across cultures, regions, ages, and backgrounds without need for translation. Be mindful of your audience and use symbols and labels that resonate with them.
- Some icons don't translate well in all cultures, so it's preferred to user-test each icon before it is added to Gestalt.
"
        />
      </MainSection>

      <MainSection name="Brand icons">
        <MainSection.Subsection
          description={`
        All brand icons are trademarks of their respective owners. The inclusion of these trademarks does not indicate endorsement of the trademark holder by Pinterest, nor vice-versa. Please do not use brand logos for any purpose except to represent the company, product, or service to which they refer.
        `}
        />
      </MainSection>
    </Page>
  );
}
