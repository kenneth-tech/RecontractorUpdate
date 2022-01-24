console.clear();
const axios = require('axios');

(async () => {
  try {
    const baseURL1 = await axios.get(
      'https://recontractor.cedrickj2000.repl.co/api/all/contractors/'
    );

    console.log(baseURL1.data);
  } catch (error) {
    console.log(error);
  }
})();
