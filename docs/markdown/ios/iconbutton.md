---
title: IconButton
description: IconButton allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars. Some buttons are specialized for particular tasks, such as navigation or presenting menus.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/95/15/4a/95154a609396c1d2e4ae9575a041bf3b.png" width={44} height={44} alt="Icon Button component example."/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Interface space is limited. Prioritize using a Button if space is available.
    - Triggering a Modal to complete a related task.
    - Creating visual separation of actions in text-heavy content.
    - Lower-emphasis actions that don't impede users from completing a task.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Displaying icons that don't have actions associated with them. Use an Icon instead.
    - Displaying multiple IconButtons on a surface that uses the same icon for different actions.
    - Text is better suited to convey the action and/or the icon isn't quickly recognizable by users.
    - Destructive, high-emphasis actions, e.g "delete", "remove".
  </Group>
</TwoCol>

## Mobile best practices

- Avoid using a floating icon button if it obscures important information on the screen. 
- IconButton on mobile should primarily utilize the lg (44pt) size as the increased size will better accommodate tapping with a finger.   

For general IconButton best practices, refer to the [IconButton web documentation](/web/iconbutton).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Variants

### Size

1. **lg** **(44pt)**
Large is the only size that should be used on Pinner surfaces.
2. **md** **(32pt)**
Medium is the size used on more dense UI such as business surfaces or internal tools.
3. **sm** **(24pt)**
Small IconButton should be used sparingly and only in places where the UI is very dense.

<ThreeCol>
<Group center>
<ImgContainer src="https://i.pinimg.com/originals/30/fa/30/30fa30fd2e78a285efd2b81ef7cba745.png" alt="small IconButton" width={24} height={24} />
**size = "sm"**
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/cd/6b/4f/cd6b4ffcd8254493c5a8da94b1d68e19.png" alt="medium IconButton" width={32} height={32} />
**size = "md"**
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/95/15/4a/95154a609396c1d2e4ae9575a041bf3b.png" alt="large IconButton" width={44} height={44} />
**size = "lg"**
</Group>
</ThreeCol>

### Elevation

1. **Flat**
Flat components sit right on top of the background, with no elevation. Therefore they do not have a drop shadow. 
2. **Floating**
Floating components are lifted off of the background, with high-emphasis elevation. They present with a drop shadow which can serve as an affordance for scrolling behavior. 

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/6c/27/78/6c27788eca8b18879395892bda8ca8e5.png" width={60} height={60} alt="flat IconButton"/>
**flat**
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/54/73/1d/54731d4ae0c67a031887f6f58cd7905f.png" width={60} height={60} alt="floating IconButton"/>
**floating**
</Group>
</TwoCol>

### Styling
For information on color, icons, roles and states, refer to the [web IconButton documentation](/web/iconbutton). 

## Writing

For writing best practices, refer to the [web IconButton documentation](/web/iconbutton). 

## Related

<ThreeCol>
  <IllustrationCard
  title="Button"
  description="Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it."
  color="teal-spabattical-450"
  image="button"
  />
  <IllustrationCard
  title="Icon"
  description="IconButtons use icons instead of text to convey available actions on a screen. Use an existing one from the Gestalt Icon library."
  color="teal-spabattical-450"
  image="icon"
  />
  <IllustrationCard
  title="Dropdown"
  description="It's most common to anchor Dropdown to Button or IconButton."
  color="teal-spabattical-450"
  image="dropdown"
  />
</ThreeCol>
