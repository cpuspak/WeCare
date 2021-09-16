import React from 'react';
import './coach-home.css';

class DynamicUserGoBack extends React.Component {
    constructor(props) {
        super(props);
    }

    handleGoBack = () => {
        console.log("in dyn");
        this.props.handleGoBack();
    }

    render () {
        return (
            <div className = "card">
                <div className = "card-body card3-user-home">
                    <p>Your appointment is successfully scheduled</p>
                    <button onClick={this.handleGoBack}>GoBack</button>
                </div>
            </div>
        );
    }
}

export default DynamicUserGoBack;