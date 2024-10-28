import {
    cart,
    addToCart
} from '../data/cart.js';
import {
    products
} from '../data/products.js';
import {
    formatCurrency
} from './utils/money.js';

let productsHTML = '';

// 2nd
products.forEach((product) => {
    productsHTML = productsHTML + `
    <div class="video-preview">
      <div class="thumbnail-row">
        <img class="thumbnail"
          src="${product.image}">
        <div class="video-time">
        THB ${formatCurrency(product.priceCents)}</div>
      </div>

      <div class="video-info-grid">
        <div class="channel-picture">
          <img class="profile-picture" src="images/icons/logo200x200png.png" alt="">
        </div>
        <div class="video-info">
          
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
          <p class="product-type">indoor hybrid</p>
          
          <p class="video-author">Lady Pam, Chonburi, Phan Thong</p>
          <p class="add-date">Added 16 October 2024</p>

          
          <div class="product-price">
            THB ${formatCurrency(product.priceCents)} 
          </div>
          
        </div>
      </div>
      

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
      
  `;
});

// brat div spacer 
// <div class="product-quantity-container">
//   <select>
//     <option selected value="1">1</option>
//     <option value="2">2</option>
//     <option value="3">3</option>
//     <option value="4">4</option>
//     <option value="5">5</option>
//     <option value="6">6</option>
//     <option value="7">7</option>
//     <option value="8">8</option>
//     <option value="9">9</option>
//     <option value="10">10</option>
//   </select>
// </div>



document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


// function showAdded () {
//   document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//     button.addEventListener('click', () => {
        
//         let myImage = document.querySelector('.js-added-to-cart');

//         myImage.style.opacity= 1;
//     });
// });
// }

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        
        const productId = button.dataset.productId;

        // showAdded();
        
        addToCart(productId);
        updateCartQuantity();
    });
});
