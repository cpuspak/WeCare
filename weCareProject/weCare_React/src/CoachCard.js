import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user-home.css';

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
            <div className = "card card3-user-home">
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