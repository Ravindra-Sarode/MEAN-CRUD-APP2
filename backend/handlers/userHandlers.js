const User = require("./../db/user");

async function addUser(userModel){
    let user = new User({
        ...userModel,
    });
    await user.save();
    //toObject ka use userModel hai useko hum plane JS mai convert krne ke liye
    //toObject ka user krte hai
    return user.toObject();
}

async function getUsers(){
    const users = await User.find();
    return users.map(x=>x.toObject());
}
async function getUser(id){
    const user = await User.findById(id);
    return user.toObject()
}

async function updateUser(id, userModel){
    const filter ={_id:id};
    await User.findByIdAndUpdate(filter, userModel);
}
async function deleteUser(id){
    await User.findByIdAndDelete(id);
}

module.exports={ addUser, getUsers,  getUser, updateUser , deleteUser};

