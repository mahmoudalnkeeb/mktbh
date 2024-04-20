class User {
    user_id!: number;
    username: string;
    email: string;
    hashed_pass: string;
    salt: string;
    access_token: string;
    created_at: Date;
    updated_at: Date;

    constructor(username: string, email: string, hashed_pass: string, salt: string, access_token: string, created_at: Date, updated_at: Date) {
        this.username = username;
        this.email = email;
        this.hashed_pass = hashed_pass;
        this.salt = salt;
        this.access_token = access_token;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
