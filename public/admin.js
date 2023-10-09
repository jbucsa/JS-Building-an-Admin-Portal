
// BIG NOT!!!
//IMPORT YOUR CODE HERE
// import {main} from '././index.js';
// import {renderBook} from '././index.js';
//main();


async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook);
    books.forEach(captureBooks);
}

function captureBooks(book) {
    let section2 = document.querySelector('.container');
    section2.innerHTML += `<label>${book.title} </label><input id="btn${book.id}" type="text" value="${book.quantity}"></input><button onclick="updateBook(${book.id})">Save</button><br>`;
}

async function removeBook(bookID, bookTitle) {
    console.log(bookID);
    const msjConfirmation = `Do you want to delete the book: "${bookTitle}"? This is a was a well reviewed book!`;
    let confirmation = window.confirm(msjConfirmation);
    if (confirmation) {
        let response = await fetch(`http://localhost:3001/removeBook/${bookID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": bookID
            }),
        });
        location.reload();
        alert("This book have been removed");
    }
}

async function updateBook(book) {
    let btn = `btn${book}`;
    let newQty = document.getElementById(btn).value;
    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": book,
            "quantity": `${newQty}`
        }),
    });
    let updatedBook = await response.json();

    location.reload();
}




function renderBook(book) {
    let bookContainer = document.querySelector('.book-container')
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
                ${book.imageURL ? `
                    <img class="card-img-top" src="${book.imageURL}" />
                `
                : ``}
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available: ${book.quantity}</h6>
                    <p class="card-text">${book.description}</p>
                    <button id="rmv${book.id}" onclick="removeBook(${book.id},'${book.title}')">Remove</button>
                </div>
            </div>
        </div>
    `
}

main()
// updateBook();