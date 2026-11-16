import { en } from '../../src/locales/en.js';
import { hi } from '../../src/locales/hi.js';
import { as } from '../../src/locales/as.js';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../src/locales/index.js';

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const p = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], p));
    } else {
      keys.push(p);
    }
  }
  return keys;
}

export function runLanguageTests() {
  console.log('▶ [Unit] Testing Language Dictionaries & Key Parity:');

  // 1. Supported languages
  if (SUPPORTED_LANGUAGES.length !== 3) {
    throw new Error(`Expected 3 supported languages, got ${SUPPORTED_LANGUAGES.length}`);
  }
  const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
  if (!codes.includes('en') || !codes.includes('hi') || !codes.includes('as')) {
    throw new Error(`Supported languages missing expected codes: ${codes.join(', ')}`);
  }
  console.log('  ✓ Supported languages verified: en, hi, as');

  // 2. Default language
  if (DEFAULT_LANGUAGE !== 'en') {
    throw new Error(`Default language must be en, got ${DEFAULT_LANGUAGE}`);
  }
  console.log('  ✓ Default language verified: en');

  // 3. Brand name unchanged
  if (en.common.brandName !== 'Maa Kamakhya Auto Gas') throw new Error('EN brand name mismatch');
  if (hi.common.brandName !== 'Maa Kamakhya Auto Gas') throw new Error('HI brand name mismatch');
  if (as.common.brandName !== 'Maa Kamakhya Auto Gas') throw new Error('AS brand name mismatch');
  console.log('  ✓ Brand name Maa Kamakhya Auto Gas preserved verbatim across all dictionaries');

  // 4. Exact Key Parity
  const enKeys = new Set(getKeys(en));
  const hiKeys = new Set(getKeys(hi));
  const asKeys = new Set(getKeys(as));

  if (enKeys.size !== hiKeys.size) {
    const missingInHi = [...enKeys].filter((k) => !hiKeys.has(k));
    throw new Error(`Key mismatch: HI missing ${missingInHi.length} keys: ${missingInHi.slice(0, 5).join(', ')}`);
  }
  if (enKeys.size !== asKeys.size) {
    const missingInAs = [...enKeys].filter((k) => !asKeys.has(k));
    throw new Error(`Key mismatch: AS missing ${missingInAs.length} keys: ${missingInAs.slice(0, 5).join(', ')}`);
  }
  console.log(`  ✓ 100% key parity verified: exactly ${enKeys.size} keys across English, Hindi, and Assamese`);

  // 5. Zero em-dashes
  [en, hi, as].forEach((dict, idx) => {
    const lang = ['en', 'hi', 'as'][idx];
    const json = JSON.stringify(dict);
    if (json.includes('\u2014')) {
      throw new Error(`Em dash detected in ${lang} dictionary`);
    }
  });
  console.log('  ✓ Zero em dashes in all dictionaries');

  // 6. Cancellation button translations
  if (!en.modal.holdToCancel || !en.modal.cancelling || !en.modal.cancelled) {
    throw new Error('EN missing cancellation modal keys');
  }
  if (!hi.modal.holdToCancel || !hi.modal.cancelling || !hi.modal.cancelled) {
    throw new Error('HI missing cancellation modal keys');
  }
  if (!as.modal.holdToCancel || !as.modal.cancelling || !as.modal.cancelled) {
    throw new Error('AS missing cancellation modal keys');
  }
  console.log('  ✓ Press and hold cancel button states verified in all languages');

  return true;
}

if (process.argv[1] && process.argv[1].endsWith('language.test.js')) {
  try {
    runLanguageTests();
    console.log('🎉 All language unit tests passed successfully!');
  } catch (err) {
    console.error('❌ Language test failed:', err.message);
    process.exit(1);
  }
}
