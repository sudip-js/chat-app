export const insertAtCursor = ({ ref, data }) => {
  const { selectionStart, selectionEnd, value } = ref;
  const text = `${data}`;
  const updatedValue =
    value.substring(0, selectionStart) + text + value.substring(selectionEnd);
  ref.value = updatedValue;
  ref.selectionStart = selectionStart + text.length;
  ref.selectionEnd = ref.selectionStart;
};
