export const kelvinToCelcius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const airQualityIndexText = [
  {
    rating: 10,
    description: 'excelente',
  },
  {
    rating: 20,
    description: 'buena',
  },
  {
    rating: 30,
    description: 'satisfactoria',
  },
  {
    rating: 40,
    description: 'justa',
  },
  {
    rating: 50,
    description: 'moderada',
  },
  {
    rating: 60,
    description: 'moderada',
  },
  {
    rating: 70,
    description: 'mala',
  },
  {
    rating: 80,
    description: 'mala',
  },
  {
    rating: 90,
    description: 'muy mala',
  },
  {
    rating: 100,
    description: 'muy mala',
  },
];
