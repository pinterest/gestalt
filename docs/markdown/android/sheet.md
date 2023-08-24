---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/fd/6e/db/fd6edb6190b3b20a78ceff1ea7c799c4.png" alt="Example of a sheet receding off the view of the image"/>

## Usage guidelines
<TwoCol>
<Group>
<Do title="When to use" />
- Performing an optional sub-task within a larger task
- Providing help while maintaining the current page and it's context
- Requesting minimal amounts of information from a user 
- Capturing user's full attention for vital matters
</Group>

<Group>
<Dont title="When not to use" />
- To display system errors. Use the appropriate messaging component instead.
- When it will distract users from their current work stream, unless necessary and intentional
- Avoid using on top of another sheet as this can create usability issues and confusion. View the transitions section for more on interaction logistics. 
</Group>
</TwoCol>

## Best practices

- Trigger sheets via user actions, like button taps
- Include a header title. Headers can be center or start-aligned, but they should remain consistent.
- Keep the sheet footer uncluttered with clear actions
- Don’t remove the wash behind partial Sheets. The wash separates content and allows for better focus and accessibility. 
<br/>
<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/30/a6/ad/30a6ad96aca8c75257fa114322da9695.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
  Include visible close options — multiple if possible. For example, X, back arrow, grabber, close button or outside tap.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/90/a5/20/90a520154834ee4d9a1eea0b6dd9ed20.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
  Avoid using Buttons in the header of Sheet as this can lead to sizing and internationalization problems.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/78/09/18/7809189c7e2b229302f9325ca245e5d7.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />
      Always Include a grabber for partial sheets to signal resizability and provide better accessibility.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/7e/67/ab/7e67ab782d7cfc7441a7d790ce1c9924.png" alt="a full sheet with rounded corners"/>
    <Dont title="Don't" />
    Round the corners of full sheets. Only partial sheets should be rounded.
  </Group>
</TwoCol>

## Accessibility

- Always include a grabber for partial sheets, it aides in resizability but is also tab-accessible and usable with non-touch inputs like keyboard or switch controls.
- The accessibility role for a Sheet is "bottom sheet." When a Sheet is triggered and focus is moved to the first element in it, a screen reader will announce "bottom sheet" due to its role.
  
People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](hhttps://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="940" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34356%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A35498%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
</Group>

<Group>
**Full sheet**
1. Sheet container
2. Close icon button
3. Header/Sheet title
4. Navigation icon button or button
5. Composable content area 
6. Composable footer
</Group>
</TwoCol>

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34240%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
</Group>
<Group>
**Partial sheet**
1. Sheet container
2. Grabber
3. Close icon button
4. Header/Sheet title
5. Navigation icon button or button
6. Composable content area 
7. Composable footer
8. (Optional) Scrim wash
</Group>
</TwoCol>

## Variants

### Size

Sheets are available in two sizes.

1. **Partial sheet**
   The content of a partial sheet should align with the primary screen content. Partial Sheet includes a background wash that enables the user to view the content behind, but not interact with it. Partial sheets are flexible and can vary in height. Users can tap outside of the Sheet to dismiss.
2. **Full sheet**
   A full sheet does not directly relate to the primary screen. The full Sheet occupies the entire viewport’s full height and must be closed to access underlying content. 

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34025%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A35799%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>
</TwoCol>
<br/>

### Scrolling
Both partial and full sheet content can be vertically scrolled when it’s content exceeds the initial viewable height, independent of the rest of the screen’s content.
<br/>

### Header
The Sheet header has a flexible configuration and can utilize several navigation actions. To improve accessibility, it is advised to use at least two different navigation elements per sheet. Below are header elements and navigation options. 

1. **Required title**
  The header title is required, however it can be either center-aligned or start-aligned.
  
2. **Optional subheader**
   You may add a subheader, though it is not required.

3. **Close**
   To close a sheet, use an icon button in the top left corner with the “close” icon.

4. **Back and forward**
   On Android, to return to a previous screen, use an icon button in the top left corner with a “directional-arrow-left” icon. To move to a new screen in the Shee, use an icon button in the top right corner with a "directional-arrow-right" icon. 

5. **Button**
   An inline Button is available for a variety of purposes, back, close, next, save, etc. However we advise caution when using due to potential localization issues. 

6. **Grabber**
   A Grabber is a short gray line at the top of the sheet that tells the user that the sheet can be dragged to either collapse of expand.
<br/>

### Footer

The Sheet footer has a flexible configuration. It accepts many different kinds of components. However the recommendation is to restrict the number of actions as to not overwhelm the user. 
<br/>

### Transitions

The Sheet slides up from the bottom as the initial transition. However, transitions between sheets should follow the following patterns.

**Same Size**
If there's a transition between Sheets of the same size, the content transitions in place.

**Different Size**
If there's a transition between Sheets of different sizes or with a size set to "auto", where height adjusts to content, the initial Sheet will slide down to close and the new Sheet will slide up to open.

## Color
<iframe style={{border:0}} width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A35930%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Localization
Be sure to localize the header, body content and any footer items. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/e8/49/65/e849656ad7870ca554554a73723c0b28.png" alt="Example of a sheet that has been localized. The contents are flipped"/>

## Animation
By default, the Sheet animates up from the screen’s bottom when prompted by the user and animates down from the top when the user takes an action to exit. Visit Material Design for more information on [container motion](https://material.io/design/motion/the-motion-system.html#container-transform).

## Writing
- Don’t truncate header text. Headers should have no more than two lines of text. If they are longer than two lines, consider revising the content.
