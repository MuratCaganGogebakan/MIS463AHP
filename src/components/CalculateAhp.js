
function CreateAhpMatrix(inputArray) {
    // Populate the AHP matrix
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
    for (let i = 0; i < ahpMatrix.length; i++) {
        colTotals[i] = 0;
        for (let j = 0; j < ahpMatrix.length; j++) {
            colTotals[i] += ahpMatrix[j][i];
        }
    }
    // Copy the ahpmatrix to resultMatrix using map
    let resultMatrix = ahpMatrix.map(function(arr) {
        return arr.slice();
    });
    // Normalize each column by dividing each element by the column total
    for (let i = 0; i < ahpMatrix.length; i++) {
        for (let j = 0; j < ahpMatrix.length; j++) {
            resultMatrix[j][i] /= colTotals[i];
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
    console.log("ahp matrix is:" + ahpMatrix);
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


ReadSteamMaster().then(console.log);



testArray = [1, 2, 3, 4, 5, 6];


