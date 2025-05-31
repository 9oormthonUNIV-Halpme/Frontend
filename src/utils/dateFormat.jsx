// utils/dateFormat.js
export const formatDate = (isoString) => {
  const d = new Date(isoString);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};
