export type CacheKey = string;
export type CacheValue = unknown;

// 10 minutes
export const DEFAULT_TIME_LIMIT = 600000 as const;

class Cache {
  private timeLimit: number;
  private _lastSet: Record<CacheKey, number>;
  private _cache: Record<CacheKey, CacheValue>;

  constructor(timeLimit?: number) {
    this.timeLimit = timeLimit ?? DEFAULT_TIME_LIMIT;
    this._lastSet = {};
    this._cache = {};
  }

  get<T extends CacheValue>(key: CacheKey): T | undefined {
    const lastSet = this._lastSet[key];

    if (lastSet !== undefined && Date.now() - lastSet > this.timeLimit) {
      return undefined;
    }

    return this._cache[key] as T;
  }

  set(key: CacheKey, value: CacheValue): void {
    this._cache[key] = value;
    this._lastSet[key] = Date.now();
  }
}

export default Cache;
