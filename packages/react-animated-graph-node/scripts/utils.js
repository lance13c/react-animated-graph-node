import { mkdir, rm } from 'fs/promises';

/**
 * Empties a directory by removing it and recreating it
 * @param {string} dir - Directory path to empty
 */
export async function emptyDir(dir) {
  try {
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error emptying directory ${dir}:`, error);
    throw error;
  }
}
