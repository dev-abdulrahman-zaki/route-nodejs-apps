/* Global Variables */
const holderForm = document.querySelector('.holderForm');
const entryHolder = document.getElementById("entryHolder");
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2ae27e0d2d0159b4daebb838a5da2c1f&units=metric';

// Get date
let d = new Date();
let newDate = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`;


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate(event) {
  event.preventDefault();
  // Get <input> & <textarea> values
  const zipValue = document.getElementById('zip').value;
  const feelingsValue = document.getElementById('feelings').value;

  if (zipValue !== '') {
    getApiData(baseURL, zipValue, apiKey)
    .then(function (apiData) {
      postData('/add', { date: newDate, temp: apiData.main.temp, feelingsValue })
    }).then(function () {
      updateUI()
    }).catch(function(error) {
      console.log(`"error" ${error}`);
      alert('Please enter a valid US zip code!');
    });
    // reset form
    holderForm.reset();
  } else {
    alert('Enter zip code!');
  }
}


/* Function to GET Web API Data */
const getApiData = async (baseURL, zipValue, apiKey) => {
  const res = await fetch(`${baseURL}${zipValue}${apiKey}`);
  try {
    const apiData = await res.json();
    return apiData;
  } catch (error) {
    console.log(`"error" ${error}`);
  }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json;charset=UTF-8"},
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.feelingsValue
    })
  })
  try {
    const updatedData = await req.json();
    return updatedData;
  } catch (error) {
    console.log(`"error" ${error}`);
  }
};


/* Function to Dynamically Update UI */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // Show entry holder
    entryHolder.classList.remove("hidden");
    // Update entry holder
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  } catch (error) {
    console.log(`"error" ${error}`);
  }
};