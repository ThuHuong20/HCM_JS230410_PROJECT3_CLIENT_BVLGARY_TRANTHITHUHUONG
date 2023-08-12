import userModule from "./modules/user";
import categoryModule from "./modules/category";
import productModule from "./modules/product";
import purchaseModule from "./modules/purchase";
import receiptModule from "./modules/receipt"

export default {
  users: userModule,
  categories: categoryModule,
  products: productModule,
  purchase: purchaseModule,
  receipt: receiptModule
};
