import { navLinks } from '../../src/data/navigation.js';

export function runNavigationIntegrationTests() {
  console.log('  ▶ [Integration] Testing navLinks resolution:');

  if (navLinks.length < 5) throw new Error(`Expected at least 5 nav links, found ${navLinks.length}`);

  navLinks.forEach((link) => {
    if (!link.name || typeof link.name !== 'string') throw new Error(`Invalid link name: ${JSON.stringify(link)}`);
    if (!link.href || !link.href.startsWith('#')) throw new Error(`Link href must point to an anchor ID: ${link.href}`);
  });

  console.log(`    ✓ All ${navLinks.length} navigation links verified.`);
}
