import type { Motorcycle, MotorcycleSection } from '../types/motorcycle';

export function groupByCategory(motorcycles: Motorcycle[]): MotorcycleSection[] {
  const groups = new Map<string, Motorcycle[]>();

  for (const moto of motorcycles) {
    const group = groups.get(moto.category);
    if (group) {
      group.push(moto);
    } else {
      groups.set(moto.category, [moto]);
    }
  }

  return Array.from(groups, ([title, data]) => ({ title, data })).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}
