function numberToUnit(value) {
  const base = 1000;

  if (value < base) {
    return value;
  }

  return `${(value / base).toFixed(1)}k`;
}
hexo.extend.helper.register("numberToUnit", numberToUnit);
