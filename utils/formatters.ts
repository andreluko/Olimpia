
export const formatSessionNameForDisplay = (originalName: string): string => {
  const lowerName = originalName.toLowerCase();
  if (lowerName.includes('утренняя')) {
    return 'УТРО';
  }
  if (lowerName.includes('дневная')) {
    return 'ДЕНЬ';
  }
  // Для более длинных или уникальных названий сессий, просто переводим в верхний регистр
  return originalName.toUpperCase();
};
