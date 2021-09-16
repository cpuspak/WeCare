import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user-home.css'

class UserScheduleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentDate : "",
            slot : "",
            bookingId : "",
            userId : "",
            coachId:""
        }
    }

    componentDidMount = () => {
        console.log(this.props.details);
        console.log(this.props.details.userId);
        this.setState({ 
            appointmentDate : this.props.details.appointmentDate,
            slot:this.props.details.slot,
            bookingId:this.props.details.bookingId,
            userId:this.props.details.userId,
            coachId:this.props.details.coachId
        });
    }


    handleCancel = () => {
        this.props.changeApMode("set3");
        this.props.cancelBooking(this.state.bookingId);
    }

    handleBookAppointment = () => {
        console.log("here");
        console.log(this.props)
        if (this.props) {
            //console.log(this.props.location.state)
            this.props.changeApMode(this.state.bookingId);
        };
    }
    render () {
        return (
            <div>
                <div className="card-body card3-user-home">
                        appointmentDate : {this.state.appointmentDate}<br/>
                        Slot : {this.state.slot}<br/>
                        BookingId : {this.state.bookingId} <br/>
                        UserId : {this.state.userId} <br/>
                        CoachId : {this.state.coachId}<br/>
                        <button onClick={this.handleBookAppointment}>Reschedule Appointment</button><br/>
                        <button onClick={this.handleCancel}>Cancel Appointment</button>

                </div>
            </div>
        );
    }
}

export default UserScheduleCard;




/*


import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class CoachCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            coachId : "",
            mobileNo : "",
            speciality : ""
        }
    }

    componentDidMount = async () => {
        console.log(this.props.details);
        await this.setState({ 
            name : this.props.details.name,
            coachId:this.props.details.coachId,
            mobileNo:this.props.details.mobileNumber,
            speciality:this.props.details.speciality
        });
        console.log(this.state.coachId);
    }

    handleBookAppointment = () => {
        console.log("here");
        console.log(this.props)
        if (this.props) {
            //console.log(this.props.location.state)
            this.props.changeApMode(this.state.coachId);
        };
    }

    render () {
        return (
            <div className = "card">
                <div className="card-body">
                        name : {this.state.name}<br/>
                        coachId : {this.state.coachId}<br/>
                        mobileNo : {this.state.mobileNo} <br/>
                        speciality : {this.state.speciality} <br/>
                        <button onClick={this.handleBookAppointment}>Book An appointment</button>
                </div>
            </div>
        );
    }
}

export default CoachCard;
*/