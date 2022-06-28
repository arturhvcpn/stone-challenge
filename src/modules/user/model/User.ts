import { v4 as uuidV4} from 'uuid';

class User {
    id!: string;
    name!: string;
    lastname!: string;
    nickname!: string;
    email!: string;
    password!:string;
    avatarUrl: any;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { User };