import useSWR from "swr";
import { PlanetRes } from "../interfaces/planets";

const url = "https://swapi.dev/api/planets";

function fetcher(url): Promise<PlanetRes[]> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      throw error;
    }

    return res.json();
  });
}

// execute a request for each page, wait for all requests to complete
function multiFetcher(urls): Promise<PlanetRes[]> {
  return Promise.all(urls.map((url) => fetcher(url)));
}

export function GetPlanets() {
  const urls: string[] = [];

  // Gather each url needed to request ALL planets from SWAPI since the response data is paginated
  for (let i = 1; i <= 6; i++) {
    urls.push(`${url}?page=${i}`);
  }

  const { data, error, isLoading, isValidating } = useSWR<PlanetRes[]>(
    urls,
    multiFetcher
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
}
