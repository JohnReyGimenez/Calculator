document.addEventListener("DOMContentLoaded", function() {
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equals");
    let decimal = document.querySelector(".decimal");
    let back = document.querySelector(".back");

    let numbers = document.querySelectorAll(".number");
    let operator = document.querySelectorAll(".operator");

    let display = document.querySelector(".display");

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent)
    })
);
    
})

function handleNumber(num) {
    console.log(num);
}