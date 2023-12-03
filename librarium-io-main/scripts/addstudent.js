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
    const addStudentBtn = document.querySelector('.add-item button');
    const modal = document.getElementById('additemModal');
    const closeBtn = document.querySelector('.modal .close');
    const form = document.getElementById('addStudentForm');
    const tableofcontent = document.getElementById('studentTable');

    // Function to fetch and display existing students from local storage
    function fetchAndDisplayStudents() {
        const tableBody = document.getElementById('studentTable');
        tableBody.innerHTML = ''; // Clear existing table rows

        // Read the content of the local storage
        const fileContent = localStorage.getItem('studentData');

        if (fileContent) {
            const students = JSON.parse(fileContent);

            students.forEach(student => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${student.studentID}</td>
                    <td>${student.name}</td>
                    <td>${student.dob}</td>
                    <td>${student.email}</td>
                    <td>${student.password}</td>
                    <td><button class="delete-button"><i class="bx bxs-trash"></i></button></td>
                `;
                tableBody.appendChild(newRow);
            });
        }
    }

    // Save the student information to local storage
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values using the updated names
        const studentID = form.elements.studentID.value;
        const name = form.elements.name.value;
        const dob = form.elements.dob.value;
        const email = form.elements.email.value;
        const password = form.elements.password.value;

        // Fetch existing students from local storage
        const existingStudents = localStorage.getItem('studentData') || '[]';
        const students = JSON.parse(existingStudents);

        // Add the new student to the array
        students.push({ studentID, name, dob, email, password });

        // Save the updated array back to local storage
        localStorage.setItem('studentData', JSON.stringify(students));

        // Reset the form after submission
        form.reset();
        
        // Hide the modal
        modal.style.display = 'none';

        // Fetch and display the updated list of students
        fetchAndDisplayStudents();
    });

    // Event listener for deleting a student
    tableofcontent.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('delete-button') || target.parentElement.classList.contains('delete-button')) {
            deleteItem(target);
        }
    });

    // Function to delete a student
    function deleteItem(button) {
        const row = button.closest('tr'); // Find the closest table row
        if (row) {
            row.remove(); // Remove the row

            // Update local storage after deletion
            const existingStudents = localStorage.getItem('studentData') || '[]';
            const students = JSON.parse(existingStudents);

            const idToDelete = row.querySelector('td').innerText;
            const updatedStudents = students.filter(student => student.studentID !== idToDelete);

            localStorage.setItem('studentData', JSON.stringify(updatedStudents));
        }
    }

    // Initial fetch and display of students
    fetchAndDisplayStudents();

    // Event listeners for opening and closing the modal
    addStudentBtn.addEventListener('click', () => {
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
