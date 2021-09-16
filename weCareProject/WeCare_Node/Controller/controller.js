const validator = require('../Utilities/validator');
const generator = require('../Utilities/generator');
const schema = require('../model/schema');



exports.defaultPath = (req, res) => {
    res.send('Default path');
};

exports.userRegister = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const mobileNumber = req.body.mobileNumber;
    const email = req.body.email;
    const pincode = req.body.pincode;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    const userId = await generator.generateUID();
    const emailStatus = validator.validateEmail(email);
    if (validator.validateName(name) && validator.validatePassword(password) 
    && validator.validateDOB(dateOfBirth) && validator.validateGender(gender) 
    && validator.validateMobileNo(mobileNumber) && (await emailStatus).verified && validator.validatePincode(pincode) 
    && validator.validateCity(city) && validator.validateState(state) && validator.validateCountry(country)){
        const data = {
            "userId" : userId,
            "name" : req.body.name,
            "password" : req.body.password,
            "dateOfBirth" : req.body.dateOfBirth,
            "gender" : req.body.gender,
            "mobileNumber" : req.body.mobileNumber,
            "email" : req.body.email,
            "pincode" : req.body.pincode,
            "city" : req.body.city,
            "state" : req.body.state,
            "country" : req.body.country
        }
        try{
            await schema.userModel.create(data);
            res.status(201).json( {'message':userId } );
        } catch (err) {
            console.log(userId);
            res.status(400).json( {'message':'error updating to db'} );
        }
    } else {
        if (!validator.validateName(name)) {
            res.status(400).json( {'message':'Name should have minimum 3 and maximum 50 characters'} );
        } else if (!validator.validatePassword(password)) {
            res.status(400).json( {'message':'Password should have minimum 5 and maximum 10 characters'} );
        } else if (!validator.validateDOB(dateOfBirth)) {
            res.status(400).json( {'message':'Age should be greater than 20 and less than 100'} );
        } else if (!validator.validateGender(gender)) {
            res.status(400).json( {'message':'Gender should be either M or F'} );
        } else if (!validator.validateMobileNo(mobileNumber)) {
            res.status(400).json( {'message':'Mobile Number should have 10 digits'} );
        } else if (!(await emailStatus).verified) {
            if ((await emailStatus).status == 1){
                res.status(400).json( {'message':'Email should be a valid one'} );
            } else {
                res.status(400).json( {'message':'User exists with this email id'} );
            }
        } else if (!validator.validatePincode(pincode)) {
            res.status(400).json( {'message':'Pincode should have 6 digits'} );
        } else if (!validator.validateCity(city)) {
            res.status(400).json( {'message':'City should have minimum 3 and maximum 20 characters'} );
        } else if (!validator.validateState(state)) {
            res.status(400).json( {'message':'State should have minimum 3 and maximum 20 characters'} );
        } else if (!validator.validateCountry(country)) {
            res.status(400).json( {'message':'Country should have minimum 3 and maximum 20 characters'} );
        } else {
            res.status(400).send( {'message':'Unknown error'} );
        }
    }
    
}

exports.userLogin = async (req, res) => {
    const userId = req.body.id;
    const password = req.body.password;
    const access = await validator.validateUser(userId, password);

    if (access) res.status(200).send('true');
    else res.status(400).json( {'message':'incorrect userid or password'} )
}

exports.coachRegister = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const mobileNumber = req.body.mobileNumber;
    const speciality = req.body.speciality;

    const coachId = await generator.generateCID();
    if (validator.validateName(name) && validator.validatePassword(password) 
    && validator.validateDOB(dateOfBirth) && validator.validateGender(gender) 
    && validator.validateMobileNo(mobileNumber) && validator.validateSpeciality(speciality)){
        const data = {
            "coachId" : coachId,
            "name" : req.body.name,
            "password" : req.body.password,
            "dateOfBirth" : req.body.dateOfBirth,
            "gender" : req.body.gender,
            "mobileNumber" : req.body.mobileNumber,
            "speciality" : req.body.speciality
        }
        try{
            await schema.coachesModel.create(data);
            res.status(201).json( {'message':coachId } );
        } catch (err) {
            console.log(coachId);
            res.status(400).json( {'message':'error updating to db'} );
        }
    } else {
        if (!validator.validateName(name)) {
            res.status(400).json( {'message':'Name should have minimum 3 and maximum 50 characters'} );
        } else if (!validator.validatePassword(password)) {
            res.status(400).json( {'message':'Password should have minimum 5 and maximum 10 characters'} );
        } else if (!validator.validateDOB(dateOfBirth)) {
            res.status(400).json( {'message':'Age should be greater than 20 and less than 100'} );
        } else if (!validator.validateGender(gender)) {
            res.status(400).json( {'message':'Gender should be either M or F'} );
        } else if (!validator.validateMobileNo(mobileNumber)) {
            res.status(400).json( {'message':'Mobile Number should have 10 digits'} );
        } else if (!validator.validateSpeciality(speciality)) {
            res.status(400).json( {'message': 'Specialty should have 10 to 50 characters'} );    
        } else {
            res.status(400).send( {'message':'Unknown error'} );
        }
    }
    
}

exports.coachLogin = async (req, res) => {
    const coachId = req.body.id;
    const password = req.body.password;
    const access = await validator.validateCoach(coachId, password);

    if (access) res.status(200).send('true');
    else res.status(400).json( {'message':'incorrect coachid or password'} )
}

exports.availableCoaches = async (req, res) => {
    const result = await schema.coachesModel.find();
    res.status(200).send(result);
}

exports.coachDetails = async (req, res) => {
    const result = await schema.coachesModel.find({coachId:req.params.coachId});
    if (result.length) res.status(201).send(result[0]);
    else res.status(400).json( {'message':'Coach id does not exists'} );
}

exports.userDetails = async (req, res) => {
    const result = await schema.userModel.find({userId:req.params.userId});
    if (result.length) res.status(200).send(result[0]);
    else res.status(400).json( {'message':'User id does not exists'} );
}

exports.makeAppointment = async (req, res) => {
    const slot = req.body.Slot;
    console.log(req.body);
    const dateOfAppointment = new Date(req.body.DateOfAppointment.toString());
    if (! await (validator.validateUserId(req.params.userId))) res.status(400).json( {'message':'User Id does not exist'} );
    else if (! await (validator.validateCoachId(req.params.coachId))) res.status(400).json( {'message':'Coach Id does not exist'} );
    else if (!validator.validateSlotStructure(slot)) res.status(400).json( {'message':'slot should be valid one'} );
    else if (! await(validator.sevenDaysCheck(dateOfAppointment))) res.status(400).json( {'message':'date should be any upcoming 7 days'} );
    else if (! await (validator.validateSlot(slot, req.params.coachId, req.params.userId, dateOfAppointment))) res.status(400).json( {'message':'there is an appointment in this slot already'} );
    else {
        const bookingId = (await generator.generateBID());
        try {
            const data = {
                bookingId : bookingId,
                userId : req.params.userId,
                coachId	: req.params.coachId,
                appointmentDate	: dateOfAppointment,
                slot : req.body.Slot
            }
            await schema.bookingModel.create(data);
            res.status(200).send('true');
        } catch (error) {
            console.log(error);
            res.status(400).json( {'message' : 'error inserting to database'} );
        }
    }
}

exports.rescheduleAppointment = async (req, res) => {
    const slot = req.body.Slot;
    const dateOfAppointment = new Date(req.body.DateOfAppointment.toString());
    if (! await (validator.validateBookingId(req.params.bookingId))) res.stasus(400).json( {'message':'Booking Id does not exist'} );
    else if (!validator.validateSlotStructure(slot)) res.status(400).json( {'message':'slot should be valid one'} );
    else if (! await(validator.sevenDaysCheck(dateOfAppointment))) res.status(400).json( {'message':'date should be any upcoming 7 days'} );
    else if (! await (validator.validateSlot(slot, req.params.coachId, req.params.userId, dateOfAppointment, req.params.bookingId))) res.status(400).json( {'message':'there is an appointment in this slot already'} );
    else {
        const bookingId = req.params.bookingId;
        try {
            const result = await schema.bookingModel.findOne({bookingId : bookingId});
            result.slot = slot;
            result.appointmentDate = dateOfAppointment;
            await result.save();
            res.status(200).send('true');
        } catch (error) {
            console.log(error);
            res.status(400).json( {'message' : 'error inserting to database'} );
        }
    }
}

exports.cancelAppointment = async(req, res) => {
    const bookingId = req.params.bookingId;
    if (! await ( validator.validateBookingId(bookingId))) return res.status(400).json( {'message' : 'Could not delete this appointment'} );
    try {
        await (await schema.bookingModel.findOne( {bookingId: bookingId} )).remove();
        res.status(200).send('true');
    } catch(error) {
        console.log(error);
        res.status(400).json( {'message': 'error deleting from database'} );
    }
}

exports.coachAppointments = async (req, res) => {
    const coachId = req.params.coachId;
    const result = await schema.bookingModel.find( {coachId : coachId} );
    if (result.length > 0) res.status(200).send(result);
    else res.status(400).json( {'message' : 'Could not find any bookings for this coachId'} );
}

exports.userAppointments = async (req, res) => {
    const userId = req.params.userId;
    const result = await schema.bookingModel.find( {userId : userId} );
    if (result.length > 0) res.status(200).send(result);
    else res.status(400).json( {'message' : 'Could not find any appointment details'} );
}

exports.invalidPath = async (req, res) => {
    res.status(404).json( {'message' : 'invalid path'} );
}