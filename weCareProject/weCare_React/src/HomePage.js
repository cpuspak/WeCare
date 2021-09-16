import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class HomePage extends React.Component {
    render () {
        return (
            <React.Fragment>
                    <div>
                        <Navbar page={'home'} />
                        <div className="card-home">
                            <div className="card-body">
                                <Link to="/coachSignup" className="mybtn-home">CoachSignup</Link><br />
                                <Link to="/coachLogin" className="mybtn-home">CoachLogin</Link>
                            </div>
                        </div>
                        <div className="card-home" style={{width:"18rem"}}>
                            <div className="card-body">
                                <Link to="/userSignup" className="mybtn-home">UserSignup</Link><br />
                                <Link to="/userLogin" className="mybtn-home">UserLogin</Link>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default HomePage;