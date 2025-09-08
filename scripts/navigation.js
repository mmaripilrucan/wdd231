// Toggle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navigation = document.getElementById('navigation');

    menuButton.addEventListener('click', function() {
        navigation.classList.toggle('active');

        // Animate hamburger icon
        const spans = menuButton.querySelectorAll('span');
        if (navigation.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('#menu-button') && window.innerWidth < 768) {
            navigation.classList.remove('active');
            const spans = menuButton.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});