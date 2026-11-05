import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import process from 'node:process';

export const PROJECT_ROOT = resolve(import.meta.dirname, '../..');

export const readHookInput = () => JSON.parse(readFileSync(0, 'utf8'));

export const writeHookOutput = (hookOutput) => {
  process.stdout.write(JSON.stringify(hookOutput));
};

export const writePermissionDecision = (permissionDecision, permissionDecisionReason) => {
  writeHookOutput({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision,
      permissionDecisionReason,
    },
  });
};

export const getAbsoluteToolPath = (hookInput) =>
  resolve(hookInput.cwd ?? PROJECT_ROOT, hookInput.tool_input.file_path);

export const getProjectRelativePath = (absolutePath) =>
  relative(PROJECT_ROOT, absolutePath).replaceAll('\\', '/');

export const normalizeForComparison = (filePath) => filePath.replaceAll('\\', '/').toLowerCase();

export const isInsideProject = (projectRelativePath) =>
  !/^(?:\.\.\/|[a-z]:)/i.test(projectRelativePath);

export const getIncomingText = (hookInput) => {
  const { content, new_string: newString } = hookInput.tool_input;

  return content ?? newString ?? '';
};

const getSessionFilePrefix = (sessionId) =>
  join(tmpdir(), `bookshelf-claude-hooks-${sessionId.replaceAll(/\W/g, '_')}`);

export const getEditedFilesPath = (sessionId) => `${getSessionFilePrefix(sessionId)}.files`;

export const getDirtyMarkerPath = (sessionId) => `${getSessionFilePrefix(sessionId)}.dirty`;
