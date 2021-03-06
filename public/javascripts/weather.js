document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("date")) {
    document.getElementById("date").onchange = function() {
      let address = document.getElementById("adress").value;
      address = address.replace(/\s+/g, "+");
      console.log(address);
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCgsMC659ayWxa7vhbI_ykWqzdavn8ZOxg`
        )
        .then(function(response) {
          let lat = response.data.results[0].geometry.location.lat;
          let long = response.data.results[0].geometry.location.lng;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=a68b6bdea8f65c2b91544b4501750026`
            )
            .then(w => {
              console.log(w);
              document.getElementById(
                "raul"
              ).innerHTML = `<p>Weather for today: ${
                w.data.list[0].weather[0].main
              }</p> <img style="height: 100px"src="http://openweathermap.org/img/w/${
                w.data.list[0].weather[0].icon
              }.png">`;
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    };
    document.getElementById("outdoors").onchange = () => {
      document.getElementById("outdoors-list").innerHTML += `
      <br><br>
      <select name="subgenre" class="custom-select">
  <option selected>Subgenre</option>
  <option value="chill">Chill</option>
  <option value="nightlife">Nightlife</option>
  <option value="otherplans">Other</option>
</select>`;
    };
    document.getElementById("games").onchange = () => {
      document.getElementById("games-list").innerHTML += `
      <br><br>
      <select name="subgenre" class="custom-select">
  <option selected>Subgenre</option>
  <option value="board">Board</option>
  <option value="online">Online</option>
</select>`;
    };
  }
});
