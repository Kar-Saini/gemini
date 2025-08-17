const REST_COUNTRY_ENDPOINT = "https://restcountries.com/v3.1/name";

async function getCountryDetailsBySlug(slug: string) {
  console.log(slug);
  if (!slug) return null;
  try {
    const res = await fetch(`${REST_COUNTRY_ENDPOINT}/${slug}`);
    const jsonRes = await res.json();
    if (jsonRes.message) return null;
    const finalRes = jsonRes.map((ele) => ({
      name: ele.name,
      code: ele.idd,
    }));
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function debounceFunction(fn: (slug: string) => Promise<any>, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (slug: string) {
    if (timer) clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(async () => {
        const res = await fn(slug);
        resolve(res);
      }, delay);
    });
  };
}

export const debouncedSearch = debounceFunction(getCountryDetailsBySlug, 300);
