import React from 'react';
import { 
  Calculator, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  Sparkles, 
  Car, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import { useSavingsCalculator } from '../hooks/useSavingsCalculator';
import { formatINR, formatDistance } from '../utils/formatCurrency';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';
import Button from '../components/Button';

export default function SavingsCalculator({ onApplyEstimate }) {
  const { t } = useLanguage();
  const {
    distance,
    petrolPrice,
    cngPrice,
    petrolMileage,
    cngMileage,
    activePreset,
    applyPreset,
    presets,
    setDistance,
    setPetrolPrice,
    setCngPrice,
    setPetrolMileage,
    setCngMileage,
    resetDefaults,
    petrolCost,
    cngCost,
    monthlySavings,
    annualSavings,
    percentageSaved,
    petrolCostPerKm,
    cngCostPerKm,
    savingsPerKm,
    paybackMonths
  } = useSavingsCalculator();

  const handleApplyToForm = () => {
    const summaryText = `I ran the savings calculator for ${formatDistance(distance)}/month. Estimated monthly saving is ${formatINR(monthlySavings)} (${formatINR(annualSavings)}/year, ₹${savingsPerKm}/km saved). Please advise on kit options for my car.`;
    if (onApplyEstimate) {
      onApplyEstimate(summaryText);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPresetLabel = (preset) => {
    switch (preset.id) {
      case 'commercial':
      case 'taxi':
        return t('calculator.presetTaxi', {}, preset.label);
      case 'daily':
      case 'commuter':
        return t('calculator.presetCommute', {}, preset.label);
      case 'highway':
      case 'intercity':
        return t('calculator.presetIntercity', {}, preset.label);
      case 'delivery':
      case 'fleet':
        return t('calculator.presetFleet', {}, preset.label);
      default:
        return preset.label;
    }
  };

  const getPresetSublabel = (preset) => {
    switch (preset.id) {
      case 'commercial':
      case 'taxi':
        return t('calculator.presetTaxiSub', {}, preset.sublabel);
      case 'daily':
      case 'commuter':
        return t('calculator.presetCommuteSub', {}, preset.sublabel);
      case 'highway':
      case 'intercity':
        return t('calculator.presetIntercitySub', {}, preset.sublabel);
      case 'delivery':
      case 'fleet':
        return t('calculator.presetFleetSub', {}, preset.sublabel);
      default:
        return preset.sublabel;
    }
  };

  const quickDistances = [1500, 3000, 5000, 8000, 10000];

  // Ratio for the animated comparison bar
  const cngBarWidth = petrolCost > 0 
    ? Math.max(12, Math.min(100, Math.round((cngCost / petrolCost) * 100))) 
    : 45;

  return (
    <section id="calculator" className="section section-navy calculator-section">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('calculator.tagline', {}, 'ESTIMATE YOUR RUNNING COST')}
            title={t('calculator.title', {}, 'Petrol vs CNG')}
            highlight={t('calculator.titleHighlight', {}, 'Savings Calculator.')}
            description={t('calculator.description', {}, 'Select your driving profile or enter custom mileage to see your exact monthly savings, per-kilometer cost difference, and investment payback timeline.')}
          />
        </RevealAnimation>

        {/* Preset Driving Profile Selector */}
        <RevealAnimation delay={1}>
          <div className="calc-presets-bar">
            <span className="calc-presets-label">
              <Car size={16} className="text-yellow" />
              <span>{t('calculator.selectProfile', {}, 'Select Vehicle Profile:')}</span>
            </span>
            <div className="calc-presets-grid">
              {presets.map((preset) => {
                const isActive = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`calc-preset-btn ${isActive ? 'active' : ''}`}
                    aria-pressed={isActive}
                  >
                    <div className="calc-preset-content">
                      <div className="calc-preset-title-row">
                        <span className="calc-preset-name">{getPresetLabel(preset)}</span>
                        {isActive && <CheckCircle2 size={14} className="calc-preset-check" />}
                      </div>
                      <span className="calc-preset-sub">{getPresetSublabel(preset)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </RevealAnimation>

        <div className="calculator-layout-grid">
          {/* Left Side: Inputs Card */}
          <RevealAnimation delay={2}>
            <div className="card-navy calculator-inputs-card">
              <div className="calc-card-header">
                <div className="calc-header-title">
                  <Calculator size={20} className="text-yellow" />
                  <h3>{t('calculator.drivingParams', {}, 'Driving Parameters')}</h3>
                </div>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="calc-reset-btn"
                  title={t('calculator.resetDefaults', {}, 'Reset to default benchmark values')}
                  aria-label={t('calculator.resetDefaults', {}, 'Reset calculator to defaults')}
                >
                  <RotateCcw size={14} />
                  <span>{t('calculator.resetDefaults', {}, 'Reset Defaults')}</span>
                </button>
              </div>

              {/* Monthly Distance Slider */}
              <div className="calc-slider-group">
                <div className="calc-slider-header">
                  <label htmlFor="distance-slider" className="form-label">
                    {t('calculator.monthlyDistance', {}, 'Monthly distance (km)')}
                  </label>
                  <span className="calc-distance-value">
                    {formatDistance(distance)}
                  </span>
                </div>

                <div className="calc-slider-track-wrap">
                  <input
                    id="distance-slider"
                    type="range"
                    min="500"
                    max="15000"
                    step="250"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="custom-slider"
                    style={{
                      background: `linear-gradient(to right, #1677FF 0%, #1677FF ${(distance / 15000) * 100}%, rgba(255, 255, 255, 0.15) ${(distance / 15000) * 100}%, rgba(255, 255, 255, 0.15) 100%)`
                    }}
                    aria-label="Monthly distance in kilometers"
                  />
                </div>

                {/* Quick Distance Selector Pills */}
                <div className="quick-distance-pills">
                  {quickDistances.map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setDistance(km)}
                      className={`distance-pill ${Number(distance) === km ? 'active' : ''}`}
                    >
                      {km.toLocaleString('en-IN')} km
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs Grid: 2 Columns */}
              <div className="calc-inputs-2col">
                {/* Petrol Price */}
                <div className="calc-input-cell">
                  <label htmlFor="petrol-price" className="form-label">
                    {t('calculator.petrolPrice', {}, 'Petrol price (₹/L)')}
                  </label>
                  <div className="input-with-adornment input-with-prefix">
                    <span className="input-prefix" aria-hidden="true">₹</span>
                    <input
                      id="petrol-price"
                      type="number"
                      step="0.5"
                      min="70"
                      max="140"
                      value={petrolPrice}
                      onChange={(e) => setPetrolPrice(e.target.value)}
                      className="form-input"
                      placeholder="107"
                    />
                  </div>
                </div>

                {/* CNG Price */}
                <div className="calc-input-cell">
                  <label htmlFor="cng-price" className="form-label">
                    {t('calculator.cngPrice', {}, 'CNG price (₹/kg)')}
                  </label>
                  <div className="input-with-adornment input-with-prefix">
                    <span className="input-prefix" aria-hidden="true">₹</span>
                    <input
                      id="cng-price"
                      type="number"
                      step="0.5"
                      min="50"
                      max="120"
                      value={cngPrice}
                      onChange={(e) => setCngPrice(e.target.value)}
                      className="form-input"
                      placeholder="91"
                    />
                  </div>
                </div>

                {/* Petrol Mileage */}
                <div className="calc-input-cell">
                  <label htmlFor="petrol-mileage" className="form-label">
                    {t('calculator.petrolMileage', {}, 'Petrol mileage (km/L)')}
                  </label>
                  <div className="input-with-adornment input-with-suffix">
                    <input
                      id="petrol-mileage"
                      type="number"
                      step="0.5"
                      min="6"
                      max="35"
                      value={petrolMileage}
                      onChange={(e) => setPetrolMileage(e.target.value)}
                      className="form-input"
                      placeholder="15"
                    />
                    <span className="input-suffix" aria-hidden="true">km/L</span>
                  </div>
                </div>

                {/* CNG Mileage */}
                <div className="calc-input-cell">
                  <label htmlFor="cng-mileage" className="form-label">
                    {t('calculator.cngMileage', {}, 'CNG mileage (km/kg)')}
                  </label>
                  <div className="input-with-adornment input-with-suffix">
                    <input
                      id="cng-mileage"
                      type="number"
                      step="0.5"
                      min="10"
                      max="45"
                      value={cngMileage}
                      onChange={(e) => setCngMileage(e.target.value)}
                      className="form-input"
                      placeholder="27"
                    />
                    <span className="input-suffix" aria-hidden="true">km/kg</span>
                  </div>
                </div>
              </div>

              <div className="calc-helper-note">
                <CheckCircle2 size={14} className="text-yellow flex-shrink-0" />
                <span>{t('calculator.defaultRatesNote', {}, 'Default rates based on current fuel retail tariffs in Guwahati, Assam.')}</span>
              </div>
            </div>
          </RevealAnimation>

          {/* Right Side: Interactive Comparison & Savings Results */}
          <RevealAnimation delay={3}>
            <div className="card-navy calculator-results-card">
              <div className="calc-results-header">
                <div className="calc-results-tag">
                  <Sparkles size={16} className="text-yellow" />
                  <span>{t('calculator.liveEstimateTag', {}, 'LIVE ESTIMATE & COMPARISON')}</span>
                </div>
                <h3 className="calc-results-title">
                  {t('calculator.estimatedMonthlyCost', {}, 'Your estimated monthly fuel cost')}
                </h3>
              </div>

              {/* Per-KM Metric Strip */}
              <div className="calc-per-km-strip">
                <div className="per-km-item">
                  <span className="per-km-label">{t('calculator.petrolRunCost', {}, 'Petrol Run Cost')}</span>
                  <strong className="per-km-val petrol-text">₹{petrolCostPerKm}/km</strong>
                </div>
                <div className="per-km-divider"></div>
                <div className="per-km-item">
                  <span className="per-km-label">{t('calculator.cngRunCost', {}, 'CNG Run Cost')}</span>
                  <strong className="per-km-val cng-text">₹{cngCostPerKm}/km</strong>
                </div>
                <div className="per-km-divider"></div>
                <div className="per-km-item highlight">
                  <span className="per-km-label">{t('calculator.perKmSaving', {}, 'Per-Km Saving')}</span>
                  <strong className="per-km-val text-yellow">₹{savingsPerKm}/km</strong>
                </div>
              </div>

              {/* Animated Cost Comparison Bars */}
              <div className="calc-costs-comparison">
                {/* Petrol Cost */}
                <div className="cost-breakdown-row petrol-row">
                  <div className="cost-row-top">
                    <span className="cost-label">{t('calculator.petrolMonthlyCost', {}, 'Petrol Monthly Cost')}</span>
                    <span className="cost-number petrol-cost">
                      {formatINR(petrolCost)}
                    </span>
                  </div>
                  <div className="cost-bar-container">
                    <div className="cost-bar-fill petrol-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* CNG Cost */}
                <div className="cost-breakdown-row cng-row">
                  <div className="cost-row-top">
                    <span className="cost-label">{t('calculator.cngMonthlyCost', {}, 'CNG Monthly Cost')}</span>
                    <span className="cost-number cng-cost">
                      {formatINR(cngCost)}
                    </span>
                  </div>
                  <div className="cost-bar-container">
                    <div 
                      className="cost-bar-fill cng-fill" 
                      style={{ width: `${cngBarWidth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Main Highlighted Savings Box */}
              <div className="calc-savings-highlight-box">
                <div className="savings-badge-row">
                  <TrendingUp size={18} className="text-yellow" />
                  <span className="savings-subhead">{t('calculator.estimatedDiff', {}, 'Estimated difference')}</span>
                  {percentageSaved > 0 && (
                    <span className="savings-percent-tag">
                      {percentageSaved}% {t('calculator.lowerTag', {}, 'Lower')}
                    </span>
                  )}
                </div>

                <div className="savings-amount-display">
                  {formatINR(monthlySavings)}{' '}
                  <span className="savings-unit">{t('calculator.estimatedSavingMo', {}, 'estimated saving / mo')}</span>
                </div>

                {/* Annual Projection */}
                <div className="annual-projection-row">
                  <span>{t('calculator.projectedAnnual', {}, 'Projected Annual Savings:')}</span>
                  <strong className="text-yellow">{formatINR(annualSavings)}/year</strong>
                </div>

                {/* Payback period estimate */}
                {paybackMonths > 0 && (
                  <div className="payback-period-chip">
                    <Clock size={14} className="text-yellow" />
                    <span>{t('calculator.paybackNote', { months: paybackMonths }, `CNG kit investment typically recovered in ~${paybackMonths} months of driving.`)}</span>
                  </div>
                )}

                <p className="savings-disclaimer">
                  {t('calculator.disclaimer', {}, 'Illustrative fuel-only estimate; excludes kit cost, servicing and other ownership costs. Actual mileage varies with vehicle health, traffic conditions and payload.')}
                </p>
              </div>

              {/* Action Button */}
              <div className="calc-cta-action">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleApplyToForm}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full"
                >
                  {t('calculator.applyWhatsApp', {}, 'Apply Estimate to WhatsApp Inquiry')}
                </Button>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
