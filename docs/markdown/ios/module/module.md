---
title: Module
description: Module is a semi-modular container used to house Module.Header and a variant of the available preview blocks. Every Module must at least have a title and a variant of a preview block.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/fb/df/a0/fbdfa01750ca4951fde9da763052c9de.png" alt="Example of a Module container with an area to show where images are placed." noPadding color="background-elevation-accent"/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- Previewing information about recommended content (e.g. Pin feed, boards, profiles, topics, etc) that also serves as an entry point to a destination containing the content

</Group>
<Group>
<Dont title="When not to use" />
- Module does not link to a destination
- The information and content contained within Module are not related
- The contents of Module are not the approved subcomponents (e.g. Module.Header and preview blocks(s))
</Group>
</TwoCol>

## Best practices

<TwoCol>
<Group>
<Do title="Do"/>
Keep Module content clear and concise. Modules are designed to focus on the imagery. Any content should be short and easily digestible.

</Group>
<Group>
<Dont title="Don't" />
Use too much content and overload Module. Consider if the content should live on the page instead.
</Group>

<Group>
<Do title="Do"/>
Use built-in Module dimensions and appropriate spacing between Modules. This ensures consistency and a visual rhythm.

</Group>
<Group>
<Dont title="Don't" />
Resize Module. It is designed to adapt to the full width of a mobile screen.
</Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

- When creating a tab order in Module, Module.Header always comes before the preview block so screen-reader users get context before proceeding to the preview block alt tags.
- If Module itself is selectable, do not put other links inside it.
- Avoid wrapping an entire Module in an anchor tag as this can be a difficult experience for a screen reader user. Instead, have a single anchor tag inside Module, and have the tappable area of this anchor tag wrap the Module.

## Design tokens

Use these tokens for applying size and color styles to Module.

<br/>

<iframe style={{border:0}} width="100%" height="450" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-3271&embed-host=share" allowfullscreen></iframe>

## Anatomy

<iframe style={{border:0}} width="100%" height="450" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-2901&embed-host=share" allowFullScreen></iframe>

### 1. Module

Module is a container that holds Module.Header and preview blocks by creating a consistent background and padding. The container uses the default background color and includes 8pt padding on the left and right.

### 2. Header (subcomponent)

Module.Header sits at the top, inside of Module container. It is a required subcomponent that includes pre-text, a title and navigational elements. Module.Header should always, at the very least, include a title.

### 3. Preview block (subcomponent)

The preview block is a container that sits below Module’s Module.Header. It holds a number of visual preview variations of Pinterest content. As they are designed and unified, more preview block content types will become available.

The current preview block content types are:

- Pin Feed (Montage)
- Scrolling Pins
- Boards

## Variants

Module is a container that holds Module.Header and preview blocks. Module itself does not have any variants. However, the specs and dark mode are illustrated below.

<iframe style={{border:0}} width="100%" height="360" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-3125&embed-host=share" allowFullScreen></iframe>

### Dark mode

<iframe style={{border:0}} width="100%" height="360" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-3198&embed-host=share" allowFullScreen></iframe>

## Writing

<TwoCol>
<Group>
<Do title="Do" />
- Keep the content concise. Convey the most important information about the content in a few words.
- Provide context to the user. The user should know what they can expect to find within a Module by reading Module.Header and pre-text.

</Group>

<Group>
<Dont title="Don't" />
- Use jargon or technical terms that may not be familiar to users.
- Use pre-text as helper text. It should give additional context, but should not be an in-depth explanation of Module's context.

</Group>
</TwoCol>

## Localization

Be sure to localize text. Note that localization can lengthen text by 20 to 30 percent.

When in RTL mode, Module layout will be arranged from right to left. This means that navigation, menus and content will be mirrored to maintain consistency.
<br/>

<ImgContainer src="https://i.pinimg.com/originals/72/5b/a2/725ba2ed0fb57e5b7ae9aded6a4c4bf7.png" alt="Module with Module.Header, menus and image conntent flipped for RTL languages." noPadding color="background-elevation-accent" />
