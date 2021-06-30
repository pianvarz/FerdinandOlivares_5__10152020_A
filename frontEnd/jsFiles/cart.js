// DRY application
const createElement = element => document.createElement(element);
const append = (parent, el) => parent.appendChild(el);
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el);
    });
};

let products = []; 
let totalCost = null;

// Obtaining cart item products from local storage
const camera = localStorage.getItem('cart');
let cameraParse = JSON.parse(camera);

// achoring html tags 
const cartContainer = document.getElementById('cartContainer');

try {
const productTable = document.querySelector('.cartTable').getElementsByTagName('tbody')[0]; 
} catch (error) {
    location.reload();
}


const totalPrice = document.getElementById('totalPrice');
const topHomeButton = document.querySelector('#homeButton');

// Buy it now button functions, hiding/showing input details following click
const formContainer = document.querySelector('#formContainer')
const hideMainBlock = () => (cartContainer.style.display = 'none');
const appearFormBlock = () => (formContainer.style.display = 'flex');

let camerasInCartFunction = () => {
    if (cameraParse.length) {
        for (let i = 0; i < cameraParse.length; i++) {
        const productInCart = cameraParse[i];
        //Products placed in cart (local storage)

        const cameraRow = productTable.insertRow(); //The ID of the camera (whole row)
        camera.id = productInCart.id;

        const cameraName = cameraRow.insertCell(); // Name including the image
        cameraName.textContent = productInCart.name; 
        classElement(cameraName, ["cartName"])
        const cameraImg = createElement('img');
        classElement(cameraImg, ["cartImg"]);
        cameraImg.src = productInCart.image;
        append(cameraName, cameraImg);

        const cameraLense = cameraRow.insertCell(); // Camera Lenses 
        classElement(cameraLense, ["cartLense"]);
        cameraLense.textContent = productInCart.lenses;
        
        const cameraPrice = cameraRow.insertCell();
        classElement(cameraPrice, (['cartPrice']));
        cameraPrice.textContent = productInCart.price / 100; 

        totalCost += productInCart.price / 100;
        totalPrice.textContent = totalCost; 

        const removeCamera = cameraRow.insertCell();
        const removeCameraButton = createElement('button');
        removeCameraButton.textContent = 'Remove Product';
        append(removeCamera, removeCameraButton);

        const purchaseHomeDiv = createElement('div');
        classElement(purchaseHomeDiv, (['purchaseDiv']));
        cartContainer.appendChild(purchaseHomeDiv);

        products = [...products, productInCart.id];

        let removeCameraFunction = () => { // Applying remove camera through addeventlistener button
            removeCameraButton.addEventListener('click', e => {
                localStorage.removeItem(e.target.id);
                alert("Product's been removed");
                location.reload();
                const updateCart = cameraParse.filter( currentCameras => currentCameras !== productInCart);

                localStorage.setItem('cart', JSON.stringify(updateCart));

                const currentProducts = products.filter(product => product !== e.target.id);

                products = [...currentProducts];

                totalCost = productInCart.price / 100;
                totalPrice.textContent = totalCost;
        });
        };


        try {
            if (!cameraParse.length) {
                localStorage.clear();
            } else {
            removeCameraFunction();
        }
        } catch (error) {
            cartContainer.innerHTML = "<div> Error Please Try Again Later!! </div>"
            }
        }
     const purchaseProductFunction = () => { //Purchase products in the cart followed by cart validation

            const purchaseHomeDiv = createElement('div');
            classElement(purchaseHomeDiv, (['purchaseDiv']));
            cartContainer.appendChild(purchaseHomeDiv);
            
            const purchaseButton = createElement('button');
            classElement(purchaseButton, (['purchaseButton']));
            purchaseButton.textContent = 'Buy it now';
            append(purchaseHomeDiv, purchaseButton);
            
            purchaseButton.addEventListener('click', e => {
                hideMainBlock();
                appearFormBlock();
            });                        
        };
    purchaseProductFunction();

    } else {
        cartContainer.textContent = "Cart's empty, please have a look at our products. Please click Home (Top right) to see other items";
        let homeButtonFunction = () => {
            topHomeButton.addEventListener('click', e => {
                document.location.href = '../index.html';
                localStorage.clear();
            });
        homeButtonFunction();
        }
    }

}

camerasInCartFunction(); 

//HTML Selectors for the forms
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const confirmButton = document.querySelector('#confirmButton');
const orderDetails = document.querySelector('.orderDetails')
const formAspects = document.querySelector('.form-aspects');
const required = document.querySelectorAll('[required]');

// Validation Variables 
let letterKeys = /^[a-zA-Z- ]+$/u;
let letNumKeys = /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç ]+)+$/;
let allKeys = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{3,10}$",
"g");
// Validation event listeners for each input
orderDetails.firstName.addEventListener('input', e => 
    validation(
        letterKeys,
        e.target.value,
        firstName,
        "firstName",
        "Please only include letters"
        )
);

orderDetails.lastName.addEventListener('input', e => 
    validation(
        letterKeys,
        e.target.value,
        lastName,
        "lastName",
        "Please only include letters"
        )
);

orderDetails.address.addEventListener('input', e => 
    validation(
        letNumKeys,
        e.target.value,
        address,
        "address",
        "Please follow the example, 11 Robin Close"
        )
);

orderDetails.city.addEventListener('input', e => 
    validation(
        letterKeys,
        e.target.value,
        city,
        "city",
        "Please only include letters"
        )
);

orderDetails.email.addEventListener('input', e =>
    validation(
        allKeys,
        e.target.value,
        email,
        "email",
        "Please follow given example, joeBrown@example.com"
        )
);

// Validation function 

let test = {};
    
const validation = (keys, value, fields, name, errorText) => {
    let input = fields;
    let inputAlert = fields.nextElementSibling;
    if (keys.test(value)) {
        inputAlert = '';
        input.style.border = 'thin solid green';
        test[name] = true;
        confirmButton.removeAttribute('disabled')
    } else {
        input.style.border = 'thin solid red';
        test[name] = false;
        confirmButton.setAttribute('disabled', 'true')
    }
};

    // Proceed with transferring data to API 

const orderUrlApi = "http://localhost:3000/api/cameras/order";

let details = {};
let proceedOrder = {}; 

const orderCameras = () => {
    orderDetails.addEventListener('submit', e => {
        e.preventDefault();
        let  validDetails = true;
            for (let key in test) {
                if (test[key] === false) {
                    validDetails = false;
                }
            }

            if (validDetails) {
                contact = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                };
                proceedOrder = { contact, products };

                // Fetch function and transferring to the confirmation html
                let fetchData = {
                    method: 'POST',
                    body: JSON.stringify(proceedOrder),
                    headers: { "Content-type": "application/json" }
                }; 

                fetch(orderUrlApi, fetchData)
                    .then(response => response.json())
                    .then(function (order) {
                        console.log(order)
                        let confirmedOrder = {
                            name: contact.firstName + ' ' + contact.lastName,
                            price: totalCost,
                            orderId: order.orderId
                        };
                        console.log(confirmedOrder);
                        let orderedStorage = localStorage.setItem('purchasedProducts', JSON.stringify(confirmedOrder));

                        alert("Processing order, please click 'Close' to continue")
                        window.location = 'confirmationPage.html';
                    });
            }
    });
};

orderCameras();