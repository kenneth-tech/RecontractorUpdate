function Viewdetailsprofile(event) {
  event.preventDefault();
  document.getElementById('id01').style.display = 'block';
  console.log(event.target.id.value);
  const houseID = event.target.id.value;
  (async () => {
    try {
      const baseURL = await fetch(
        `https://recontractor.cedrickj2000.repl.co/api/all/houseDetails/${houseID}`
      );
      const result = await baseURL.json();
      console.log(result.data);

      const houseType = await result.data[0].houseType;
      const lotSize = await result.data[0].lotSize;
      const bedRoom = await result.data[0].bedRoom;
      const cr = await result.data[0].cr;
      const housePrice = await result.data[0].housePrice;
      const frontView = await result.data[0].frontView;
      const sideView = await result.data[0].sideView;
      const rearView = await result.data[0].rearView;
      const insideView = await result.data[0].insideView;

      // const houseTypeR = document.getElementById("movie-title");
      // movieTitle.innerHTML = houseType;

      const frontViewR = document.getElementById('front-image');
      frontViewR.src = frontView;
      const sideViewR = document.getElementById('side-image');
      sideViewR.src = sideView;
      const rearViewR = document.getElementById('rear-image');
      rearViewR.src = rearView;
      const insideViewR = document.getElementById('inside-image');
      insideViewR.src = insideView;

      const houseTypeR = document.getElementById('housetype');
      houseTypeR.innerHTML = houseType;
      const lotSizeR = document.getElementById('lotsize');
      lotSizeR.innerHTML = lotSize;
      const bedRoomR = document.getElementById('bedrooms');
      bedRoomR.innerHTML = bedRoom;
      const crR = document.getElementById('cr');
      crR.innerHTML = cr;
      const housePriceR = document.getElementById('houseprice');
      housePriceR.innerHTML = housePrice;
      console.log(
        houseTypeR,
        lotSizeR,
        bedRoomR,
        crR,
        housePriceR,
        frontViewR,
        sideViewR,
        rearViewR,
        insideViewR
      );
    } catch (error) {
      console.log(error);
    }
  })();
}
