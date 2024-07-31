let signOutBtn = document.getElementById('signOut')
let openMenu = document.getElementById('openMenu')
let closeMenu = document.getElementById('closeMenu')
let headerTwoNav = document.getElementById('headerTwoNav')


  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBmY2XtNwXZrHeE5za2cp7sOFYOKjSvdCQ",
    authDomain: "school-newusersign.firebaseapp.com",
    projectId: "school-newusersign",
    storageBucket: "school-newusersign.appspot.com",
    messagingSenderId: "382800829354",
    appId: "1:382800829354:web:145aeb3f8e346c016129d3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  const db = getFirestore()
  let auth = getAuth()


  // FUNTION TO SIGNOUT USER

  function signOutUser(){
    signOut(auth)
    .then(response => {
        alert("You've signed out")
        window.location.href = 'account.html'
        console.log(response)
    })
    .catch(error => {
        // console.error(error);
        alert(error)
    })
  }

  

  
  


//   FUNTION TO CHECK IF USER IS LOGGED IN OR OUT
let cachedUserData = null; // In-memory storage

function stateChanged() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User signed in
      logUserDetails(user);
    } else {
      // User signed out
      cachedUserData = null;
      updateUI(); // Update UI to reflect no cached data
    }
  });
}
stateChanged();

async function logUserDetails(user) {
  if (!user) return; // Handle cases where user might be null

  try {
    const ref = doc(db, "Registered_Users", user.uid);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      cachedUserData = {
        Firstname: docSnap.data().Firstname,
        Lastname: docSnap.data().Lastname,
        Username: docSnap.data().Username,
        PhoneNumber: docSnap.data().PhoneNumber,
        DateOfBirth: docSnap.data().DateOfBirth,
        Gender: docSnap.data().Gender,
        profilePicture: docSnap.data().profilePicture,
      };
      updateUI(); // Update UI with fetched data
    } else {
      cachedUserData = null; // No data found, clear cache
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    // Handle errors appropriately (e.g., display error message to user)
  }
}

function updateUI() {
  // Access the UI elements and update them based on cachedUserData
  // (similar to your retrieveCached function)
  if (cachedUserData) {
    const usernamed = document.getElementById('usernamed');
    const profilePicture = document.getElementById('userImage');

    profilePicture.src = cachedUserData.profilePicture;
    usernamed.textContent = `${cachedUserData.Firstname} ${cachedUserData.Lastname}`;
  } else {
    // Handle cases where no data is cached (clear UI elements)
  }
}

// Call updateUI() initially to handle potential cached data on page load
updateUI();







  signOutBtn.addEventListener('click', signOutUser)



  let mainInfo = document.getElementById('mainInfo')

  async function displayInformation(){
    var ref = doc(db, "NOTIFICATION", 'recent')
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
      var newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'information')
      newDiv.innerHTML = `
        <a href="${docSnap.data().link}">
          <p>
              ${docSnap.data().information}
          </p>
        </a>
      `
      mainInfo.appendChild(newDiv)
      console.log('no document in this system');
    }
  }

  displayInformation()





  //   FUNCTION TO GET DATA FROM DATABASE AND DISPLAY IT
  
  //   async function logUserDetails(userId){
  //     var ref = doc(db, "Registered_Users", userId)
  //     const docSnap = await getDoc(ref)
  //     if(docSnap.exists()){
  //       let usernamed = document.getElementById('usernamed')
  //       let profilePicture = document.getElementById('userImage')
  
  //       let FirstName = docSnap.data().Firstname
  //       let Lastname = docSnap.data().Lastname
  //       let profilePictureData = docSnap.data().profilePicture
  
  //       profilePicture.src = profilePictureData
  //       usernamed.textContent = FirstName + " " + Lastname
  
  //     }else{
  //         alert('data does not exist')
  //         window.location.href = 'account.html'
  //     }
  // }