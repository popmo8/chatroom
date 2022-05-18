import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';



class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtEmail:"",
            txtPassword:"",
            loginEmail:""
        }
    }

    handleChange_email = (event) =>{   //update the value of email
        this.setState({txtEmail: event.target.value});
    }
    handleChange_password = (event) =>{   //update the value of password
        this.setState({txtPassword: event.target.value});
    }

    initAccount=(name)=>{
        firebase.database().ref('users/'+name).set("")
    }

    Login = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword).then((result) => {
            console.log("success login");
            var user = result.user;
            this.props.setUser(user.displayName);   //setstate nowUser in props.state
            this.props.setMode("Chatroom");   //setstate nowRoom in props.state
        }).catch(function(error) {
            alert("failed login");
        });
    }

    Signup = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword).then((result)=> {
            var name = prompt("Account name:");
            firebase.database().ref('users').once('value', (snapshot=>{
                while (name == "" || name == null || snapshot.child(name).exists()){
                    name = prompt("Please insert again or insert another account name:");
                }
                this.initAccount(name);   //add user name data into "users"
                alert("success signup");
                return result.user.updateProfile({   //update the user name data in firebase authentication
                    displayName: name
                })

            }));
            
        }).catch(function(error) {
            alert(error);
            this.setState({txtEmail: "", txtPassword: ""});   //clear the input bar
        });
        
    }

    google_login = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=> {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log("google login success");
            this.props.setUser(user.displayName);   //setstate nowUser in props.state
            this.props.setMode("Chatroom");   //setstate nowRoom in props.state
        }).catch(function(error) {
            alert("google login failed");
        });
    }

    

    render() {
        return (
            <Grid container spacing={0}>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{height:'5vh'}}></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <lable class="logo hh">WELCOME</lable>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <div style={{height:'5vh', width:'100%'}}></div>
                        <TextField style={{width:"100%"}} id="outlined-basic" label="Email address" variant="outlined" value={this.state.txtEmail} onChange={this.handleChange_email} required />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <div style={{height:'5vh', width:'100%'}}></div>
                        <TextField style={{width:"100%"}} id="outlined-basic" label="Password" variant="outlined" value={this.state.txtPassword} onChange={this.handleChange_password} required />  

                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <div style={{height:'7vh', width:'100%'}}></div>
                        <Button variant="contained" onClick={()=>this.Login()} style={{width:'100%', height:'7vh'}}>Sign in</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <div style={{height:'7vh', width:'100%'}}></div>
                        <Button variant="contained" onClick={()=>this.google_login()} style={{width:'100%', height:'7vh'}}>Login with Google</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <div style={{height:'7vh', width:'100%'}}></div>
                        <Button variant="contained" onClick={()=>this.Signup()} style={{width:'100%', height:'7vh'}}>New account</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Grid>
        );
    }
}


export default Signin;