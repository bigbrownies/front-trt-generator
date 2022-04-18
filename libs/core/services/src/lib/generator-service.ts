import { Trt } from '@front-trt-generator/core/models';
import { generateRandom } from './tools/randomGenerator';

function searchForPeopleToHire(
  trt: Trt[],
  poste: string,
  previousCreneau: string,
  peoples: string[],
  peopleIndexEclude: number[]
): number {
  let peopleIndex = -1;

  while (
    trt.findIndex(
      (t) =>
        t.creneau === previousCreneau &&
        t.poste === poste &&
        t.people == peoples[peopleIndex]
    ) !== -1 ||
    peopleIndex === -1
  ) {
    peopleIndex = generateRandom(0, peoples.length - 1, peopleIndexEclude);
  }

  return peopleIndex;
}

interface creneau {
  creneauIndex: number;
  creneau: string;
  creneaux: string[];
}

function preparePostesForCreneau(
  trt: Trt[],
  { creneauIndex, creneau, creneaux }: creneau,
  postes: string[],
  peoples: string[]
): Trt[] {
  const creneauTrt: Trt[] = [];
  const peopleIndexEclude: number[] = [];

  postes.forEach((poste) => {
    const peopleToHireIndex = searchForPeopleToHire(
      trt,
      poste,
      creneaux[creneauIndex],
      peoples,
      peopleIndexEclude
    );
    peopleIndexEclude.push(peopleToHireIndex);
    creneauTrt.push({
      poste,
      creneau: creneau,
      people: peoples[peopleToHireIndex],
    });
  });

  return creneauTrt;
}

export function generateTrt(
  peoples: string[],
  postes: string[],
  creneaux: string[]
): Trt[] {
  let trt: Trt[] = [];

  creneaux.forEach((creneau, creneauIndex) => {
    const newParts = preparePostesForCreneau(
      trt,
      { creneauIndex, creneau, creneaux },
      postes,
      peoples
    );

    trt = [...trt, ...newParts];
  });

  return trt;
}
