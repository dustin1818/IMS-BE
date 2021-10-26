module.exports = function map_user_req(user, userDetails){
    if(userDetails.username)
        user.username = userDetails.username;

    if(userDetails.email)
        user.email = userDetails.email;

    if(userDetails.password)
        user.password = userDetails.password;
    
    if(userDetails.phoneNo)
        user.phoneNo = userDetails.phoneNo;
    
    if(userDetails.location)
        user.location = userDetails.location;

    if(userDetails.position)
        user.position = userDetails.position;

    if(userDetails.activeStatus)
        user.activeStatus = userDetails.activeStatus;
    
    return user; 
}