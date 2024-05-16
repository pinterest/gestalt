import { ReactNode, useState } from 'react';
import { Box, Flex, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [favorite, setFavorite] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={{ column: 0, row: 8 }}>
        <RadioGroup
          errorMessage="Please select one"
          id="sizeExample"
          legend="What is your favorite snack?"
        >
          <RadioGroup.RadioButton
            checked={favorite === 'pizza'}
            id="favoriteSizePizzaSm"
            label="Pizza"
            name="favoriteFoodSm"
            onChange={() => setFavorite('pizza')}
            size="sm"
            value="pizza"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'curry'}
            id="favoriteSizeCurrySm"
            label="Curry"
            name="favoriteFoodSm"
            onChange={() => setFavorite('curry')}
            size="sm"
            value="curry"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'sushi'}
            id="favoriteSizeSushiSm"
            label="Sushi"
            name="favoriteFoodSm"
            onChange={() => setFavorite('sushi')}
            size="sm"
            value="sushi"
          />
        </RadioGroup>

        <RadioGroup
          errorMessage="Please select one"
          id="sizeExampleMd"
          legend="What is your favorite snack?"
        >
          <RadioGroup.RadioButton
            checked={favoriteFood === 'pizza'}
            id="favoriteSizePizza"
            label="Pizza"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('pizza')}
            value="pizza"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'curry'}
            id="favoriteSizeCurry"
            label="Curry"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('curry')}
            value="curry"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'sushi'}
            id="favoriteSizeSushi"
            label="Sushi"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('sushi')}
            value="sushi"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
