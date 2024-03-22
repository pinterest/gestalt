---
title: Avatar
description: Avatar is used to represent a user. Every Avatar image has a subtle color wash.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/6d/e1/8b/6de18ba22c600bb022f45629556385e4.png" alt="all variations of the avatar component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To reflect a person, company or brand within the product
  </Group>
  <Group>
  <Dont title="When not to use" />
     - To represent a group of people, companies and/or brands. Use [AvatarGroup](/web/avatargroup) instead
  </Group>
</TwoCol>

## Best practices

For general Avatar best practices, refer to the [Avatar web documentation](/web/avatar).

- Use the default alternative if no image source is available. This will be the first character of the provided name.
- Don’t place elements like washes, text or icons on Avatar.
- Don’t use Avatar to represent metaphorical ideas, like a Board.
  <br/>
  <TwoCol>
  <Group>
  <ImgContainer src="https://i.pinimg.com/originals/83/4c/85/834c85d6296e37c23cbae448168cb5aa.png" alt="example profile with correct avatar size"/>
  <Do title="Do" />
  Use round Avatars in the appropriate size for your need.
  </Group>
  <Group>
  <ImgContainer src="https://i.pinimg.com/originals/30/ef/9d/30ef9d831e6b7b548699da80c0522cc8.png" alt="example of triangle avatar"/>
  <Dont title="Don't" />
  Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style.
  </Group>
  <Group>
  <ImgContainer src="https://i.pinimg.com/originals/6a/83/92/6a83922c62920e546b682a27042b7d57.png" alt="avatar with a name underneath"/>
  <Do title="Do" />
  Use the collaborator’s name nearby or in an alternative view if possible.
  </Group>
  </TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens

<iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A19285%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>

## Anatomy

<iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A18828%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>

## Variants

### Size

1. **xxl** **(120px)**
2. **xl** **(60px)**
3. **lg** **(44px)**
4. **md** **(32px)**
5. **sm** **(24px)**
6. **xs** **(16px)**
<br/>
<iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A19223%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>

### Without an image

If there is no image source provided for the Avatar, the first character of the name provided will be used as a placeholder.

1. With image
2. Without image

<br/>
<TwoCol>
  <Group>
    <iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A18985%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>
  </Group>
  <Group>
    <iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A19065%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>
  </Group>
  </TwoCol>

### Stroke

The avatar has an optional 1px border.
<br/>
<TwoCol>
<Group>
<iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A19146%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>
</Group>
<Group>
<iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D63830%253A19516%26mode%3Ddesign%26t%3D5cgTVc8wEsZk5CTn-1" allowfullscreen></iframe>
</Group>
</TwoCol>
