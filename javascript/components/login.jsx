
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            gameStarted: false,
        }
        this.UpdateUsername = this.UpdateUsername.bind(this)
        this.CreateUser = this.CreateUser.bind(this)
    }

    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps.gameStarted != this.state.gameStarted){
            this.setState({gameStarted: newProps.gameStarted})
        }
    }

    UpdateUsername(e){
        let value = e.target.value
        this.setState({username: value})
    }

    CreateUser(){
        let notFoundFunction = function(){
            let successFunction = function(userId){                
                this.props.UpdateUserId(userId)                
            }.bind(this)

            let errorFunction = function(){
                alert("Hubo un problema")
            }.bind(this)

            User.CreateUser({username: this.state.username}, successFunction, errorFunction)
        }.bind(this)

        let notFoundFunctionGameStarted =  function(){
            alert("Ese usuario no existe")
        }

        let foundFunction = function(result){
            let keys = Object.keys(result)
            this.props.UpdateUserId(keys[0])
        }.bind(this)

        User.FindUser({username: this.state.username}, foundFunction, 
                (this.state.gameStarted) ? notFoundFunctionGameStarted : notFoundFunction)
    }

    render(){
        return(
            <div className="login-container R-COLUMN R-ALIGN-X-CENTER R-ALIGN-Y-CENTER">
                <div className="login-form R-COLUMN R-ALIGN-X-CENTER R-ALIGN-Y-CENTER">
                    <h1>Ingresa Sesion {(this.state.gameStarted) && "(Hay un juego en curso)"}</h1>
                    <input className="textfield" value={this.state.username} 
                        placeholder="Username" onChange={this.UpdateUsername}/>
                    <button className="button" onClick={this.CreateUser} >Entrar</button>
                    {(this.state.gameStarted) && 
                        <button className="button" style={{marginTop: "20px"}}>Ver juego</button>
                    }
                </div>
            </div>
        )
    }
}
