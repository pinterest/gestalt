---
title: IconButton
description: IconButton allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars. Some buttons are specialized for particular tasks, such as navigation or presenting menus.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/04/af/d1/04afd13f2e6d2e3a659f133cf1c8b360.png" width={48} height={48} alt="IconButton component"/>

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

## Best practices

- Avoid using a floating icon button if it obscures important information on the screen.
- IconButton on mobile should primarily utilize the lg (44dp) size as the increased size will better accommodate tapping with a finger.

For general IconButton best practices, refer to the [IconButton web documentation](/web/iconbutton).

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens

Use these tokens for applying size and color styles to IconButton.
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D6285%253A18843%26t%3DNPVL09mkgLI1ORlO-1" allowFullScreen></iframe>

**Please note**: Icons on IconButton have a limited range of colors and sizes compared to regular icons, as they are different components and have particular usage cases. See Icon for additional information.

## Anatomy

IconButtons use icons instead of text to convey available actions on a screen. Some buttons are specialized for particular tasks, such as navigation or presenting menus. Icons(.svg viewbox) dimensions are the same for all icons regardless of the size of the vector asset inside of the container. See [Icon](/android/icon) for more information.

<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D7716%253A18346%26t%3DeuizGQ2zXauZvtfU-1" allowFullScreen></iframe>

## Variants

### Size

#### Size specs: Container

<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D6285%253A19569%26t%3DNPVL09mkgLI1ORlO-1" allowFullScreen></iframe>

#### Size specs: Icon

<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D6285%253A19660%26t%3DNPVL09mkgLI1ORlO-1" allowFullScreen></iframe>

#### Size use cases

1. **lg** **(44dp)**
Large is the only size that should be used on Pinner surfaces.
2. **md** **(32dp)**
Medium is the size used on more dense UI such as business surfaces or internal tools.
3. **sm** **(24dp)**
Small IconButton should be used sparingly and only in places where the UI is very dense.

## Color

Icon colors are semantic—they have a specific meaning and aren't arbitrary. There is no disabled color for icons, as that is handled by the button state that an icon is in.

**Light mode**
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D6285%253A19752%26t%3DNPVL09mkgLI1ORlO-1" allowFullScreen></iframe>

**Dark mode**
<br/>

<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D6285%253A19857%26t%3DNPVL09mkgLI1ORlO-1" allowFullScreen></iframe>

## Elevation

For elevated IconButton, we suggest using the IconButtonFloating component (Android documentation in progress). See the [IconButtonFloating web](/web/iconbuttonfloating) for reference.

## Writing

For writing best practices, refer to the [content standards](/foundations/content_standards/ui_elements).

<TwoCol>
  <Group>
    <Do title="Do" />
    - Use a descriptive label to describe the IconButton action by beginning with a verb
  </Group>
  <Group>
    <Dont title="Don't" />
    - Use the words "image" or "icon" in the description label; instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit"
  </Group>
</TwoCol>
