export async function useFetchJson<T>(
  url: string
): Promise<FetchJsonResult<T>> {
  const response = await fetch(url);
  const data = await response.json();

  return { data };
}

type FetchJsonResult<T> = FetchJsonError | FetchJsonSuccess<T>;

type FetchJsonSuccess<T> = {
  data: T;
  error?: never;
};

type FetchJsonError = {
  data?: never;
  error: Error;
};
