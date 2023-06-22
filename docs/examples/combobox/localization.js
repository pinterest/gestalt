// @flow strict
import { type Node, useState } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example(): Node {
  const PRONOUNS = [
    'ell@ / l@ / -@',
    'ella / la / le / -a',
    'elle / le / -e',
    'ellx / lx / -x',
    'él / lo / le / -o',
  ];

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: `value${index}` }));

  const [errorMessage, setErrorMessage] = useState<?string>();

  const handleOnBlur = ({
    value,
  }: {|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => {
    if (value !== '' && !PRONOUNS.includes(value))
      setErrorMessage('Por favor, selecciona una opción válida');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Box padding={2} width="100%" height="100%">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Remueve la lista de pronombres seleccionados"
            errorMessage={errorMessage}
            helperText="Elige hasta 2 grupos de pronombres para que aparezcan en tu perfil y otras personas sepan cómo referirse a ti. Puedes editarlos o eliminarlos en cualquier momento."
            id="localization"
            label="Pronombres"
            noResultText="No se encontró ninguna coincidencia"
            onBlur={handleOnBlur}
            onChange={resetErrorMessage}
            onClear={resetErrorMessage}
            options={options}
            placeholder="Añade tus pronombres"
          />
        </Box>
      </Flex>
    </Box>
  );
}
