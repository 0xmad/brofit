import NodeFetchCache, { MemoryCache } from "node-fetch-cache";

export interface ICreateCachedFetchArgs {
  ttl?: number;
}

export interface OptionArgs {
  method: "POST" | "GET";
  headers?: HeadersInit;
  body?: string;
}

export type TCachedFetch = <T>(url: string, opts?: OptionArgs) => Promise<{ data: T; error: Error }>;

export function createCachedFetch({ ttl = 1000 * 60 }: ICreateCachedFetchArgs): TCachedFetch {
  const cachedFetch = NodeFetchCache.create({ cache: new MemoryCache({ ttl }) });

  return async <T>(url: string, opts?: OptionArgs): Promise<{ data: T; error: Error }> =>
    cachedFetch(url, {
      method: opts?.method ?? "GET",
      body: opts?.body,
      headers: { ...opts?.headers, "Content-Type": "application/json" },
    }).then(async (r) => {
      if (!r.ok) {
        await r.ejectFromCache();
        throw new Error("Network error");
      }

      return (await r.json()) as { data: T; error: Error };
    });
}
