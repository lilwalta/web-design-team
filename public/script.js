const guidedOverlay = document.getElementById('guided-modal');
const guidedTitle = document.getElementById('guided-title');
const guidedText = document.getElementById('guided-text');
const prevBtn = document.getElementById('prev-step');
const nextBtn = document.getElementById('next-step');
const guidedClose = document.querySelector('.guided-close');
const progressBar = document.getElementById('guided-progress-bar');
const fullArticleBtn = document.getElementById('modal-link'); // separate button for full article

const guidedData = {
    "Anxiety Disorders": [
        { text: "Step 1: What it is – Anxiety is a normal emotion, but disorders involve excessive worry.", link: "anxiety.html" },
        { text: "Step 2: Symptoms – Restlessness, irritability, sleep disturbances, and panic attacks.", link: "anxiety.html" },
        { text: "Step 3: Coping tools – Therapy, mindfulness, breathing exercises, lifestyle changes.", link: "anxiety.html" },
        { text: "Step 4: Get help – Reach out to professionals, support groups, or hotlines.", link: "anxiety.html" }
    ],
    "Depression": [
        { text: "Step 1: What it is – Depression affects mood, energy, and motivation.", link: "depression.html" },
        { text: "Step 2: Symptoms – Persistent sadness, fatigue, sleep/appetite changes, loss of interest.", link: "depression.html" },
        { text: "Step 3: Coping tools – Therapy, medication, exercise, social support.", link: "depression.html" },
        { text: "Step 4: Get help – Speak with healthcare providers or trusted support networks.", link: "depression.html" }
    ]
};

let currentSteps = [];
let currentIndex = 0;

// Open guided modal on card click
document.querySelectorAll('.disorders-grid .card a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const cardTitle = link.closest('.card').querySelector('h3').innerText;
        if(!guidedData[cardTitle]) return;

        currentSteps = guidedData[cardTitle];
        currentIndex = 0;
        guidedTitle.innerText = cardTitle;

        // Animate step content
        guidedText.style.opacity = 0;
        setTimeout(() => {
            guidedText.innerText = currentSteps[currentIndex].text;
            fullArticleBtn.href = currentSteps[currentIndex].link;
            guidedText.style.opacity = 1;
        }, 200);

        prevBtn.disabled = true;
        nextBtn.disabled = currentSteps.length === 1;
        progressBar.style.width = `${((currentIndex+1)/currentSteps.length)*100}%`;
        guidedOverlay.classList.add('show');
    });
});

// Navigate steps with animation
function updateStep() {
    guidedText.style.opacity = 0;
    setTimeout(() => {
        guidedText.innerText = currentSteps[currentIndex].text;
        fullArticleBtn.href = currentSteps[currentIndex].link;
        guidedText.style.opacity = 1;
    }, 200);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentSteps.length - 1;
    progressBar.style.width = `${((currentIndex+1)/currentSteps.length)*100}%`;
}

nextBtn.addEventListener('click', () => {
    if(currentIndex < currentSteps.length - 1){
        currentIndex++;
        updateStep();
    }
});

prevBtn.addEventListener('click', () => {
    if(currentIndex > 0){
        currentIndex--;
        updateStep();
    }
});

// Close overlay
guidedClose.addEventListener('click', () => guidedOverlay.classList.remove('show'));
window.addEventListener('click', e => {
    if(e.target === guidedOverlay) guidedOverlay.classList.remove('show');
});
