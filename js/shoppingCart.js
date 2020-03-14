class ShoppingCart {
  constructor(productList, addButton, badgeCart) {
    this.productList = document.querySelectorAll(productList);
    this.addButton = document.querySelectorAll(addButton);
    this.badgeCart = document.querySelector(badgeCart);

    this.cart = [];
    this.countItens = 0;
  }

  createProductsObject() {
    this.products = [...this.productList].map((product) => {
      return {
        element: product,
        name: product.querySelector('.name').innerText,
        price: product.querySelector('.price').innerText
      };
    });
  }

  addItemCart(product) {
    this.countItens++;
    this.displayCounter();

    if (!product.quantity) {
      product.quantity = 1;
      this.cart.push(product);
      this.saveCart();
      return;
    }
    
    product.quantity++
    this.updateCart();
    
    console.log(this.cart);
  }

  saveCart() {
    const cart = JSON.stringify(this.cart);

    sessionStorage.setItem('cart', cart);
  }

  updateCart() {
    const cart = JSON.stringify(this.cart);
    sessionStorage.clear();
    sessionStorage.setItem('cart', cart)
  }

  displayCounter() {
    this.badgeCart.innerText = this.countItens;
  }

  addButtonEvent() {
    this.addButton.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.addItemCart(this.products[index]);
      });
    });
  }

  init() {
    this.createProductsObject();
    this.addButtonEvent();
  }
}