export const isValidILId = (testId: string) => {
  const id = String(testId).trim();

  if (id.length > 9 || id.length < 5 || isNaN(parseInt(id))) return false;

  const paddedId = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(paddedId, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
};

export const isClassIdValid = (classId: string) => {
  const intId = parseInt(classId);

  if (intId < 0 || isNaN(intId)) return false;

  const first = classId.charAt(0);

  return first ? parseInt(first) != 0 : false;
};
