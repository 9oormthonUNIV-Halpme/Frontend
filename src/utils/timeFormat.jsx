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

// ✅ 'HH:mm' 형식 전용 함수 추가
export const formatHourMinute = (timeString) => {
  if (!timeString) return '';
  const [hourStr, minuteStr] = timeString.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) return ''; // 방어

  const isAM = hour < 12;
  const hour12 = hour % 12 || 12;
  const minuteFormatted = minute.toString().padStart(2, '0');
  const period = isAM ? '오전' : '오후';
  return `${period} ${hour12}: ${minuteFormatted}`;
}
export const formatMonthDay = (date) => {
  const [year, month, day] = date.split("-");
  return `${parseInt(month)}월 ${parseInt(day)}일`;
};  

export const formatTimeRange = (startTime, endTime) => {
  const format = (time) => {
    const [hour, min] = time.split(":");
    const hourParse = parseInt(hour);
    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = (hourParse % 12 === 0) ? 12 : hourParse % 12;
    return `${period} ${formattedHour}:${min}`;
  }
  return `${format(startTime)}~${format(endTime)}`;
};