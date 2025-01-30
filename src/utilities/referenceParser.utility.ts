export default function referenceParserUtility(data: string) {
  return data
    .split("-")
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");
}
