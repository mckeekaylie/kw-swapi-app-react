import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Detail from "../src/app/planet-detail/[planet]/page";
import { GetPlanets } from "../src/app/hooks/getPlanets";

import { useParams } from "next/navigation";

// mock getPlanets hook response so Detail receives the data it needs to populate the page
jest.mock("../src/app/hooks/getPlanets");
const mockGetPlanets = jest.mocked(GetPlanets);

// mock useParams so the correct planet is rendered
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const createWrapper = () => {
  return render(<Detail />);
};

describe("planet-detail/endor", () => {
  beforeEach(() => {
    mockGetPlanets.mockReturnValue({
      data: [
        {
          count: 3,
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

  it("renders the planet passed as a param", async () => {
    jest.mocked(useParams).mockReturnValue({ planet: "Endor" });
    const { getByText } = createWrapper();
    expect(getByText("Endor")).toBeInTheDocument();
  });

  it("renders the planet's diameter, gravity, and surface water", async () => {
    jest.mocked(useParams).mockReturnValue({ planet: "Endor" });
    createWrapper();
    const diameter = screen.getByTestId("diameter").textContent;
    const gravity = screen.getByTestId("gravity").textContent;
    const surfaceWater = screen.getByTestId("surfaceWater").textContent;

    expect(diameter).toEqual("Diameter: 4900");
    expect(gravity).toEqual("Gravity: 0.85 standard");
    expect(surfaceWater).toEqual("Surface Water: 8");
  });

  it("renders the planet's climate and terrain", async () => {
    jest.mocked(useParams).mockReturnValue({ planet: "Endor" });
    createWrapper();
    const climate = screen.getByTestId("climate").textContent;
    const terrain = screen.getByTestId("terrain").textContent;

    expect(climate).toEqual("Climatetemperate");
    expect(terrain).toEqual("Terrainforests mountains lakes");
  });

  it("renders the planet's orbital and rotation periods", async () => {
    jest.mocked(useParams).mockReturnValue({ planet: "Endor" });
    createWrapper();
    const orbital = screen.getByTestId("orbital").textContent;
    const rotation = screen.getByTestId("rotation").textContent;

    expect(orbital).toEqual("Orbital Period: 402");
    expect(rotation).toEqual("Rotation Period: 18");
  });
});

describe("Detail renders loading and error screens", () => {
  it("renders loading screen when isLoading is true", async () => {
    mockGetPlanets.mockReturnValue({
      data: undefined,
      error: false,
      isLoading: true,
      isValidating: true,
    });

    createWrapper();

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

    createWrapper();

    const errorScreen = screen.getAllByTestId("errorScreen");

    expect(errorScreen).toBeInTheDocument;
  });
});
