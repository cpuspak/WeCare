const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/weCare',
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }
).then('Connected to DB weCare').catch(error=>console.log(error));

const models = {}

const usersSchema = new mongoose.Schema({
        userId : {
            type : String,
            unique: true
        },
        name : {type : String},
        password : {type : String},
        gender : {type : String},
        dateOfBirth : {type : Date},
        email : {
            type : String,
            unique: true
        },
        mobileNumber : {type : String},
        pincode : {type : Number},
        city : {type : String},
        state : {type : String},
        country : {type : String}
    },
    {
        timestamps : {
            createdAt : true,
            updatedAt : true
        }
    }
);

const coachesSchema = new mongoose.Schema(
    {
        coachId : {type : String},
        name : {type : String},
        password : {type : String},
        gender : {type : String},
        dateOfBirth	: {type : Date},
        mobileNumber : {type : Number},
        specialty : {type : String}
    },
    {
        timestamps : {
            createdAt : true,
            updatedAt : true
        }
    }
)

const bookingSchema = new mongoose.Schema(
    {
        bookingId : {type : String},
        userId : {type : String},
        coachId	: {type : String},
        appointmentDate	: {type : Date},
        slot : {type : String}
    },
    {
        timestamps : {
            createdAt : true,
            updatedAt : true
        }
    }
)

models.userModel = mongoose.model('user', usersSchema);
models.coachesModel = mongoose.model('coaches', coachesSchema);
models.bookingModel = mongoose.model('bookingSchema', bookingSchema);

module.exports = models;
