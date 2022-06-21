const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/v2/info?apikey=bc33YOKrLezNgahoo45L5XNlDsvi5rpIFLzPIpup&ip=${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { location } = JSON.parse(body).data;
  const { latitude, longitude } = location;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };