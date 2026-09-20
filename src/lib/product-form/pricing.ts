const AMOUNT_PATTERN = /^\d+([.,]\d{0,2})?$/;

/** Accepts `12`, `12.5`, `12,50`; returns null for anything else (including ""). */
export function parseAmount(raw: string): number | null {
  const value = raw.trim();
  if (!AMOUNT_PATTERN.test(value)) return null;
  return Number(value.replace(",", "."));
}

export function isValidAmount(raw: string) {
  return parseAmount(raw) !== null;
}

export function toMinorUnits(value: number) {
  return Math.round(value * 100);
}

/** Returns "" when `net` is not a parseable amount. */
export function grossFromNet(net: string, vatRate: string) {
  return convertAmount(net, (amount) => amount * vatMultiplier(vatRate));
}

/** Returns "" when `gross` is not a parseable amount. */
export function netFromGross(gross: string, vatRate: string) {
  return convertAmount(gross, (amount) => amount / vatMultiplier(vatRate));
}

function vatMultiplier(vatRate: string) {
  return 1 + Number(vatRate) / 100;
}

function convertAmount(source: string, convert: (amount: number) => number) {
  const amount = parseAmount(source);
  return amount === null ? "" : roundMoney(convert(amount)).toFixed(2);
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
