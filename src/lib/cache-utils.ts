// Simple in-memory cache implementation
interface CacheItem<T> {
  value: T;
  expiry: number | null;
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();

  set<T>(key: string, value: T, ttlSeconds?: number): void {
    const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.cache.set(key, { value, expiry });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    // Return null if item doesn't exist
    if (!item) return null;

    // Check if the item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    this.cache.forEach((item, key) => {
      if (item.expiry && item.expiry < now) {
        this.cache.delete(key);
      }
    });
  }
}

// Create a singleton instance
export const memoryCache = new MemoryCache();

// Set up periodic cleanup
if (typeof window !== "undefined") {
  setInterval(() => memoryCache.cleanup(), 60000); // Clean up every minute
}

// Utility function to memoize async functions with cache
export function memoizeAsync<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  keyFn: (...args: Args) => string,
  ttlSeconds?: number,
) {
  return async (...args: Args): Promise<T> => {
    const cacheKey = keyFn(...args);
    const cachedResult = memoryCache.get<T>(cacheKey);

    if (cachedResult !== null) {
      return cachedResult;
    }

    const result = await fn(...args);
    memoryCache.set(cacheKey, result, ttlSeconds);
    return result;
  };
}
