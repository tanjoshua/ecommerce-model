import moment from "moment";

class Order {
  constructor(id, items, totalCost, date) {
    this.id = id;
    this.items = items;
    this.totalCost = totalCost;
    this.date = date;
  }

  // get readable date
  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
