const REST_COUNTRY_ENDPOINT = "https://restcountries.com/v3.1/name";
const alphabets = "qwertyuioplkjhgfdsazxcvbnmQAZWSXEDCRFVTGBYHNUJMIKOLP";

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

export function generateRandomNumberOfWords() {
  const response = [];
  const numOfWords = Math.ceil(Math.random() * 100);
  for (let i = 0; i < numOfWords; i++) {
    let word = "";
    const letters = Math.floor(Math.random() * 15);
    for (let j = 0; j < letters; j++) {
      const index = Math.floor(Math.random() * 52);
      const letter = alphabets[index];
      word += letter;
    }
    response.push(word);
  }
  return response;
}

export function generateId() {
  let id = "";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 52);
    id += alphabets[index];
  }
  return id;
}
