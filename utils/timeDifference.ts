const timeDifference = (date: string) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const createdAt = new Date(date);
  const now = new Date();

  const elapsed = now.valueOf() - createdAt.valueOf();

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "방금 전";
    return Math.round(elapsed / 1000) + "초 전";
  } else if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + "분 전";
  else if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + "시간 전";
  else if (elapsed < msPerWeek) return Math.round(elapsed / msPerDay) + "일 전";
  else
    return `${createdAt.getFullYear()}.${createdAt.getMonth()}.${createdAt.getDate()}`;
};

export default timeDifference;
