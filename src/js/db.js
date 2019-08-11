// offline data
db.enablePersistence().catch(err => {
  if (err.code == "failed-precondition") {
    // multiple tabs open at once
    console.log("persistence  failed");
  } else if (err.code == "failed-unimplemented") {
    // lack of browser support
    console.log("persistence is not available");
  }
});

// real-time listener
db.collection("pets").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") renderPets(change.doc.data(), change.doc.id);
    if (change.type === "removed") removePet(change.doc.id);
  });
});

// pets CRUD
// add new pet
function addPet(petName, petProfile) {
  let imgPath = "./src/img/pets/placeholder.png";
  const newPet = { pet: petName.value, profileURI: imgPath };
  // add new pet to database
  db.collection("pets")
    .add(newPet)
    .catch(err => console.log(err));
  // clear inputs & close modal
  petModalInstance.close();
  petName.classList.remove("invalid");
  petName.value = "";
  petProfile.fileName.value = "";
  petProfile.file.length = 0;
}

// delete pet
const petList = document.querySelector("#petList");
petList.addEventListener("click", event => {
  if (event.target.tagName === "I") {
    let id = event.target.getAttribute("data-id");
    // delete pet to database
    db.collection("pets")
      .doc(id)
      .delete();
  }
});

// label videos
// train classifier
// event view
