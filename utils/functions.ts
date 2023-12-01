export const excerpt = (str: string, len: number) => {
  if (str.length > len) {
    const result = str.substring(0, len);
    return result + "...";
  }
  return str;
};
