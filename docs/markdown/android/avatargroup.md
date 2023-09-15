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
     - To reflect a single person, company or brand within the product. Use [Avatar](/android/avatar). instead
  </Group>
</TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/79/95/8b79951ed402e8fb952e3e4efb2155e9.png" alt="example of AvatarGroup representing a profile with no image provided"/>
    <Do title="Do" />
    Use the default alternative if no image source is available. This should be the first character of the provided name.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/a8/18/d3/a818d31135277cf02ae50628dc539385.png" alt="example of graphics inside an avatargroup"/>
    <Dont title="Don't" />
    Use alternative icons or graphics.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/17/a4/59/17a45981ccf70a87f89ba42b797340ea.png" alt="avatargroup representing people and organizations"/>
    <Do title="Do" />
    Use AvatarGroup when representing a group of people and/or organizations.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/19/4b/9e/194b9e8bb8a1bb48168c0f9a90c0fc5b.png" alt="example of pins inside an avatargroup"/>
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
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19031%253A33041%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>



## Variants

### Size

1. **xxl** **(120px)**
2. **xl** **(60px)**
3. **lg** **(44px)**
4. **md** **(32px)**
5. **sm** **(24px)**
6. **xs** **(16px)**
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19031%253A33199%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
Avatar comes in 6 different sizes.

### Without an image

If there is no image source provided for the Avatar, the first character of the name provided will be used as a placeholder.
1. With image
2. Without image

<br/>
<TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A33121%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
  </Group>
  <Group>
    <iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20221%253A35222%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
  </Group>
  </TwoCol>

### Stroke
The avatar has an optional 1dp border. 
<br/>
<TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A33528%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
  </Group>
  <Group>
    <iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A33617%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
  </Group>
  </TwoCol>
