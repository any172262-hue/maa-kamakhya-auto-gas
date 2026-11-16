import { calculateFuelCosts } from '../utils/calculator.js';
import { formatINR, formatDistance } from '../utils/formatCurrency.js';

export function generateQuoteSummary({
  distance,
  petrolPrice,
  cngPrice,
  petrolMileage,
  cngMileage
}) {
  const calculations = calculateFuelCosts({
    distance,
    petrolPrice,
    cngPrice,
    petrolMileage,
    cngMileage
  });

  const formattedSummary = `I calculated my estimated fuel costs for ${formatDistance(distance)}/month. Estimated monthly savings: ${formatINR(calculations.monthlySavings)} (${formatINR(calculations.annualSavings)}/year). Please advise on kit options for my car.`;

  return {
    ...calculations,
    formattedSummary
  };
}
