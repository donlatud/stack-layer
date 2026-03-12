/** แปลง ISO date เป็น "11 September 2024" */
export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/** แปลง ISO date เป็น "12 September 2024 at 18:30" (สำหรับ comment) */
export function formatDateTime(isoDateString: string): string {
  const date = new Date(isoDateString);
  const datePart = formatDate(isoDateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${datePart} at ${pad(hours)}:${pad(minutes)}`;
}
