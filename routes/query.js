var User = require('../persister/user');

module.exports = function(app){

    app.get("/admin/user/getUserList", function(req,res){
        User.find({},function(err, usr){
            if(err)
                return done(err);
            return res.send(usr);
        });
    });
}