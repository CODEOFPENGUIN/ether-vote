var User = require('../persister/user');

module.exports = function(app){

    app.get("/admin/user/getUserList",isAuthenticated, function(req,res){
        User.find({},function(err, usr){
            if(err)
                return done(err);
            return res.send(usr);
        });
    });

	app.post('/admin/user/deleteAll',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');
		User.remove({}, function(err, user){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}


			res.send({"result":true});
		})

		
	});
	app.post('/admin/user/update',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var username = req.param('username');

        User.findOne({ 'username' : username },
        function(err,user){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
            }
            
            user.address = req.param('address');
			user.save(function(){
				res.send({"result":true});	
			})
		})
	});
	app.post('/admin/user/init',isAuthenticated, function(req, res) {
		// set the user's local credential
		User.updateMany({},
			{$set:{address:undefined}},
			function(err,user){
				if (err){
				console.log('Error in Saving bbs: '+err);  
				res.send({"result":false});
				}
				res.send({"result":true});	
				
			})
	});
}

	// As with any middleware it is quintessential to call next()
	// if the user is authenticated
	var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
          return next();
        res.redirect('/login');
      }
  