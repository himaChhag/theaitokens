import "server-only";

/**
 * Safe wrapper for @xenova/transformers that handles serverless environment issues
 * This prevents the libonnxruntime.so.1.14.0 loading errors in Vercel
 */

let transformersModule: any = null;
let loadAttempted = false;
let loadError: Error | null = null;

/**
 * Safely load the transformers module with proper error handling
 */
async function loadTransformers() {
  if (loadAttempted) {
    if (loadError) {
      throw loadError;
    }
    return transformersModule;
  }

  loadAttempted = true;

  try {
    // Use dynamic import with a timeout to prevent hanging
    const loadPromise = import("@xenova/transformers");
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Transformers loading timeout")), 10000);
    });

    transformersModule = await Promise.race([loadPromise, timeoutPromise]);
    return transformersModule;
  } catch (error) {
    loadError = error instanceof Error ? error : new Error("Unknown transformers loading error");
    throw loadError;
  }
}

/**
 * Safe AutoTokenizer that handles loading failures gracefully
 */
export async function safeAutoTokenizer() {
  try {
    const transformers = await loadTransformers();
    return transformers.AutoTokenizer;
  } catch (error) {
    // Log the error but don't throw - let the caller handle fallback
    console.warn("Failed to load AutoTokenizer:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Check if transformers is available in this environment
 */
export function isTransformersAvailable(): boolean {
  return loadAttempted && !loadError && transformersModule !== null;
}

/**
 * Get the load error if any
 */
export function getTransformersError(): Error | null {
  return loadError;
}