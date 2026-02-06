export default class Subject {
    uf: string;
    alias: string;
    room: string;

    constructor(uf: string, alias: string, room: string) {
        this.uf = uf;
        this.alias = alias;
        this.room = room;
    }
}