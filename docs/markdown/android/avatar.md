---
title: Avatar
description: Avatar is used to represent a user. Every Avatar image has a subtle color wash.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/af/75/6f/af756f3ad767857e5695d6cb626c1a12.png" alt="all variations of the avatar component"/>

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
    <ImgContainer src="https://i.pinimg.com/originals/92/e5/ec/92e5ec30eb262ff1decfb70653a0d92c.png" alt="example profile with correct avatar size"/>
    <Do title="Do" />
    Use round Avatars in the appropriate size for your need.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/43/f4/5c/43f45caf6d30655c47eaaf89e4a9d6d4.png" alt="example of triangle avatar"/>
    <Dont title="Don't" />
    Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f4/5d/bd/f45dbde69d53684aeab0a81eede52609.png" alt="avatar with a name underneath"/>
    <Do title="Do" />
    Use the collaborator’s name nearby or in an alternative view if possible.
  </Group>
</TwoCol>

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Variants

### Size

Avatar comes in 6 different sizes.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/af/75/6f/af756f3ad767857e5695d6cb626c1a12.png" alt="different avatar variations"/>

1. **xxl** **(120dp)**
2. **xl** **(60dp)**
3. **lg** **(44dp)**
4. **md** **(32dp)**
5. **sm** **(24dp)**
6. **xs** **(16dp)**

<br/>

### Without an image

If there is no image source provided for the Avatar, the first character of the name provided will be used as a placeholder.

<br/>

<ImgContainer src="https://i.pinimg.com/originals/09/fb/35/09fb35ea880ea6748003d7ed0b3de426.png" alt="avatar without any image"/>
