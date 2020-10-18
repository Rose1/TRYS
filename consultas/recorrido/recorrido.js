/*----------hora---------- */
(function() {
    function formatTime(n) {
        return (n < 10) ? "0" + n : n;
    };

    function checkTime() {
        var today = new Date(),

            h = formatTime(today.getHours()),
            min = formatTime(today.getMinutes()),
            seg = formatTime(today.getSeconds()),
            hour = h
        document.getElementById("box-time").innerHTML = hour + ":" + min + ":" + seg;

        var d = setTimeout(function() {
            checkTime()
        }, 500);
    };

    checkTime();
})();


/*-----------menu responsive-----------*/
function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*----------MAP---------- */

var myMap = L.map('mapid').setView([51.505, -0.09], 13)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(myMap);


/*--------------------search a vehicle---------------------- */

// obtener el dropdown y el formulario
const dropdowns = document.querySelectorAll('[data-dropdown]');
const form = document.querySelector('form');

// verificar si el dropdown existe
if (dropdowns.length > 0) {
    console.log(dropdowns.length);
    // recorrer el dropdown y crear los estilos para cada item del dropdown
    dropdowns.forEach(dropdown => {
        createCustomDropdown(dropdown);
    });
}

// verificar si el formulario existe
if (form !== null) {
    // cuando se hace clic en el submit entonces imprimir en consola el valor seleccionado en
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Selected country:', form.querySelector('[name="country"]').value);
    });
}

// Crear el dropdown
function createCustomDropdown(dropdown) {
    // obtener todas las opciones y convertirlo de una lista de nodos a un array
    const options = dropdown.querySelectorAll('option');
    const optionsArr = Array.prototype.slice.call(options);

    // crear el elemento dropdown y añadirle la clase dropdown
    const customDropdown = document.createElement('div');
    customDropdown.classList.add('dropdown');
    // insetarlo en el DOM
    dropdown.insertAdjacentElement('afterend', customDropdown);

    // Crear el elemento para la opcion seleccionada
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
    search.placeholder = 'Search...';
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

// deslizar o mostrar el dropdowwn
function toggleDropdown() {
    // Verificar si el dropdown esta abierto y si lo esta entonces cerrarlo
    if (this.offsetParent !== null) {
        this.style.display = 'none';
    } else {
        // si no lo esta entonces abrirlo y poner el foco en en search input
        this.style.display = 'block';
        this.querySelector('input').focus();
    }
}

// establecer la opcion seleccionada
function setSelected(selected, dropdown, menu) {
    // obtener el value de la etiqueta que fue seleccionada
    const value = this.dataset.value;
    const label = this.textContent;

    // cambiar el label y value con la etiqueta seleccionada
    selected.textContent = label;
    dropdown.value = value;

    // cerrar el menu
    menu.style.display = 'none';
    // Reestalblecer el value input
    menu.querySelector('input').value = '';

    menu.querySelectorAll('div').forEach(div => {
        // borrar las clases que fueron seleccionadas anteriormente
        if (div.classList.contains('selected')) {
            div.classList.remove('selected');
        } // Mostrar los divs que fueron filtrados
        if (div.offsetParent === null) {
            div.style.display = 'block';
        }
    });
    // Anadir la clase selected a la opcion clickeada
    this.classList.add('selected');
}

// filtrar cada valor del select
function filterItems(itemsArr, menu) {
    // Obtener todos los items
    const customOptions = menu.querySelectorAll('.dropdown__menu_items div');
    // Obtener el value del search input y convertirlo a lower case
    const value = this.value.toLowerCase();
    // filtrar items
    const filteredItems = itemsArr.filter(item => item.value.toLowerCase().includes(value));
    // obtener los indices de los items filtrados
    const indexesArr = filteredItems.map(item => itemsArr.indexOf(item));

    itemsArr.forEach(option => {
        // Verificar si la opcion seleccionada no esta dentro de los indices del array y esconderlo
        if (!indexesArr.includes(itemsArr.indexOf(option))) {
            customOptions[itemsArr.indexOf(option)].style.display = 'none';
        } else {
            // si esta dentro de los indices pero escondido entonces mostrarlo
            if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
                customOptions[itemsArr.indexOf(option)].style.display = 'block';
            }
        }
    });
}

// Cerrar dropdown si se hace click fuera de el
function closeIfClickedOutside(menu, e) {
    if (e.target.closest('.dropdown') === null && e.target !== this && menu.offsetParent !== null) {
        menu.style.display = 'none';
    }
}