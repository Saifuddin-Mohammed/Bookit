const Group = require('../models/group');
const User = require('../models/user');

//Find user Groups and display
exports.index = (req, res, next)=>{
    userID = req.session.user;
    User.findById(userID).populate('groups')
    .then(userObj=>{
        if(userObj){
            return res.render('./group/index', {userObj});
        } else {
            return res.render('./group/index')
        }        
    })
    .catch(err=>next(err))
};

exports.new = (req, res)=>{
    res.render('./group/new');
};

exports.addGroup = (req, res, next)=>{
    let userId = req.session.user;
    let group = new Group();
    group.author = userId;
    let name = req.body.name; //get name from respose
    group.groupName = name;
    let emails = req.body.emails; //get emails from response
    emails = emails.replace(/\s/g, ''); //remove spaces
    let emailArray = emails.split(',') //split emails at each ,
    User.findById(userId) 
    .then(user=>{
        emailArray.push(user.email);//add authors email to emailArray
        emailArray = [...new Set(emailArray)]; //remove duplicates
        let ids = [];
        let success = [];
        //add group to each found users .invites
        User.find().where('email').in(emailArray)//find each user that is in the invited array
        .then(users=>{
            users.forEach(user =>{ //for each user found:
                ids.push(user._id); //add user id to ids array
                success.push(user.email); //add user email to successful find array
            });
            User.updateMany( //update the users and add the group to invited
                { _id: { $in: ids } },
                { $push: { invites : group._id } },
                {multi: true}
            )
            .then(()=>{
                let failed = emailArray.filter(x => !success.includes(x)); //find failed invites
                if(failed.length > 0){ //if failed invites
                    console.log("failed to invite some users, make sure emails are entered, properly")
                    res.redirect('/group/new')
                } else { //if no failed invites
                    group.invited = ids;
                    group.save()
                    res.redirect('/group')
                }
            })
            .catch();        
        })
        .catch(err=>next(err));
        })
        .catch(err=>next(err));
};

exports.view = (req,res,next)=>{

};