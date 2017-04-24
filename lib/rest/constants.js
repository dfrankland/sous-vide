export const COOKER_ENDPOINT = (id, secretKey) => (
  `https://api.anovaculinary.com/cookers/${encodeURIComponent(id)}?secret=${secretKey}&requestKey=${new Date().valueOf()}`
);

export const JOBS_ENDPOINT = (id, secretKey) => (
  `https://api.anovaculinary.com/cookers/${encodeURIComponent(id)}/jobs?secret=${secretKey}&requestKey=${new Date().valueOf()}`
);
