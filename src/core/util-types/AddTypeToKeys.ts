export type AddTypeToKeys<T, Extra> = { [P in keyof T]: T[P] & Extra };
