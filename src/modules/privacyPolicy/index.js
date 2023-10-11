import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, onChangeValueLogin } from './actions';
import { setToast, resetToast } from '../Global/actions';

import PropTypes from 'prop-types';
import './style.css';


const REDIRECT_URI = 'http://localhost:3000/account/login'

export class PrivacyPolicy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }


  render() {

    return (
      <body class="c12 c19 doc-content"><a id="id.gjdgxs"></a>
        <h2 class="c16"><span class="c3 c18">This Privacy Policy applies to the SportzMitra</span></h2>
        <p class="c8"><span class="c3">SportzMitra has built this app as free app for all users. SportzMitra recognises the
          importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Policy
          describes how we treat user information we collect on </span><span class="c22"><a class="c6"
            href="https://www.google.com/url?q=https://sportzmitra.com&amp;sa=D&amp;source=editors&amp;ust=1697029512018332&amp;usg=AOvVaw275eChgdSSrxTD2jOYYTud">https://sportzmitra.com</a></span><span
              class="c7 c3">&nbsp; and other offline sources. This Privacy Policy applies to current and former visitors
            to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy
            Policy.</span></p>
        <p class="c4"><span class="c2 c11">Information we collect</span></p>
        <p class="c5"><span class="c7 c3">The app does use third party services that may collect information used to
          identify you.</span></p>
        <p class="c5"><span class="c3 c7">Link to privacy policy of third-party service providers used by the app</span></p>
        <ul class="c20 lst-kix_list_2-0 start">
          <li class="c13 li-bullet-0"><span class="c17"><a class="c6"
            href="https://www.google.com/url?q=https://www.google.com/policies/privacy/&amp;sa=D&amp;source=editors&amp;ust=1697029512018850&amp;usg=AOvVaw0wDOosYXFwgXidjXDguGiH">Google
            Play Services</a></span></li>
        </ul>
        <p class="c4"><span class="c2">Information you post.</span><span class="c3">&nbsp;We collect information you post in
          a public space on our website or on a third-party social media site belonging to SportzMitra.</span></p>
        <p class="c4"><span class="c2">Demographic information.</span><span class="c3">&nbsp;We may collect demographic
          information about you, events you like, events you intend to participate in, or any other information
          provided by your during the use of our website. We might collect this as a part of a survey also.</span></p>
        <p class="c4"><span class="c2">Other information.</span><span class="c3">&nbsp;If you use our website, we may
          collect information about your IP address and the browser you&#39;re using. We might look at what site you
          came from, duration of time spent on our website, pages accessed or what site you visit when you leave us.
          We might also collect the type of mobile device you are using, or the version of the operating system your
          computer or device is running. </span></p>
        <p class="c4"><span class="c2">We collect information in different ways.</span></p>
        <p class="c4"><span class="c2">We collect information directly from you.</span><span class="c3">&nbsp;We collect
          information if you post a comment on our websites or ask us a question through phone or email.</span></p>
        <p class="c4"><span class="c2">We collect information from you passively.</span><span class="c3">&nbsp;We use
          tracking tools like Google Analytics, Google Webmaster, browser cookies and web beacons for collecting
          information about your usage of our website. </span></p>
        <p class="c4"><span class="c2">We get information about you from third parties.</span><span class="c7 c3">&nbsp;For
          example, if you use an integrated social media feature on our websites. The third-party social media site
          will give us certain information about you. This could include your name and email address.</span></p>
        <p class="c5"><span class="c11 c2">Children&#39;s Privacy</span></p>
        <p class="c5"><span class="c7 c3">These Services do not address anyone under the age of 13. I do not knowingly
          collect personally identifiable information from children under 13. In the case I discover that a child
          under 13 has provided me with personal information, I immediately delete this from our servers. If you are a
          parent or guardian and you are aware that your child has provided us with personal information, please
          contact me so that I will be able to do necessary actions.</span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c4"><span class="c11 c2">Use of your personal information</span></p>
        <p class="c4"><span class="c2">We use information to contact you: </span><span class="c3">We might use the
          information you provide to contact you for confirmation of a purchase on our website or for other
          promotional purposes.</span></p>
        <p class="c4"><span class="c2">We use information to respond to your requests or questions.</span><span
          class="c3">&nbsp;We might use your information to confirm your registration for an event.</span></p>
        <p class="c4"><span class="c2">We use information to improve our products and services.</span><span
          class="c3">&nbsp;We might use your information to customize your experience with us. This could include
          displaying content based upon your preferences.</span></p>
        <p class="c4"><span class="c2">We use information to look at site trends and customer interests.</span><span
          class="c3">&nbsp;We may use your information to make our website and products better. We may combine
          information we get from you with information about you we get from third parties.</span></p>
        <p class="c4"><span class="c2">We use information for security purposes.</span><span class="c3">&nbsp;We may use
          information to protect our company, our customers, or our websites.</span></p>
        <p class="c4"><span class="c2">We use information for marketing purposes.</span><span class="c3">&nbsp;We might send
          you information about special promotions or offers. We might also tell you about new features or products.
          These might be our own offers or products, or third-party offers or products we think you might find
          interesting. </span></p>
        <p class="c4"><span class="c3">We use information as otherwise permitted by law.</span></p>
        <p class="c4"><span class="c2">Sharing of information with third-parties</span></p>
        <p class="c4"><span class="c2">We will share information with third parties who perform services on our behalf.
        </span><span class="c3">We share information with vendors who help us manage our online registration process.
          Some vendors may be located outside of India.</span></p>
        <p class="c4"><span class="c2">We will share information with the event organizers.</span><span class="c3">&nbsp;We
          share your information with event organizers and other parties responsible for fulfilling the purchase
          obligation. The event organizers and other parties may use the information we give them as described in
          their privacy policies. </span></p>
        <p class="c4"><span class="c2">We will share information with our business partners.</span><span
          class="c3">&nbsp;This includes a third party who provide or sponsor an event, or who operates a venue where
          we hold events. Our partners use the information we give them as described in their privacy policies.
        </span></p>
        <p class="c4"><span class="c2">We may share information if we think we have to in order to comply with the law or to
          protect ourselves.</span><span class="c3">&nbsp;We will share information to respond to a court order or
            subpoena. We may also share it if a government agency or investigatory body requests. Or, we might also
            share information when we are investigating potential fraud. </span></p>
        <p class="c4"><span class="c2">We may share information with any successor to all or part of our
          business.</span><span class="c3">&nbsp;For example, if part of our business is sold we may give our customer
            list as part of that transaction.</span></p>
        <p class="c4"><span class="c2">We may share your information for reasons not described in this policy.</span><span
          class="c3">&nbsp;We will tell you before we do this.</span></p>
        <p class="c4"><span class="c2">Email Opt-Out</span></p>
        <p class="c4"><span class="c2">You can opt out of receiving our marketing emails.</span><span class="c3">&nbsp;To
          stop receiving our promotional emails, please email sportzmitra@gmail.com. It may take about ten days to
          process your request. Even if you opt out of getting marketing messages, we will still be sending you
          transactional messages through email and SMS about your purchases. <br /></span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c4"><span class="c2">Third party sites </span></p>
        <p class="c4"><span class="c3">If you click on one of the links to third party websites, you may be taken to
          websites we do not control. This policy does not apply to the privacy practices of those websites. Read the
          privacy policy of other websites carefully. We are not responsible for these third party sites.</span></p>
        <p class="c4"><span class="c3 c12">If you have any questions about this Policy or other privacy concerns, you can
          also email us at </span><span class="c3">sportzmitra</span><span class="c3 c10"><a class="c6"
            href="mailto:privacy@bookmyseats.in">@gmail.com</a></span><span class="c3 c12">&nbsp;</span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c4"><span class="c2">Updates to this policy</span></p>
        <p class="c4"><span class="c3">From time to time we may change our privacy practices. We will notify you of any
          material changes to this policy as required by law. We will also post an updated copy on our website. Please
          check our site periodically for updates.</span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c4"><span class="c2">Jurisdiction</span></p>
        <p class="c9"><span class="c3">If you choose to visit the website, your visit and any dispute over privacy is
          subject to this Policy and the website&#39;s terms of use. In addition to the foregoing, any disputes
          arising under this Policy shall be governed by the laws of India. </span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c4"><span class="c11 c2">Contact Us</span></p>
        <p class="c9"><span class="c7 c3">If you have any questions or suggestions about my Privacy Policy, do not hesitate
          to contact me.</span></p>
        <p class="c1"><span class="c0"></span></p>
        <p class="c9 c14"><span class="c0"></span></p>
      </body>

    );
  }
}

PrivacyPolicy.propTypes = {
  onSubmitForm: PropTypes.func,
  errors: PropTypes.object
};

function mapStateToProps(state) {
  console.log('state', state)
  return {
    count: state.login.count,
    password: state.login.password,
    username: state.login.username,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickLogin: (id) => dispatch(login(id)),
    onChangeValueLogin: (evt) => dispatch(onChangeValueLogin(evt)),
    setToast: (success, message) => dispatch(setToast(success, message)),
    resetToast: (evt) => dispatch(resetToast(evt)),

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
