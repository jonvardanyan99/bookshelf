import { basename, resolve } from 'node:path';

import {
  getAbsoluteToolPath,
  getIncomingText,
  getProjectRelativePath,
  normalizeForComparison,
  PROJECT_ROOT,
  readHookInput,
  writePermissionDecision,
} from './hook-runtime.mjs';

const GENERATED_FILES = ['local.db', 'next-env.d.ts', 'package-lock.json', 'tsconfig.tsbuildinfo'];
const URUQ_AI_ROOT = `${normalizeForComparison(resolve(PROJECT_ROOT, '../uruq-ai'))}/`;

const hookInput = readHookInput();
const absolutePath = getAbsoluteToolPath(hookInput);
const comparablePath = normalizeForComparison(absolutePath);
const projectRelativePath = normalizeForComparison(getProjectRelativePath(absolutePath));

const isEnvLocal = normalizeForComparison(basename(absolutePath)) === '.env.local';
const isWrite = hookInput.tool_name !== 'Read';
const isGeneratedFile = GENERATED_FILES.includes(projectRelativePath);
const isInUruqAi = comparablePath.startsWith(URUQ_AI_ROOT);
const addsSecretToEnv =
  projectRelativePath === '.env' &&
  /\b(?:DATABASE_URL|SESSION_SECRET)\s*=/.test(getIncomingText(hookInput));

if (isEnvLocal) {
  writePermissionDecision('deny', '.env.local holds SESSION_SECRET. Ask the user to change it.');
} else if (isWrite && isGeneratedFile) {
  writePermissionDecision('deny', `${projectRelativePath} is generated: use its tool instead.`);
} else if (isWrite && isInUruqAi) {
  writePermissionDecision('deny', 'CLAUDE.md: never edit anything in the URUQ AI project.');
} else if (isWrite && addsSecretToEnv) {
  writePermissionDecision(
    'deny',
    '.env is committed: DATABASE_URL and SESSION_SECRET belong in .env.local.',
  );
}
