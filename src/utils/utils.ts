export const formatNumber = (num: number) => {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const generateImage = (path: string) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};
