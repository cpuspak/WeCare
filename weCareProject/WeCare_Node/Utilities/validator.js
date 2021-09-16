const schema = require('../model/schema');

exports.validateName = (name) => {
    if(name.length < 3 || name.length > 50) return false;
    return true;
};

exports.validatePassword = (password) => {
    if(password.length < 5 || password.length > 10) return false;
    return true;
}

exports.validateDOB = (dateOfBirth) => {
    let dob = new Date(dateOfBirth);
    const currentDate = new Date();
    if ((currentDate.getTime() - dob.getTime()) / (24*60*60*1000) < (20*365) || (currentDate.getTime() - dob.getTime()) / (24*60*60*1000) > (100*365)) 
        return false;
    return true;
}

exports.validateGender = (gender) => {
    if (gender == 'F' || gender == 'M') return true;
    return false;
}

exports.validateMobileNo = (mobileNumber) => {
    try {
        const intMobNo = parseInt(mobileNumber);
        if (intMobNo <= 9999999999 && intMobNo > 999999999) return true;
        return false;
    } catch (error) {
        return false;
    }
}

exports.validateEmail = async (email) => {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        const mailUniqueVal = (await schema.userModel.find( {email:email} ));
        if (mailUniqueVal.length == 0) return {verified:true};
        else return {verified:false, status:0};
    } else {
        return {verified:false, status:1};
    }
}


exports.validatePincode = (pincode) => {
    if (pincode >= 100000 && pincode < 1000000) return true;
    return false;
}

exports.validateCity = (city) => {
    if (city.length < 3 || city.length > 20) return false;
    return true;
}

exports.validateState = (state) => {
    if (state.length < 3 || state.length > 20) return false;
    return true;
}

exports.validateCountry = (country) => {
    if (country.length < 3 || country.length > 20) return false;
    return true;
}

exports.validateUser = async (userId, password) => {
    const result = await (schema.userModel.find( {userId : userId, password : password} ));
    if (result.length > 0) return true;
    return false;
}

exports.validateSpeciality = async (speciality) => {
    if (speciality.length >= 10 && speciality.length <= 50) return true;
    return false;
}

exports.validateCoach = async (coachId, password) => {
    const result = await (schema.coachesModel.find( {coachId : coachId, password : password} ));
    if (result.length > 0) return true;
    return false;
}

exports.validateUserId = async (userId) => {
    const result = await (schema.userModel.find( {userId : userId} ));
    if (result.length > 0) return true;
    return false;
}

exports.validateCoachId = async (coachId) => {
    const result = await (schema.coachesModel.find( {coachId : coachId} ));
    if (result.length > 0) return true;
    return false;
}

exports.validateSlotStructure = (slot) => {
    const slotSplitted = slot.trim(' ').split(' ');
    if (slotSplitted.length != 5) return false;
    else {
        try {
            const timeInDay = ['AM','PM'];
            let startTime = parseInt(slotSplitted[0]);
            let endTime = parseInt(slotSplitted[3]);
            if (typeof(startTime) != 'number' || typeof(endTime) !='number' || startTime > 12 || endTime > 12 || !(timeInDay.includes(slotSplitted[1])) || !(timeInDay.includes(slotSplitted[4])) || !(timeInDay.includes(slotSplitted[4])) || slotSplitted[2] != 'to') {
                return false;
            }
            if (slotSplitted[1] == 'PM') startTime += 12;
            if (slotSplitted[4] == 'PM') endTime += 12;
            if (startTime >= endTime) return false;
            return true;
        } catch (error) {return false;}
    }
}

function coincide(slot1, slot2) {
    const slot1Split = slot1.trim(' ').split(' ');
    const slot2Split = slot2.trim(' ').split(' ');
    let startTimeSlot1 = parseInt(slot1Split[0]);
    let endTimeSlot1 = parseInt(slot1Split[3]);
    let startTimeSlot2 = parseInt(slot2Split[0]);
    let endTimeSlot2 = parseInt(slot2Split[3]);
    if (slot1Split[1] == 'PM') startTimeSlot1 += 12;

    if (slot2Split[1] == 'PM') startTimeSlot2 += 12;

    if (slot1Split[4] == 'PM') endTimeSlot1 += 12;

    if (slot2Split[4] == 'PM') endTimeSlot2 += 12;

    if (endTimeSlot1 <= startTimeSlot2 || endTimeSlot2 <= startTimeSlot1) return false;
    return true;
}

exports.validateSlot = async (slot, coachId, userId, dateOfAppointment, bookingId) => {
    if (!coachId) {
        const bookings = await schema.bookingModel.find( {bookingId: bookingId} );
        const appointmentDate = new Date(dateOfAppointment);
        const noOfDaysAppointment = parseInt(appointmentDate.getTime() / (1000*60*60*24));
        const previousDate = bookings[0].appointmentDate;
        const noOfDaysAppointmentPrev = parseInt(previousDate.getTime() / (1000*60*60*24));
        if (coincide(slot, bookings[0].slot) && noOfDaysAppointment == noOfDaysAppointmentPrev) return false;
        return true;
    }
    const coachBookings = await schema.bookingModel.find({ coachId: coachId, appointmentDate:dateOfAppointment });
    if (coachBookings.length == 0) return true;
    for(let i = 0 ; i < coachBookings.length ; i++) {
        if (coincide(slot, coachBookings[i].slot)) return false;
    }

    const userBookings = await schema.bookingModel.find( {userId: userId} );
    for(let i = 0 ; i < userBookings.length ; i++) {
        if (coincide(slot, userBookings[i].slot)) return false;
    } 
    return true;
}

exports.sevenDaysCheck = async (dateOfAppointment) => {
    const currentDate = new Date();
    const appointmentDate = new Date(dateOfAppointment);
    const noOfDaysCurrent = parseInt(currentDate.getTime() / (1000*60*60*24));
    const noOfDaysAppointment = parseInt(appointmentDate.getTime() / (1000*60*60*24));
    if ((appointmentDate.getTime() - currentDate.getTime()) > 7*24*60*60*1000 || noOfDaysAppointment < noOfDaysCurrent) return false;
    else return true;
}


exports.validateBookingId = async (bookingId) => {
    const result = await schema.bookingModel.find( {bookingId : bookingId} );
    if (result.length > 0) return true;
    return false;
}
