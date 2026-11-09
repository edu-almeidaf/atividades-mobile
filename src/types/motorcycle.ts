export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
}

export interface MotorcycleSection {
  title: string;
  data: Motorcycle[];
}
