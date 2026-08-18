export function makeRequestId(prefix = "AMG") {
  const n = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${n}`;
}
