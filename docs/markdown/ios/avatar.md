---
title: Avatar
description: Avatar is used to represent a user. Every Avatar image has a subtle color wash.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="all variations of the avatar component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To reflect a person, company or brand within the product
  </Group>
  <Group>
  <Dont title="When not to use" />
     - To represent a group of people, companies and/or brands. use [AvatarGroup](https://gestalt.pinterest.systems/web/avatargroup) instead
  </Group>
</TwoCol>

## Best practices

- Use the default alternative if no image source is available. This will be the first character of the provided name.
- Don’t place elements like washes, text or icons on Avatar.
- Don’t use Avatar to represent metaphorical ideas, like a Board.

For general Avatar best practices, refer to the [Avatar web documentation](/web/avatar).
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" alt="example profile with correct avatar size"/>
    <Do title="Do" />
    Use round Avatars in the appropriate size for your need. 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt="example of triangle avatar"/>
    <Dont title="Don't" />
    Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style. 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/a1/ad/0c/a1ad0cef8be13f304a3b350aef24f12e.png" alt="avatar with a name underneath"/>
    <Do title="Do" />
    Use the collaborator’s name nearby or in an alternative view if possible.
  </Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Variants

### Size

1. **xxl** **(120px)**
2. **xl** **(60px)**
3. **lg** **(44px)**
4. **md** **(32px)**
5. **sm** **(24px)**
6. **xs** **(16px)**

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="different avatar variations"/>

### Without an image

If there is no image source provided for the Avatar, the first character of the name provided will be used as a placeholder.

<br/>

<ImgContainer src="https://i.pinimg.com/originals/a7/e9/d7/a7e9d796017c740a00bb1b3d7fb600a3.png" alt="avatar without any image"/>

## Related

<ThreeCol>
  <IllustrationCard
  title="AvatarGroup"
  href="/web/avatargroup"
  description="AvatarGroup is the ideal component where multiple people/groups need to be displayed"
  color="teal-spabattical-450"
  image="avatar-group"
  />
</ThreeCol>
