export default class Host{
    id: number;
    name: string;
    address: string;
    user: string;
    password: string;
    ssh_key: string;
    last_reachable: Date;

    constructor(source : any){
        this.id = source.id;
        this.name = source.name;
        this.address = source.address;
        this.user = source.user;
        this.password = source.password;
        this.ssh_key = source.ssh_key;
        this.last_reachable = source.last_reachable;
    }

}