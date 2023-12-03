// Sidebar links functionality
const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
sideLinks.forEach(item => {
    item.addEventListener('click', () => {
        sideLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
        item.parentElement.classList.add('active');
    });
});

// Toggle sidebar visibility
const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

// Search button functionality
const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        searchBtnIcon.classList.toggle('bx-search');
        searchBtnIcon.classList.toggle('bx-x');
    }
});

// Responsive adjustments
function adjustSidebar() {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
}

window.addEventListener('resize', adjustSidebar);

// Tab functionality
const tabLinks = document.querySelectorAll('.tabs .side-menu li');
tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.tabs .active').classList.remove('active');
        link.classList.add('active');
    });
});






//---------------------------------------------------------------------------------------------
// ... (your existing code)
document.addEventListener('DOMContentLoaded', function () {
    const addBookBtn = document.querySelector('.add-item button');
    const modal = document.getElementById('additemModal');
    const closeBtn = document.querySelector('.modal .close');
    const form = document.getElementById('addBookForm');
    const tableofcontent = document.getElementById('bookTable');

    // Function to fetch and display existing books from the file
    function fetchAndDisplayBooks() {
        const tableBody = document.getElementById('bookTable');
        tableBody.innerHTML = ''; // Clear existing table rows

        // Read the content of the file
        const fileContent = localStorage.getItem('bookData');

        if (fileContent) {
            const books = JSON.parse(fileContent);

            books.forEach(book => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                  <td>${book.id}</td>
                  <td>${book.name}</td>
                  <td>${book.author}</td>
                  <td>${book.category}</td>
                  <td><button class="delete-button"><i class="bx bxs-trash"></i></button></td>
                `;
                tableBody.appendChild(newRow);
            });
        }
    }
    

    // Save the book information to local storage
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = form.elements.id.value;
        const name = form.elements.name.value;
        const author = form.elements.author.value;
        const category = form.elements.category.value;

        const existingBooks = localStorage.getItem('bookData') || '[]';
        const books = JSON.parse(existingBooks);
        books.push({ id, name, author, category });
        localStorage.setItem('bookData', JSON.stringify(books));

        form.reset(); // Reset the form after submission
        modal.style.display = 'none';

        // Fetch and display updated list of books
        fetchAndDisplayBooks();
    });

    tableofcontent.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('delete-button') || target.parentElement.classList.contains('delete-button')) {
            deleteItem(target);
        }
    });

    function deleteItem(button) {
        const row = button.closest('tr'); // Find the closest table row
        if (row) {
            row.remove(); // Remove the row

            // Update local storage after deletion
            const existingBooks = localStorage.getItem('bookData') || '[]';
            const books = JSON.parse(existingBooks);

            const idToDelete = row.querySelector('td').innerText;
            const updatedBooks = books.filter(book => book.id !== idToDelete);

            localStorage.setItem('bookData', JSON.stringify(updatedBooks));
        }
    }

    // Initial fetch and display of books
    fetchAndDisplayBooks();

    addBookBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        form.reset(); // Reset the form when opening the modal
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
