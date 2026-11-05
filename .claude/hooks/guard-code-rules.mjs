import {
  getAbsoluteToolPath,
  getIncomingText,
  getProjectRelativePath,
  normalizeForComparison,
  readHookInput,
  writePermissionDecision,
} from './hook-runtime.mjs';

const CODE_RULES = [
  {
    message: 'Light theme only: remove the dark: variant.',
    pattern: /\bdark:/,
  },
  {
    message: 'Use a --shadow-* token, never an arbitrary shadow-[...].',
    pattern: /\bshadow-\[/,
  },
  {
    message: 'z-index values are consecutive integers (z-1, z-2, z-3): see CLAUDE.md.',
    pattern: /\bz-(?:\[|\d{2,})/,
  },
  {
    message: 'Arbitrary values are px, never rem, em or ch.',
    pattern: /-\[[^\]]*\d(?:rem|em|ch)(?![a-z])/i,
  },
  {
    message: 'No negative spacing values.',
    pattern: /(?:^|[\s"'`:!])-[mp][trblxyse]?-\[|\b[mp][trblxyse]?-\[-/m,
  },
  {
    exemptFile: 'src/components/link/index.tsx',
    message: 'Use Link from @/components/Link, never next/link.',
    pattern: /from\s+['"]next\/link['"]/,
  },
  {
    exemptFile: 'src/components/button/index.tsx',
    message: 'Use Button from @/components/Button, never a bare <button>.',
    pattern: /<button\b/,
  },
  {
    exemptFile: 'src/components/typography/index.tsx',
    message: 'Text goes through Typography from @/components/Typography, never bare <p> or <span>.',
    pattern: /<(?:p|span)\b/,
  },
  {
    message: 'Internal paths come from ROUTES in @/constants/routes, never a hardcoded string.',
    pattern: /\bhref=\{?["'`]\/(?!\/)/,
  },
  {
    exemptFile: 'src/services/openlibrary/index.ts',
    message: 'API calls go through fetchOpenLibrary in @/services/openLibrary.',
    pattern: /from\s+['"]axios['"]/,
  },
  {
    message: 'No icon libraries: use the real exported SVG with next/image.',
    pattern: /from\s+['"](?:lucide|react-icons)[^'"]*['"]/,
  },
  {
    extensions: /\.tsx?$/,
    message: 'Use a color token from globals.css, never a hex value.',
    pattern: /#[0-9a-f]{6}\b/i,
  },
];

const hookInput = readHookInput();
const projectRelativePath = normalizeForComparison(
  getProjectRelativePath(getAbsoluteToolPath(hookInput)),
);

if (projectRelativePath.startsWith('src/') && /\.(?:css|tsx?)$/.test(projectRelativePath)) {
  const incomingText = getIncomingText(hookInput);
  const brokenRules = CODE_RULES.filter(
    (codeRule) =>
      codeRule.exemptFile !== projectRelativePath &&
      (!codeRule.extensions || codeRule.extensions.test(projectRelativePath)) &&
      codeRule.pattern.test(incomingText),
  );

  if (brokenRules.length > 0) {
    writePermissionDecision('deny', brokenRules.map((brokenRule) => brokenRule.message).join('\n'));
  }
}
