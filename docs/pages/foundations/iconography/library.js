// @flow strict
import { useState, type Node, type ElementProps } from 'react';
import { Box, ComboBox, Flex, Icon, RadioGroup, TapArea, Text, Layer, Toast } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

const { icons } = Icon;
type IconName = $NonMaybeType<$ElementType<ElementProps<typeof Icon>, 'icon'>>;

function IconTile({ iconName, onTap }: {| iconName: IconName, onTap: () => void |}) {
  const [hovered, setHovered] = useState();

  return (
    <TapArea
      rounding="circle"
      tapStyle="compress"
      onTap={onTap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        borderStyle="sm"
        rounding={2}
        padding={2}
        width={172}
        height={84}
        color={hovered ? 'dark' : 'default'}
      >
        <Flex
          height="100%"
          flex="grow"
          direction="column"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            color={hovered ? 'light' : 'default'}
            accessibilityLabel={iconName}
            icon={iconName}
          />
          <Text color={hovered ? 'light' : 'default'} size="100">
            {iconName}
          </Text>
        </Flex>
      </Box>
    </TapArea>
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
  const [sortedAlphatbetical, setSortedAlphabetical] = useState(true);

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
    <Page title="Iconography collection">
      <PageHeader name="Iconography and SVGs" folderName="icons" type="guidelines" />

      <MainSection
        name="Icon library"
        description="Use the icon grid to visually search for icons. On click, the icon name will be copied. You can use the search input below to search icons by name, or filter your search by alphabetical or category."
      >
        <Flex width="100%" direction="column" gap={8}>
          <Flex gap={6} alignItems="end">
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
            <RadioGroup legend="Sort by" direction="row" id="directionExample">
              <RadioGroup.RadioButton
                checked={sortedAlphatbetical}
                id="sortAlphabetical"
                label="Alphabetical"
                name="sortOrder"
                onChange={() => setSortedAlphabetical(true)}
                value="alphabetical"
              />
              <RadioGroup.RadioButton
                checked={!sortedAlphatbetical}
                id="sortCategory"
                label="Category"
                name="sortOrder"
                onChange={() => setSortedAlphabetical(false)}
                value="category"
              />
            </RadioGroup>
          </Flex>
          <Box>
            <Flex gap={3} wrap>
              {selectedIcon ? (
                <IconTile iconName={selectedIcon} onTap={buildHandleIconClick(selectedIcon)} />
              ) : (
                (suggestedOptions || iconOptions).map(({ label: iconName }, index) => {
                  const icon = findIcon(iconName);
                  return icon ? (
                    <IconTile key={index} iconName={icon} onTap={buildHandleIconClick(icon)} />
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
    </Page>
  );
}
