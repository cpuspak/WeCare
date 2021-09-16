import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <React.Fragment>
                {this.props.page === "home" || this.props.page === "coachLogin" || this.props.page === "userLogin" || this.props.page === "coachSignup" || this.props.page === "userSignup"?
                    <div style={{marginBottom:"100px", outlineStyle:"solid"}}>
                        <span style={{width:"10%"}}>WeCare</span>
                        <span style={{width:"10%", float:"right", marginRight:"100px"}}>ContactUs==0802233447</span>
                    </div> : 
                <p></p>
                }
            </React.Fragment>
        );
    }
}

export default Navbar;