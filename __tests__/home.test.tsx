import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Home from "../src/app/page";
import { GetPlanets } from "../src/app/hooks/getPlanets";

// mock getPlanets hook response so Home receives the data it needs to populate the page
jest.mock("../src/app/hooks/getPlanets");
const mockGetPlanets = jest.mocked(GetPlanets);

describe("Home populates planet data", () => {
  beforeEach(() => {
    mockGetPlanets.mockReturnValue({
      data: [
        {
          count: 2,
          results: [
            {
              name: "Tatooine",
              rotation_period: "23",
              orbital_period: "304",
              diameter: "10465",
              climate: "arid",
              gravity: "1 standard",
              terrain: "desert",
              surface_water: "1",
              population: "200000",
              residents: [
                "https://swapi.dev/api/people/1/",
                "https://swapi.dev/api/people/2/",
                "https://swapi.dev/api/people/4/",
                "https://swapi.dev/api/people/6/",
                "https://swapi.dev/api/people/7/",
                "https://swapi.dev/api/people/8/",
                "https://swapi.dev/api/people/9/",
                "https://swapi.dev/api/people/11/",
                "https://swapi.dev/api/people/43/",
                "https://swapi.dev/api/people/62/",
              ],
              films: [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/3/",
                "https://swapi.dev/api/films/4/",
                "https://swapi.dev/api/films/5/",
                "https://swapi.dev/api/films/6/",
              ],
              created: "2014-12-09T13:50:49.641000Z",
              edited: "2014-12-20T20:58:18.411000Z",
              url: "https://swapi.dev/api/planets/1/",
            },
            {
              name: "Alderaan",
              rotation_period: "24",
              orbital_period: "364",
              diameter: "12500",
              climate: "temperate",
              gravity: "1 standard",
              terrain: "grasslands, mountains",
              surface_water: "40",
              population: "2000000000",
              residents: [
                "https://swapi.dev/api/people/5/",
                "https://swapi.dev/api/people/68/",
                "https://swapi.dev/api/people/81/",
              ],
              films: [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/6/",
              ],
              created: "2014-12-10T11:35:48.479000Z",
              edited: "2014-12-20T20:58:18.420000Z",
              url: "https://swapi.dev/api/planets/2/",
            },
            {
              name: "Endor",
              rotation_period: "18",
              orbital_period: "402",
              diameter: "4900",
              climate: "temperate",
              gravity: "0.85 standard",
              terrain: "forests, mountains, lakes",
              surface_water: "8",
              population: "30000000",
              residents: ["https://swapi.dev/api/people/30/"],
              films: ["https://swapi.dev/api/films/3/"],
              created: "2014-12-10T11:50:29.349000Z",
              edited: "2014-12-20T20:58:18.429000Z",
              url: "https://swapi.dev/api/planets/7/",
            },
          ],
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
    });
  });

  it("populates planet chips", async () => {
    render(<Home />);

    const chips = screen.getAllByTestId("planetChip");

    expect(chips.length).toEqual(3);
  });

  it("populates featured cards", async () => {
    render(<Home />);

    const tatooine = screen.getByTestId("Tatooine-feature-card");
    const endor = screen.getByTestId("Endor-feature-card");

    expect(tatooine).toBeInTheDocument;
    expect(endor).toBeInTheDocument;
  });
});

describe("Home applies designated logic when inputs change", () => {
  it("filters planet chips when a value is entered into the search bar", async () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText("Filter by planet name...");

    fireEvent.change(searchInput, { target: { value: "ald" } });

    const planetChips = screen.getAllByTestId("planetChip");
    const alderaan = screen.getByText("Alderaan");

    expect(alderaan).toBeTruthy;
    expect(planetChips.length).toEqual(1);
  });
});

describe("Home renders loading and error screens", () => {
  it("renders loading screen when isLoading is true", async () => {
    mockGetPlanets.mockReturnValue({
      data: undefined,
      error: false,
      isLoading: true,
      isValidating: true,
    });

    render(<Home />);

    const loadingScreen = screen.getAllByTestId("loadingScreen");

    expect(loadingScreen).toBeInTheDocument;
  });

  it("renders error screen when error is not undefined", async () => {
    mockGetPlanets.mockReturnValue({
      data: undefined,
      error: "An error occurred while fetching the data.",
      isLoading: false,
      isValidating: false,
    });

    render(<Home />);

    const errorScreen = screen.getAllByTestId("errorScreen");

    expect(errorScreen).toBeInTheDocument;
  });
});
