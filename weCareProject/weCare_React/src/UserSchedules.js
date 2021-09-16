import React from 'react';
import axios from 'axios';
import UserScheduleCard from './UserScheduleCard';
import StaticUserGoBack from './StaticUserGoBack';
import StaticUserGoBackRe from './StaticUserGoBackRe';
import CancelAppointment from './CancelAppointment';
import DynamicUserGoBack from './DynamicUserGoBack';
import './user-home.css'


class UserSchedules extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userId:"",
            appointments : [],
            apMode : 0,
            bookingSelected : "",
            reAppointmentDate:"",
            timeSlot:"",
            editedReAppointment : [false, false],
            reAppointmentDateValidation:false,
            cancelBookingId:"",
            errorFromServer:false
        }
    }

    componentDidMount = async () => {
        console.log("in userschedule ",this.props.location.state);
        if (this.state.userId == "" && this.props.location.state != undefined) await this.setState({userId:this.props.location.state.id})
        //console.log(this.state.userId);
        console.log (this.state.userId == "")
        axios.get("http://localhost:4000/users/booking/"+this.state.userId
        ).then((result) => {
            //console.log(result);
            this.setState({appointments:result.data});
        }).catch((err) => {
            console.log(this.state.userId);
            console.log(err.response, this.state.userId);
        })
    }
    setCancelBookingId = (bookingId) => {
        this.setState({cancelBookingId:bookingId});
    }

    handleViewProfile = () => {
        console.log("in view profile");
        //console.log(this.props.location.state.id);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userViewProfile",state:{id:this.props.location.state.id}})
    }
    handleMySchedule = () => {
        console.log(this.props);
        console.log(this.state.userId);
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}})
    }
    handleLogout = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userLogin"});
    }
    handleUserHome = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.id) this.props.history.replace({pathname:"/userHome", state:{id:this.props.location.state.id}});
    }

    setApMode = (booking) => {
        console.log(this.state.apMode);
        if (booking != "set2" && booking != "set3"){
            this.setState({apMode:1});
            this.setState({bookingSelected:booking});
            console.log(this.state.userId);
        } else if (booking == "set2") this.setState({apMode:0});
        else if (booking == "set3") this.setState({apMode:3});
        
    }

    handleReBooking = async (e) => {
        e.preventDefault();
        console.log(this.props.location.state);
        console.log(this.state.bookingSelected);
        const reAppointmentDate = this.state.reAppointmentDate;
        const slot = this.state.timeSlot;
        console.log(slot);
        axios.put("http://localhost:4000/booking/"+this.state.bookingSelected,{
            Slot:slot,
            temp:1,
            DateOfAppointment:reAppointmentDate
        }
        ).then((result) => {
            console.log(result);
            this.setState({apMode:2});
            this.setState({bookingSelected:""});
        }).catch((err) => {
            console.log(err);
            this.setState({errorFromServer:err.response})
        })
        
    }

    updateReAppointmentRadio = async (e) => {
        await this.setState({timeSlot:e.target.value});
        console.log(this.state.timeSlot);
        console.log("changing radios");
        let clone = JSON.parse(JSON.stringify(this.state)).editedReAppointment;
        clone[1] = true;
        await this.setState({editedReAppointment:clone});
        console.log(!(this.state.reAppointmentDate && this.state.editedReAppointment[1]));
    }

    handleReAppointmentDate = async (e) => {
        const reAppointmentDate = e.target.value;

        await this.setState({reAppointmentDate:reAppointmentDate});
        let clone = JSON.parse(JSON.stringify(this.state)).editedReAppointment;
        clone[0] = true;
        await this.setState({editedReAppointment:clone});
        console.log(this.state.editedReAppointment[0] == true , this.reAppointmentDateValidation == false);
        //console.log(newAppointmentDate)
        this.validateReAppointmentDate();
    }

    validateReAppointmentDate = () => {
        const currentDate = new Date();
        const appointmentDate = new Date(this.state.reAppointmentDate);
        //console.log(appointmentDate);
        if (appointmentDate == "Invalid Date") this.setState({reAppointmentDateValidation:false});
        else {
            const noOfDaysCurrent = parseInt(currentDate.getTime() / (1000*60*60*24));
            const noOfDaysAppointment = parseInt(appointmentDate.getTime() / (1000*60*60*24));
            console.log(((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) > 7 || ((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) < 0);
            if (((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) > 7 || ((appointmentDate.getTime() - currentDate.getTime()) / (1000*60*60*24)) < 0) this.setState({newAppointmentDateValidation:false});
            else this.setState({reAppointmentDateValidation:true});
        }
    }
    handleGoBack = async () => {
        axios.get("http://localhost:4000/users/booking/"+this.props.location.state.id
        ).then((result) => {
            //console.log(result);
            console.log("in handle go back");
            this.setState({appointments:result.data});
            this.setState({apMode:0});
            this.setState({bookingSelected:""});
            this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}});
        }).catch((err) => {
            console.log(err);
            this.setState({appointments:[]});
            this.setState({apMode:0});
            this.setState({bookingSelected:""});
            this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}});
        });
        /*
        console.log(this.props.location,"in reqd section");
        const data = await axios.get("http://localhost:4000/users/booking/"+this.props.location.state.id);
        console.log(this.props.location);
        await this.setState({appointments:data.data});
        await this.setState({apMode:0});
        await this.setState({bookingSelected:""});
        */
       console.log(this.props.location.state.id);
       //this.props.history.replace({pathname:"/userAppointments",state:{id:this.props.location.state.id}});
        
    }
/*
    componentDidUpdate = () => {
        axios.get("http://localhost:4000/users/booking/"+this.props.location.state.id
        ).then((result) => {
            //console.log(result);
            this.setState({appointments:result.data});
        }).catch((err) => {
            console.log(err);
        })
    }
*/
    render () {
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
                {this.props.location.state && this.state.appointments.length > 0 && (this.state.apMode == 0) ?
                <p> 
                    {this.state.appointments.map(element => <UserScheduleCard details = {element} changeApMode={this.setApMode} cancelBooking={this.setCancelBookingId}/>)}
                </p>
                 : <p></p>}
                {this.props.location.state && this.state.appointments.length > 0 && (this.state.apMode == 1)  ?
                <div> 
                    <div className = "card">
                        <div className = "card-body card3-user-home">
                            <form>
                                Reschedule your appointment
                                <div>
                                    <input type="date" name="reAppointmentDate" value={this.state.reAppointmentDate} onChange={this.handleReAppointmentDate} />
                                    {(this.state.editedReAppointment[0] == true && this.state.reAppointmentDateValidation == false) ? <p>Required date should be any upcoming 7 days</p> : <p></p>} 
                                </div>
                                <div>
                                    <label for = "preferredSlot">PreferredSlot</label><br />
                                    <label for = "9to10">9AM to 10AM</label>
                                    <input id = "9to10" style={{width:"5%"}} name = "preferredSlot" type="radio" value="9 AM to 10 AM" onChange={this.updateReAppointmentRadio}/>
                                    <label for = "10to11">10AM to 11AM</label>
                                    <input id = "10to11" style={{width:"5%"}} name = "preferredSlot" type="radio" value="10 AM to 11 AM" onChange={this.updateReAppointmentRadio}/>
                                    <label for = "11to12">11AM to 12AM</label>
                                    <input id = "11to12" style={{width:"5%"}} name = "preferredSlot" type="radio" value="11 AM to 12 AM" onChange={this.updateReAppointmentRadio}/>
                                    <label for = "2to3">2PM to 3PM</label>
                                    <input id = "2to3" style={{width:"5%"}} name = "preferredSlot" type="radio" value="2 PM to 3 PM" onChange={this.updateReAppointmentRadio}/>
                                    <label for = "3to4">3AM to 4AM</label>
                                    <input id = "3to4" style={{width:"5%"}} name = "preferredSlot" type="radio" value="3 PM to 4 PM" onChange={this.updateReAppointmentRadio}/>
                                    <label for = "4to5">4PM to 5PM</label>
                                    <input id = "4to5" style={{width:"5%"}} name = "preferredSlot" type="radio" value="4 PM to 5 PM" onChange={this.updateReAppointmentRadio}/>
                                    
                                </div>
                                <input type="submit" value="confirmYourAppointment" onClick={this.handleReBooking} disabled={!(this.state.reAppointmentDate && this.state.editedReAppointment[1])} />
                                {/*<button onClick={this.handleGoBack}>GoBack</button>*/}
                                {this.state.errorFromServer ? <div><p>Status : {this.state.errorFromServer.status}</p><p>Message : {this.state.errorFromServer.data.message}</p></div> : <div><p></p></div>}
                            </form>
                        </div>
                    </div>
                    
                </div>
                : <p></p>}
                {this.state && this.state.apMode == 2 ? <DynamicUserGoBack changeApMode={this.setApMode} handleGoBack={this.handleGoBack}/> : <p></p>}
                {this.state && this.state.apMode == 3 ? <CancelAppointment token = {1}changeApMode={this.setApMode} bookingId={this.state.cancelBookingId} handleGoBack={this.handleGoBack}/> : <p></p>}
                
                
                
                {this.props.location.state && this.state.appointments.length == 0 ? <p>No bookings in platform</p> : <p></p>}
                {this.props.location.state === undefined ? <p>Invalid User</p> : <p></p>}
            </React.Fragment>
        );
    }
}

export default UserSchedules;



