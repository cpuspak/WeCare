import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import CoachScheduleCard from './CoachScheduleCard';

class CoachSchedules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings : []
        }
    }
    componentDidMount = () => {
        console.log("gg");
        console.log(this.props.location.state);
        console.log(this.props.location.state);
        if (this.props.location && this.props.location.state){
            axios.get("http://localhost:4000/coaches/booking/"+this.props.location.state.id
            ).then((result) => {
                console.log(result);
                this.setState({bookings:result.data});
                console.log(this.state.bookings[0].bookingId);
                console.log(this.props.location.state && this.state.bookings.length > 0);
            }).catch((err) => {console.log(err.response)});
        }
        
    }
    //this.state.bookings.forEach((element) => {
        //<CoachScheduleCard details={element} />})
/*
        <p>{this.state.bookings.forEach((element) => <CoachScheduleCard details={element}/>)}</p>
        <Navbar page={"coachHome"} id = {this.props.location.state}/>
    */

   handleViewProfile = () => {
        console.log(this.props.location.state.id);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/coachViewProfile",state:{id:this.props.location.state.id}})
    }
    handleMySchedule = () => {
        console.log(this.props)
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
                {this.props.location.state && this.state.bookings.length > 0 ?
                <p> 
                    {this.state.bookings.map(element => <CoachScheduleCard details={element} />)}
                </p>
                 : <p></p>}

                {this.props.location.state && this.state.bookings.length == 0 ? <p>No planned schedules</p> : <p></p>}
                {this.props.location.state === undefined ? <p>Invalid User</p> : <p></p>}
            </React.Fragment>
        
        );
    }
}

export default CoachSchedules;
