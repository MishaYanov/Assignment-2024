
/**
 * Verifies the integrity of an id for the delete domain operation and returns the id as a number from the url 
 */
export function verifyIdIntegrity(id: string): number {
  if (!id) throw new Error('No id provided');
  const numericId = +id;
  if (isNaN(numericId)) {
    throw new Error('Invalid ID');
  }
  return numericId;
}