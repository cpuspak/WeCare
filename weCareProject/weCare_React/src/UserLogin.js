import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './user-login.css';

class UserLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            id:"",
            password:"",
            idValidator:false,
            passwordValidator:false,
            initialEditFlags:[false,false],
            errorFromServer:false
        }
    }


    checkValidation = (name, clone) => {
        switch (name) {
            case "id":
                clone[0] = true;
                this.setState({initialEditFlags:clone})
                this.validateId();
                break;
            case "password":
                clone[1] = true;
                this.setState({initialEditFlags:clone});
                this.validatePassword();
                break;
            default:
                break;
        }
    }

    updateTextField = async (e) => {
        const name = await e.target.name;
        const value = await e.target.value;
        this.setState({[name]:value});
        let clone = JSON.parse(JSON.stringify(this.state)).initialEditFlags;
        //console.log(name, this.state.[name]);
        //console.log(name);
        //console.log(this.state.nameValidator, this.state.dateOfBirthValidator, this.state.genderValidator, this.state.mobileNoValidator, this.state.specialityValidator, this.state.passwordValidator);
        //console.log(/^[0-9]{10}$/g.test(this.state.mobileNo));
        this.checkValidation(name,clone);
        //console.log(this.state.initialEditFlags[0] == false || this.state.idValidator );
    }
    
    validateId = () => {
        if (this.state.id.length > 0) this.setState({idValidator: true});
        else this.setState({idValidator: false});
    }
    validatePassword = () => {
        if (this.state.password.length >= 5 && this.state.password.length <= 10) this.setState({passwordValidator:true});
        else this.setState({passwordValidator:false});
    }
    
    handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/users/login",{
            id:this.state.id,
            password:this.state.password
        })
        .then((result) => {
            if (result.status == 200) {
                //console.log(this.props);
                this.props.history.replace({pathname:"/userhome",state:{id:this.state.id}});
                //this.props.history.replace("/coachJoin");
            }
            else console.log(result);
        })
        .catch(err => {
            console.log(err.response.data.message);
            this.setState({errorFromServer:err.response})
        });
    }

    render () {
        return (
            <React.Fragment>
                <Navbar page={"userLogin"} />
                <form className="card-user-login">
                    <div>
                        <label for = "id" className="form-user-login">userId : </label>
                        <input name = "id" type="text" onChange={this.updateTextField} value={this.id}/>
                        {(this.state.initialEditFlags[0] == false || this.state.idValidator)  ? <p></p>:<p className="myerror-user-login">This is a required field</p>}
                    </div>
                    <div>
                        <label for = "password" className="form-user-login" >Password :</label>
                        <input name= "password" type="password" onChange={this.updateTextField} value={this.password}/><br />
                        {(this.state.initialEditFlags[1] == false || this.state.passwordValidator) ? <p></p>:<p className="myerror-user-login">Password must be 5 to 10 characters long</p>}
                    </div>
                    <input type="submit" value="submit" disabled={!(this.state.idValidator && this.state.passwordValidator)} onClick={this.handleLogin}/>
                    {this.state.errorFromServer ? <div><p  className="myerror-user-login">Status : {this.state.errorFromServer.status}</p><p className="myerror-user-login">Message : {this.state.errorFromServer.data.message}</p></div> : <div><p></p></div>}
                </form>
            </React.Fragment>
        );
    }
}

export default UserLogin;