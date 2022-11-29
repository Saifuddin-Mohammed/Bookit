const Group = require('../models/group');
const User = require('../models/user');

exports.index = (req, res, next)=>{
    let pGroups = [];
    user = req.session.user;
    Group.find({invited: user})
    .then(groups=>{
        groups.forEach(group => {
            pGroups.push(group.groupName);
        });
        res.render('./group/index', {pGroups, user});
    })
    .catch(err=>next(err));    
};

exports.new = (req, res, next)=>{
    let user = req.session.user;

    res.render('./group/new', {user});
}

exports.addGroup = (req, res, next)=>{
    let group = new Group();
    let name = req.body.name; //get name from respose
    group.groupName = name;
    let emails = req.body.emails; //get emails from response
    emails = emails.replace(/\s/g, ''); //remove spaces
    const emailArray = emails.split(',') //split emails at each ,
    let ids = [];
    let success = [];

    User.find().where('email').in(emailArray)
    .then(groups=>{
        groups.forEach(user => {
            ids.push(user._id.toString());
            success.push(user.email);
        });
        let failed = emailArray.filter(x => !success.includes(x));
        if(failed.length > 0){
            console.log("failed to invite some users, make sure emails are entered, properly")
            res.redirect('/group/new')
        } else {
            group.invited = ids;
            group.save()
            res.redirect('/group')
        }
    })
    .catch(err=>next(err));
};

exports.view = (req,res,next)=>{

};