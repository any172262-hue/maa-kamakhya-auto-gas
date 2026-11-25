import React from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { useSavingsCalculator } from '../hooks/useSavingsCalculator';
import { formatINR, formatDistance } from '../utils/formatCurrency';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function SavingsCalculator({ onApplyEstimate }) {
  const { t } = useLanguage();
  const {
    distance,
    petrolPrice,
    cngPrice,
    petrolMileage,
    cngMileage,
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
    percentageSaved
  } = useSavingsCalculator();

  const handleApplyToForm = () => {
    const summaryText = `I ran the savings calculator for ${formatDistance(distance)}/month. Estimated monthly saving is ${formatINR(monthlySavings)} (${formatINR(annualSavings)}/year). Please advise on kit options for my car.`;
    if (onApplyEstimate) {
      onApplyEstimate(summaryText);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickDistances = [1500, 3000, 5000, 8000];

  return (
    <section id="calculator" className="section calculator-section">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('calculator.tagline', {}, 'ESTIMATE YOUR RUNNING COST')}
            title={t('calculator.title', {}, 'Petrol vs CNG')}
            highlight={t('calculator.titleHighlight', {}, 'Savings Calculator.')}
            description={t('calculator.description', {}, 'Enter your own local fuel prices and realistic vehicle mileage for an indicative running cost comparison.')}
          />
        </RevealAnimation>

        <div className="calculator-layout-grid">
          {/* Left Side: Inputs Card */}
          <RevealAnimation delay={1}>
            <div className="calc-inputs-card">
              <div className="calc-card-header">
                <div className="calc-header-title">
                  <h3>{t('calculator.drivingParams', {}, 'Driving Parameters')}</h3>
                </div>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="calc-reset-btn"
                  title={t('calculator.resetDefaults', {}, 'Reset Defaults')}
                  aria-label={t('calculator.resetDefaults', {}, 'Reset Defaults')}
                >
                  <RotateCcw size={13} />
                  <span>{t('calculator.resetDefaults', {}, 'Reset Defaults')}</span>
                </button>
              </div>

              {/* Monthly Distance Slider & Customizable Input */}
              <div className="calc-slider-group">
                <div className="calc-slider-header">
                  <label htmlFor="custom-distance-input" className="calc-label-caps">
                    {t('calculator.monthlyDistance', {}, 'MONTHLY DISTANCE (KM)')}
                  </label>
                  <div className="calc-distance-input-wrap">
                    <input
                      id="custom-distance-input"
                      type="number"
                      min="100"
                      max="50000"
                      step="100"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value === '' ? '' : Number(e.target.value))}
                      onBlur={() => {
                        if (!distance || Number(distance) < 100) setDistance(500);
                        else if (Number(distance) > 50000) setDistance(50000);
                      }}
                      className="calc-distance-input"
                      placeholder="5000"
                      aria-label={t('calculator.monthlyDistance', {}, 'Monthly Distance in KM')}
                    />
                    <span className="calc-distance-suffix">km</span>
                  </div>
                </div>

                <div className="calc-slider-track-wrap">
                  <input
                    id="distance-slider"
                    type="range"
                    min="500"
                    max="15000"
                    step="250"
                    value={Math.min(15000, Math.max(500, Number(distance) || 500))}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="custom-slider"
                    style={{
                      background: `linear-gradient(to right, #1677FF 0%, #1677FF ${Math.min(100, Math.max(0, ((Number(distance || 500) - 500) / (15000 - 500)) * 100))}%, #E0F2FE ${Math.min(100, Math.max(0, ((Number(distance || 500) - 500) / (15000 - 500)) * 100))}%, #E0F2FE 100%)`
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
                  {!quickDistances.includes(Number(distance)) && distance ? (
                    <span className="distance-pill active custom-pill" title="Custom distance entered">
                      Custom ({Number(distance).toLocaleString('en-IN')} km)
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Inputs Grid: 2 Columns */}
              <div className="calc-inputs-2col">
                {/* Petrol Price */}
                <div className="calc-input-cell">
                  <label htmlFor="petrol-price" className="calc-label-caps">
                    {t('calculator.petrolPrice', {}, 'PETROL PRICE (₹/L)')}
                  </label>
                  <input
                    id="petrol-price"
                    type="number"
                    step="0.5"
                    min="50"
                    max="150"
                    value={petrolPrice}
                    onChange={(e) => setPetrolPrice(Number(e.target.value))}
                    className="calc-clean-input"
                    placeholder="107"
                  />
                </div>

                {/* CNG Price */}
                <div className="calc-input-cell">
                  <label htmlFor="cng-price" className="calc-label-caps">
                    {t('calculator.cngPrice', {}, 'CNG PRICE (₹/KG)')}
                  </label>
                  <input
                    id="cng-price"
                    type="number"
                    step="0.5"
                    min="40"
                    max="130"
                    value={cngPrice}
                    onChange={(e) => setCngPrice(Number(e.target.value))}
                    className="calc-clean-input"
                    placeholder="91"
                  />
                </div>

                {/* Petrol Mileage */}
                <div className="calc-input-cell">
                  <label htmlFor="petrol-mileage" className="calc-label-caps">
                    {t('calculator.petrolMileage', {}, 'PETROL MILEAGE (KM/L)')}
                  </label>
                  <input
                    id="petrol-mileage"
                    type="number"
                    step="0.5"
                    min="5"
                    max="40"
                    value={petrolMileage}
                    onChange={(e) => setPetrolMileage(Number(e.target.value))}
                    className="calc-clean-input"
                    placeholder="15"
                  />
                </div>

                {/* CNG Mileage */}
                <div className="calc-input-cell">
                  <label htmlFor="cng-mileage" className="calc-label-caps">
                    {t('calculator.cngMileage', {}, 'CNG MILEAGE (KM/KG)')}
                  </label>
                  <input
                    id="cng-mileage"
                    type="number"
                    step="0.5"
                    min="10"
                    max="50"
                    value={cngMileage}
                    onChange={(e) => setCngMileage(Number(e.target.value))}
                    className="calc-clean-input"
                    placeholder="27"
                  />
                </div>
              </div>

              {/* Default Rates Footnote */}
              <div className="calc-default-note">
                <CheckCircle2 size={15} className="calc-check-icon" />
                <span>{t('calculator.defaultRatesNote', {}, 'Default rates based on current fuel retail tariffs in Guwahati, Assam.')}</span>
              </div>
            </div>
          </RevealAnimation>

          {/* Right Side: Results Card */}
          <RevealAnimation delay={2}>
            <div className="calc-results-card">
              <div className="calc-results-top">
                {/* Petrol Monthly Cost Row */}
                <div className="calc-cost-row petrol-row">
                  <span className="calc-fuel-name">{t('calculator.petrolMonthlyCost', {}, 'Petrol')}</span>
                  <span className="calc-fuel-value petrol-val">{formatINR(petrolCost)}</span>
                </div>

                {/* CNG Monthly Cost Row */}
                <div className="calc-cost-row cng-row">
                  <span className="calc-fuel-name">{t('calculator.cngMonthlyCost', {}, 'CNG')}</span>
                  <span className="calc-fuel-value cng-val">{formatINR(cngCost)}</span>
                </div>

                {/* Main Highlighted Difference Box */}
                <div className="calc-diff-box">
                  <div className="calc-diff-header">
                    <div className="calc-diff-badge">
                      <TrendingUp size={15} className="text-yellow" />
                      <span>{t('calculator.estimatedDiff', {}, 'ESTIMATED DIFFERENCE')}</span>
                    </div>
                    {percentageSaved > 0 && (
                      <span className="calc-percent-badge">
                        {percentageSaved}% {t('calculator.lowerTag', {}, 'Lower')}
                      </span>
                    )}
                  </div>

                  <div className="calc-savings-hero">
                    <span className="calc-savings-number">{formatINR(monthlySavings)}</span>
                    <span className="calc-savings-unit">{t('calculator.estimatedSavingMo', {}, 'estimated saving / mo')}</span>
                  </div>

                  <div className="calc-annual-projection">
                    <span className="calc-annual-label">{t('calculator.projectedAnnual', {}, 'Projected Annual Savings:')}</span>
                    <strong className="calc-annual-number">{formatINR(annualSavings)}/year</strong>
                  </div>

                  <p className="calc-diff-note">
                    {t('calculator.disclaimer', {}, 'Illustrative fuel-only estimate; excludes kit cost, servicing and other ownership costs. Actual mileage varies with vehicle health, traffic conditions and payload.')}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyToForm}
                className="calc-apply-btn"
              >
                <span>{t('calculator.applyWhatsApp', {}, 'Apply Estimate to WhatsApp Inquiry')}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
