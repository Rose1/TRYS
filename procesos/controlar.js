/*-------show date--------*/
/*var today = new Date();
var year = formatTime(today.getFullYear());
var month = formatTime(today.getMonth() + 1);
var day = formatTime(today.getDate());
document.getElementById('currentDate').innerHTML = day + '/' + month + '/' + year;*/
/*--------Hour function--------*/
(function() {
    function formatTime(n) {
        return (n < 10) ? "0" + n : n;
    };

    function checkTime() {
        var today = new Date();
        var hour = formatTime(today.getHours());
        var min = formatTime(today.getMinutes());
        var seg = formatTime(today.getSeconds());
        document.getElementById("box-time").innerHTML = hour + ":" + min + ":" + seg;
        document.getElementById('hour').val = hour + ":" + min;
        //document.getElementById('hour2').nodeValue = hour + ":" + min + ":" + seg;
        // console.log(day + '/' + month + '/' + year);
        var d = setTimeout(function() {
            checkTime()
        }, 500);
    };

    checkTime();
})();

/*-------set input date--------*/

function setInputDate(_id) {
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth() + 1,
        y = hoy.getFullYear(),
        data;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };

    data = y + "-" + m + "-" + d;
    console.log(data);
    _dat.value = data;
};
setInputDate("#dateDefault");

/*-------set input time--------*/
// funcion que actualiza la hora
// pero no funciona como deberia porque el input time se da valores solito
// porque se actualiza a acada segundo
/*(function() {
    function setInputTime(_id) {
        var _dat = document.querySelector(_id);
        var hoy = new Date(),
            h = hoy.getHours(),
            m = hoy.getMinutes(),
            time;

        if (h < 10) {
            h = "0" + h;
        };
        if (m < 10) {
            m = "0" + m;
        };

        time = h + ":" + m;
        // console.log(time);
        _dat.value = time;
        var d = setTimeout(function() {
            setInputTime(_id)
        }, 500);
    };

    setInputTime("#time1");
    setInputTime("#time2");
})();*/

/*----------responsive menu function-------------*/

function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*--------------search a bus-----------------*/
// Get dropdowns and form
const dropdowns = document.querySelectorAll('[data-dropdown]');
const form = document.querySelector('form');

// Check if dropdowns exist on page
if (dropdowns.length > 0) {
    // Loop through dropdowns and create custom dropdown for each select element
    dropdowns.forEach(dropdown => {
        createCustomDropdown(dropdown);
    });
}


// Check if form element exist on page
if (form !== null) {
    // When form is submitted console log the value of the select field
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Bus seleccionado:', form.querySelector('[name="busOptions"]').value);
    });
}

// create the custom dropdown

function createCustomDropdown(dropdown) {
    // Get all options and convert them from nodelist to array
    const options = dropdown.querySelectorAll('option');
    const optionsArr = Array.prototype.slice.call(options);

    // Create custom dropdown element and add class dropdown to it
    // Insert it in the DOM after the select field
    const customDropdown = document.createElement('div');
    customDropdown.classList.add('dropdown');
    dropdown.insertAdjacentElement('afterend', customDropdown);

    // Create element for selected option
    // Add class to this element, text from the first option in select field and append it to custom dropdown
    const selected = document.createElement('div');
    selected.classList.add('dropdown__selected');
    selected.textContent = optionsArr[0].textContent;
    customDropdown.appendChild(selected);

    // Create element for dropdown menu, add class to it and append it to custom dropdown
    // Add click event to selected element to toggle dropdown menu
    const menu = document.createElement('div');
    menu.classList.add('dropdown__menu');
    customDropdown.appendChild(menu);
    selected.addEventListener('click', toggleDropdown.bind(menu));

    // Create serach input element
    // Add class, type and placeholder to this element and append it to menu element
    const search = document.createElement('input');
    search.placeholder = 'Buscar...';
    search.type = 'text';
    search.classList.add('dropdown__menu_search');
    menu.appendChild(search);

    // Create wrapper element for menu items, add class to it and append to menu element
    const menuItemsWrapper = document.createElement('div');
    menuItemsWrapper.classList.add('dropdown__menu_items');
    menu.appendChild(menuItemsWrapper);


    // Loop through all options and create custom option for each option and append it to items wrapper element
    // Add click event for each custom option to set clicked option as selected option
    optionsArr.forEach(option => {
        const item = document.createElement('div');
        item.classList.add('dropdown__menu_item');
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        menuItemsWrapper.appendChild(item);

        item.addEventListener('click', setSelected.bind(item, selected, dropdown, menu));
    });

    // Add selected class to first custom option
    menuItemsWrapper.querySelector('div').classList.add('selected');

    // Add input event to search input element to filter items
    // Add click event to document element to close custom dropdown if clicked outside of it
    // Hide original dropdown(select)
    search.addEventListener('input', filterItems.bind(search, optionsArr, menu));
    document.addEventListener('click', closeIfClickedOutside.bind(customDropdown, menu));
    dropdown.style.display = 'none';

}

// Toggle dropdown
function toggleDropdown() {
    // Check if dropdown is opened and if it is close it, otherwise open it and focus search input
    if (this.offsetParent !== null) {
        this.style.display = 'none';
    } else {
        this.style.display = 'block';
        this.querySelector('input').focus();
    }
}

// Set selected option
function setSelected(selected, dropdown, menu) {
    // Get value and label from clicked custom option
    const value = this.dataset.value;
    const label = this.textContent;

    // Change the text on selected element
    // Change the value on select field
    selected.textContent = label;
    dropdown.value = value;

    // Close the menu
    // Reset search input value
    // Remove selected class from previously selected option and show all divs if they were filtered
    // Add selected class to clicked option
    menu.style.display = 'none';
    menu.querySelector('input').value = '';
    menu.querySelectorAll('div').forEach(div => {
        if (div.classList.contains('selected')) {
            div.classList.remove('selected');
        }
        if (div.offsetParent === null) {
            div.style.display = 'block';
        }
    });
    this.classList.add('selected');
}


// Filter items
function filterItems(itemsArr, menu) {
    // Get all custom options
    // Get the value of search input and convert it to all lowercase characters
    // Get filtered items
    // Get the indexes of filtered items
    const customOptions = menu.querySelectorAll('.dropdown__menu_items div');
    const value = this.value.toLowerCase();
    const filteredItems = itemsArr.filter(item => item.value.toLowerCase().includes(value));
    const indexesArr = filteredItems.map(item => itemsArr.indexOf(item));

    // Check if option is not inside indexes array and hide it and if it is inside indexes array and it is hidden show it
    itemsArr.forEach(option => {
        if (!indexesArr.includes(itemsArr.indexOf(option))) {
            customOptions[itemsArr.indexOf(option)].style.display = 'none';
        } else {
            if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
                customOptions[itemsArr.indexOf(option)].style.display = 'block';
            }
        }
    });
}

// Close dropdown if clicked outside dropdown element
function closeIfClickedOutside(menu, e) {
    if (e.target.closest('.dropdown') === null && e.target !== this && menu.offsetParent !== null) {
        menu.style.display = 'none';
    }
}



/*-------------select row--------------*/
function selectRow() {
    var checkBoxes = document.getElementsByName('check');
    checkBoxes.forEach(check => {
        check.onclick = function() {
            if (this.checked) {
                check.parentElement.parentElement.classList.add('checked');
            } else {
                check.parentElement.parentElement.classList.remove('checked');
            }
        }
    });
}
selectRow();

/*------------search in table----------*/


const tableData = () => {
    const searchData = [];
    const tableEl = document.getElementById('data-table');
    Array.from(tableEl.children[1].children).forEach(_bodyRowEl => {
        searchData.push(Array.from(_bodyRowEl.children).map(_cellEl => {
            return _cellEl.innerHTML;
        }));
    });

    return searchData;
}

const search = (arr, searchTerm) => {
    if (!searchTerm) return arr;
    return arr.filter(_row => {
        return _row.find(_item => _item.toLowerCase()
            .includes(searchTerm.toLowerCase()));
    });
}

const refreshTable = (data) => {
    const tableBody = document.getElementById('data-table').children[1];
    tableBody.innerHTML = '';

    data.forEach(_row => {
        const curRow = document.createElement('tr');
        for (i = 0; i < _row.length; i++) {
            if (i == 0) {
                const curCell = document.createElement('td');
                var checkBox = document.createElement('input');
                // assign attributes
                checkBox.type = "checkbox";
                checkBox.name = "check";
                checkBox.id = "child_chkbx";
                curCell.appendChild(checkBox);
                curRow.appendChild(curCell);

            } else {
                if (i < 14) {
                    const curCell = document.createElement('td');
                    curCell.innerText = _row[i];
                    curRow.appendChild(curCell)
                } else {
                    if (i == 14) {
                        const curCell = document.createElement('td');
                        curCell.innerHTML = "<button><i class=" + 'fas fa-volume-up' + "></i></button>";
                        curRow.appendChild(curCell);
                    }
                    if (i == 15) {
                        const curCell = document.createElement('td');
                        curCell.innerHTML = "<button>Ticket</button>";
                        curRow.appendChild(curCell);
                    }

                }
            }
        }
        tableBody.appendChild(curRow);
    });
}

const init = () => {

    const initialTableData = tableData();

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', (e) => {
        console.log(search(initialTableData, e.target.value))
        refreshTable(search(initialTableData, e.target.value));
        selectRow();
    });
}
init();


/*-----------------Modal functions-----------------*/

//  Modal Departure Programmed
// get the modal
var modalDepartureProgrammed = document.getElementById("programmedDeparture");
// get the button that opens the modal
var btnModalDepartureProgrammed = document.getElementById("btnDepartureProgrammed");
// get the <span> element that closesthe modal
var span1 = document.getElementById("close1");
// button.click
btnModalDepartureProgrammed.onclick = function() {
        modalDepartureProgrammed.style.display = "block";
    }
    // close modal
span1.onclick = function() {
        modalDepartureProgrammed.style.display = "none";
    }
    // when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalDepartureProgrammed) {
        modalDepartureProgrammed.style.display = "none";
    }
}

//  Modal send message
var modalSendMessage = document.getElementById("message");
var buttonModalSendMessage = document.getElementById("btnMessage");
var span2 = document.getElementById("close2");
buttonModalSendMessage.onclick = function() {
    modalSendMessage.style.display = "block";
}
span2.onclick = function() {
    modalSendMessage.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalSendMessage) {
        modalSendMessage.style.display = "none";
    }
}

/*--------------------- modal conductor------------------*/
var modalConductor = document.getElementById("modalConductor");
var imageConductor = document.getElementById("imageConductor");
var span3 = document.getElementById("close3");
imageConductor.onclick = function() {
    modalConductor.style.display = "block";
}
span3.onclick = function() {
    modalConductor.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalConductor) {
        modalConductor.style.display = "none";
    }
}

/*--------------------- modal cobrador------------------*/

var modalCobrador = document.getElementById("modalCobrador");
var imageCobrador = document.getElementById("imageCobrador");
var span4 = document.getElementById("close4");
imageCobrador.onclick = function() {
    modalCobrador.style.display = "block";
}
span4.onclick = function() {
    modalCobrador.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalConductor) {
        modalCobrador.style.display = "none";
    }
}