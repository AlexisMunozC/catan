class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            screen: 1,
            userId: '',
            gameStarted: false,
        }        

        this.UpdateUserId = this.UpdateUserId.bind(this)
        this.StartGame = this.StartGame.bind(this)
    }
   
    componentDidMount(){

        Game.GetStarted(
            function(){
                this.setState({gameStarted: true })
            }.bind(this), 

            function(){                    
                this.setState({gameStarted: false })
            }.bind(this)
        )
        
    }

    UpdateUserId(value){
        this.setState({userId: value, screen: (this.state.gameStarted) ? 3 : 2})
    }

    StartGame(){
        Game.SetStarted(true)
    }

    render(){
        
        let content
        switch(this.state.screen){
            case 1: content = <Login gameStarted={this.state.gameStarted} UpdateUserId={this.UpdateUserId} />; break;
            case 2: content = <UsersList StartGame={this.StartGame} userId={this.state.userId}/>; break;
            case 3: content = <GameComponent userId={this.state.userId}/>; break;
        }
        return(
           <React.Fragment>
               {content}
           </React.Fragment>
        )
    }
}


$(document).ready(function(){
    ReactDOM.render(<Index/>, document.getElementById("app"))
}) 