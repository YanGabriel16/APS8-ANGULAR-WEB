export class Product {
    code: string;
    name: string;
    category: string;
    quantity: number;
  
    constructor(code: string, name: string, category: string, quantity: number) {
      this.code = code;
      this.name = name;
      this.category = category;
      this.quantity = quantity;
    }
  }