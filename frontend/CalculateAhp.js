var genre, publisher, os, prp, purchase, priceArray, dateArray = undefined;

function transformSliderValues(array) {
    let result = []
    // multiply each element by (-1)
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i] * (-1)
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) {
            array[i] = 1/(1 - array[i])
        }
        else if (array[i] >= 0) {
            array[i] = 1 + array[i]
        }
    }
    return array
}

function CreateAhpMatrix(inputArray) {
    console.log(inputArray)
    inputArray = transformSliderValues(inputArray)
    ahpMatrix = [
        [1, inputArray[0], inputArray[1], inputArray[2]],
        [1/inputArray[0], 1, inputArray[3], inputArray[4]],
        [1/inputArray[1],1/inputArray[3] , 1, inputArray[5]],
        [1/inputArray[2], 1/inputArray[4],1/inputArray[5] , 1]
    ];
    // Returns a 2D array
    return ahpMatrix;
}

function normalizeColumns(ahpMatrix) {
    // Find the total of each column
    let colTotals = [];
    for (let i = 0; i < ahpMatrix[0].length; i++) {
        colTotals[i] = 0;
        for (let j = 0; j < ahpMatrix.length; j++) {
            colTotals[i] += ahpMatrix[j][i];
        }
    }
    // Create a copy of the AHP matrix without arr.slice
    let resultMatrix = [];
    for (let i = 0; i < ahpMatrix.length; i++) {
        resultMatrix[i] = [];
        for (let j = 0; j < ahpMatrix[0].length; j++) {
            resultMatrix[i][j] = ahpMatrix[i][j];
        }
    }
    // Normalize each column by dividing each element by the column total
    for (let i = 0; i < ahpMatrix.length; i++) {
        for (let j = 0; j < ahpMatrix[0].length; j++) {
            resultMatrix[i][j] /= colTotals[j];
        }
    }
    return resultMatrix;
}

function CaltulateRowAverage(ahpMatrix) {
    let rowAverages = [];
    for (let i = 0; i < ahpMatrix.length; i++) {
        rowAverages[i] = 0;
        for (let j = 0; j < ahpMatrix.length; j++) {
            rowAverages[i] += ahpMatrix[i][j];
        }
        rowAverages[i] /= ahpMatrix.length;
    }
    return rowAverages;
}

function CalculateConsistencyRatio(ahpMatrix, rowAverages) {
    // Matrix multiplication of the AHP matrix and the row averages
    let ax = [];
    for (let i = 0; i < ahpMatrix.length; i++) {
        ax[i] = 0;
        for (let j = 0; j < ahpMatrix.length; j++) {
            ax[i] += ahpMatrix[i][j] * rowAverages[j];
        }
    }
    // The lambda max is ax/rowAverages summed and divided by the number of rows
    let lambdaMax = 0;
    for (let i = 0; i < ahpMatrix.length; i++) {
        lambdaMax += ax[i] / rowAverages[i];
    }
    lambdaMax /= ahpMatrix.length;
    // The consistency Index is the lambda max divided by the number of rows
    let CI = (lambdaMax - ahpMatrix.length) / (ahpMatrix.length - 1);
    // The consistency ratio is the consistency index divided by the random index
    // The random index is 0.90 for 4 rows
    let CR = CI / 0.90;
    return CR;
}

function CalculateAhp(inputArray) {
    let ahpMatrix = CreateAhpMatrix(inputArray);
    normalizedAhpMatrix = normalizeColumns(ahpMatrix);
    ahpMatrix = CreateAhpMatrix(inputArray);
    let rowAverages = CaltulateRowAverage(normalizedAhpMatrix);
    let CR = CalculateConsistencyRatio(ahpMatrix, rowAverages);
    if (CR >= 0.1) {
        console.log("The AHP matrix is not consistent" + CR);
    }
    else {
        console.log("The AHP matrix is consistent:" + CR);
    }
    return rowAverages;
}

// This function reads the steammaster.csv file as list of objects from https://github.com/MuratCaganGogebakan/mis463ahp/blob/main/data/steammaster.csv
async function ReadSteamMaster() {
    const response = await fetch('https://raw.githubusercontent.com/MuratCaganGogebakan/mis463ahp/main/data/steammaster.csv');
    const text = await response.text();
    lines = text.split('\n');
    let headers = lines[0].split(',');
    let data = [];
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        data.push(obj);
    }
    return data;
}

function FilterGenre(Data, genre) {
    if (genre .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the Genre property is defined
        if (el.Genre) {
            // Check if the Genre property contains at least one of the genres in the input array
            for (let i = 0; i < genre.length; i++) {
                if (el.Genre.includes(genre[i])) {
                    return true;
                }
            }
        }
        return false;
    });
    return filteredData;
}


function FilterPublisher(Data, publisher) {
    if (publisher .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the Publisher property is defined
        if (el.publisher) {
            // Check if the Publisher property contains at least one of the publishers in the input array
            for (let i = 0; i < publisher.length; i++) {
                if (el.publisher.includes(publisher[i])) {
                    return true;
                }
            }
        }
        return false;
    });
    return filteredData;
}

function FilterOS(Data, os) {
    if (os .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the OS property is defined
        if (el.platforms && el.platforms.includes(os)) {
            return true;
        } else {
            return false;
        }
    });
    return filteredData;
}

function FilterPrP(Data, prp) {
    if (prp .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the Price property is defined
        if (el.rating_percentage && el.rating_percentage >= prp) {
            return true;
        } else {
            return false;
        }
    });
    return filteredData;
}

function FilterPurcahse(Data, purchase) {
    if (purchase .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the Purcahse property is defined
        if (el.min_owners && el.min_owners >= purchase) {
            return true;
        } else {
            return false;
        }
    });
    return filteredData;
} 

function FilterPriceRange(Data, priceArray) {
    if (priceArray .length===0) {
        return Data;
    }
    // Filter the data set
    let filteredData = Data.filter(el => {
        // Check if the Price property is defined
        if (!el.price) return false;
        // Convert the price string to a float
        const price = parseFloat(el.price);
        // Check if the Price property is defined
        if (price >= priceArray[0] && price <= priceArray[1]) {
            return true;
        } else {
            return false;
        }
    });
    return filteredData;
}

function FilterDates(Data, dateArray) {
    if (dateArray[0] === "" || dateArray[1] === "") {
        return Data;
    }
    // Convert dateArray to date objects
    dateArray[0] = new Date(dateArray[0]);
    dateArray[1] = new Date(dateArray[1]);
    // Convert el.release_date to date object
    Data.forEach(el => {
        if (el.release_date) {
            el.release_date = new Date(el.release_date);
        }
    });
    
    // Filter the data set taking date as an integer
    let filteredData = Data.filter(el => {
        // Check if the date property is defined
        if (!el.release_date) return false;
        // Check if the date property is defined
        if (el.release_date >= dateArray[0] && el.release_date <= dateArray[1]) {
            return true;
        } else {
            return false;
        }
    });
    // Drop time from date
    filteredData.forEach(el => {
        if (el.release_date) {
            el.release_date = el.release_date.toISOString().split('T')[0];
        }
    });
    return filteredData;
}

async function FilterData(genre, publisher, os, prp, purchase, priceArray, dateArray) {
    steamMasterData = await ReadSteamMaster();
    steamMasterData = FilterGenre(steamMasterData, genre);
    steamMasterData = FilterPublisher(steamMasterData, publisher);
    steamMasterData = FilterOS(steamMasterData, os);
    steamMasterData = FilterPrP(steamMasterData, prp);
    steamMasterData = FilterPurcahse(steamMasterData, purchase);
    steamMasterData = FilterPriceRange(steamMasterData, priceArray);
    steamMasterData = FilterDates(steamMasterData, dateArray);
    return steamMasterData;
}

function RemoveUnnecessaryColumns(Data) {
    // Remove unnecessary columns
    Data.forEach(el => {
        delete el.name;
        delete el.url;
        delete el.image;
        delete el.release_date;
        delete el.publisher;
        delete el.platforms;
        delete el.Genre;
        delete el.min_owners;
    });
    return Data;
}

function CreateGameMatrix(Data) {
    // Remove unnecessary columns
    removedData = RemoveUnnecessaryColumns(Data);
    // Create a game matrix
    let gameMatrix = [];
    removedData.forEach(el => {
        let game = [];
        game.push(el.price);
        game.push(el.total_ratings);
        game.push(el.playtime);
        game.push(el.rating_percentage);
        gameMatrix = [...gameMatrix, game];
    });
    // Convert the game matrix to a matrix of floats
    gameMatrix = gameMatrix.map(el => el.map(el => parseFloat(el)));
    // Normalize the columns of game matrix
    gameMatrix = normalizeColumns(gameMatrix);
    // Add the the Data object to the game matrix
    gameMatrix = gameMatrix.map((el, i) => [...el, Data[i]]);
    return gameMatrix;
}

function multiplyMatrixVector(matrix, vector) {
    if (matrix[0].length !== vector.length) {
      throw new Error("Matrix and vector are not compatible for multiplication.");
    }
  
    const result = new Array(matrix.length);
  
    for (let i = 0; i < matrix.length; i++) {
      result[i] = 0;
  
      for (let j = 0; j < vector.length; j++) {
        result[i] += matrix[i][j] * vector[j];
      }
    }
  
    return result;
  }
  
  

function multiplyGameandAHP(gameMatrix, priorityVector) {
    // store the first column of game matrix
    let firstColumn = gameMatrix.map(el => el[0]);
    // remove the first column of game matrix
    gameMatrix = gameMatrix.map(el => el.slice(1));
    // Check if the game matrix and ahp matrix are compatible
    if (gameMatrix[0].length != priorityVector.length) {
        console.log("The game matrix and ahp matrix are not compatible");
        return;
    }
    // matrix multiplication
    let result = multiplyMatrixVector(gameMatrix, priorityVector);
    // Add the first column back to the result
    result = result.map((el, i) => [firstColumn[i], el]);
    // Sort the result in descending order of the second column
    result.sort((a, b) => b[1] - a[1]);
    return result;
}


    

main = async () => {
    genre = getSelectedGenre();
    publisher = getSelectedPublisher();
    os = getSelectedOS();
    prp = getSelectedPrp();
    purchase = getSelectedPurchase();
    priceArray = getPriceRange();
    dateArray = getDates();
    steamMasterData = await FilterData(genre, publisher, os, prp, purchase, priceArray, dateArray);
    gameMatrix = CreateGameMatrix(steamMasterData);
    console.log(gameMatrix);
    
    //test transformSliderValues
    let inputArray = getSliderValues();  

    // Calculate the priority vector
    let priorityVector = CalculateAhp(inputArray);

    // multiply the game matrix and the priority vector
    let result = multiplyGameandAHP(gameMatrix, priorityVector);
    console.log(result);
}



