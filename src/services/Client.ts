import moment from "moment/moment";

export class Client {
    static isClientNeedPediatrician(clientBirthday: Date) {
        return moment().year() - moment(clientBirthday).year() <= 18
    }
}