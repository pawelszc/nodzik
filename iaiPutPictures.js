const axios = require('axios');
const fs = require('fs');

// Function to read JSON data from a file
function readJsonFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

// Function to format data for the API request
function formatDataForApi(jsonData) {
  return jsonData.map(product => {
    return {
      productSizeCodeExternal: product.code,
      productPictures: product.images.map(image => ({ productPictureSource: image }))
    };
  });
}

// Function to split data into chunks
function chunkData(data, chunkSize) {
  let chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to make API requests for each batch of data
async function sendBatchRequests(batches) {
  for (const batch of batches) {
    const options = {
      method: 'PUT',
      url: 'https://megaimport.pl/api/admin/v3/products/products',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'YXBwbGljYXRpb24xOm9najA1UWVvYnc2MFk1QmdtOEk5eUEyUklkWTBPTml0MWs5dTVkK0VzWVFqMklCeFJGY3VqcUFFME5iK0ExK3Y='
      },
      data: {
        params: {
          settings: { settingModificationType: 'edit' },
          picturesSettings: { picturesSettingInputType: 'url' },
          products: batch
        }
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

// Path to your JSON file
const jsonFilePath = './products.json';

readJsonFromFile(jsonFilePath)
  .then(jsonData => {
    const formattedData = formatDataForApi(jsonData);
    const batches = chunkData(formattedData, 100); // Split data into batches of 100
    return sendBatchRequests(batches);
  })
  .catch(error => {
    console.error(error);
  });
