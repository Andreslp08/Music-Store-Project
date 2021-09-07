export class User {

    static defaultAvatarPath = "https://openclipart.org/download/247319/abstract-user-flat-3.svg"
    constructor(id,email, firstName, lastName, password, avatarPath = User.defaultAvatarPath){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.avatarPath = avatarPath;
    }
    
}