/* jshint esversion:  6 */

const availableCoupons = ["hello10", "hello20"];

let cartCost = null;

// Declare and initiate the discountCoupons variable 
const discountCoupons = {
    hello10: 10,
    hello20: 20,
};

let carts = document.querySelectorAll('.cartBtn'); //selecting all the add to cart buttons in the catalogue page 


let products = [{
        name: 'Purple Midi Dress',
        tag: 'purpleMidiDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Light Blue Midi Dress',
        tag: 'lightBlueMidiDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Cream Lace Midi Dress',
        tag: 'creamLaceMidiDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Black Lace Shift Dress',
        tag: 'blackLaceDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Black Fitted Dress',
        tag: 'blackFittedDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Navy Blue Shift Dress',
        tag: 'navyShiftDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Short Black Dress',
        tag: 'shortBlackDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Black and White Dress',
        tag: 'blackWhiteDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Black Top',
        tag: 'blackTop',
        price: 60,
        inCart: 0
    },

    {
        name: 'Red Dress',
        tag: 'redDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'Short Blue Dress',
        tag: 'shortBlueDress',
        price: 60,
        inCart: 0
    },

    {
        name: 'One Shoulder Dress',
        tag: 'oneShoulderDress',
        price: 60,
        inCart: 0
    }

];

for (let i = 0; i < carts.length; i++) { //loop to run through each cart button
    carts[i].addEventListener('click', () => { //when clicked the two functions run
        cartNumbers(products[i]);
        totalCost(products[i]);
        //cartCost= localStorage.getItem('cartCost');
        alert("Your cart total is £" + cartCost);
    });
}



function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers); //convert string to number

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1; //to show number of products in the cart

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1; //first product added to cart 

    }

    setItem(product);

}

function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("my cart items are", cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                //jshint ignore:start
                ...cartItems,
                // jshint ignore:end 
                [product.tag]: product
            };

        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}


if(localStorage.getItem('totalCost')) {
    cartCost = Number(localStorage.getItem('totalCost'));
} else {
    cartCost = 0;
    localStorage.setItem("totalCost", 0);
}
console.log("my cartCost is", cartCost);

//function to add costs in cart
function totalCost(product) {
    cartCost = Number(localStorage.getItem('totalCost'));
    if (cartCost != 0) {
        cartCost = parseInt(cartCost); //convert from string to number
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
        cartCost = product.price
    }

}

let productContainer = document.querySelector(".products");

productContainer.innerHTML += ` 
<div class= "basketTotalDiscountContainer">
<h4 id= "basketTotalDiscountId" class="basketTotalDiscountTitle">
Basket Total Inc Discount   </h4>
<h4 class ="basketTotal">
£${( cartCost)}.00  
</h4> 
`

function displayCart() { //adding the information in local storage to the HTML 
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);


    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product"> 
            <span>${item.name} </span>
            </div> 
            <div class="price">£${item.price}.00 </div>
            <div class = "quantity"> 
            <span>${item.inCart} </span> 
            </div>
            <div class= "total">
            £${item.inCart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML += `
    <div class= "basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket Total  </h4>
    <h4 class ="basketTotal">
    £${cartCost}.00
    </h4>
    `

        let beforeVat = cartCost;
        let vat = 0.2;

        let totalVat = (parseInt(beforeVat * vat)); //working out VAT amount 

        cartCostVat = parseInt(totalVat) + parseInt(cartCost)

        //localStorage.setItem("totalCost", cartCost)

        //adding VAT to total cost
        productContainer.innerHTML += ` 
<div class= "basketTotalVatContainer">
<h4 id= "basketTotalVatId" class="basketTotalVatTitle">
Basket Total Inc VAT   </h4>
<h4 class ="basketTotal">
£${parseInt(cartCostVat)}.00  
</h4> 
`
    }
}


const onApplyCoupon = () => {
    const couponInputted = document.getElementById("couponInput").value;

    const availableCoupon = availableCoupons.includes(couponInputted);

    if (!availableCoupon) {
        alert(
            "sorry, the discount coupon code you have entered is invalid, please try again!"
        );

        return;
    }

    // take the value of the discount 
    const discountAmount = discountCoupons[couponInputted];

    // deduct the discount from the bill and alert to user the new bill amount
    cartCost -= discountAmount;

    localStorage.setItem("totalCost", cartCost)

    // alert to the user the discount amount and new totals
    alert(
        `Congratulations! We have applied a discount of £${discountAmount} to your order. Your total is now £${cartCost}.`
    );


    window.location.reload();

};

const onSelectDeliveryMode = () => {
    let selectedDeliveryMode;

    const radioEl = document.getElementsByName("deliveryMode");

    for (let i = 0; i < radioEl.length; i++) {
        if (radioEl[i].checked) {
            selectedDeliveryMode = radioEl[i].value;
        }
    }

    if (selectedDeliveryMode === "collection") {
        alert(
            `Thank you for selecting to collect your item. Your item will be held for 7 days.`
        );

        return;
    } else if (selectedDeliveryMode === "delivery") {
        // Call the show() method on the deliveryMethodWrapper 
        $("#deliveryMethodWrapper").show();
        alert("You may now select the method of delivery below");

        return;
    } else {
        alert(
            "Please select one of the delivery methods"
        );

        return;
    }
}; /** End of onSelectDeliveryMode function ***/

// The onSelecDeliveryMethod function definition to that will be called in the ready JQuery function below
const onSelectDeliveryMethod = () => {
    // we declare  the delivery cost 
    const deliveryCost = 5;

    // We declare the selectDeliveryMethod variable
    let selectedDeliveryMethod;

    const radioEl = document.getElementsByName("deliveryMethod");

    for (let i = 0; i < radioEl.length; i++) {
        if (radioEl[i].checked) {
            selectedDeliveryMethod = radioEl[i].value;
        }
    }

    if (selectedDeliveryMethod === "nextDay") {
        // We add the delivery cost to the totalBill
        cartCost += deliveryCost;


       
        localStorage.setItem("totalCost", JSON.stringify(cartCost));

        // Then we alert to the user notifying them of the cart cost and the added delivery cost
        alert(
            `Your total bill is now £${cartCost} which includes a delivery fee of £${deliveryCost}.`
        );

        //   Reload the page to update the displayed total amount
        window.location.reload();


        return;
    } else if (selectedDeliveryMethod === "standardDelivery") {
        alert(
            `You have chosen free standard delivery. This will take 3-5 working days. Your total bill is £${cartCost}`
        );
        return;
    } else {
        alert("Please select the method of delivery of your choice");
        return;
    }
}; /** End of onSelectDeliveryMethod function */



//onLoadCartNumbers();


//create the clear all button
function onLoad() {
    let clear = document.getElementById("removeAll")
    let clrButton = document.createElement('button')
    clrButton.innerHTML = "Remove All"

    //function will be triggered when button is clicked
    clrButton.addEventListener('click', function clrAll() {
        window.location.reload();
        localStorage.clear()
    });

    //position and style button
    clrButton.style.display = "block"
    clrButton.style.marginTop = "4px"

    //add button to html
    clear.appendChild(clrButton)

    if (cartCost != null) {
        cartCost = parseInt(cartCost); //convert from string to number
        localStorage.setItem("totalCost", cartCost);
    } else {
        localStorage.getItem("totalCost", cartCost);
    }

    displayCart();

}

//   Drop-down menu with an accordion animation style
$("#deliveryModeAnimationTrigger").on("mouseenter", function () {
    $("#deliveryModeWrapper").children("#content-panel").slideToggle(1000);
});

$(function () {
    // Hide the delivery method wrapper 
    $("#deliveryMethodWrapper").hide();

});

//   onApplyCoupon function call when the user clicks on the Apply Discount button
$("#couponButton").on("click", function () {
    onApplyCoupon();
});

//   onSelectDeliveryMode function calls when the user clicks the Confirm button
$("#modeButton").on("click", function () {
    onSelectDeliveryMode();
});

//   onSelectDeliveryMethod function call when the user clicks the confirm button
$("#methodButton").on("click", function () {
    onSelectDeliveryMethod();
});

//function to alert user when order is placed 

function confirmAlert() {
    alert("Your order was sucessful! Your reference number is " + new Date().getUTCMilliseconds() + "         A confirmation email will be sent to your inbox");
}


//jquery animation on landing page


$(document).ready(function () {
    setInterval(animateElements, 4000);

    function animateElements() {

        $('#clothingStoreHeading').animate({
            top: '+=700px'
        }, 'slow').animate({
            top: '-=500px'
        }, 'slow');
    }
    animateElements();
});

//hide/show effect on catalogue page 

$(document).ready(function () {
    $("#hide").click(function () {
        $("#sizeTable").hide();
    });
    $("#show").click(function () {
        $("#sizeTable").show();
    });
});