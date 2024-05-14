import { Box, Button, Flex, Image, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box height={266} width={200}>
        <Image
          alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
          color="rgb(231, 186, 176)"
          naturalHeight={751}
          naturalWidth={564}
          src="https://i.ibb.co/7bQQYkX/stock2.jpg"
        >
          <Box height="100%" padding={3}>
            <Flex direction="column" height="100%" justifyContent="between">
              <Text color="dark" weight="bold">
                Tropic greens: The taste of Petrol and Porcelain
              </Text>

              <Button
                color="red"
                onClick={() => alert('Click!') /* eslint-disable-line no-alert */}
                text="Save this Pin"
              />
            </Flex>
          </Box>
        </Image>
      </Box>
    </Box>
  );
}
