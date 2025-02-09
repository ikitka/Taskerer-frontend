export const getISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы нумеруются с 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};