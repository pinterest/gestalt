---
title: IconButton
description: IconButton allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.Some buttons are specialized for particular tasks, such as navigation or presenting menus.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="all variations of the avatar component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="Do" />
      - To reflect a person, company or brand within the product
  </Group>
  <Group>
  <Dont title="Don't" />
     - To represent a group of people, companies and/or brands. use [AvatarGroup](https://gestalt.pinterest.systems/web/avatargroup) instead
  </Group>
</TwoCol>

## Mobile best practices

- Display a Tooltip in conjunction with IconButton to provide context when the icon alone would be insufficient to convey the purpose of the button.
- Avoid using a floating icon button if it obscures important information on the screen. 
- Icon Buttons on mobile should primarily utilize the lg (44pt) size as the increased size will better accomodate tapping with a finger.   

For general Avatar best practices, refer to the [IconButton web documentation](/web/iconbutton).
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

1. **lg** **(48pt)**
Large is the only size that should be used on Pinner surfaces.
2. **md** **(32pt)**
Medium is the size used on more dense UI such as business surfaces or internal tools.
3. **sm** **(24pt)**
Small IconButton should be used sparingly and only in places where the UI is very dense.

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="different avatar variations"/>
**size = "sm"**
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="different avatar variations"/>
**size = "md"**
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt="different avatar variations"/>
**size = "lg"**
</Group>
</ThreeCol>


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
