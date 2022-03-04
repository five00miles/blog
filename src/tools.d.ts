// 内置Partial
type PartialMy<T> = {
    [K in keyof T]?: T[K];
};
// 内置Required
type RequiredMy<T> = {
    [K in keyof T]-?: T[K];
};
//内置 Readonly
type ReadonlyMy<T> = {
    readonly [K in keyof T]: T[K];
};

//内置 Pick
type PickMy<T, K extends keyof T> = {
    [P in K]: T[P];
};
//内置 Omit
type OmitMy<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
//内置 Exclude
type ExcludeMy<T, U> = T extends U ? never : T;
//内置 Extract
type ExtractMy<T, U> = T extends U ? T : never;
//内置Record
// K extends keyof any 约束K必须为联合类型
type RecordMy<K extends keyof any, T> = {
    [P in K]: T;
};
