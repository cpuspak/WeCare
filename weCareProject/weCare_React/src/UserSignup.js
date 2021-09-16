import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './user-signup.css';

class UserSignup extends React.Component {
    
    constructor() {
        super();
        this.state = {
            name:"",
            password:"",
            mobileNo:"",
            email:"",
            dateOfBirth:"",
            gender:"",
            pincode:"",
            city:"",
            state:"",
            country:"",
            nameValidator:false,
            passwordValidator:false,
            mobileNoValidator:false,
            emailValidator:false,
            dateOfBirthValidator:false,
            genderValidator:false,
            pincodeValidator:false,
            cityValidator:false,
            stateValidator:false,
            countryValidator:false,
            successDisplay:false,
            initialEditFlags:[false,false,false,false,false,false,false,false,false,false],
            errorFromServer:false
        }
    }

    checkValidation = (name, clone) => {
        switch (name) {
            case "name":
                clone[0] = true;
                this.setState({initialEditFlags:clone});
                this.validateName();
                break;
            case "password":
                clone[1] = true;
                this.setState({initialEditFlags:clone});
                this.validatePassword();
                break;
            case "mobileNo":
                clone[2] = true;
                this.setState({initialEditFlags:clone});
                this.validateMobileNo();
                break;
            case "email":
                clone[3] = true;
                this.setState({initialEditFlags:clone});
                this.validateEmail();
                break;
            case "dateOfBirth":
                clone[4] = true;
                this.setState({initialEditFlags:clone});
                this.validateDateOfBirth();
                break;
            case "gender":
                clone[5] = true;
                this.setState({initialEditFlags:clone});
                this.validateGender();
                break;
            case "pincode":
                clone[6] = true;
                this.setState({initialEditFlags:clone});
                this.validatePincode();
                break;
            case "city":
                clone[7] = true;
                this.setState({initialEditFlags:clone});
                this.validateCity();
                break;
            case "state":
                clone[8] = true;
                this.setState({initialEditFlags:clone});
                this.validateState();
                break;
            case "country":
                clone[9] = true;
                this.setState({initialEditFlags:clone});
                this.validateCountry();
                break;
            default:
                break;
        }
    }
    updateTextField = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        await this.setState({[name]:value});
        let clone = JSON.parse(JSON.stringify(this.state)).initialEditFlags;
        //console.log(name, this.state.[name]);
        //console.log(name);
        //console.log(this.state.nameValidator, this.state.dateOfBirthValidator, this.state.genderValidator, this.state.mobileNoValidator, this.state.specialityValidator, this.state.passwordValidator);
        //console.log(/^[0-9]{10}$/g.test(this.state.mobileNo));
        this.checkValidation(name, clone);
        
    }
    updateGender = (e) => {
        this.setState({gender:e.target.value});
        //console.log(e.target.checked , e.target.value, this.state.male, this.state.female);
    }
    validateName = () => {
        if (this.state.name.length >= 3 && this.state.name.length <= 50) this.setState({nameValidator: true});
        else this.setState({nameValidator: false});
    }
    validatePassword = () => {
        if (this.state.password.length >= 5 && this.state.password.length <= 10) this.setState({passwordValidator:true});
        else this.setState({passwordValidator:false});
    }
    validateDateOfBirth = () => {
        const currentDate = new Date();
        const dob = new Date(this.state.dateOfBirth);
        if (dob == "Invalid Date") this.setState({dateOfBirthValidator:false});
        else if(((currentDate.getTime() - dob.getTime())/(1000*60*60*24*365)) >= 20 && ((currentDate.getTime() - dob.getTime())/(1000*60*60*24*365)) <= 100) this.setState({dateOfBirthValidator:true})
        else this.setState({dateOfBirthValidator:false});
        
    }
    validateGender = () => {
        if (this.state.gender != "") this.setState({genderValidator:true});
        else this.setState({genderValidator:false});
    }
    validateMobileNo = () => {
        if(/^[0-9]{10}$/g.test(this.state.mobileNo)) this.setState({mobileNoValidator:true});
        else this.setState({mobileNoValidator:false});
    }
    validateSpeciality = () => {
        if (this.state.speciality.length >= 10 && this.state.speciality.length <= 50) this.setState({specialityValidator:true});
        else this.setState({specialityValidator:false});
        console.log(this.state.specialityValidator)
    }

    validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) this.setState({emailValidator:true});
        else this.setState({emailValidator:false});
    }

    validatePincode = () => {
        if (/^[0-9]{6}$/.test(this.state.pincode)) this.setState({pincodeValidator:true});
        else this.setState({pincodeValidator:false});
    }
    validateCity = () => {
        if (this.state.city.length >= 6 && this.state.city.length <= 20) this.setState({cityValidator:true});
        else this.setState({cityValidator:false})
    }
    validateState = () => {
        if (this.state.state.length >= 6 && this.state.state.length <= 20) this.setState({stateValidator:true});
        else this.setState({stateValidator:false})
    }
    validateCountry = () => {
        if (this.state.country.length >= 6 && this.state.country.length <= 20) this.setState({countryValidator:true});
        else this.setState({countryValidator:false})
    }

    handleRegister = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const password = this.state.password;
        const dateOfBirth = this.state.dateOfBirth;
        const gender = this.state.gender;
        const mobileNumber = this.state.mobileNo;
        const email = this.state.email;
        const pincode = this.state.pincode;
        const city = this.state.city;
        const state = this.state.state;
        const country = this.state.country;

        axios.post("http://localhost:4000/users",{
            name:name,
            password:password,
            dateOfBirth:dateOfBirth,
            gender:gender,
            mobileNumber:mobileNumber,
            email:email,
            pincode:pincode,
            city:city,
            state:state,
            country:country
        }).then((result) => {
            console.log("here");
            console.log(result.data.message);
            this.setState({id:result.data.message});
            this.setState({successDisplay:true});
        }).catch((err) => {
            this.setState({successDisplay:false});
            console.log(err.response.data.message);
            this.setState({errorFromServer:err.response})
        })
    }
    render () {
        return (
            <React.Fragment>
                <Navbar page={"userSignup"} />
                {this.state.successDisplay == false ?
                <React.Fragment>
                    <form className="card-user-signup">
                        <div>
                            <label for = "name" className="form-user-signup">Name : </label>
                            <input name = "name" type="text" onChange={this.updateTextField} value={this.state.name}/>
                            {(this.state.initialEditFlags[0] == false || this.state.nameValidator)  ? <p></p>:<p className="myerror-user-signup">Name must be 3 to 50 characters long</p>}
                        </div>
                        <div>
                            <label for = "password" className="form-user-signup">Password : </label>
                            <input name= "password" type="password" onChange={this.updateTextField} value={this.state.password}/><br />
                            {(this.state.initialEditFlags[1] == false || this.state.passwordValidator) ? <p></p>:<p className="myerror-user-signup">Password must be 5 to 20 characters long</p>}
                        </div>
                        <div>
                            <label for = "mobileNo" className="form-user-signup">mobileNo : </label>
                            <input type="text" onChange={this.updateTextField} name = "mobileNo" value={this.state.mobileNo}/>
                            {(this.state.initialEditFlags[2] == false || this.state.mobileNoValidator) ? <p></p>:<p className="myerror-user-signup">Mobile no must be 10 digits</p>}
                        </div>
                        <div>
                            <label for = "email" className="form-user-signup">email : </label>
                            <input type="text" onChange={this.updateTextField} name = "email" value={this.state.email}/>
                            {(this.state.initialEditFlags[3] == false || this.state.emailValidator) ? <p></p>:<p className="myerror-user-signup">Enter valid email</p>}
                        </div>
                        <div>
                            <label for = "dateOfBirth" className="form-user-signup">dateOfBirth : </label>
                            <input name = "dateOfBirth" type="date" onChange={this.updateTextField } value={this.state.date}/>
                            {(this.state.initialEditFlags[4] == false || this.state.dateOfBirthValidator) ? <p></p>:<p className="myerror-user-signup">Age must be within 20 to 100 years</p>}
                        </div>
                        <div>
                            <label for = "gender" className="form-user-signup">Gender : </label><br />
                            <label for = "male" className="form-user-signup">Male : </label>
                            <input id = "male" name = "gender" type="radio" value="M" onChange={this.updateTextField} checked={this.male}/>
                            <label for = "female" className="form-user-signup">Female : </label>
                            <input id = "female" name = "gender" type="radio" value="F" onChange={this.updateTextField} checked={this.female} /><br />
                            {(this.state.initialEditFlags[5] == false || this.state.genderValidator) ? <p></p>:<p className="myerror-user-signup">Please select a gender</p>}
                        </div>
                        <div>
                            <label for = "pincode" className="form-user-signup">pincode : </label>
                            <input type="text" onChange={this.updateTextField} name = "pincode" value={this.state.pincode}/>
                            {(this.state.initialEditFlags[6] == false || this.state.pincodeValidator) ? <p></p>:<p className="myerror-user-signup">pincode must be 6 digits</p>}
                        </div>
                        <div>
                            <label for = "city" className="form-user-signup">city : </label>
                            <input type="text" onChange={this.updateTextField} name = "city" value={this.state.city}/>
                            {(this.state.initialEditFlags[7] == false || this.state.cityValidator) ? <p></p>:<p className="myerror-user-signup">City must be 6 to 20 characters long</p>}
                        </div>
                        <div>
                            <label for = "state" className="form-user-signup">State : </label>
                            <input type="text" onChange={this.updateTextField} name = "state" value={this.state.state}/>
                            {(this.state.initialEditFlags[8] == false || this.state.stateValidator) ? <p></p>:<p className="myerror-user-signup">State must be 6 to 20 characters long</p>}
                        </div>
                        <div>
                            <label for = "country" className="form-user-signup">country : </label>
                            <input type="text" onChange={this.updateTextField} name = "country" value={this.state.country}/>
                            {(this.state.initialEditFlags[9] == false || this.state.countryValidator) ? <p></p>:<p className="myerror-user-signup">Country must be 6 to 20 characters long</p>}
                        </div>
                        <input type="submit" value="submit" onClick={this.handleRegister} disabled={!(this.state.nameValidator && this.state.pincodeValidator && this.state.dateOfBirthValidator && this.state.genderValidator && this.state.mobileNoValidator && this.state.cityValidator && this.state.passwordValidator && this.state.stateValidator && this.state.countryValidator && this.state.emailValidator)}/>
                        {this.state.errorFromServer !=false ? <div><p className="myerror-user-signup">Status : {this.state.errorFromServer.status}</p><p className="myerror-user-signup">Message : {this.state.errorFromServer.data.message}</p></div> : <div><p></p></div>}
                    </form>
                </React.Fragment> :
                <div>
                    <h1>Id is {this.state.id}</h1>
                    <Link to = "/userLogin">Login Page</Link>
                </div>
                }
            </React.Fragment>
        );
    }
}


export default UserSignup;