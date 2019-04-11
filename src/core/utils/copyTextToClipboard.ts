function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  let success: boolean;
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    success = true;
  } catch (err) {
    success = false;
  }

  document.body.removeChild(textArea);

  return success;
}
export default function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}
