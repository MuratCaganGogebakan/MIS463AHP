const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 10;
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

getSelectedGenres = () => {
    let result = []
    $("#genre-drop-down").children().filter(function() {
        //class is checked
        return $(this).hasClass("checked");
    }).each(function() {
        //class is checked
        result.push( $(this).text().split("\n")[4].trim())
    })
    return result
}

getSliderValues = () => {
    let result = []
    $("input.form-range").each(function() {
        //class is checked
        result.push($(this).val())
    })
    return result
}

getPriceRange = () => {
    let result = []
    $("input.input-min").each(function() {
        //class is checked
        result.push($(this).val())
    })
    $("input.input-max").each(function() {
        //class is checked
        result.push($(this).val())
    })
    return result
}

getCheckBoxValues = () => {
    let result = []
    $("input#cb1").each(function() {
        //class is checked
        result.push($(this).is(":checked"))
    })
    $("input#cb2").each(function() {
        //class is checked
        result.push($(this).is(":checked"))
    })
    return result
}

