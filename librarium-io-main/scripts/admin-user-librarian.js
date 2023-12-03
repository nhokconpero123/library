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


