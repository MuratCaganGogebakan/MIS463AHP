function generateTable(Data, headerArray) {
  // get the maximum of length of the data and 50
  if (Data.length < 50) {
    var tableLength = Data.length;
  }
  else {
    var tableLength = 50;
  }
    
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
  for (let i = 0; i < tableLength; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < 10; j++) {
      const cellD = document.createElement("td");
      let cellH = document.createElement("th");
      let cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      if (j==0 && i!=0) {
        cellText = document.createTextNode(i.toString());
          
      }
      if (j==1 && i!=0) {
          cellText = document.createElement("img");
          cellText.setAttribute("src", Data[i - 1].image);
          // Set the scale of the image
          cellText.setAttribute("width", "175");
      }
      if (j==2 && i!=0) {
          cellText.textContent = Data[i - 1].name.replace(/[^\x00-\x7F]/g, "");
      }
      if (j==3 && i!=0) {
          cellText.textContent = Data[i - 1].price;
      }
      if (j==4 && i!=0) {
          cellText.textContent = ((Data[i - 1].rating_percentage)/20).toFixed(1);
      }
      if (j==5 && i!=0) {
          cellText.textContent = Data[i - 1].Genre;
      }
      if (j==6 && i!=0) {
          cellText.textContent = Data[i - 1].publisher;
      }
      if (j==7 && i!=0) {
          cellText.textContent = (parseFloat(Data[i - 1].playtime)/60).toFixed(1);
      }
      if (j==8 && i!=0) {
          cellText.textContent = Data[i - 1].release_date;
      }
      if (j==9 && i!=0) {
          cellText.textContent = Data[i - 1].platforms;
      }
      if (i == 0) {
          // set the text content to the header
          cellH.textContent = headerArray[j-1];
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
  // Create a div element to hold the table
  const divContainer = document.createElement("div");
  // add style to the div element 
  divContainer.setAttribute("style", "overflow-y:scroll; height:700px;");
  divContainer.classList.add("table-container");
  divContainer.appendChild(tbl);
  // add the <table> inside the <div> element
  document.getElementById("myTable").
  appendChild(divContainer);
  document.getElementById("tableMessage2").style.display = "block";

}

function removeTable(keepMessage) {
  document.getElementById("myTable").innerHTML = "";
  if (keepMessage == false) {
    document.getElementById("tableMessage2").style.display = "none";
  }  
}