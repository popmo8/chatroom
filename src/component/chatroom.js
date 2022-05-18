import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FaceIcon from '@mui/icons-material/Face';


class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowRoom: "Enter a room to start chatting!!!",
            mes: "",
            outList: [],
            roomList: []
        }
    }

    componentDidMount(){
        this.getAllRoom(this.props.userName);   //when switching into chatroom, listen to room data and continue listening
        var database = firebase.database();
        database.ref('users').once('value', (snapshot=>{
            if (!snapshot.child(this.props.userName).exists()){
                database.ref('users/'+this.props.userName).set("");   //if the user name is not in "/users", initialize the user data
            }
        }));
    }

    handleMessage = (event) =>{   //update mes
        this.setState({mes: event.target.value});
    }

    sendMessage = ()=>{
        if (this.state.nowRoom == "Enter a room to start chatting!!!") return;
        var database = firebase.database();   //push message into "chatRooms/nowRoom/message"
        database.ref('chatRooms/'+this.state.nowRoom+'/message').push({user: this.props.userName,mes: this.state.mes});
        this.setState({mes:""});   //clear the input bar
        this.getAllMessage(this.state.nowRoom);
    }

    Logout = ()=>{
        firebase.auth().signOut().then((result)=>{
            this.props.setMode("Signin");
        }).catch((e)=>{
            console.log(e);
            alert("failed logout");
        });
    }

    createRoom = ()=>{
        var database = firebase.database();
        var roomName = "";
        var out = 0;
        var roomName = prompt("Chat room name:");
        if (roomName == "" || roomName == null){
            return;
        }
        database.ref('chatRooms').once('value', (snapshot=>{
            if (snapshot.child(roomName).exists()){   //check if this room name exists
                alert("This room name exist. Please try another room name.");
                out = 1;
            }
        })).then(()=>{
            if (out == 1) return;
            this.setState({nowRoom: roomName});   //enter the room after creating it
            database.ref('users/'+this.props.userName).push(roomName);
            database.ref('chatRooms/'+roomName).set("");
            this.getAllRoom(this.props.userName);
            this.getAllMessage(roomName);
        });
    }



    getAllRoom = (userName)=>{   //get room list and update
        firebase.database().ref('users/'+userName).on('value', 
            (snapshot)=>{
                if (snapshot.val() != ""){
                    var list = [];
                    snapshot.forEach((childSnapshot)=>{
                        list.push(childSnapshot.val());
                    })
                    this.setState({roomList: list});
                }
                
        })
    }
    
    getAllMessage = (roomName)=>{   //get message list and update
        firebase.database().ref('chatRooms/'+roomName+'/message').on('value', 
            (snapshot)=>{
                var list = [];
                snapshot.forEach((childSnapshot)=>{   //iteration in messages
                    var message = childSnapshot.val().mes;
                    var talker = childSnapshot.val().user;
                    list.push({user:talker, speak:message});
                })
                this.setState({outList: list});
        })
    }

    addUser= ()=>{
        if (this.state.nowRoom == "Enter a room to start chatting!!!"){
            alert("You should add user in a room.");
            return;
        }
        var addUserName = prompt("Add user name?");
        var database = firebase.database();
        database.ref('users').once('value', (snapshot=>{
            if (snapshot.child(addUserName).exists()){   //check if this user exists
                database.ref('users/'+addUserName).push(this.state.nowRoom);
                alert(addUserName+" is in "+this.state.nowRoom);
            }else{alert("Please enter again or try another user name");}
        }));

    }

    changeRoom = (roomName)=>{  //when clicking the room button, update "nowRoom" in state and listen to message
        this.setState({nowRoom: roomName});
        this.getAllMessage(roomName);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Chip icon={<FaceIcon />} label={this.props.userName} style={{width:'100%'}} />
                </Grid>
                <Grid item xs={9}>
                    <Paper square='true' elevation={2} style={{backgroundColor: '#5da7e5', padding:10, height:'100%'}}>
                        <Typography component="p" style={{fontFamily: 'monospace', fontSize: 20, color: 'white'}}>
                            {this.state.nowRoom}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <div class="scroll1">
                        <ButtonGroup size="large" orientation="vertical" aria-label="vertical outlined button group" style={{width:"100%"}}>
                        {this.state.roomList.map((element, index)=>(
                            element == this.state.nowRoom ?   //show dark button if you are in this room
                            <Button variant="contained" key={index} onClick={()=>this.changeRoom(element)}>{element}</Button>
                            : <Button key={index} onClick={()=>this.changeRoom(element)}>{element}</Button>)
                        )}
                        </ButtonGroup>
                    </div>
                </Grid>
                <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                <Grid item xs={9}>
                    <div class="scroll2">
                    
                        {this.state.outList.map((element, index)=>(
                            element.user == this.props.userName ?   //show the message and avatar at the right position if you are the speaker
                            <Stack direction = "row" spacing={1} justifyContent="flex-end">
                                <Stack direction="column" spacing={0} >
                                    <Typography align='right' fontSize={12}>{element.user}</Typography>
                                    <Chip label={element.speak} color='primary'/>
                                </Stack>
                                <Stack>
                                    <Avatar sx={{ width: 40, height: 40, bgcolor:'gray'}}>{element.user.length > 2 ? element.user[0]:element.user}</Avatar>
                                </Stack>

                            </Stack>
                            
                            
                            :
                            <Stack direction = "row" spacing={1} justifyContent="flex-start">
                                
                                <Stack>
                                    <Avatar sx={{ width: 40, height: 40, bgcolor:'gray'}}>{element.user.length > 2 ? element.user[0]:element.user}</Avatar>
                                </Stack>
                                <Stack direction="column" spacing={0} >
                                    <Typography align='left' fontSize={12}>{element.user}</Typography>
                                    <Chip label={element.speak} color='secondary' />
                                </Stack>
                            </Stack>
                            /*<Stack direction="row" spacing={1} justifyContent="flex-start">
                                <Avatar>{element.user.length > 2 ? element.user[0]:element.user}</Avatar>
                                <Chip label={element.speak} />
                            </Stack>*/
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12}> 
                    <Divider flexItem/>
                </Grid>
                <Grid item xs={1}>
                    <div style={{height:'5vh'}}>
                        <Button size="small" variant="contained" startIcon={<MeetingRoomIcon />} onClick={()=>this.createRoom()} style={{width:"100%", height:"100%"}}>New Room</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div style={{height:'5vh'}}>
                        <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={()=>this.addUser()} style={{width:"100%", height:"100%"}}>Add User</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div style={{height:'5vh'}}>
                        <Button size="small" variant="contained" startIcon={<LogoutIcon />} onClick={()=>this.Logout()} style={{width:"100%", height:"100%"}}>Log Out</Button>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div style={{height:'5vh'}}>
                        <TextField size="small" style={{width:"100%", height:"1vh"}} id="outlined-basic" label="" variant="outlined" value={this.state.mes} onChange={this.handleMessage} />
                        
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div style={{height:'5vh'}}>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={()=>this.sendMessage()}>Send</Button>
                    </div>
                </Grid>
            </Grid>
        );
    }
}





export default Chatroom;