const btns = document.querySelectorAll("button");

btns.forEach((button) => {
    // When mouse hovers over button
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#f9faf8";
        button.style.color = "#3882f6";
    });
    // When mouse hovers off button
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#3882f6";
        button.style.color = "#f9faf8";
    });
});
