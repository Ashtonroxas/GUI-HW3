/*
Name: Ashton Roxas
Date: 10/26/2025
File: script.js

GUI Assignment:
    Generates a dynamic multiplication table with validation and a purple gradient theme.

Ashton Roxas, UMass Lowell Computer Science, ashton_roxas@student.uml.edu
*/

const form = document.getElementById("rangeForm");
const tableWrapper = document.getElementById("tableWrapper");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const colStart = parseInt(document.getElementById("colStart").value);
    const colEnd = parseInt(document.getElementById("colEnd").value);
    const rowStart = parseInt(document.getElementById("rowStart").value);
    const rowEnd = parseInt(document.getElementById("rowEnd").value);

    const valid = validateInputs(colStart, colEnd, rowStart, rowEnd);
    if (!valid.ok) {
        showError(valid.msg);
        return;
    }

    clearError();
    renderTable(colStart, colEnd, rowStart, rowEnd);
});

function validateInputs(c1, c2, r1, r2) {
    const min = -50, max = 50;

    if ([c1, c2, r1, r2].some(isNaN)) {
        return { ok: false, msg: "Please enter all fields as numbers." };
    }

    if (c1 < min || c2 > max || r1 < min || r2 > max) {
        return { ok: false, msg: `Values must be between ${min} and ${max}.` };
    }

    if (c1 > c2) return { ok: false, msg: "Column start cannot be greater than column end." };
    if (r1 > r2) return { ok: false, msg: "Row start cannot be greater than row end." };

    return { ok: true };
}

function showError(message) {
    errorMsg.textContent = message;
}

function clearError() {
    errorMsg.textContent = "";
}

function renderTable(cStart, cEnd, rStart, rEnd) {
    tableWrapper.innerHTML = ""; // Clear previous
    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th"));

    for (let c = cStart; c <= cEnd; c++) {
        const th = document.createElement("th");
        th.textContent = c;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let r = rStart; r <= rEnd; r++) {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = r;
        row.appendChild(th);

        for (let c = cStart; c <= cEnd; c++) {
            const td = document.createElement("td");
            td.textContent = r * c;
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    tableWrapper.appendChild(table);
}
