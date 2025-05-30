// 시간 형식(오전/후 XX시 XX분) 변환 
export const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const isAM = hours < 12;
  const hour12 = hours % 12 || 12;
  const minuteStr = minutes.toString().padStart(2, '0');
  const period = isAM ? '오전' : '오후';
  return `${period} ${hour12}시 ${minuteStr}분`;
};

// 두 시간이 '분' 단위까지 같은지 반환
export const isSameMinute = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getHours() === d2.getHours() &&
    d1.getMinutes() === d2.getMinutes()
  );
};