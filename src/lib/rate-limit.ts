import { LRUCache } from 'lru-cache';

export function rateLimit(options?: {
  uniqueTokenPerInterval?: number;
  interval?: number;
}) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: async (res: Response, limit: string | number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1]);
        return { success: true, limit: parseInt(limit.toString()), remaining: parseInt(limit.toString()) - 1 };
      }
      
      if (tokenCount[0] >= parseInt(limit.toString())) {
        return { success: false, limit: parseInt(limit.toString()), remaining: 0 };
      }

      tokenCount[0] = tokenCount[0] + 1;
      tokenCache.set(token, tokenCount);
      
      return { 
        success: true, 
        limit: parseInt(limit.toString()), 
        remaining: parseInt(limit.toString()) - tokenCount[0] 
      };
    },
  };
} 