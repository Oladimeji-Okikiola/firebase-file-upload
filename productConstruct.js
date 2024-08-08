let searchThrough = document.getElementById('searchThrough')
let productCard = document.getElementById('productCard')

let searchBtn = document.getElementById('searchInput');
let querySnapshot = [];

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmY2XtNwXZrHeE5za2cp7sOFYOKjSvdCQ",
  authDomain: "school-newusersign.firebaseapp.com",
  projectId: "school-newusersign",
  storageBucket: "school-newusersign.appspot.com",
  messagingSenderId: "382800829354",
  appId: "1:382800829354:web:145aeb3f8e346c016129d3"
};

const app = initializeApp(firebaseConfig);
let db = getFirestore();
let displayTutorial = document.getElementById('mainDisplay');
const myCollection = collection(db, 'PRODUCTS');

// THE SEARCH WITH KEYUP
searchBtn.addEventListener('keyup', e => {
    let searchedString = e.target.value.toLowerCase();
    console.log(searchedString);
    let returnValue = querySnapshot.docs.filter(newEntry => {
        return newEntry.data().productName.toLowerCase().includes(searchedString);
    });
    displayDataIn(returnValue);
});

async function readAllDocuments() {
  try {
    querySnapshot = await getDocs(myCollection);
    displayDataIn(querySnapshot);
  } catch (error) {
    console.error('Error reading documents: ', error);
  }
}

readAllDocuments();

function displayDataIn(querySnapshot) {
    productCard.innerHTML = ''; // Clear previous content
    querySnapshot.forEach((element) => {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'innerCard');
        newDiv.innerHTML = `
        <img src="${element.data().productImage}" class="productImages" alt="vegetable spicy" width="40%">
        <p class="productName">${element.data().productName}</p>
        <p>
            ${element.data().productDescription}
        </p>
        <h3>&#x20A6;${element.data().productPrice}</h3>
        <button class="buyBtn">Buy now</button>
        `;

        // Add event listener to the button to redirect to WhatsApp with product details
        newDiv.querySelector('.buyBtn').addEventListener('click', () => {
            const productName = element.data().productName;
            const productDescription = element.data().productDescription;
            const productImage = element.data().productImage;
            const whatsappLink = element.data().productContact;
            
            // Construct the WhatsApp message
            const message = `Product Name: ${productName}\nDescription: ${productDescription}\nImage: ${productImage}`;
            const encodedMessage = encodeURIComponent(message);
            const fullWhatsappLink = `${whatsappLink}?text=${encodedMessage}`;

            // Redirect to the constructed WhatsApp link
            window.location.href = fullWhatsappLink;
        });

        productCard.appendChild(newDiv);
    });
}
