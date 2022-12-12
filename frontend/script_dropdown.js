const selectBtns = document.querySelectorAll(".select-btn");
const items = document.querySelectorAll(".item");
selectBtns.forEach((btn) => {

    btn.addEventListener("click", () => {
        // Close other buttons but open me
        selectBtns.forEach((btn2) => {
            if (btn2 !== btn) {
                btn2.classList.remove("open");
            }
        });

        btn.classList.toggle("open");

    });
    items.forEach(item => {
        item.addEventListener("click", () => {
            let parentBtn = item.parentElement.parentElement;
            item.classList.toggle("checked");

            let title= parentBtn.getAttribute("name");

            let checked = parentBtn.querySelectorAll(".checked"),
                btnText = parentBtn.querySelector(".btn-text");

            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = title;
            }
        });
    })
});