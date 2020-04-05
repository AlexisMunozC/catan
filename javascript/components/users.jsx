class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users: {},
            userId: this.props.userId
        }

        this.ChangeReady = this.ChangeReady.bind(this)
        this.StartGame = this.StartGame.bind(this)
    }

    componentDidMount(){
        let UpdateFunction = function(users){
            this.setState({users: users})            
        }.bind(this)
        User.GetUsers(UpdateFunction)
    }

    DeleteUser(id, e){
        User.DeleteUser(id)
    }

    ChangeReady(){
        let {userId, users} = this.state        
        let _isReady =  users[userId]['_isReady']         
        User.UpdateUser(userId, {_isReady: !_isReady})
    }

    StartGame(){
        this.props.StartGame()
    }

    render(){

        let allReady = true

        let {userId, users} = this.state                        
        let _isReady =  (users[userId] == undefined) ? false : users[userId]['_isReady']
        let username =  (users[userId] == undefined) ? false : users[userId]['username']
        if(!_isReady) allReady = false

        let keys = Object.keys(users)
        let usersHtml = keys.map((key, index) =>{            
            let user = users[key]           
            if(key != userId){
                if(!user['_isReady']) allReady = false

                let classUser = "R-ROW R-ALIGN-X-START R-ALIGN-Y-CENTER"
                classUser = (user['_isReady']) ? " ready" : " not-ready"
                return(
                    <div key={index} className="table-row R-ROW R-ALIGN-X-SPACE R-ALIGN-Y-CENTER">
                        <p className={classUser}>{user['username']}</p>
                        <button onClick={this.DeleteUser.bind(this, key)} className="button red">Eliminar</button>
                    </div>
                )
            }
        })
        
        if(keys.length == 1){
            usersHtml = <div className="table-row R-ROW R-ALIGN-X-SPACE R-ALIGN-Y-CENTER">
                            <p>No hay usuarios</p>                            
                        </div>
        }

        return(
            <div className="users-list-container R-COLUMN R-ALIGN-X-CENTER R-ALIGN-Y-CENTER">
                <h1 className="title">Bienvenido {username}</h1>
                <div className="table R-COLUMN">
                    <div className="table-header R-ROW R-ALIGN-X-SPACE R-ALIGN-Y-CENTER">
                        <h1>Usuarios</h1>
                        <button className="button" onClick={this.ChangeReady}>
                            {(_isReady) ? "No estoy listo" : "Estoy listo"}
                        </button>
                    </div>
                    {usersHtml}
                </div>  
                {(allReady) &&      
                    <button className="button" style={{maxWidth:"200px", marginTop:"20px"}}
                        onClick={this.StartGame}>Jugar</button>     
                }
            </div>
        )
    }
}