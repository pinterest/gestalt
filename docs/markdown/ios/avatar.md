---
title: Avatar
description: Avatar is used to represent a user. Every Avatar image has a subtle color wash.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="Do" />
      - To reflect a person, company, or brand within the product
  </Group>
  <Group>
  <Dont title="Don't" />
     - To represent a group of people, companies, and/or brands. use [AvatarGroup](https://gestalt.netlify.app/avatargroup) instead
  </Group>
</TwoCol>

## Best practices

- Use the default alternative if no image source is available. This will be the first character of the provided name.
- Don’t place elements like washes, text or icons on Avatar.
- Don’t use Avatar to represent metaphorical ideas, like a Board.

For general Avatar best practices, refer to the [Avatar web documentation](/web/avatar).
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" />
    <Do title="Do" />
    Use round Avatars in the appropriate size for your need.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" />
    <Dont title="Don't" />
    Use round Avatars in the appropriate size for your need.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" />
    <Do title="Do" />
    Use the collaborators name nearby or in an alternative view if possible
  </Group>
</TwoCol>

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Variants

### Size

1. **xxl** **120px**
2. **xl** **60px**
3. **lg** **44px**
4. **md** **32px**
5. **sm** **24px**
6. **xs** **16px**

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" />

### Without an image

If there is no image source provided for the Avatar, the first character of the name provided will be used as a placeholder.

<br/>

<ImgContainer src="https://i.pinimg.com/originals/a7/e9/d7/a7e9d796017c740a00bb1b3d7fb600a3.png" />

## Related

<ThreeCol>
  <IllustrationCard
  title="AvatarGroup"
  href="/web/avatargroup"
  description="AvatarGroup is used ideally where multiple people are displayed"
  color="teal-spabattical-450"
  image="avatar-group"
  />

</ThreeCol>
