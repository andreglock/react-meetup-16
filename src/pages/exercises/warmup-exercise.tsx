import Character from "@/components/Character";
import { ExerciseTitle } from "@/components/ExerciseTitle";
import { PageWrapper } from "@/components/PageWrapper";
import { RickAndMortyCharacterResponse } from "@/models/APITypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getRicksAndMorties() {
  const response: Promise<RickAndMortyCharacterResponse> = await fetch(
    `https://rickandmortyapi.com/api/character`
  ).then((res) => res.json());
  return response;
}

function WarmupExercise() {
  const {data, error} = useQuery({
    queryKey: ["keyOne"],
    queryFn: getRicksAndMorties,
  });
  // write a useQuery hook that gets rick and morty characters with the getRicksAndMorties function

  return (
    <PageWrapper>
      <ExerciseTitle title="Warmup-Exercise"></ExerciseTitle>
      {!data && <span className="loader"></span>}
      {error && (
        <span>Failed to load characters: {error.message}</span>
      )}
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results.map((character) => (
          <Character character={character} key={character.id}></Character>
        ))}
      </div>
    </PageWrapper>
  );
}

export default WarmupExercise;
