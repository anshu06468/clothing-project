export class User{
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public _tokenExpirationDate:Date,
        public role?: string,
        public _token?:string,
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate ){
            return null;
        }
        return this._token;
    }
}