import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import {
  getAbsoluteToolPath,
  getDirtyMarkerPath,
  getEditedFilesPath,
  getProjectRelativePath,
  isInsideProject,
  normalizeForComparison,
  PROJECT_ROOT,
  readHookInput,
  writeHookOutput,
} from './hook-runtime.mjs';

const PRETTIER_PATH = join(PROJECT_ROOT, 'node_modules/prettier/bin/prettier.cjs');

const hookInput = readHookInput();
const absolutePath = getAbsoluteToolPath(hookInput);
const projectRelativePath = getProjectRelativePath(absolutePath);

const isProjectFile = isInsideProject(projectRelativePath) && existsSync(absolutePath);
const isFormattable = /\.(?:css|json|md|mjs|tsx?)$/i.test(projectRelativePath);
const isVerifiable = /\.(?:mjs|tsx?)$/i.test(projectRelativePath);
const isDatabaseSchema = normalizeForComparison(projectRelativePath) === 'src/db/schema.ts';

if (isProjectFile && isFormattable) {
  spawnSync(process.execPath, [PRETTIER_PATH, '--log-level', 'silent', '--write', absolutePath], {
    cwd: PROJECT_ROOT,
  });
}

if (isProjectFile && isVerifiable) {
  appendFileSync(getEditedFilesPath(hookInput.session_id), `${projectRelativePath}\n`);
  writeFileSync(getDirtyMarkerPath(hookInput.session_id), '');
}

if (isProjectFile && isDatabaseSchema) {
  writeHookOutput({
    hookSpecificOutput: {
      additionalContext:
        'src/db/schema.ts changed: the database needs `npm run db:push` to match it.',
      hookEventName: 'PostToolUse',
    },
  });
}
