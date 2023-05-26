interface avatar {
    location?: string;
}

export class User {
    _id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    birthdate?: string;
    password?: string;
    access_token?: string;
    avatar?: avatar;
    friends?: any[];
}
