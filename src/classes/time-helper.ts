import moment from "moment/moment";

export const formatDate = (dateString: string) => {
  return moment(dateString).calendar();
};
