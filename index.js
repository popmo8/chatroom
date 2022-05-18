import React from 'react';
import ReactDOM from 'react-dom/client';
import Signin from './src/component/signin'
import Chatroom from './src/component/chatroom'


const firebaseConfig = {
    apiKey: "AIzaSyBnNSanqOeI4qq-XUm-P9MQ7Sfzq9cJOEg",
    authDomain: "chatroom-dd89f.firebaseapp.com",
    projectId: "chatroom-dd89f",
    storageBucket: "chatroom-dd89f.appspot.com",
    messagingSenderId: "564790985883",
    appId: "1:564790985883:web:abacfd49a1f9353754723e",
    measurementId: "G-E66WW6YGYC",
    databaseURL: "https://chatroom-dd89f-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);

export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            page:"Signin",
            nowUser:"",
        }
    }

    changeMode = (mode) =>{
        this.setState({page: mode});
    }

    changeUser = (name) =>{
        this.setState({nowUser: name});
    }


    render() {
        if (this.state.page == "Signin") return <Signin setMode={this.changeMode} setUser={this.changeUser} />;
        else if (this.state.page == "Chatroom") return <Chatroom setMode={this.changeMode} userName={this.state.nowUser} />;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
