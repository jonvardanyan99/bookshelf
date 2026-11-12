import { spawn } from 'node:child_process';
import process from 'node:process';

const NOTIFICATION_TITLE = 'Claude Code: Bookshelf';
const DEFAULT_NOTIFICATION_BODY = 'Claude finished working.';
const MAX_BODY_LENGTH = 200;
const POWERSHELL_APP_ID = String.raw`{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe`;

const TOAST_SCRIPT = `
$notifications = [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime]
$template = $notifications::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
$textNodes = $template.GetElementsByTagName('text')
$textNodes.Item(0).AppendChild($template.CreateTextNode($env:CLAUDE_NOTIFICATION_TITLE)) | Out-Null
$textNodes.Item(1).AppendChild($template.CreateTextNode($env:CLAUDE_NOTIFICATION_BODY)) | Out-Null
$notifications::CreateToastNotifier($env:CLAUDE_NOTIFICATION_APP_ID).Show([Windows.UI.Notifications.ToastNotification]::new($template))
`;

const getNotificationBody = (lastAssistantMessage) => {
  const firstLine = lastAssistantMessage
    ?.split('\n')
    .map((line) => line.replaceAll(/[*_`#>]/g, '').trim())
    .find(Boolean);

  if (!firstLine) {
    return DEFAULT_NOTIFICATION_BODY;
  }

  return firstLine.length > MAX_BODY_LENGTH
    ? `${firstLine.slice(0, MAX_BODY_LENGTH - 1)}…`
    : firstLine;
};

export const showFinishedNotification = (hookInput) => {
  if (process.platform !== 'win32') {
    return;
  }

  const toastProcess = spawn(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', TOAST_SCRIPT],
    {
      detached: true,
      env: {
        ...process.env,
        CLAUDE_NOTIFICATION_APP_ID: POWERSHELL_APP_ID,
        CLAUDE_NOTIFICATION_BODY: getNotificationBody(hookInput.last_assistant_message),
        CLAUDE_NOTIFICATION_TITLE: NOTIFICATION_TITLE,
      },
      stdio: 'ignore',
      windowsHide: true,
    },
  );

  toastProcess.unref();
};
