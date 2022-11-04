import { TIMEOUT_SEC } from './config';

//! Make Timeout function and return promise
const timeOut = function (second) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${second} second`)
      );
    }, second * 1000);
  });
};

//! Fetch data and Race with timeout function
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.status} (${response.status})`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
