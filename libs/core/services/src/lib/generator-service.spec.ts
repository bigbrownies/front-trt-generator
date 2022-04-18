import { generateTrt } from './generator-service';

describe('generator-service', () => {
  it('générer un trt avec une personne pour un poste et un créneau', () => {
    const trtResult = generateTrt(['george'], ['bar'], ['8h-9h']);

    expect(trtResult.length).toBe(1);

    expect(trtResult).toEqual([
      {
        poste: 'bar',
        creneau: '8h-9h',
        people: 'george',
      },
    ]);
  });

  it('générer un trt avec 2 personnes pour 2 postes et un créneau', () => {
    const trtResult = generateTrt(
      ['george', 'madelaine'],
      ['cuisine', 'bar'],
      ['8h-9h']
    );

    expect(trtResult.length).toBe(2);

    expect(trtResult).toEqual([
      expect.objectContaining({
        poste: 'cuisine',
        creneau: '8h-9h',
        people: expect.any(String),
      }),
      expect.objectContaining({
        poste: 'bar',
        creneau: '8h-9h',
        people: expect.any(String),
      }),
    ]);
  });

  it(`générer un trt avec 2 personnes pour 2 postes et 2 
    créneaux sans faire deux fois un même poste d affilé pour une personne`, () => {
    const trtResult = generateTrt(
      ['george', 'madelaine'],
      ['cuisine', 'bar'],
      ['8h-9h', '9h-10h']
    );

    expect(trtResult.length).toBe(4);

    const onlyGeorgeParts = trtResult.filter((t) => t.people === 'george');
    const onlyMadelaineParts = trtResult.filter(
      (t) => t.people === 'madelaine'
    );

    expect(onlyGeorgeParts.length).toBe(2);
    expect(onlyMadelaineParts.length).toBe(2);

    expect(onlyGeorgeParts[0].poste).not.toEqual(onlyGeorgeParts[1].poste);
    expect(onlyMadelaineParts[0].poste).not.toEqual(
      onlyMadelaineParts[1].poste
    );
  });
});
