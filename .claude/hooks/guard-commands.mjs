import { readHookInput, writePermissionDecision } from './hook-runtime.mjs';

const gitSubcommand = (subcommandPattern) =>
  new RegExp(String.raw`\bgit(?:\s+-\S+(?:\s+[^\s-]\S*)?)*\s+${subcommandPattern}`, 'i');

const SAME_COMMAND = String.raw`[^|;&\n]*`;

const DENIED_COMMANDS = [
  {
    pattern: gitSubcommand(String.raw`commit(?![\w-])`),
    reason: 'CLAUDE.md: never run git commit. Suggest a commit message; the user commits on main.',
  },
  {
    pattern: gitSubcommand(String.raw`branch\s+(?!\d*>)[^\s|;&>)-]`),
    reason: 'CLAUDE.md: never create a branch. The user works on main.',
  },
  {
    pattern: gitSubcommand(String.raw`checkout\s+-[bB]\b`),
    reason: 'CLAUDE.md: never create a branch. The user works on main.',
  },
  {
    pattern: gitSubcommand(String.raw`switch\s+(?:-[cC]\b|--create\b|--force-create\b)`),
    reason: 'CLAUDE.md: never create a branch. The user works on main.',
  },
  {
    pattern: /(?:^|\s)--no-verify\b/,
    reason: 'docs/conventions.md: never bypass the git hooks with --no-verify.',
  },
  {
    pattern: /\bHUSKY\s*=\s*["']?0\b/,
    reason: 'docs/conventions.md: never bypass the git hooks by disabling Husky.',
  },
  {
    pattern: /\.env\.local\b/i,
    reason: '.env.local holds SESSION_SECRET: shell commands must not touch it. Ask the user.',
  },
];

const CONFIRMED_COMMANDS = [
  {
    pattern: /\bdb:push\b|\bdrizzle-kit\s+push\b/i,
    reason: 'This changes the database schema in local.db.',
  },
  {
    pattern: new RegExp(
      String.raw`\b(?:rm|del|erase|ri|Remove-Item)\b${SAME_COMMAND}\blocal\.db\b`,
      'i',
    ),
    reason: 'local.db is gitignored and has no backup.',
  },
  {
    pattern: gitSubcommand(String.raw`reset\b${SAME_COMMAND}--hard\b`),
    reason: 'This discards uncommitted work, and the user keeps uncommitted work on main.',
  },
  {
    pattern: gitSubcommand(String.raw`clean\b`),
    reason: 'This deletes untracked files, and the user keeps uncommitted work on main.',
  },
  {
    pattern: gitSubcommand(String.raw`checkout\b${SAME_COMMAND}\s--(?:\s|$)`),
    reason: 'This discards uncommitted work, and the user keeps uncommitted work on main.',
  },
  {
    pattern: gitSubcommand(String.raw`restore\b`),
    reason: 'This changes uncommitted work, and the user keeps uncommitted work on main.',
  },
];

const {
  tool_input: { command },
} = readHookInput();

const deniedCommand = DENIED_COMMANDS.find((deniedRule) => deniedRule.pattern.test(command));
const confirmedCommand = CONFIRMED_COMMANDS.find((confirmedRule) =>
  confirmedRule.pattern.test(command),
);

if (deniedCommand) {
  writePermissionDecision('deny', deniedCommand.reason);
} else if (confirmedCommand) {
  writePermissionDecision('ask', confirmedCommand.reason);
}
