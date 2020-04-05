class Game {

    static GetStarted(TrueFunction, FalseFunction){   
        database.ref('game_started/').on('value', function(result){            
            if(result.val()){
                if(typeof TrueFunction === 'function') TrueFunction()
            }else{
                if(typeof FalseFunction === 'function') FalseFunction()
            }
        })
    }

    static SetStarted(_start){
        database.ref('game_started/').set(_start)
    }
}