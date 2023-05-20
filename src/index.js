import './css/styles.css';
import { countryService } from './request';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const info = document.querySelector('.country-info');

input.addEventListener('input', inputHandler);

function inputHandler() {
  if (input.value == '') {
    info.innerHTML = '';
  }
  if (input.value.trim() === '') {
    return;
  }
  countryService(input.value.trim()).then(data => createMarkup(data));
}

function createMarkup(data) {
  if (input.value == '1') {
    info.innerHTML = '123';
  } else {
    if (data.length >= 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (data.length <= 10 && data.length >= 2) {
      let arr = [];
      data.map(item => {
        arr.push(
          `<li class="item-li"><img class="svg-flag" src="${item.flags.svg}" alt="${item.name.official}"></img><h2>${item.name.official}</h2></li>`
        );
      });
      info.innerHTML = arr.join('');
    }
    if (data.length === 1) {
      const markup2 = `
        <ul>
        <li class="item-li">
        <img class="svg-flag" src="${data[0].flags.svg}" alt="${
        data[0].name.official
      }" />
          <h2>${data[0].name.official}</h2>
        </li>
        <li><strong>Capital:</strong> <span>${data[0].capital}</span></li>
        <li><strong>Languages:</strong> <span>${langCreator(
          data[0].languages
        )}</span></li>
        <li><strong>Population:</strong> <span>${data[0].population}</span></li>
      </ul>
        `;
      info.innerHTML = markup2;
    }
  }
}
function langCreator(lang) {
  for (const key in lang) {
    return `<span>${key}</span>`;
  }
}
