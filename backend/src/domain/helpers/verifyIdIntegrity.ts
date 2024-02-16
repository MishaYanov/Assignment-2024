export function verifyIdIntegrity(id: string): number {
  if (!id) throw new Error('No id provided');
  const numericId = +id;
  if (isNaN(numericId)) {
    throw new Error('Invalid ID');
  }
  return numericId;
}