import EventInterface from "../../@shared/event/event.interface";
import Address from "../../customer/value-object/address";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: any;

  constructor(customerId: string, customerName: string, customerAddress: Address) {
    this.dataTimeOccured = new Date();
    this.eventData = {
      customerId,
      customerName,
      customerAddress
    };
  }
}