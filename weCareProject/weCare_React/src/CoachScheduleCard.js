import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './coach-home.css'

class CoachScheduleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentDate : "",
            slot : "",
            bookingId : "",
            userId : ""
        }
    }

    componentDidMount = () => {
        console.log(this.props.details);
        this.setState({ 
            appointmentDate : this.props.details.appointmentDate,
            slot:this.props.details.slot,
            bookingId:this.props.details.bookingId,
            userId:this.props.details.userId
        });
    }

    render () {
        return (
            <div className = "card card3-coach-home">
                <div className="card-body">
                        appointmentDate : {this.state.appointmentDate}<br/>
                        Slot : {this.state.slot}<br/>
                        BookingId : {this.state.bookingId} <br/>
                        UserId : {this.state.userId} <br/>
                </div>
            </div>
        );
    }
}

export default CoachScheduleCard;