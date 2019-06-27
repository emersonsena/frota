import {OrderItemModel} from './order.item.model';

export class PurchaseOrderModel {
  constructor(public id: number,
              public docDate: Date,
              public docDueDate: Date,
              public status: string,
              public rote: string,
              public userId: number,
              public userName: string,
              public payment: string,
              public operation: string,
              public statusMundiPagg: string,
              public addressId: number,
              public itemList: Array<OrderItemModel>) {
  }

}
