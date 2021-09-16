import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './coach-signup.css';

class CoachSignup extends React.Component {
    constructor() {
        super();
        this.state = {
            name:"",
            password:"",
            dateOfBirth:"",
            gender:"",
            mobileNo:"",
            speciality:"",
            nameValidator:false,
            passwordValidator:false,
            dateOfBirthValidator:false,
            genderValidator:false,
            mobileNoValidator:false,
            specialityValidator:false,
            successDisplay:false,
            initialEditFlags:[false,false,false,false,false,false],
            errorFromServer:false

        }
    }
    checkValidation = async (name, clone) => {
        switch (name) {
            case "name":
                clone[0] = true;
                this.setState({initialEditFlags :clone});
                this.validateName();
                break;
            case "password":
                clone[1] = true
                this.setState({initialEditFlags :clone});
                this.validatePassword();
                break;
            case "dateOfBirth":
                clone[2] = true
                this.setState({initialEditFlags :clone});
                this.validateDateOfBirth();
                break;
            case "gender":
                clone[3] = true
                this.setState({initialEditFlags :clone});
                this.validateGender();
                break;
            case "mobileNo":
                clone[4] = true
                this.setState({initialEditFlags :clone});
                this.validateMobileNo();
                break;
            case "speciality":
                clone[5] = true
                this.setState({initialEditFlags :clone});
                this.validateSpeciality();
                break;
        
            default:
                break;
        }
    }
    

    updateTextField = async (e) => {
        const name =  e.target.name;
        const value =  e.target.value;
        await this.setState({[name]:value});
        console.log(value);
        let clone = JSON.parse(JSON.stringify(this.state)).initialEditFlags;
        //console.log(name, this.state.[name]);
        //console.log(name);
        //console.log(this.state.nameValidator, this.state.dateOfBirthValidator, this.state.genderValidator, this.state.mobileNoValidator, this.state.specialityValidator, this.state.passwordValidator);
        //console.log(/^[0-9]{10}$/g.test(this.state.mobileNo));
        this.checkValidation(name,clone);
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

    handleRegister = (e) => {
        e.preventDefault();
        console.log(this.props);
        const name = this.state.name;
        const password = this.state.password;
        const dateOfBirth = this.state.dateOfBirth;
        const gender = this.state.gender;
        const mobileNumber = this.state.mobileNo;
        const speciality = this.state.speciality

        axios.post("http://localhost:4000/coaches",{
            name:name,
            password:password,
            dateOfBirth:dateOfBirth,
            gender:gender,
            mobileNumber:mobileNumber,
            speciality:speciality
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
                <Navbar page={"coachSignup"} />
                {this.state.successDisplay == false ?
                <React.Fragment>
                    <form className="card-coach-signup">
                        <div>
                            <label for = "name" className="form-coach-signup">Name : </label>
                            <input name = "name" type="text" onChange={this.updateTextField} value={this.state.name}/>
                            {(this.state.initialEditFlags[0] == false || this.state.nameValidator)  ? <p></p>:<p className="myerror1-coach-signup">Name must be 3 to 50 characters long</p>}
                        </div>
                        <div>
                            <label for = "password" className="form-coach-signup">Password : </label>
                            <input name= "password" type="password" onChange={this.updateTextField} value={this.state.password}/><br />
                            {(this.state.initialEditFlags[1] == false || this.state.passwordValidator) ? <p></p>:<p className="myerror1-coach-signup">Password must be 5 to 20 characters long</p>}
                        </div>
                        <div>
                            <label for = "dateOfBirth" className="form-coach-signup">dateOfBirth : </label>
                            <input name = "dateOfBirth" type="date" onChange={this.updateTextField } value={this.state.date}/>
                            {(this.state.initialEditFlags[2] == false || this.state.dateOfBirthValidator) ? <p></p>:<p className="myerror1-coach-signup">Age must be within 20 to 100 years</p>}
                        </div>
                        <div>
                            <label for = "gender" className="form-coach-signup" >Gender : </label><br />
                            <label for = "male" className="form-coach-signup">Male : </label>
                            <input id = "male" name = "gender" type="radio" value="M" onChange={this.updateTextField}/>
                            <label for = "female" className="form-coach-signup" >Female : </label>
                            <input id = "female" name = "gender" type="radio" value="F" onChange={this.updateTextField}/><br />
                            {(this.state.initialEditFlags[3] == false || this.state.genderValidator) ? <p></p>:<p className="myerror1-coach-signup">Please select a gender</p>}
                        </div>
                        <div>
                            <label for = "mobileNo" className="form-coach-signup">mobileNo : </label>
                            <input type="text" onChange={this.updateTextField} name = "mobileNo" value={this.state.mobileNo}/>
                            {(this.state.initialEditFlags[4] == false || this.state.mobileNoValidator) ? <p></p>:<p className="myerror1-coach-signup">Mobile no must be 10 digits</p>}
                        </div>
                        <div>
                            <label for = "speciality" className="form-coach-signup" >Speciality : </label>
                            <input type="text" onChange={this.updateTextField} name = "speciality" value={this.state.speciality}/>
                            {(this.state.initialEditFlags[5] == false || this.state.specialityValidator) ? <p></p>:<p className="myerror1-coach-signup">Speciality must be 10 to 50 characters long</p>}
                        </div>
                        <input type="submit" value="submit" onClick={this.handleRegister} disabled={!(this.state.nameValidator && this.state.dateOfBirthValidator && this.state.genderValidator && this.state.mobileNoValidator && this.state.specialityValidator && this.state.passwordValidator)}/>
                        {this.state.errorFromServer !=false ? <div><p>Status : {this.state.errorFromServer.status}</p><p className="myerror1-coach-signup">Message : {this.state.errorFromServer.data.message}</p></div> : <div><p></p></div>}
                    </form>
                </React.Fragment> :
                <div>
                    <h1>Id is {this.state.id}</h1>
                    <Link to = "/coachLogin" className="mybtn-coach-signup">Login Page</Link>
                </div>
                }
            </React.Fragment>
        );
    }
}

export default CoachSignup;