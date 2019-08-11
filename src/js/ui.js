const sidenav = document.getElementById("nav-collapse");
const main = document.getElementById("main");
const quotes = document.getElementById("quotes");
const addPetModal = document.getElementById("addPetModel");
const login = document.querySelector(".add-button").firstElementChild;
let petModalInstance;
const labelVideosModel = document.getElementById("labelVideosModel");
let labelModalInstance;
let fileName;
let selectedFile;

// initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  // create side navbar menu
  const sidenavMenu = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenavMenu, {
    edge: "left",
    preventScrolling: true,
    draggable: true
  });

  resizeViewHeight();

  // detects user platform and render pages accordingly
  if (window.mobileAndTabletCheck()) renderPagesForMobileAndTablet();
  else renderPagesForDesktop();

  // add pets
  // create modals
  petModalInstance = M.Modal.init(addPetModal, { preventScrolling: true });
  login.addEventListener("click", event => {
    if (event.target.tagName === "I" || event.target.tagName === "A") {
      // Firebase Auth
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
    }
  });

  // label videos
  labelModalInstance = M.Modal.init(labelVideosModel, {
    preventScrolling: true
  });
});

// getting started
function cameraSwitch() {
  const streamer = document.getElementById("streamer");
  const controller = document.querySelector(".player");
  const controllerText = controller.querySelector(".player span");
  const controllerIcon = controller.querySelector(".player i");
  if (controllerText.innerText === "Turn On Camera") {
    controllerText.innerText = "Turn Off Camera";
    controllerIcon.classList.remove("grey-text");
    controllerIcon.classList.add("red-text");
    controllerIcon.innerText = "videocam";
    streamer.play();
  } else {
    controllerText.innerText = "Turn On Camera";
    controllerIcon.classList.add("grey-text");
    controllerIcon.classList.remove("red-text");
    controllerIcon.innerText = "videocam_off";
    streamer.pause();
  }
}

// add pets
function validatePetModal() {
  let petName = document.getElementById("pet_name");
  selectedFile = document.getElementById("pet_profile_img").files[0];
  fileName = document.getElementById("pet_profile_img_name");

  if (petName.value.match(/\ /) || petName.value === "") {
    petName.classList.add("invalid");
  } else if (!selectedFile) fileName.classList.add("invalid");
  else {
    // Create a root reference
    storageRefPets = firebase.storage().ref("/pets/" + fileName.value);
    // Upload the file
    uploadTask = storageRefPets.put(selectedFile);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Upload is unauthorized");
            break;
          case "storage/canceled":
            console.log("Upload is canceled");
            break;
          case "storage/unknown":
            console.log("Upload error is unknown");
            break;
        }
      },
      function() {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
        });
      }
    );

    addPet(petName, { file: selectedFile, fileName: fileName });
  }
}
