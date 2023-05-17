import moment from "moment";

export const client = {
  isClientNeedPediatrician(clientBirthday: Date) {
    return moment().year() - moment(clientBirthday).year() <= 18;
  },
};
