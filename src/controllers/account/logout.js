

const logout = (req, res) => {

    req.logOut((err) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/');
        }
    })

    
}


module.exports = logout;