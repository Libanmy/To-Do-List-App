const inputs = document.querySelectorAll(".input-note input");
const displayed_box = document.querySelector(".displayed-notes");
const ul = document.createElement("ul");
let editingNote = null;
displayed_box.prepend(ul);

let savedNotes = localStorage.getItem("notes");
if(savedNotes) {
  ul.innerHTML = savedNotes;
  // localStorage.clear(notes)
}

//update localStorage
function updateLocalStorage() {
  localStorage.setItem("notes", ul.innerHTML)
}

inputs[1].addEventListener("click", () => createNote());

function createNote() {
    if(inputs[0].value !== '') {
      // creating elements
      const li = document.createElement("li");
      const p = document.createElement("p");
      const manageNote = document.createElement("div");
      const editNote = document.createElement("button");
      const deleteNote = document.createElement("button");
      //assign to class
      manageNote.classList.add("manageNote")
      editNote.classList.add("editNote")
      deleteNote.classList.add("deleteNote")

      //appending to parent
      ul.prepend(li);
      li.appendChild(p);
      li.appendChild(manageNote);
      manageNote.appendChild(editNote);
      manageNote.appendChild(deleteNote);

      editNote.innerText = "Edit";
      deleteNote.innerText = "Delete"
      p.innerText = inputs[0].value;
      inputs[0].value = '';

      updateLocalStorage();

  }
}


//delete note
ul.addEventListener("click", (e) => {
  if(e.target.classList.contains("deleteNote")) {
    e.target.closest("li").remove();
    updateLocalStorage();
  }

  //edit button
  if (e.target.classList.contains("editNote")) {
    const li = e.target.closest("li");
    const p = li.querySelector("p");
    editingNote = p;
    inputs[0].value = p.innerText;
    inputs[1].style.display = "none";
    inputs[2].style.display = "block";

  }
})

    inputs[2].addEventListener("click", () => {
      editingNote.innerText = inputs[0].value;
      inputs[0].value = '';
      editingNote = null;
      inputs[1].style.display = "block";
      inputs[2].style.display = "none";
      updateLocalStorage();

    })