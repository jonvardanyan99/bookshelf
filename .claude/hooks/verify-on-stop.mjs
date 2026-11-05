import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import {
  getDirtyMarkerPath,
  getEditedFilesPath,
  PROJECT_ROOT,
  readHookInput,
  writeHookOutput,
} from './hook-runtime.mjs';

const ESLINT_PATH = join(PROJECT_ROOT, 'node_modules/eslint/bin/eslint.js');
const TSC_PATH = join(PROJECT_ROOT, 'node_modules/typescript/bin/tsc');
const MAX_REPORT_LENGTH = 6000;

const runCheck = (checkName, checkArguments) => {
  const { error, status, stderr, stdout } = spawnSync(process.execPath, checkArguments, {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });

  return status === 0
    ? ''
    : `${checkName} failed:\n${[stdout, stderr, error?.message].filter(Boolean).join('\n').trim()}`;
};

const { session_id: sessionId } = readHookInput();
const dirtyMarkerPath = getDirtyMarkerPath(sessionId);

if (existsSync(dirtyMarkerPath)) {
  rmSync(dirtyMarkerPath);

  const editedFilesPath = getEditedFilesPath(sessionId);
  const editedFiles = [...new Set(readFileSync(editedFilesPath, 'utf8').split('\n'))].filter(
    (editedFile) => editedFile && existsSync(join(PROJECT_ROOT, editedFile)),
  );

  const failureReport = [
    runCheck('type-check', [TSC_PATH, '--noEmit']),
    editedFiles.length > 0 &&
      runCheck('lint', [
        ESLINT_PATH,
        '--max-warnings=0',
        '--no-warn-ignored',
        '--',
        ...editedFiles,
      ]),
  ]
    .filter(Boolean)
    .join('\n\n');

  if (failureReport) {
    writeHookOutput({
      decision: 'block',
      reason: failureReport.slice(0, MAX_REPORT_LENGTH),
    });
  } else {
    rmSync(editedFilesPath);
  }
}
