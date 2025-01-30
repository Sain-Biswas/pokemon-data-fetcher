export default function textFormatterUtility(data: string) {
  return data
    .replaceAll(/\n/g, " ")
    .replaceAll(/\"/g, " ")
    .replaceAll(/\f/g, " ");
}
