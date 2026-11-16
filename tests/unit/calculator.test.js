import { calculateFuelCosts } from '../../src/utils/calculator.js';

export function runCalculatorUnitTests() {
  console.log('  ▶ [Unit] Testing calculateFuelCosts():');

  // Baseline scenario from screenshot: 5000 km, 107 ₹/L, 91 ₹/kg, 15 km/L, 27 km/kg
  const baseline = calculateFuelCosts({
    distance: 5000,
    petrolPrice: 107,
    cngPrice: 91,
    petrolMileage: 15,
    cngMileage: 27
  });

  if (baseline.petrolCost !== 35667) throw new Error(`Expected petrolCost 35667, got ${baseline.petrolCost}`);
  if (baseline.cngCost !== 16852) throw new Error(`Expected cngCost 16852, got ${baseline.cngCost}`);
  if (baseline.monthlySavings !== 18815) throw new Error(`Expected monthlySavings 18815, got ${baseline.monthlySavings}`);
  if (baseline.annualSavings !== 18815 * 12) throw new Error(`Expected annualSavings ${18815 * 12}, got ${baseline.annualSavings}`);
  if (baseline.percentageSaved !== 53) throw new Error(`Expected percentageSaved 53%, got ${baseline.percentageSaved}`);

  // Edge cases
  const zeroDist = calculateFuelCosts({ distance: 0 });
  if (zeroDist.monthlySavings !== 0) throw new Error('Zero distance should yield 0 savings');

  const negDist = calculateFuelCosts({ distance: -100, petrolPrice: -50 });
  if (negDist.petrolCost !== 0 || isNaN(negDist.petrolCost)) throw new Error('Negative distance/price should not yield NaN');

  const zeroMileage = calculateFuelCosts({ distance: 1000, petrolMileage: 0, cngMileage: 0 });
  if (!isFinite(zeroMileage.petrolCost) || isNaN(zeroMileage.petrolCost)) throw new Error('Zero mileage should not yield Infinity or NaN');

  console.log('    ✓ All calculator unit tests passed.');
}
