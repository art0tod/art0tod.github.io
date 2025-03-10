export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};
