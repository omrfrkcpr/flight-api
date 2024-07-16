module.exports = async (Model, passengerInfos, userId) => {
  let passengerIds = [],
    passenger = {};

  for (let passengerInfo of passengerInfos) {
    if (typeof passengerInfo == "object") {
      passenger = await Model.findOne({ email: passengerInfo.email }); // Unique olan tckn/passportId'yi kontrol et
      if (!passenger) {
        Object.assign(passengerInfo, { createdId: userId }); // Passenger create ederken createdId ekle

        passenger = await Model.create(passengerInfo);
      }
    } else {
      // String olarak id bilgisi gelirse
      passenger = await Model.findOne({ _id: passengerInfo }); // id check
    }

    // Passenger bilgisi varsa passengera ait id bilgisi arraye ekle
    if (passenger) passengerIds.push(passenger._id);
  }

  return passengerIds;
};
