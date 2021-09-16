import React from 'react';
import CoachHome from './CoachHome';
import axios from 'axios';
import './coach-home.css'

class CoachProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachId:"",
            dateOfBirth:"",
            mobileNo:"",
            speciality:""
        }
    }

    componentDidMount = () => {
        //console.log(this.props.location.state.id);
        if (this.props.location && this.props.location.state){
            axios.get("http://localhost:4000/coaches/"+this.props.location.state.id)
            .then((result) => {
                console.log(result);
                this.setState({
                    coachId:result.data.coachId,
                    dateOfBirth:result.data.dateOfBirth,
                    mobileNo:result.data.mobileNumber,
                    speciality:result.data.speciality
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    handleViewProfile = () => {
        //console.log(this.props.location.state.id);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/coachViewProfile",state:{id:this.props.location.state.id}})
    }
    handleMySchedule = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/coachSchedules",state:{id:this.props.location.state.id}})
    }
    handleLogout = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/coachLogin"});
    }

    render (){
        return (
            <React.Fragment>
                <div style={{marginBottom:"50px", outlineStyle:"solid"}}>
                    <span style={{width:"10%"}}>WeCare</span>
                    <span style={{width:"10%", marginLeft:"20px"}}>ContactUs==0802233447</span>
                    <button style={{width:"10%", marginLeft:"50%"}} onClick={this.handleViewProfile}>ViewProfile</button>
                    <button style={{width:"10%"}} onClick={this.handleMySchedule}>MySchedule</button>
                    <button style={{width:"10%"}} onClick={this.handleLogout}>Logout</button><br/>
                </div>
                
                {this.props.location.state ?
                <p className="card3-coach-home"> 
                    CoachId : {this.state.coachId}<br/>
                    dateOfBirth : {this.state.dateOfBirth}<br/>
                    PhoneNo : {this.state.mobileNo}<br/>
                    Speciality : {this.state.speciality}<br/>
                </p>
                 : <p></p>}
                
            </React.Fragment>
        );
    }
}

export default CoachProfile;