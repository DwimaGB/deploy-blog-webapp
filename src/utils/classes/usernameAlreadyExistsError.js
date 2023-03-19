
class UsernameAlreadyExistsError extends Error{
    constructor(message){
        super(message);
        this.name = 'UsernameAlreadyExistsError';
    }
}

module.exports = UsernameAlreadyExistsError;