/*
  Shared types among text components (Text, Heading)
*/
export type Align =
  | "start"
  | "end"
  | "center"
  | "justify"
  | "forceLeft"
  | "forceRight";
export const allowedColors = [
  "blue",
  "darkGray",
  "eggplant",
  "gray",
  "green",
  "lightGray",
  "maroon",
  "midnight",
  "navy",
  "olive",
  "orange",
  "orchid",
  "pine",
  "purple",
  "red",
  "watermelon",
  "white",
];
export type Color =
  | "blue"
  | "darkGray"
  | "eggplant"
  | "gray"
  | "green"
  | "lightGray"
  | "maroon"
  | "midnight"
  | "navy"
  | "olive"
  | "orange"
  | "orchid"
  | "pine"
  | "purple"
  | "red"
  | "watermelon"
  | "white";
export type FontWeight = "bold" | "normal";