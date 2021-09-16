import React from 'react';
import axios from 'axios';
import './user-home.css';

class UserViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            dateOfBirth:"",
            email:"",
            mobileNo:"",
            address:"",
            pincode:""

        }
    }

    componentDidMount = () => {
        console.log(this.props.location.state.id);
        if (this.props.location && this.props.location.state){
            axios.get("http://localhost:4000/users/"+this.props.location.state.id)
            .then((result) => {
                console.log(result.data.mobileNumber);
                this.setState({
                    name:result.data.name,
                    dateOfBirth:result.data.dateOfBirth,
                    email:result.data.email,
                    mobileNo:result.data.mobileNumber,
                    address:result.data.city + ", " + result.data.state + ", " + result.data.country,
                    pincode:result.data.pincode
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    handleViewProfile = () => {
        console.log(this.props.location.state.id);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userViewProfile",state:{id:this.props.location.state.id}})
    }
    handleMySchedule = () => {
        console.log("here");
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}})
    }
    handleLogout = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userLogin"});
    }
    handleUserHome = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userHome", state:{id:this.props.location.state.id}});
    }
    render (){
        return (
            <React.Fragment>
                <div style={{marginBottom:"50px", outlineStyle:"solid"}}>
                    <span style={{width:"10%"}}>WeCare</span>
                    <span style={{width:"10%", marginLeft:"10px"}}>ContactUs==0802233447</span>
                    <button style={{width:"8%", marginLeft:"50%"}} onClick={this.handleUserHome}>ViewHome</button>
                    <button style={{width:"8%"}} onClick={this.handleViewProfile}>ViewProfile</button>
                    <button style={{width:"8%"}} onClick={this.handleMySchedule}>MySchedule</button>
                    <button style={{width:"7%"}} onClick={this.handleLogout}>Logout</button>
                </div>
                {this.props.location.state ?
                <p className="card3-user-home"> 
                    name: {this.state.name} <br/>
                    dateOfBirth:{this.state.dateOfBirth}<br/>
                    email:{this.state.email}<br/>
                    mobileNo:{this.state.mobileNo}<br/>
                    address:{this.state.address}<br/>
                    pincode:{this.state.pincode}<br/>
                </p>
                 : <p></p>}
            </React.Fragment>
        );
    }
}

export default UserViewProfile;