import React from "react";

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

class BottomNavBar extends React.Component {
    render() {

        return (
            <footer id="footer">

            <div class="container">
              <div class="copyright">
                &copy; Copyright <strong><span>SportzMitra</span></strong>. All Rights Reserved
              </div>
            </div>
          </footer>
        );
    }
}

export default BottomNavBar;


