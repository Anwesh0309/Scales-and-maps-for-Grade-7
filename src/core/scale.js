import { Q } from './rational.js';

export const UNIT_MM = {
  mm: 1n,
  cm: 10n,
  m: 1000n,
  km: 1000000n
};

export const UNIT_MM2 = {
  mm2: 1n,
  cm2: 100n,
  m2: 1000000n,
  km2: 1000000000000n,
  ha: 10000000000n
};

export const toMm = (val, unit = 'cm') => {
  return Q.of(val).mul(new Q(UNIT_MM[unit] || 10n));
};

export const fromMm = (mm, unit = 'km') => {
  return Q.of(mm).div(new Q(UNIT_MM[unit] || 1000000n));
};

/**
 * Map length to real ground distance
 * @param {number|string|Q} mapVal - length on map
 * @param {string} mapUnit - 'cm' or 'mm'
 * @param {number|bigint} n - scale ratio denominator (e.g. 50 000)
 * @param {string} outUnit - 'm' or 'km'
 */
export function mapToReal(mapVal, mapUnit, n, outUnit = 'km') {
  const mapMm = toMm(mapVal, mapUnit);
  const realMm = mapMm.mul(Q.of(n));
  return fromMm(realMm, outUnit);
}

/**
 * Real ground distance to map length
 * @param {number|string|Q} realVal - real distance
 * @param {string} realUnit - 'km' or 'm'
 * @param {number|bigint} n - scale ratio denominator
 * @param {string} outUnit - 'cm' or 'mm'
 */
export function realToMap(realVal, realUnit, n, outUnit = 'cm') {
  const realMm = toMm(realVal, realUnit);
  const mapMm = realMm.div(Q.of(n));
  return fromMm(mapMm, outUnit);
}

/**
 * Calculate n from words, e.g. 1 cm : 500 m -> n = 50 000
 */
export function nFromWords(mapVal, mapUnit, realVal, realUnit) {
  const realMm = toMm(realVal, realUnit);
  const mapMm = toMm(mapVal, mapUnit);
  return realMm.div(mapMm).toNumber();
}

/**
 * Area map to real: multiply by n²
 * @param {number|string|Q} mapArea - e.g. in cm²
 * @param {number|bigint} n - linear scale factor (e.g. 50 000)
 * 1 cm : 50 000 cm = 1 cm : 0.5 km
 * 1 cm² = (0.5 km)² = 0.25 km²
 */
export function areaMapToReal(mapAreaCm2, kmPerCm) {
  // If 1 cm = kmPerCm kilometres, then 1 cm² = (kmPerCm)² km²
  const factor = Q.of(kmPerCm).mul(Q.of(kmPerCm));
  return Q.of(mapAreaCm2).mul(factor);
}

export function areaRealToMap(realAreaKm2, kmPerCm) {
  const factor = Q.of(kmPerCm).mul(Q.of(kmPerCm));
  return Q.of(realAreaKm2).div(factor);
}

/**
 * Photocopy enlargement / reduction:
 * p is percentage (e.g. 200 means 200%).
 * Scale ratio denominator n becomes n ÷ (p/100)
 */
export function nAfterPhotocopy(n, percent) {
  return Math.round(n / (percent / 100));
}
