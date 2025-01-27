export default interface VersionType {
  id: number;
  name: string;
  names: Name[];
  version_group: Reference;
}

interface Name {
  language: Reference;
  name: string;
}

interface Reference {
  name: string;
  url: string;
}
