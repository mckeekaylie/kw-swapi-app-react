"use client";

import { getPlanets } from "@/app/hooks/getPlanets";
import { useEffect, useState } from "react";
import { Planets } from "@/app/interfaces/planets";

export default function PlanetDetail({ params }) {
  const { data, isLoading, isValidating } = getPlanets();

  const [planet, setPlanet] = useState<Planets>();

  useEffect(() => {
    let planetsContainer: Planets[] = [];

    if (data && data.length !== undefined) {
      for (let i = 0; i <= data.length; i++) {
        data[i]?.results.map((x) => {
          planetsContainer.push(x);
        });
      }

      const activePlanet = planetsContainer.find(
        (x) => x.name === params.planet
      );

      setPlanet(activePlanet);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>{planet?.name}</h1>
        <div className="row">
            <h4>{planet?.diameter}</h4>
            <h4>{planet?.gravity}</h4>
            <h4>{planet?.rotation_period}</h4>
            <h4>{planet?.orbital_period}</h4>
            <h4>{planet?.surface_water}</h4>
        </div>
        

        
    </div>
  );
}
