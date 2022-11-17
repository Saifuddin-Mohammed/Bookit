const Group = require('../models/group');
const User = require('../models/user');

exports.index = (req, res, next)=>{
    let groups = [];
    user = req.session.user;
    console.log("we get here");
    console.log(user);
    Group.find({accepted: user})
    .then(groups=>{
        console.log(groups);
    })
    .catch(err=>next(err));
    res.render('./group/index', {groups, user});
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
    let failed = [];

    for(let i = 0; i<emailArray.length ;i++){
        User.findOne({email: emailArray[i]})
        .then(user=>{
            if(user){
                console.log("get here?");
                ids.push(user._id.toHexString());
            } else {
                failed.push(user.email)
            }
        })
        .catch(err=>next(err));
    }
    console.log(ids);
    //group.save()
    //.then(res.redirect('/group'))
    //.catch(err=>next(err));
    res.redirect('/group')
}