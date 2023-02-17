import { URL } from 'url';

/**
 * 根据key从一段url中获取query值
 * @param urlPath
 * @param key
 * @returns
 */
export const getUrlQuery = (urlPath: string, key: string): string | null => {
  const url = new URL(urlPath, 'https://www.');
  const params = new URLSearchParams(url.search.substring(1));
  return params.get(key);
};
