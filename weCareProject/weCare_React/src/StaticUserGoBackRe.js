import React from 'react';

class StaticUserGoBack extends React.Component {
    constructor(props) {
        super(props);
    }

    handleGoBack = () => {
        this.props.changeApMode("set2");
    }

    render () {
        return (
            <div className = "card">
                <div className = "card-body">
                    Your appointment is successfully scheduled
                    <button onClick={this.handleGoBack}>GoBack</button>
                </div>
            </div>
        );
    }
}

export default StaticUserGoBack;