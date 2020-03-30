
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: ""
        }
        this.UpdateUsername = this.UpdateUsername.bind(this)
        this.CreateUser = this.CreateUser.bind(this)
    }

    componentDidMount(){               
        
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

        let foundFunction = function(){
            alert("Ese usuario ya existe")
        }.bind(this)

        User.FindUser({username: this.state.username}, foundFunction, notFoundFunction)
    }

    render(){
        return(
            <div className="login-container R-COLUMN R-ALIGN-X-CENTER R-ALIGN-Y-CENTER">
                <div className="login-form R-COLUMN R-ALIGN-X-CENTER R-ALIGN-Y-CENTER">
                    <h1>Ingresa Sesion</h1>
                    <input className="textfield" value={this.state.username} 
                        placeholder="Username" onChange={this.UpdateUsername}/>
                    <button className="button" onClick={this.CreateUser} >Entrar</button>
                </div>
            </div>
        )
    }
}
