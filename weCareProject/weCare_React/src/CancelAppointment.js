import React from 'react';
import axios from 'axios';
import './user-home.css';



class CancelAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletedFlag : false
        }
    }

    handleGoBack = () => {
        console.log(this.props);
        this.props.changeApMode("set2");
    }

    handleCancel = () => {
        axios.delete("http://localhost:4000/booking/"+this.props.bookingId)
        .then((result) => {
            console.log(result);
            this.setState({deletedFlag : true});
        })
    }

    backToMainPage = () => {
        this.props.handleGoBack();
    }

    render () {
        return (
            <React.Fragment>
                {this.state.deletedFlag == false ? 
                <div className="card3-user-home">
                    <button onClick={this.handleCancel}>Yes, I want to cancel</button>
                    <button onClick={this.handleGoBack}>No, I don't want to cancel</button>
                </div> :
                <div className="card3-user-home">
                    Successfully deleted your appointment <br/>
                    <button onClick={this.backToMainPage}>GoBack</button>
                </div>
                }
            </React.Fragment>
        );
    }
}

export default CancelAppointment;