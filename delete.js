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
  function stateChanged(){
    onAuthStateChanged(auth, (user) => {
        if(user){
            // let userId = user.uid
            let userId = user.uid
            logUserDetails(userId)
            // console.log(userId)
        }else{
            window.location.href = 'account.html'
        }
    })
  }
  stateChanged()

  //   FUNCTION TO GET DATA FROM DATABASE AND DISPLAY IT
  async function logUserDetails(userId){
    var ref = doc(db, "Registered_Users", userId)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        console.log(docSnap.data());

        const data = {
            Firstname : docSnap.data().Firstname,
            Lastname : docSnap.data().Lastname,
            Username : docSnap.data().Username,
            PhoneNumber : docSnap.data().PhoneNumber,
            DateOfBirth : docSnap.data().DateOfBirth,
            Gender : docSnap.data().Gender,
            profilePicture : docSnap.data().profilePicture
        }
        cacheIncoming(data)

    }else{
      deleteCachedData()
        alert('data does not exist, please sign in to continue')
        window.location.href = 'account.html'
    }
}

// FUNCTION TO CACHE INCOMING USER DETAILS
function cacheIncoming(data){
  localStorage.setItem('userdata', JSON.stringify(data))
}

// FUNCTION TO RETRIEVE THE CACHE DATA FROM THE LOCAL STORAGE AND POPULATE TO UI
function retrieveCached(){
  const cachedData = localStorage.getItem('userdata')
  const convertedData = JSON.parse(cachedData)

  console.log(cachedData);
  setTimeout(() => {
    
    let usernamed = document.getElementById('usernamed')
          let profilePicture = document.getElementById('userImage')
  
          let FirstName = convertedData.Firstname
          let Lastname = convertedData.Lastname
          let profilePictureData = convertedData.profilePicture
  
          profilePicture.src = convertedData.profilePicture
          usernamed.textContent = FirstName + " " + Lastname
  }, 500);

}
retrieveCached()

// FUNCTION TO DELETE THE CACHED DATA FROM THE LOCAL STORAGE
function deleteCachedData(){
  localStorage.removeItem('userdata')
}





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