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
    var colTotals = [];
    for (var i = 0; i < ahpMatrix.length; i++) {
        colTotals[i] = 0;
        for (var j = 0; j < ahpMatrix.length; j++) {
            colTotals[i] += ahpMatrix[j][i];
        }
    }
    // Normalize each column by dividing each element by the column total
    for (var i = 0; i < ahpMatrix.length; i++) {
        for (var j = 0; j < ahpMatrix.length; j++) {
            ahpMatrix[j][i] /= colTotals[i];
        }
    }
    return ahpMatrix;
}

function CaltulateRowAverage(ahpMatrix) {
    var rowAverages = [];
    for (var i = 0; i < ahpMatrix.length; i++) {
        rowAverages[i] = 0;
        for (var j = 0; j < ahpMatrix.length; j++) {
            rowAverages[i] += ahpMatrix[i][j];
        }
        rowAverages[i] /= ahpMatrix.length;
    }
    return rowAverages;
}

function CalculateConsistencyRatio(ahpMatrix, rowAverages) {
    // Calculate the lambda max for the matrix
    var lambdaMax = 0;
    for (var i = 0; i < ahpMatrix.length; i++) {
        lambdaMax += rowAverages[i] / ahpMatrix.length;
    }
    
    // The consistency Index is the lambda max divided by the number of rows
    var CI = (lambdaMax - ahpMatrix.length) / (ahpMatrix.length - 1);
    // The consistency ratio is the consistency index divided by the random index
    // The random index is 0.90 for 4 rows
    var CR = CI / 0.90;
    return CR;
}

function CalculateAhp(inputArray) {
    var ahpMatrix = CreateAhpMatrix(inputArray);
    ahpMatrix = normalizeColumns(ahpMatrix);
    var rowAverages = CaltulateRowAverage(ahpMatrix);
    var CR = CalculateConsistencyRatio(ahpMatrix, rowAverages);
    if (CR >= 0.1) {
        console.log("The AHP matrix is not consistent");
    }
    else {
        console.log("The AHP matrix is consistent:" + CR);
    }
}



testArray = [1, 2, 3, 4, 5, 6];

console.log(CreateAhpMatrix(testArray));

CalculateAhp(testArray);
