/**
 * Preset vehicle profiles for quick calculation
 */
export const VEHICLE_PRESETS = [
  {
    id: 'commercial',
    label: 'Taxi / Commercial Cab',
    sublabel: 'High running (Dzire, Aura, Fleet)',
    distance: 5000,
    petrolMileage: 15,
    cngMileage: 27
  },
  {
    id: 'daily',
    label: 'Daily Office Commute',
    sublabel: 'City car (Swift, i10, Alto, Baleno)',
    distance: 1500,
    petrolMileage: 16,
    cngMileage: 26
  },
  {
    id: 'highway',
    label: 'Intercity / Regular Run',
    sublabel: 'Mixed city & highway usage',
    distance: 3000,
    petrolMileage: 17,
    cngMileage: 28
  },
  {
    id: 'delivery',
    label: 'High-Run Fleet / Delivery',
    sublabel: 'Intensive commercial driving',
    distance: 8000,
    petrolMileage: 14,
    cngMileage: 25
  }
];

/**
 * Calculates fuel running costs and potential savings.
 * 
 * Formulas:
 * Petrol cost = Monthly distance / Petrol mileage * Petrol price
 * CNG cost = Monthly distance / CNG mileage * CNG price
 * Estimated savings = Petrol cost - CNG cost
 */
export function calculateFuelCosts({
  distance = 5000,
  petrolPrice = 107,
  cngPrice = 91,
  petrolMileage = 15,
  cngMileage = 27
}) {
  const dist = Math.max(0, Number(distance) || 0);
  const pPrice = Math.max(0, Number(petrolPrice) || 0);
  const cPrice = Math.max(0, Number(cngPrice) || 0);
  const pMileage = Math.max(0.1, Number(petrolMileage) || 0.1);
  const cMileage = Math.max(0.1, Number(cngMileage) || 0.1);

  const petrolCost = Math.round((dist / pMileage) * pPrice);
  const cngCost = Math.round((dist / cMileage) * cPrice);
  const monthlySavings = Math.max(0, petrolCost - cngCost);
  const annualSavings = monthlySavings * 12;

  const percentageSaved = petrolCost > 0 
    ? Math.round((monthlySavings / petrolCost) * 100) 
    : 0;

  const petrolCostPerKm = Number((pPrice / pMileage).toFixed(2));
  const cngCostPerKm = Number((cPrice / cMileage).toFixed(2));
  const savingsPerKm = Math.max(0, Number((petrolCostPerKm - cngCostPerKm).toFixed(2)));
  const paybackMonths = monthlySavings > 0 ? Math.max(1, Math.round(48000 / monthlySavings)) : 0;

  return {
    petrolCost,
    cngCost,
    monthlySavings,
    annualSavings,
    percentageSaved,
    petrolCostPerKm,
    cngCostPerKm,
    savingsPerKm,
    paybackMonths
  };
}
