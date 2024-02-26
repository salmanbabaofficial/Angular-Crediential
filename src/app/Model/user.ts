export class User {
    constructor(
        public full_name: string,
        public email: string,
        public password: string,
        public confirm_password: string,
        public gender: string,
        public education: string = '' 
    ) {}
}
