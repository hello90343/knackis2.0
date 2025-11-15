function init() {
  getData();
  renderAll();
}

function renderAll() {
  renderList(
    section_wantedList,
    "array_wantedList",
    "Arrested",
    "array_arrestedList",
    "array_wantedList_years",
    "array_arrestedList_years"
  );

  renderList(
    section_arrestedList,
    "array_arrestedList",
    "Free",
    "array_freeList",
    "array_arrestedList_years",
    "array_freeList_years"
  );

  renderList(
    section_freeList,
    "array_freeList",
    "Back in business",
    "array_wantedList",
    "array_freeList_years",
    "array_wantedList_years"
  );
}

function renderList(container, startKey, buttonText, goalKey, startYearsKey, goalYearsKey) {
  container.innerHTML = "";

  const namesObj = allLists.persons[startKey];
  const yearsObj = allLists.years[startYearsKey];

  const names = namesObj.list;
  const years = yearsObj.list;

  for (let i = 0; i < names.length; i++) {
    container.innerHTML += `
      <p><strong>${names[i]}</strong> – ${years[i]} Jahre!</p>
      <button onclick="moveList(${i}, '${startKey}', '${goalKey}', '${startYearsKey}', '${goalYearsKey}')">
        ${buttonText}
      </button>
    `;
  }

  container.innerHTML += `
    <div class="comment-form">
      <h4>Kommentar hinzufügen:</h4>
      <input type="text" id="commentName_${startKey}" placeholder="Dein Name">
      <input type="text" id="commentText_${startKey}" placeholder="Dein Kommentar">
      <button onclick="addComment('${startKey}')">Kommentar speichern</button>
    </div>
  `;

  if (namesObj.comments.length > 0) {
    container.innerHTML += `<h4>Kommentare:</h4>`;
    for (let j = 0; j < namesObj.comments.length; j++) {
      const c = namesObj.comments[j];
      container.innerHTML += `<p><strong>${c.name}:</strong> ${c.comment}</p>`;
    }
  }
}

function addComment(startKey) {
  const nameInput = document.getElementById(`commentName_${startKey}`);
  const textInput = document.getElementById(`commentText_${startKey}`);

  const nameValue = nameInput.value.trim();
  const textValue = textInput.value.trim();


  if (nameValue !== "" && textValue !== "") {
    allLists.persons[startKey].comments.push({
      name: nameValue,
      comment: textValue
    });

    nameInput.value = "";
    textInput.value = "";

    takeData();
    renderAll();
  }
}

function moveList(index, startKey, goalKey, startYearsKey, goalYearsKey) {
  const personArray = allLists.persons[startKey].list;
  const movedPerson = personArray.splice(index, 1)[0];
  allLists.persons[goalKey].list.unshift(movedPerson);

  const yearsArray = allLists.years[startYearsKey].list;
  const movedYear = yearsArray.splice(index, 1)[0];
  allLists.years[goalYearsKey].list.unshift(movedYear);

  takeData();
  renderAll();
}

function addList() {
  const inputValue1 = form_inputName.value.trim();
  const inputValue2 = form_inputHaft.value.trim();

  if (inputValue1 !== "" && inputValue2 !== "") {
    allLists.persons["array_wantedList"].list.unshift(inputValue1);
    allLists.years["array_wantedList_years"].list.unshift(inputValue2);
  }

  form_inputName.value = "";
  form_inputHaft.value = "";

  takeData();
  renderAll();
}


function takeData() {
  localStorage.setItem("allLists", JSON.stringify(allLists));
}

function getData() {
  const saved = localStorage.getItem("allLists");
  if (saved !== null) {
    allLists = JSON.parse(saved);
  }
}





