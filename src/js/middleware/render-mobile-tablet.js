function renderPagesForMobileAndTablet() {
  // create swipe
  const swipeInstances = M.Carousel.init(main, {
    fullWidth: true,
    indicators: true
  });

  // side navigation links
  sidenav.addEventListener("click", event => {
    let sidenavLink = event.path[1];
    let pageName = "";
    if (sidenavLink.tagName === "A" || sidenavLink.tagName === "LI") {
      pageName = sidenavLink.querySelector("span").innerText;
      if (pageName === "Getting Started") swipeInstances.set(0);
      if (pageName === "Add Your Cats") swipeInstances.set(1);
      if (pageName === "Label Videos") swipeInstances.set(2);
      if (pageName === "Train A Classifier") swipeInstances.set(3);
      if (pageName === "Choose A Classifier") swipeInstances.set(4);
      if (pageName === "Event View") swipeInstances.set(5);
      if (pageName === "Contact") swipeInstances.set(6);
    }
  });

  // create scroll
  resizeListContainer(document.getElementById("petList"));
  resizeListContainer(document.getElementById("videoList"));
  resizeListContainer(document.getElementById("classifierList"));
  resizeListContainer(document.getElementById("eventList"));

  // label videos

  // train classifier

  // choose classifier

  // event view
  // initialize date picker
  document.querySelector(".date-title").innerText = new Date().toDateString();
  // flag event
  document.querySelector(".flagSwitch").addEventListener("click", event => {
    // wrong decision was flagged
    if (event.target.checked) {
      let eventId = event.target.id;
      // update data
    }
  });
}

// helpers
function resizeListContainer(list) {
  let totalHeight = document.getElementById("add-your-pets").offsetHeight;
  let indicatorHeight = document.querySelector(".indicators").offsetHeight;
  list.style.height = totalHeight - 2 * indicatorHeight + "px";
  list.style.overflow = "scroll";
}

// add pets
// render pet data
const renderPets = (data, id) => {
  const petList = document.getElementById("petList");
  const html = `
  <div class="pet row z-depth-1" data-id="${id}">
    <div class="valign-wrapper">
      <div class="col s4 valign-wrapper">
        <img
        src="${data.profileURI}"
        alt="${data.pet}"
        class="responsive-img"
        />
      </div>
      <div class="col s8 valign-wrapper">
        <div class="col s8 pet-name">${data.pet}</div>
        <div class="col s4">
          <span class="btn-floating btn-small waves-effect waves-light teal lighten-3">
            <i class="material-icons" data-id="${id}">clear</i>
          </span>
        </div>
      </div>
    </div>
  </div>
`;
  petList.innerHTML = html + petList.innerHTML;
};

const removePet = id => {
  document.querySelector(`.pet[data-id=${id}]`).remove();
};

// label videos

// view events
function datePicker(arrow) {
  let datePickerText = document.querySelector(".date-title");
  let date = new Date(datePickerText.innerHTML);
  if (arrow.innerText === "chevron_right")
    date = new Date(date.setDate(date.getDate() + 1));
  else date = new Date(date.setDate(date.getDate() - 1));
  datePickerText.innerText = date.toDateString();
  showEventsByDate(date);
}

function showEventsByDate(date) {
  console.log(date);
}
