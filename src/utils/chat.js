export const generateChatId = (userId1, userId2) => {
  const sortedUserIds = [userId1, userId2].sort();
  return sortedUserIds.join("_");
};
