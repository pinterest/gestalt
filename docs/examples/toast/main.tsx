import { Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast
        dismissButton={{ onDismiss: () => {} }}
        text={
          <Text inline>
            Saved to{' '}
            <Link display="inlineBlock" href="#" target="blank">
              Sushi time
            </Link>
          </Text>
        }
        thumbnail={{
          image: (
            <Image
              alt="Vegan Teriyaki Sushi Burrito"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/564x/ff/ee/52/ffee52eac6cd0f2f5dac8af3899a9f41.jpg"
            />
          ),
        }}
      />
    </Flex>
  );
}
