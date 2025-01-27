export default interface ContestTypesType {
  berry_flavor: Berryflavor;
  id: number;
  name: string;
  names: Name[];
}

interface Name {
  color: string;
  language: Berryflavor;
  name: string;
}

interface Berryflavor {
  name: string;
  url: string;
}
