---
title: IconButton
description: IconButton allows users to take actions and make choices with a single tap. IconButtons use icons instead of text to convey available actions on a screen. Some buttons are specialized for particular tasks, such as navigation or presenting menus.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/f7/e2/b5/f7e2b5e234f5f33f8cb526be18de2912.png" alt="Icon Button component example."/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Interface space is limited. Prioritize using a [Button](/ios/button) if space is available
    - Triggering a [Sheet](ios/sheet) to complete a related task
    - Creating visual separation of actions in text-heavy content
    - Lower-emphasis actions that don't impede users from completing a task
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Displaying icons that don't have actions associated with them. Use an [Icon](ios/icon) instead
    - Displaying multiple IconButtons on a surface that uses the same icon for different actions
    - Text is better suited to convey the action and/or the icon isn't quickly recognizable by users
    - For destructive, high-emphasis actions, for example "delete" or "remove"
  </Group>
</TwoCol>

## Mobile best practices

- Avoid using a floating IconButton if it obscures important information on the screen 
- IconButton on mobile should primarily utilize the LG (44px) size as the increased size will better accommodate tapping with a finger
- When using IconButton on top of images, use a variant with background to ensure readability and accessible contrast 

For general IconButton best practices, refer to the [IconButton web documentation](/web/iconbutton).

## Accessibility

Ensure IconButton have a label describing the intent of the action. For example, use "Add Pin to board" instead of "Add icon". 

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens 

Use these tokens for applying size and color styles to IconButton. 
<br/>
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3395%26mode%3Ddesign%26t%3DYIMzlxYjQqQf2ZV6-1" allowFullScreen></iframe>

## Anatomy 

IconButtons use icons instead of text to convey available actions on a screen. Some buttons are specialized for particular tasks, such as navigation or presenting menus. Icons(.svg viewbox) dimensions are the same for all icons regardless of the size of the vector asset inside of the container. See [Icon](/ios/icon) for more information.

<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3175%26mode%3Ddesign%26t%3DYIMzlxYjQqQf2ZV6-1" allowFullScreen></iframe>
**1. Icon | 2. Container** 

## Variants

### Size
<br/>
**Size specs: Container**
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3610%26mode%3Ddesign%26t%3DiXPhQMpwqZ5Cw3LM-1" allowFullScreen></iframe>
<br/>
**Size specs: Icon**
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3701%26mode%3Ddesign%26t%3DiXPhQMpwqZ5Cw3LM-1" allowFullScreen></iframe>

**Size use cases**

1. **LG** **(44px)**
Large is the only size that should be used on Pinner surfaces.
2. **MD** **(32px)**
Medium is the size used on more dense UI such as business surfaces or internal tools.
3. **SM** **(24px)**
Small IconButton should be used sparingly and only in places where the UI is very dense.

## Color
IconButton colors are semantic - they have a specific meaning and aren’t arbitrary. There is no disabled color for icons, as that is handled by the button state that an icon is in.

**Light mode**
<br/>
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3793%26mode%3Ddesign%26t%3DiXPhQMpwqZ5Cw3LM-1" allowFullScreen></iframe>
<br/>

**Dark mode**
<br/>
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39425%253A3897%26mode%3Ddesign%26t%3DiXPhQMpwqZ5Cw3LM-1" allowFullScreen></iframe>
<br/>

## Elevation

For elevated IconButton, we suggest using the IconButtonFloating component (iOS documentation in progress). See the [web IconButtonFloating](web/iconbuttonfloating) for reference.

## Writing

For writing best practices, refer to the [content standards](foundations/content_standards/ui_elements).
<TwoCol>
  <Group>
    <Do title="Do" />
    - Use a descriptive label to indicate IconButton action by beginning with a verb
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use the words “image” or “icon” in the description label. Instead, prefer to use verbs that describe the action. For example, “Save” or “Edit”
  </Group>
</TwoCol> 
