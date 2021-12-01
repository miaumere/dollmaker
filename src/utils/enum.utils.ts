function GetEnumValues<T>(obj: T) {
  return (Object.keys(obj) as Array<keyof T>).filter(
    (value) => !!isNaN(Number(value))
  );
}

export const Enum = {
  GetEnumValues,
};
