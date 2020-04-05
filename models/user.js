class User {
    constructor(){
        this.ref = database.ref('user/')
    }

    static CreateUser(data, successFunction, errorFunction){                
        var key = database.ref().child('users').push().key;
        data['_is_ready'] = false
        database.ref('users/' + key).set(data, function(error){
            if(error){
                if(typeof errorFunction === 'function') errorFunction()
            }else{
                if(typeof successFunction === 'function') successFunction(key)
            }
        })
    }

    static UpdateUser(id, data) {
        database.ref("users/" + id).once('value').then(function(result){
            let userData = result.val()
            let keys = Object.keys(data)
            keys.forEach(k => {
                userData[k] = data[k]
            })
            database.ref('users/' + id).set(userData);
        })
    }
    

    static FindUser(data, foundFunction, notFoundFunction){      
        let keys = Object.keys(data)  
        let ref = database.ref('users/').orderByChild(keys[0])
        ref.equalTo(data[keys[0]]).once('value').then(function(result){
            if(result.numChildren() == 0){
                if(typeof notFoundFunction === 'function') notFoundFunction()
            }else{
                if(typeof foundFunction === 'function') foundFunction(result.val())
            }
        })
    }

    static DeleteUser(id){
        database.ref('users/'+id).remove()
    }

    static GetUsers(UpdateFunction){   
        database.ref('users/').on('value', function(result){
            if(typeof UpdateFunction === 'function') UpdateFunction(result.val())
        })
    }
}