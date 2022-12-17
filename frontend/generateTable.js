function generateTable() {
    
  if (document.getElementById("myTable") != null && document.getElementById("myTable").innerHTML !== "") {
      document.getElementById("myTable").innerHTML = "";
  }
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  tbl.classList.add("content-table");
  // add id to table
  tbl.setAttribute("id", "myTable");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");
  
  // creating all cells
  for (let i = 0; i < 5; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < 5; j++) {
      const cellD = document.createElement("td");
      const cellH = document.createElement("th");
      const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      /*
      if (j==0) {
          cellText = document.createElement('img');
          img.src = value;
      }
      */
      if (i == 0) {
          cellH.appendChild(cellText);
          row.appendChild(cellH);
          row.classList.add("active-row");
      } else {
          cellD.appendChild(cellText);
          row.appendChild(cellD);
          if (i % 2 === 0) {
            row.classList.add("active-row");
          }
      }
    }

    // add the row to the end of the table body
    if (i==0) {
      tblHead.appendChild(row);
    } else {
      tblBody.appendChild(row);
    }
    
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  
  document.getElementById("myTable").appendChild(tbl);
}