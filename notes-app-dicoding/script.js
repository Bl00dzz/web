const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteTitleInput = document.getElementById('noteTitle');
const noteDescriptionInput = document.getElementById('noteDescription');
const noteList = document.getElementById('noteList');

// Variabel untuk menyimpan data catatan
let notesData = [];

// Memeriksa apakah ada catatan yang tersimpan di localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notesData = notes; // Mengisi data catatan dari localStorage ke dalam variabel notesData
        notes.forEach(function (note) {
            addNoteToDOM(note.title, note.description);
        });
    }
});

function openPopup() {
    popup.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
    clearInputs(); // Membersihkan input setelah menutup popup
}

function showAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlert = document.querySelector('.close-alert');

    alertMessage.textContent = message;
    customAlert.style.display = 'block';

    closeAlert.addEventListener('click', function () {
        customAlert.style.display = 'none';
    });
}


function clearInputs() {
    noteTitleInput.value = '';
    noteDescriptionInput.value = '';
}

function addNote() {
    const title = noteTitleInput.value.trim();
    const description = noteDescriptionInput.value.trim();

    if (title && description) {
        // Menambahkan catatan ke dalam variabel notesData
        notesData.push({ title, description });
        // Menyimpan catatan ke dalam localStorage
        localStorage.setItem('notes', JSON.stringify(notesData));

        // Menambahkan catatan ke dalam tampilan
        addNoteToDOM(title, description);

        // Bersihkan input dan tutup popup
        clearInputs();
        closePopup();
    } else {
        alert('Harap isi judul dan deskripsi catatan.');
    }
}

function addNoteToDOM(title, description) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.style.border = '1px solid #ccc'; // Mengatur border catatan
    noteDiv.style.borderRadius = '5px'; // Mengatur border radius catatan
    noteDiv.style.padding = '10px'; // Mengatur padding catatan
    noteDiv.style.marginBottom = '10px'; // Mengatur margin bottom catatan
    noteDiv.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <button class="deleteBtn">Hapus</button>
  `;
    noteList.appendChild(noteDiv);

    const deleteBtn = noteDiv.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function () {
        notesData = notesData.filter(function (note) {
            return note.title !== title || note.description !== description;
        });
        localStorage.setItem('notes', JSON.stringify(notesData));
        noteDiv.remove();
    });
}
function addNote() {
    const title = noteTitleInput.value.trim();
    const description = noteDescriptionInput.value.trim();

    if (title && description) {
        notesData.push({ title, description });
        localStorage.setItem('notes', JSON.stringify(notesData));
        addNoteToDOM(title, description);
        clearInputs();
        closePopup();
    } else {
        showAlert('Harap isi judul dan deskripsi catatan.');
    }
}


openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
addNoteBtn.addEventListener('click', addNote);

window.addEventListener('click', function (event) {
    if (event.target === popup) {
        closePopup();
    }
});
