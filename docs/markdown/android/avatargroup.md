---
title: AvatarGroup
description: AvatarGroup is used to both display a group of user avatars and, optionally, control actions related to the users group.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/81/74/57/8174572af6f98890bdd647b5f879dde1.png" alt="some variations of the AvatarGroup component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - For the general display of groups of people, companies and/or brands in a limited space
      - In cases where an affordance for adding collaborators is needed
  </Group>
  <Group>
  <Dont title="When not to use" />
     - To reflect a single person, company or brand within the product. Use [Avatar](/android/avatar) instead
  </Group>
</TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/db/4b/17/db4b176d3b4425caccb5b75a766059a8.png" alt="example of AvatarGroup representing a profile with no image provided"/>
    <Do title="Do" />
    Use the default alternative if no image source is available. This should be the first character of the provided name.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3e/24/ae/3e24aed7f11e6af3dae97bf015ea418d.png" alt="example of graphics inside an avatargroup"/>
    <Dont title="Don't" />
    Use alternative icons or graphics.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d9/56/12/d9561207251a0a7c139c2aad2d2be094.png" alt="avatargroup representing people and organizations"/>
    <Do title="Do" />
    Use AvatarGroup when representing a group of people and/or organizations.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f7/59/ee/f759eefa627b81a35d52ac0031e08b4d.png" alt="example of pins inside an avatargroup"/>
    <Dont title="Don't" />
    Use AvatarGroup to represent metaphorical ideas, like multiple Boards or trends. Instead, consider an image or, if there's sufficient space, a [Card](ios/card/card)
  </Group>
</TwoCol>

## Accessibility

Ensure AvatarGroup have labels describing both the data presented and the call to action in case of icon buttons.

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="560" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D41337%253A15288%26mode%3Ddesign%26t%3DM5OYpaTIJhXHwkkM-1" allowfullscreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D41337%253A14850%26mode%3Ddesign%26t%3DEXWl1hZiZiK29gg5-1" allowfullscreen></iframe>



## Variants

### Sizes

AvatarGroup is available in 4 fixed height sizes, and displays up to 3 user avatars.

1. **XS** (16dp)
2. **SM** (24dp)
3. **MD** (32dp)
4. **LG** (44dp)
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D41337%253A15244%26mode%3Ddesign%26t%3DEXWl1hZiZiK29gg5-1" allowfullscreen></iframe>
<br/>
**LG** (44dp) 
This size displays up to 3 user avatars + an IconButton if AvatarGroup is interactive and user can add more collaborators. More users, if present, will be displayed as a numerical count. 
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D43427%253A6368%26mode%3Ddesign%26t%3DEXWl1hZiZiK29gg5-1" allowfullscreen></iframe>

## Related

- [Avatar](https://gestalt.pinterest.systems/android/avatar)
  Avatar is the ideal component in cases where only one person or brand needs to be displayed.

