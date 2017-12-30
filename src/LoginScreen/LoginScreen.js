import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import LoginModal from './LoginModal';
import UserInfo from './UserInfo';

let _uiConfig = {
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: 'www.google.com',
  callbacks: {
    signInSuccess: () => false
  }
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    //needs to be initialized before creating firebaseui widget
    _initializeFirebase();
    this.state = {
      userLoggedIn : false,
      photoUrl: '',
      username: '',
      firebaseui: new firebaseui.auth.AuthUI(firebase.auth())
    }

    this.signOut = this.signOut.bind(this);
    this.initApp = this.initApp.bind(this);
  }

  componentDidMount() {
    this.initApp();
    this.checkAuthState();
  }

  initApp() {
    this.state.firebaseui.start('#firebaseui-auth-container', _uiConfig);
  }

  checkAuthState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          userLoggedIn: true,
          photoUrl: user.photoURL,
          username: user.displayName
        });
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          console.log(accessToken);
        });
      } else {
        // User is signed out.
        this.setState({userLoggedIn: false});
        console.log('USER IS NOT SIGNED IN');
      }
    }, function(error) {
      console.log(error);
    });
  }

  signOut() {
    firebase.auth().signOut().then().catch(function(error) {
      console.log(error);
    });
  }

  render() {

    const modal = (<div>
      <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Sign In</button>
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Sign In</h4>
            </div>
            <div className="modal-body">
              <div id="firebaseui-auth-container"></div>
              <div id="account-details"></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
  
        </div>
      </div>
    </div>);

    return (
      <div>
        {this.state.userLoggedIn ? 
        <UserInfo photo={this.state.photoUrl} username={this.state.username} signOut={this.signOut}/> : modal}
      </div>
    );
  }
}

export default LoginScreen;



let _initializeFirebase = () => {
  var config = {
    apiKey: "AIzaSyDck-K-xnsl801NSuxTQK-rg_screst_fw",
    authDomain: "tap-snippets.firebaseapp.com",
    databaseURL: "https://tap-snippets.firebaseio.com",
    projectId: "tap-snippets",
    storageBucket: "",
    messagingSenderId: "193828700920"
  };
  firebase.initializeApp(config);
};