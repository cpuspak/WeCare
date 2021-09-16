import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import CoachCard from './CoachCard';
import StaticUserGoBack from './StaticUserGoBack';
import './user-home.css';

class UserHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coaches : [],
            apMode : 0,
            coachSelected : "",
            newAppointmentDate:"",
            timeSlot:"",
            editedNewAppointment : [false, false],
            newAppointmentDateValidation:false,
            errorFromServer:false
        }
    }
    componentDidMount = () => {
        console.log("gg");
        console.log(this.props.location.state);
        console.log(this.props.location.state);
        if (this.props.location && this.props.location.state){
            axios.get("http://localhost:4000/coaches/all"
            ).then((result) => {
                console.log(result);
                this.setState({coaches:result.data});
                console.log(this.state.coaches[0].bookingId);
                console.log(this.props.location.state && this.state.coaches.length > 0);
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
        console.log("in view profile");
        //console.log(this.props.location.state.id);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userViewProfile",state:{id:this.props.location.state.id}})
    }
    handleMySchedule = () => {
        console.log(this.props.location)
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}})
    }
    handleLogout = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userLogin"});
    }
    handleUserHome = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userHome", state:{id:this.props.location.state.id}});
    }

    setApMode = (coach) => {
        console.log(this.state.apMode);
        if (coach != "set2"){
            this.setState({apMode:1});
            this.setState({coachSelected:coach});
        } else this.setState({apMode:0});
        
    }

    handleBooking = async (e) => {
        e.preventDefault();
        console.log(this.props.location.state);
        console.log(this.state.coachSelected);
        const newAppointmentDate = this.state.newAppointmentDate;
        const slot = this.state.timeSlot;
        console.log(slot);
        axios.post("http://localhost:4000/users/booking/"+this.props.location.state.id +"/"+this.state.coachSelected,{
            Slot:slot,
            temp:1,
            DateOfAppointment:newAppointmentDate
        }
        ).then((result) => {
            console.log(result);
            this.setState({apMode:2});
            this.setState({coachSelected:""});
        }).catch((err) => {
            console.log(err);
            this.setState({errorFromServer:err.response})
        })
        
    }

    updateNewAppointmentRadio = async (e) => {
        await this.setState({timeSlot:e.target.value});
        console.log(this.state.timeSlot);
        console.log("changing radios");
        let clone = JSON.parse(JSON.stringify(this.state)).editedNewAppointment;
        clone[1] = true;
        await this.setState({editedNewAppointment:clone});
        console.log(!(this.state.newAppointmentDate && this.state.editedNewAppointment[1]));
    }

    handleNewAppointmentDate = async (e) => {
        const newAppointmentDate = e.target.value;

        await this.setState({newAppointmentDate:newAppointmentDate});
        let clone = JSON.parse(JSON.stringify(this.state)).editedNewAppointment;
        clone[0] = true;
        await this.setState({editedNewAppointment:clone});
        console.log(this.state.editedNewAppointment[0] == true , this.newAppointmentDateValidation == false);
        //console.log(newAppointmentDate)
        this.validateNewAppointmentDate();
    }

    validateNewAppointmentDate = () => {
        const currentDate = new Date();
        const appointmentDate = new Date(this.state.newAppointmentDate);
        //console.log(appointmentDate);
        if (appointmentDate == "Invalid Date") this.setState({newAppointmentDateValidation:false});
        else {
            const noOfDaysCurrent = parseInt(currentDate.getTime() / (1000*60*60*24));
            const noOfDaysAppointment = parseInt(appointmentDate.getTime() / (1000*60*60*24));
            console.log(((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) > 7 || ((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) < 0);
            if (((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) > 7 || ((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) < 0) this.setState({newAppointmentDateValidation:false});
            else this.setState({newAppointmentDateValidation:true});
        }
    }
    handleGoBack = () => {
        this.setState({apMode:0});
        this.setState({coachSelected:""});
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
                {this.props.location.state && this.state.coaches.length > 0 && (this.state.apMode == 0)  ?
                <p> 
                    {this.state.coaches.map(element => <CoachCard details={element} changeApMode={this.setApMode}/>)}
                </p>
                 : <p></p>}
                {this.props.location.state && this.state.coaches.length > 0 && (this.state.apMode == 1)  ?
                <div> 
                    <div className = "card">
                        <div className = "card-body card3-user-home">
                            <form>
                                Proceed with your appointment
                                <div>
                                    <input type="date" name="newAppointmentDate" value={this.state.newAppointmentDate} onChange={this.handleNewAppointmentDate} />
                                    {(this.state.editedNewAppointment[0] == true && this.state.newAppointmentDateValidation == false) ? <p>Required date should be any upcoming 7 days</p> : <p></p>} 
                                </div>
                                <div>
                                    <label for = "preferredSlot">PreferredSlot</label><br />
                                    <label for = "9to10">9AM to 10AM</label>
                                    <input id = "9to10" style={{width:"5%"}} name = "preferredSlot" type="radio" value="9 AM to 10 AM" onChange={this.updateNewAppointmentRadio}/>
                                    <label for = "10to11">10AM to 11AM</label>
                                    <input id = "10to11" style={{width:"5%"}} name = "preferredSlot" type="radio" value="10 AM to 11 AM" onChange={this.updateNewAppointmentRadio}/>
                                    <label for = "11to12">11AM to 12AM</label>
                                    <input id = "11to12" style={{width:"5%"}} name = "preferredSlot" type="radio" value="11 AM to 12 AM" onChange={this.updateNewAppointmentRadio}/>
                                    <label for = "2to3">2PM to 3PM</label>
                                    <input id = "2to3" style={{width:"5%"}} name = "preferredSlot" type="radio" value="2 PM to 3 PM" onChange={this.updateNewAppointmentRadio}/>
                                    <label for = "3to4">3AM to 4AM</label>
                                    <input id = "3to4" style={{width:"5%"}} name = "preferredSlot" type="radio" value="3 PM to 4 PM" onChange={this.updateNewAppointmentRadio}/>
                                    <label for = "4to5">4PM to 5PM</label>
                                    <input id = "4to5" style={{width:"5%"}} name = "preferredSlot" type="radio" value="4 PM to 5 PM" onChange={this.updateNewAppointmentRadio}/>
                                    
                                </div>
                                <input type="submit" value="confirmYourAppointment" onClick={this.handleBooking} disabled={!(this.state.newAppointmentDate && this.state.editedNewAppointment[1])} />
                                <button onClick={this.handleGoBack}>GoBack</button>
                                {this.state.errorFromServer ? <div><p>Status : {this.state.errorFromServer.status}</p><p>Message : {this.state.errorFromServer.data.message}</p></div> : <div><p></p></div>}
                            </form>
                        </div>
                    </div>
                    
                </div>
                 : <p></p>}
                {this.state && this.state.apMode == 2 ? <StaticUserGoBack changeApMode={this.setApMode} /> : <p></p>}
                {this.props.location.state && this.state.coaches.length == 0 ? <p>No coaches in platform</p> : <p></p>}
                {this.props.location.state === undefined ? <p>Invalid User</p> : <p></p>}
            </React.Fragment>
    
        );
    }

}

export default UserHome;
