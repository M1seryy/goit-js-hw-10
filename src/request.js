import { Notify } from 'notiflix/build/notiflix-notify-aio';
function countryService(name) {
  if (name.trim() == '') {
    return;
  } else {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=languages,capital,population,flags,name`
    ).then(res => {
      if (!res.ok || res.status === 404) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error('404');
      }

      return res.json();
    });
  }
}
export { countryService };
