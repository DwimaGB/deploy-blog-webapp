

const menuButton = document.querySelector(".kebab-menu");
const dropdown = document.querySelector(".dropdown");

menuButton.addEventListener('click', (e) => {
    const visible = dropdown.getAttribute('data-visible');
    // console.log(visible);
    if (visible === 'true') {
        menuButton.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('data-visible', 'false');
    }
    else {
        menuButton.setAttribute('aria-expanded', 'true');
        dropdown.setAttribute('data-visible', 'true');
    }

})
