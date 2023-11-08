---
title: IconButtonFloating
description: IconButtonFloating represents the primary or most common action on the screen. As the name suggests, it floats over the content and is always on top of everything on the screen. Similar to IconButton, the floating version uses icons instead of text to convey available actions. However, it is used when the action needs to be visible at all times in a sticky way where content can scroll underneath. IconButtonFloating remains in place on scroll.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/6f/4b/44/6f4b44c46c6a43a9b2423c8699724b4b.png" width={56} height={56} alt="IconButtonFloating component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - To represent a primary or common action when it has to be visible all the time on the screen on top of everything
    - Triggering a Sheet to complete a related task
    - Only if it is the most suitable way to present a screen's high-emphasis action
  </Group>
  <Group>
  <Dont title="When not to use" />
    - There isn't a need for a fixed IconButtonFloating visible all the time on the screen
    - To replace IconButton established patterns, such as navigation elements
  </Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens

Use these tokens for applying size and color styles to IconButtonFloating.
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS?type=design&node-id=19195-72179&mode=design&t=rpzG2JbQK3dHaeE6-11" allowFullScreen></iframe>

**Please note**: Icons on IconButtonFloating have a limited range of colors and sizes compared to regular icons, as they are different components and have particular usage cases. See Icon for additional information.

## Anatomy

IconButtonFloating uses icons instead of text to convey available actions on a screen. Some buttons are specialized for particular tasks, such as navigation or presenting menus. Icons(.svg viewbox) dimensions are the same for all icons regardless of the size of the vector asset inside of the container. See [Icon](/ios/icon) for more information.

<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS?type=design&node-id=19195-71959&mode=design&t=rpzG2JbQK3dHaeE6-11" allowFullScreen></iframe>


## Variants

### Selected

Indicates whether the associated dropdown is open or closed. Not used when IconButtonFloating opens a dialog.

**Light mode**
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS?type=design&node-id=19195-72250&mode=design&t=rpzG2JbQK3dHaeE6-11" allowFullScreen></iframe>

**Dark mode**
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS?type=design&node-id=19195-72268&mode=design&t=rpzG2JbQK3dHaeE6-11" allowFullScreen></iframe>


## Writing

For writing best practices, refer to the [content standards](/foundations/content_standards/ui_elements).

<TwoCol>
  <Group>
    <Do title="Do" />
    - Use a descriptive label to describe the IconButtonFloating action by beginning with a verb
  </Group>
  <Group>
    <Dont title="Don't" />
    - Use the words "image" or "icon" in the description label. Instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit"
  </Group>
</TwoCol>