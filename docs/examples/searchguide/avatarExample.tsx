import { Avatar, AvatarGroup, Flex, Icon, Image, SearchGuide } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <SearchGuide
        accessibilityLabel="Image"
        text="Image"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://s3-alpha-sig.figma.com/img/c253/7eb7/32be921c7ae8fa1f273688cf3e6cf8fe?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jr~qIaQL8sUoxz7hRDGFgpMwpFEhicmd-QEOaP6VUqQbVsh97qBOx44FGsXbDjf1qJLgkCxU5f2wN2phlfxTnCQcnmXYpGwV2OwWijLh7ZJd7YzAZfipQzlV0cb0BEdYPBA-IQYQUNZZeUqBW4EmAVx9kLwzmmfIzkJbfn92AqYdlhHLA1hZWVQIFaCb~B6JxaEA1~ys1LpgKNcn6PrTKd6BRehRzX6p61d4Km8A2NIeS~0PHTKwvzylE6fzgw0q5Zahrp33G7ErSVQWH7YGezbsUs7gxL2ryvyKANiaZAJ~I1hlqRjW7ui0D6UJlVqCGsyrPag1lqCmLmzaWCNUBQ__"
            />
          ),
        }}
      />
      <SearchGuide
        accessibilityLabel="Icon"
        text="Icon"
        thumbnail={{
          icon: <Icon accessibilityLabel="" icon="sparkle" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="Avatar"
        text="Avatar"
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="AvatarGroup"
        text="AvatarGroup"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Collaborators: Keerthi, Alberto, Enio."
              collaborators={[
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
                {
                  name: 'Enio',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
    </Flex>
  );
}
