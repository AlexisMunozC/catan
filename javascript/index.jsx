class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            screen: 1,
            userId: ''
        }        

        this.UpdateUserId = this.UpdateUserId.bind(this)
    }
   
    componentDidMount(){

        Game.GetStarted(
        function(){
            this.setState({screen: 2 })
        }.bind(this), 

        function(){                    
            this.setState({screen: 1 })
        }.bind(this))
        
    }

    UpdateUserId(value){
        this.setState({userId: value, screen: 2})
    }

    render(){
        
        let content
        switch(this.state.screen){
            case 1: content = <Login UpdateUserId={this.UpdateUserId} />; break;
            case 2: content = <GameComponent UserId={this.userId}/>; break;
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