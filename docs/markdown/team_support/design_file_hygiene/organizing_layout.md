---
title: Organizing layout
description: Instructions on how to organize layout and containers.
fullwidth: true
---

Here are some tips on using groups, frames, and sections to organize design system Figma files. 
Creating a well-structured Figma file template makes it easy for collaborators and viewers of the systems file to navigate and quickly find what they need.

## Groups
Groups allow you to combine multiple elements together as a single top level layer. A group's bounds are determined by its child elements, so resizing or moving those elements will cause the group's bounds to adjust automatically.
<TwoCol>
  <Group>
    <Do title="Do" />
      - Use groups if the elements inside your group aren't reusable accross your file.
      - The elements inside the group don't need auto-layout and resizing properties.  
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use groups if you need to set auto-layout and constraints, and make elements dynamic. 
  </Group>
</TwoCol>
Learn more about [Figma groups](https://www.figma.com/best-practices/groups-versus-frames/?fuid=982037494021279625) and how to set up them.

## Frames
Frames allow you to create dynamic layouts on Figma. Differently from Groups, frame sizes are set independently from their child elements. When repositioning or scaling child elements inside a frame, its bounds will not auto-adjust. 
**We always use Frames to construct our Gestalt components.**
<TwoCol>
  <Group>
    <Do title="Do" />
      - Use frames to construct components or any reusable assets.
      - To control padding, margins, and spaces.          
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use frames if you don't need dynamic controls and your elements aren't reusable acrros your file. 
  </Group>
</TwoCol>
Learn more about [Figma frames](https://www.figma.com/best-practices/groups-versus-frames/frames/) and tricks to get up to speed.

## Sections
Sections allow you to organize your canvas by adding labels, and to guide collaborators through your file.
Use Sections for organizing information inside your pages and layouts. They work as layer types allowing to add and organize other artboards inside. **Please note**: Cannot be contained within frames or groups. 
<TwoCol>
  <Group>
    <Do title="Do" />
      - Use sections to organize your canvas by adding labels to specific part of your design.       
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use sections to replace groups or frames. 
  </Group>
</TwoCol>

Learn more about [(Figma Sections)](https://help.figma.com/hc/en-us/articles/9771500257687-Organize-your-canvas-with-sections) and its best practices.



