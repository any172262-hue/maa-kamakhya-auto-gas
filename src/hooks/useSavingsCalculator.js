import { useState, useMemo } from 'react';
import { calculateFuelCosts, VEHICLE_PRESETS } from '../utils/calculator';

export function useSavingsCalculator(initialValues = {}) {
  const [distance, setDistance] = useState(initialValues.distance ?? 5000);
  const [petrolPrice, setPetrolPrice] = useState(initialValues.petrolPrice ?? 107);
  const [cngPrice, setCngPrice] = useState(initialValues.cngPrice ?? 91);
  const [petrolMileage, setPetrolMileage] = useState(initialValues.petrolMileage ?? 15);
  const [cngMileage, setCngMileage] = useState(initialValues.cngMileage ?? 27);
  const [activePreset, setActivePreset] = useState('commercial');

  const results = useMemo(() => {
    return calculateFuelCosts({
      distance,
      petrolPrice,
      cngPrice,
      petrolMileage,
      cngMileage
    });
  }, [distance, petrolPrice, cngPrice, petrolMileage, cngMileage]);

  const handleDistanceChange = (val) => {
    const num = Math.max(100, Math.min(25000, Number(val) || 0));
    setDistance(num);
  };

  const handlePetrolPriceChange = (val) => {
    const num = Math.max(1, Math.min(300, Number(val) || 0));
    setPetrolPrice(num);
  };

  const handleCngPriceChange = (val) => {
    const num = Math.max(1, Math.min(300, Number(val) || 0));
    setCngPrice(num);
  };

  const handlePetrolMileageChange = (val) => {
    const num = Math.max(1, Math.min(100, Number(val) || 1));
    setPetrolMileage(num);
    setActivePreset('custom');
  };

  const handleCngMileageChange = (val) => {
    const num = Math.max(1, Math.min(100, Number(val) || 1));
    setCngMileage(num);
    setActivePreset('custom');
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setDistance(preset.distance);
    setPetrolMileage(preset.petrolMileage);
    setCngMileage(preset.cngMileage);
  };

  const resetDefaults = () => {
    setActivePreset('commercial');
    setDistance(5000);
    setPetrolPrice(107);
    setCngPrice(91);
    setPetrolMileage(15);
    setCngMileage(27);
  };

  return {
    distance,
    petrolPrice,
    cngPrice,
    petrolMileage,
    cngMileage,
    activePreset,
    applyPreset,
    presets: VEHICLE_PRESETS,
    setDistance: handleDistanceChange,
    setPetrolPrice: handlePetrolPriceChange,
    setCngPrice: handleCngPriceChange,
    setPetrolMileage: handlePetrolMileageChange,
    setCngMileage: handleCngMileageChange,
    resetDefaults,
    ...results
  };
}
