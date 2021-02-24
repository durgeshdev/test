const _ = require('lodash')
const geoDistance = require('geo-distance');

function _mapCalculatedDistance(result) {
    let userLocationPoint = {
        lat: 50.1109,
        lon: 8.6821
    };
    _.each(result, function (item) {
        if (!_.isEmpty(item.location) && !_.isEmpty(item.location.coordinates)) {
            let adsLocationPoint = {
                lat: item.location.coordinates[1],
                lon: item.location.coordinates[0]
            };
            let distance = geoDistance.between(adsLocationPoint, userLocationPoint);
            item.distance = distance.human_readable().toString();
        } else {
            item.distance = 'N/A';
        }
        delete item.location;
    });

    return result;
}

module.exports = {
    _mapCalculatedDistance
}
