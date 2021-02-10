// @flow strict
export const convertToSentenceCase = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
export const capitalizeFirstLetter = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
