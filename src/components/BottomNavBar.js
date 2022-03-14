import React from "react";

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

class BottomNavBar extends React.Component {
    render() {

        return (
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-2 px-xl-2 bgPrimary bottomFotter">

                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
                <div>
                    <a href="#!" className="text-white me-4">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#!" className="text-white me-4">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#!" className="text-white me-4">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#!" className="text-white">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
               
            </div>
        );
    }
}

export default BottomNavBar;


