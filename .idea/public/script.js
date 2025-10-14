    const toggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    const dropdownLinks = document.querySelectorAll('nav ul > li > a');

    toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    // Close all dropdowns when toggling menu
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
});

    dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
        if (window.innerWidth <= 900) {
            const dropdown = link.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                e.preventDefault();
                const isOpen = dropdown.classList.contains('open');
                // Close all dropdowns first
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                // Toggle current one
                if (!isOpen) dropdown.classList.add('open');
            }
        }
    });
});
