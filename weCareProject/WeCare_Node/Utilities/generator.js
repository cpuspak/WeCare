/* don't use length in generators as it'll bug out when deleting */

const schema = require('../model/schema');

exports.generateUID = async () => {
    const result = await schema.userModel.find();
    let ids = []
    for (let i = 0 ; i < result.length ; i++){
        ids.push(result[i].userId);
    }
    if (ids.length == 0) return 'UI-0001';
    ids = ids.sort().reverse();
    const latestId = parseInt(ids[0].slice(6));
    const userID = 'UI-000' + (1+latestId).toString();
    return userID;
}

exports.generateCID = async () => {
    const result = await schema.coachesModel.find();
    let ids = []
    for (let i = 0 ; i < result.length ; i++){
        ids.push(result[i].coachId);
    }
    if (ids.length == 0) return 'CI-0001';
    ids = ids.sort().reverse();
    const latestId = parseInt(ids[0].slice(6));
    const coachID = 'CI-000' + (1+latestId).toString();
    return coachID;
}

exports.generateBID = async () => {
    const result = await schema.bookingModel.find();
    let ids = []
    for (let i = 0 ; i < result.length ; i++){
        ids.push(result[i].bookingId);
    }
    if (ids.length == 0) return 'B-0001';
    ids = ids.sort().reverse();
    const latestId = parseInt(ids[0].slice(5));
    const bookingId = 'B-000' + (1+latestId).toString();
    return bookingId;
}