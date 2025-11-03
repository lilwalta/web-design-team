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
        {
            text: "Step 1: What it is – Anxiety disorders involve persistent and excessive worry or fear that interferes with daily life. While some anxiety is normal, these disorders can cause overwhelming dread, panic attacks, and avoidance of triggers.",
            link: "anxiety.html"
        },
        {
            text: "Step 2: Symptoms – Common signs include restlessness, racing thoughts, irritability, muscle tension, and difficulty concentrating. People may experience heart palpitations, sweating, or panic attacks when facing stressful situations.",
            link: "anxiety.html"
        },
        {
            text: "Step 3: Coping tools – Breathing exercises, mindfulness, and cognitive behavioral therapy (CBT) are highly effective for managing anxiety. Regular exercise, healthy sleep habits, and limiting caffeine can also reduce symptoms over time.",
            link: "anxiety.html"
        },
        {
            text: "Step 4: Get help – Seeking professional therapy or counseling is one of the most effective ways to manage anxiety. Support groups, hotlines, and relaxation apps can also provide day-to-day relief and community support.",
            link: "anxiety.html"
        }
    ],

    "Depression": [
        {
            text: "Step 1: What it is – Depression is a mood disorder that affects how you feel, think, and function in daily life. It goes beyond temporary sadness, often lasting weeks or months and impacting work, relationships, and motivation.",
            link: "depression.html"
        },
        {
            text: "Step 2: Symptoms – People with depression may feel empty, fatigued, or hopeless, with changes in appetite, sleep, and concentration. They may lose interest in activities they once enjoyed or struggle to complete daily tasks.",
            link: "depression.html"
        },
        {
            text: "Step 3: Coping tools – Evidence-based treatments include therapy (especially CBT or interpersonal therapy), medication, and lifestyle habits like regular physical activity and maintaining social connections. Small daily goals can help restore routine and confidence.",
            link: "depression.html"
        },
        {
            text: "Step 4: Get help – Reaching out to a therapist, psychiatrist, or primary care doctor is the best first step. If you're struggling with thoughts of self-harm, contact a trusted person or reach out immediately to a crisis hotline for support.",
            link: "depression.html"
        }
    ],

    "Eating Disorders": [
        {
            text: "Step 1: What it is – Eating disorders are serious mental health conditions involving unhealthy relationships with food, body image, and self-esteem. Common types include anorexia nervosa, bulimia nervosa, and binge-eating disorder.",
            link: "eating.html"
        },
        {
            text: "Step 2: Symptoms – Warning signs include severe restriction or overeating, guilt around meals, obsessive calorie tracking, or excessive exercise. Emotional distress and low self-worth often accompany these behaviors.",
            link: "eating.html"
        },
        {
            text: "Step 3: Coping tools – Treatment usually involves a multidisciplinary approach combining therapy, nutrition counseling, and medical support. Learning mindful eating habits and developing self-compassion are vital parts of recovery.",
            link: "eating.html"
        },
        {
            text: "Step 4: Get help – Specialized eating disorder clinics and support groups can offer life-changing help. If you or someone you know struggles with food and body image, reach out to a healthcare provider or helpline today.",
            link: "eating.html"
        }
    ],

    "PTSD & Trauma": [
        {
            text: "Step 1: What it is – Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing a traumatic event. It’s the brain’s response to overwhelming stress, causing vivid memories or a sense of ongoing danger.",
            link: "ptsd.html"
        },
        {
            text: "Step 2: Symptoms – People with PTSD may experience flashbacks, nightmares, or avoidance of reminders related to the trauma. Hypervigilance, irritability, and emotional numbness are also common responses to unprocessed trauma.",
            link: "ptsd.html"
        },
        {
            text: "Step 3: Coping tools – Trauma-focused therapies like EMDR and CBT can help reprocess traumatic memories safely. Mindfulness, grounding exercises, and supportive relationships also play key roles in long-term recovery.",
            link: "ptsd.html"
        },
        {
            text: "Step 4: Get help – Recovery is possible with the right professional support. Seek a trauma-informed therapist, join a peer support group, or reach out to crisis hotlines if you need immediate help.",
            link: "ptsd.html"
        }
    ]
};

let currentSteps = [];
let currentIndex = 0;

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
