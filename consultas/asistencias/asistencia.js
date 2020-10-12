/*-----------------hour function----------------------*/
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


/*----------responsive menu function-------------*/

function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


/*-------table function----------*/
/*
 * Sorts a HTML table
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {*} asc Determines if the sorting will be in ascending
 */

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);
    console.log('Estas aqui----------------------');

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

/*-----------check item-----------*/
/*function checkAll() {
    var parent = document.getElementById("parent");
    var input = document.getElementsByTagName("input");

    if (parent.checked === true) {
        for (var i = 0; i < input.length; i++) {
            if (input[i].type == "checkbox" && input[i].id == "child_chkbx" &&
                input[i].checked == false) {
                input[i].checked = true;

            }
        }
    }
    if (parent.checked === false) {
        for (var i = 0; i < input.length; i++) {
            if (input[i].type == "checkbox" && input[i].id == "child_chkbx" &&
                input[i].checked == true) {
                input[i].checked = false;

            }
        }
    }
}*/

/**/

/*var table = document.getElementById('table'),
    rIndex;

for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].onclick = function() {
        rIndex = this.rowIndex;
        console.log(rIndex);

    }
}*/

/*function selectRow() {
    var checkBoxes = document.getElementsByName('check');
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].onclick = function() {
            console.log(i)
            console.log(this.checked)
            if (this.checked === true) {
                //  checkbox - td    -      tr 
                this.parentElement.parentElement.classList.toggle("checked");
            }
            if (this.checked === false) {
                //  checkbox - td    -      tr 
                this.parentElement.parentElement.classList.toggle("unchecked");
            }
        };
    }
}
selectRow();*/


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
                const curCell = document.createElement('td');
                curCell.innerText = _row[i];
                curRow.appendChild(curCell)
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