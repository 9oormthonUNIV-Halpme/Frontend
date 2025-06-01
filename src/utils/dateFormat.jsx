export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric'
  });
};
