---
title: Toast (in Markdown)
description: Toasts are brief and small messages that overlay content, but do not block the user’s flow.
fullwidth: true
---

<br/>

<Code cardSize="lg" showCode={false} marginBottom="default">
  {`<Box
    column={6}
    height={30}
    color="red"
    display="inlineBlock"
    borderStyle="sm"
  >Example Toast</Box>`}
</Code>

Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral. They either

- Acknowledge that a user has performed an action or completed a task,
- Provide quick recommendations, or
- Alert users of system processes

Toasts do not require user action.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653627985122_example.png)

## Props

[**Engineering]\*\*

| **Name**       | **Type and description**                                                                                                                                                                                                                                                                                                                                  | **Default** |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| children ︎ ☑️  | React.Node<br/><br/>The anchor element, usually [IconButton](https://gestalt.netlify.app/IconButton), that triggers Tooltip on hover or focus                                                                                                                                                                                                             | —           |
| text ☑️        | string<br/><br/>The text shown in Tooltip to describe its anchor element. See [localization](https://paper.dropbox.com/doc/Gestalt-doc-Tooltip--BE7xVjvcqwuHV_F3fh0TGl9KAg-imk5BtbSJEiYNC8MkDbFX#:uid=962892557495396266998072&h2=Localization) to learn more.                                                                                            | —           |
| idealDirection | "up"                                                                                                                                                                                                                                                                                                                                                      | "right"     | "down" | "left"<br/><br/>Specifies the preferred position of Tooltip relative to its anchor element. See the [ideal direction](https://paper.dropbox.com/doc/Gestalt-doc-Tooltip--BE7xVjvcqwuHV_F3fh0TGl9KAg-imk5BtbSJEiYNC8MkDbFX#:uid=993956429708524289579414&h2=Ideal-direction) variant to learn more. | "down" |
| inline         | boolean<br/><br/>Properly positions Tooltip relative to an inline element, such as [IconButton](https://gestalt.netlify.app/IconButton) using the `inline` property. See the [inline](https://paper.dropbox.com/doc/Gestalt-doc-Tooltip--BE7xVjvcqwuHV_F3fh0TGl9KAg-imk5BtbSJEiYNC8MkDbFX#:uid=079946403789622876164915&h2=Inline) variant to learn more. | false       |
| link           | React.Node<br/><br/>Displays a link at the bottom of Tooltip. See the [link](https://paper.dropbox.com/doc/Gestalt-doc-Tooltip--BE7xVjvcqwuHV_F3fh0TGl9KAg-imk5BtbSJEiYNC8MkDbFX#:uid=811575587954291886412634&h2=Link) variant to learn more.                                                                                                            | —           |
| zIndex         | interface Indexable <br/><br/>Specifies the stacking order of Tooltip along the z-axis in the current stacking context. See the [z-index](https://paper.dropbox.com/doc/Gestalt-doc-Tooltip--BE7xVjvcqwuHV_F3fh0TGl9KAg-imk5BtbSJEiYNC8MkDbFX#:uid=874538938944790949026172&h2=Z-index) variant to learn more.                                            | —           |

### Usage guidelines

<TwoCol>

<Group>
 <Do title="When to Use" />
- Briefly acknowledging a user action without interrupting their flow
- Nudging a user towards a better solution after completing a task
- For system processes like showing that a process is loading, or when there are internet connectivity user.
</Group>

<Group>
<Dont title="When not to Use" />
- When, due to an error, a user can’t even continue performing basic tasks like browsing already loaded Pins. Use AlertModal instead.
- When asking a user to confirm that they want to perform an action. Use AlertModal instead
- When you want to suggest a user spend more money or try new features; use Upsell instead.
- For errors that relate to a specific section or page. Use Callout or SlimBanner instead.
- To guide or educate the user. Use Popover or Tooltip instead.
</Group>
</TwoCol>
## Best practices
| ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654209255877_Do-1.png) | ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654020764627_Dont-1.png) |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Do**  place Toasts out of the way so that a user can still navigate and complete tasks                                             | **Don’t** block navigation controls with Toasts                                                                                        |

| ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654021773739_Do-2.png) | ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654021850012_Dont-2.png) |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Do** show one Toast at a time, with errors and Acknowledgements taking priority                                                    | **Don’t** **stack multiple toasts as that will block the user.**                                                                       |

| ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654024729999_Do-3.png) | ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654024738495_Dont-3.png) |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Do** use concise text to avoid blocking the user with a large toast                                                                | **Don’t** \*\*\*\*be wordy so that toasts increase in size, block content and disappear before a user can finish reading them.         |

| ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654024922196_Do-4.png) | ![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654024933754_Dont-4.png) |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Do** make action optional.                                                                                                         | **Don’t** \*\*\*\*require user action. If you need user action, use an AlertModal or Callout instead.                                  |

## Accessibility

### Icons

`iconAccessibilityLabel` requires a short, descriptive label for screen readers. This label should communicate the intent of the icon, such as "Success", “Error”, “Link”. They should also be localized.

## Localization

Be sure to localize `text` and `accessibilityLabel`. Note that localization can lengthen text by 20 to 30 percent.

## Variants

### Acknowledgement

These are toasts that acknowledge a user action or task-completion. They are user-triggered and ephemeral. On desktop, they can be dismissed via an iconButton; on mobile web, via swiping left or right.

**Neutral**
A simple, generic acknowledgment for things like switching accounts. These are not actionable.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653624156161_neutral.png)

**Success**
With an icon that denotes a more important change, like a password update. These are not actionable.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653625618773_success.png)

**Image**
With an image for Pin or Board actions. An optional link to the Pin or Board can be included. When there’s a link on mWeb, the entire toast is tapable, using tapArea.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653626350701_pin.png)

**Avatar**
With an Avatar for Profile or Pinner-related messaging. An optional link be included. When there’s a link on mWeb, the entire toast is tapable, using tapArea.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653626460323_avatar.png)

### Encouragement

These are toasts that appear after a user action and recommend further action to improve their experience. These can be dismissed like Acknowledgement Toasts, but also include a button for further action. On mWeb, the button turns into an icon button that can either be an arrow or an edit icon. They are different from Upsells, since they aren’t marketing new features or asking the user to increase ad spend.

**With icon**
For generic encouragements not associated with Pins or Boards

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654033692103_icon.png)

**With image**
For Pin, Board, or Ad-related encouragements.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654023706501_image.png)

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654024096593_icon-button.png)

### Processing

A toast with a loading spinner or other progress indicator that disappears once the process is complete.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1653627015303_progress.png)

### Error

Used rarely for connection issues or unknown errors where we don’t want to completely block the users flow, but want the message to persist if the user goes to another surface. These are the only toasts that are not dismissible by the user. Error toasts stay on-screen until the error is resolved. Usually for connectivity issues.

![](https://paper-attachments.dropbox.com/s_58A703E4A66BE4CCF63D4C76A23E3DDC94D7D8A710020A9073AA3785D1706648_1654213345398_error.png)

## Placement

Placement of Toasts depends on their functionality.

### Desktop

**Opposite of main navigation**
All toasts always appear at the bottom of the screen, opposite of the main navigation.

https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A2554

[https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A2554](https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A2554)

### Mobile web

**Above bottom nav bar**
For Recommendation Toasts where we want to make it easier for the user to tap.

https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A3778

## Duration and timing

Toasts should be on screen for 5s; this gives most people enough time to read and act. Please note that a separate Toast manager must be implemented in order to handle duration and animation.

Once a toast is triggered, allow for a cooldown period of about 7 seconds before the toast can be triggered again. This will prevent multiple toasts from appearing.

## Writing

| **D\*\***o**<br/><br/>- Consider internationalization and how other languages may be take up more space<br/>- Be brief and concise<br/>- Use conversational language | **Don’t\*\*<br/><br/>- Use lengthy, technical jargon or local idioms that will be hard to translate to other languages |

## Related

### Alert Modal

An AlertModal is a simple modal dialog used to alert a user of an issue, or to request confirmation after a user-generated action. AlertModal overlays and blocks Page content until it is dismissed by the user.

### Generic modal

A generic, customizable container for modals that aren’t used as alerts or acknowledgements and need more functionality like form fields.

### Popover

Popovers are used to educate users about a particular element on the screen, like a button or new UI control.

### Tooltip

Tooltip provides helpful information regarding an interactive UI element, typically an Iconbutton. It is displayed on hover of a UI element, and disappears on mouse out.

### Upsell

Upsell banners are used for paid upgrades, free trials, or marketing promotions.

### Callout

Callouts are used at the top-most level of a page to communicate highest-priority information that applies to the entire page or surface. Callouts can be dismissed and are also actionable.

---

## Design system reference

[Material Design Snackbars](https://material.io/components/snackbars)
[Adobe spectrum toasts](https://spectrum.adobe.com/page/toast/)

## Pending issues and questions

### Accessibility

Is there an image accessibility label or note to consider, like “role”?

### Competitive research

Quick look at our competitors like Instagram and TikTok show:

- Tapable toast colors match color mode—light on light, black on black
- Tapable toasts sit opposite the bottom navigation
- Basic acknowledgement toast sit above the bottom navigation
- On instagram, acknowledgements (not tappable) are either black or green

https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A1844

[https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A1844](https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=62%3A1844)

### Corner-radius

I’m sticking with our current 16px radius, and I personally like the roundiness; it makes them look different from other apps and feels very Pinteresty. But, am not opposed to tighter radius to make toasts different from other controls like text fields.

### Naming

Since on Android they’re called “snackbars” and there is no native equivalent for iOS HIG, it’s possible that we can call these snackbars to make it easy to switch in the docs.

### Current experiments

There are some existing behaviors to iron out on iOS and mWeb:

https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=21%3A612

[https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=21%3A612](https://www.figma.com/file/rVnMTnlB64QbKrF5c6KjUl/Gestalt-Toast-Design?node-id=21%3A612)

Latest experiment on getting users to save to a board instead of profile, shows light toasts performing better on iOS for both light and dark mode. **Do we make “recommendation” toasts on mWeb light? TBD.**
