import { Avatar, Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast
        text="Switched to Mara Ibrahim"
        thumbnail={{
          avatar: (
            <Avatar
              name="Keerthi"
              src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
            />
          ),
        }}
      />
    </Flex>
  );
}
