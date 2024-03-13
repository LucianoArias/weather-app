import moment from 'moment';

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

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('HH:mm');
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return null;
  }
};
