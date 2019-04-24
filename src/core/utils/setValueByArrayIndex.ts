export default function setValueByArrayIndex<T = any>(
  array: T[],
  index: keyof typeof array,
  value: T
) {
  const result = [...array];

  result[index] = value;

  return result as typeof array;
}
