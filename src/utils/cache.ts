interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private static CACHE_DURATION = 1000 * 60 * 60;

  static set<T>(key: string, data: T): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() - parsedItem.timestamp > this.CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  }
}
