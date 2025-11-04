document.querySelector('#scheduler-form').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const type = document.querySelector('#type').value;

    // (Future backend call would go here)
    console.log({ name, email, date, time, type });

    document.querySelector('#scheduler-form').classList.add('hidden');
    document.querySelector('#confirmation').classList.remove('hidden');
});

