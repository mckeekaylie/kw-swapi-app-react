import useSWR from "swr";
import { PlanetRes } from "../interfaces/planets";

const url = "https://swapi.dev/api/planets";

function fetcher(url): Promise<PlanetRes[]> {
  return fetch(url).then((res) => res.json());
}

function multiFetcher(urls): Promise<PlanetRes[]> {
  return Promise.all(urls.map((url) => fetcher(url)));
}

export function getPlanets() {
  let urls: string[] = [];

  for (let i = 1; i <= 6; i++) {
    urls.push(`${url}?page=${i}`);
  }

  const { data, error, isLoading, isValidating } = useSWR<PlanetRes[]>(
    urls,
    multiFetcher
  );

  return {
    data,
    isLoading,
    isValidating,
  };
}
