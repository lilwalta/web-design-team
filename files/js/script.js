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
            link: "anxiety/"
        },
        {
            text: "Step 2: Symptoms – Common signs include restlessness, racing thoughts, irritability, muscle tension, and difficulty concentrating. People may experience heart palpitations, sweating, or panic attacks when facing stressful situations.",
            link: "anxiety/"
        },
        {
            text: "Step 3: Coping tools – Breathing exercises, mindfulness, and cognitive behavioral therapy (CBT) are highly effective for managing anxiety. Regular exercise, healthy sleep habits, and limiting caffeine can also reduce symptoms over time.",
            link: "anxiety/"
        },
        {
            text: "Step 4: Get help – Seeking professional therapy or counseling is one of the most effective ways to manage anxiety. Support groups, hotlines, and relaxation apps can also provide day-to-day relief and community support.",
            link: "anxiety/"
        }
    ],

    "Depression": [
        {
            text: "Step 1: What it is – Depression is a mood disorder that affects how you feel, think, and function in daily life. It goes beyond temporary sadness, often lasting weeks or months and impacting work, relationships, and motivation.",
            link: "depression/"
        },
        {
            text: "Step 2: Symptoms – People with depression may feel empty, fatigued, or hopeless, with changes in appetite, sleep, and concentration. They may lose interest in activities they once enjoyed or struggle to complete daily tasks.",
            link: "depression/"
        },
        {
            text: "Step 3: Coping tools – Evidence-based treatments include therapy (especially CBT or interpersonal therapy), medication, and lifestyle habits like regular physical activity and maintaining social connections. Small daily goals can help restore routine and confidence.",
            link: "depression/"
        },
        {
            text: "Step 4: Get help – Reaching out to a therapist, psychiatrist, or primary care doctor is the best first step. If you're struggling with thoughts of self-harm, contact a trusted person or reach out immediately to a crisis hotline for support.",
            link: "depression/"
        }
    ],

    "Eating Disorders": [
        {
            text: "Step 1: What it is – Eating disorders are serious mental health conditions involving unhealthy relationships with food, body image, and self-esteem. Common types include anorexia nervosa, bulimia nervosa, and binge-eating disorder.",
            link: "eating/"
        },
        {
            text: "Step 2: Symptoms – Warning signs include severe restriction or overeating, guilt around meals, obsessive calorie tracking, or excessive exercise. Emotional distress and low self-worth often accompany these behaviors.",
            link: "eating/"
        },
        {
            text: "Step 3: Coping tools – Treatment usually involves a multidisciplinary approach combining therapy, nutrition counseling, and medical support. Learning mindful eating habits and developing self-compassion are vital parts of recovery.",
            link: "eating/"
        },
        {
            text: "Step 4: Get help – Specialized eating disorder clinics and support groups can offer life-changing help. If you or someone you know struggles with food and body image, reach out to a healthcare provider or helpline today.",
            link: "eating/"
        }
    ],

    "PTSD & Trauma": [
        {
            text: "Step 1: What it is – Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing a traumatic event. It’s the brain’s response to overwhelming stress, causing vivid memories or a sense of ongoing danger.",
            link: "ptsd/"
        },
        {
            text: "Step 2: Symptoms – People with PTSD may experience flashbacks, nightmares, or avoidance of reminders related to the trauma. Hypervigilance, irritability, and emotional numbness are also common responses to unprocessed trauma.",
            link: "ptsd/"
        },
        {
            text: "Step 3: Coping tools – Trauma-focused therapies like EMDR and CBT can help reprocess traumatic memories safely. Mindfulness, grounding exercises, and supportive relationships also play key roles in long-term recovery.",
            link: "ptsd/"
        },
        {
            text: "Step 4: Get help – Recovery is possible with the right professional support. Seek a trauma-informed therapist, join a peer support group, or reach out to crisis hotlines if you need immediate help.",
            link: "ptsd/"
        }
    ],
    "Bipolar Disorder": [
    {
        text: "Step 1: What it is – Bipolar disorder involves extreme mood changes ranging from manic or hypomanic episodes to depressive episodes. These shifts can affect energy, behavior, and decision-making.",
        link: "bipolar/"
    },
    {
        text: "Step 2: Symptoms – Symptoms may include periods of high energy, reduced sleep, impulsivity, followed by deep sadness, fatigue, and hopelessness during depressive phases.",
        link: "bipolar/"
    },
    {
        text: "Step 3: Coping tools – Mood stabilizing medication, therapy, structured routines, and sleep consistency are critical tools for managing bipolar disorder.",
        link: "bipolar/"
    },
    {
        text: "Step 4: Get help – Working closely with a psychiatrist and therapist can help manage symptoms long-term and reduce relapse risk.",
        link: "bipolar/"
    }
],

"ADHD": [
    {
        text: "Step 1: What it is – ADHD affects attention, impulse control, and activity levels. It can impact school, work, and relationships throughout life.",
        link: "adhd/"
    },
    {
        text: "Step 2: Symptoms – Common signs include difficulty focusing, restlessness, forgetfulness, and trouble organizing tasks or managing time.",
        link: "adhd/"
    },
    {
        text: "Step 3: Coping tools – Behavioral therapy, structured schedules, medication, and organizational strategies can greatly improve daily functioning.",
        link: "adhd/"
    },
    {
        text: "Step 4: Get help – Diagnosis and treatment from a healthcare professional can significantly improve quality of life.",
        link: "adhd/"
    }
],

"Obsessive-Compulsive Disorder (OCD)": [
    {
        text: "Step 1: What it is – OCD involves intrusive, unwanted thoughts (obsessions) and repetitive behaviors (compulsions) performed to reduce anxiety.",
        link: "ocd/"
    },
    {
        text: "Step 2: Symptoms – Common symptoms include excessive cleaning, checking, counting, or mental rituals driven by fear or distress.",
        link: "ocd/"
    },
    {
        text: "Step 3: Coping tools – Exposure and Response Prevention (ERP) therapy is highly effective, along with medication in some cases.",
        link: "ocd/"
    },
    {
        text: "Step 4: Get help – A mental health professional trained in OCD treatment can help reduce symptoms and improve daily life.",
        link: "ocd/"
    }
],

"Schizophrenia": [
    {
        text: "Step 1: What it is – Schizophrenia is a serious mental illness affecting perception, thought processes, and emotional regulation.",
        link: "schizophrenia/"
    },
    {
        text: "Step 2: Symptoms – Symptoms may include hallucinations, delusions, disorganized thinking, and reduced emotional expression.",
        link: "schizophrenia/"
    },
    {
        text: "Step 3: Coping tools – Medication, therapy, social support, and structured care plans help manage symptoms long-term.",
        link: "schizophrenia/"
    },
    {
        text: "Step 4: Get help – Early intervention and consistent treatment significantly improve outcomes and stability.",
        link: "schizophrenia/"
    }
],

"Substance Use Disorders": [
    {
        text: "Step 1: What it is – Substance use disorders involve dependency on drugs or alcohol that disrupts mental, physical, and social health.",
        link: "substance-use/"
    },
    {
        text: "Step 2: Symptoms – Warning signs include cravings, loss of control, withdrawal symptoms, and continued use despite harm.",
        link: "substance-use/"
    },
    {
        text: "Step 3: Coping tools – Treatment may include therapy, medication-assisted treatment, peer support groups, and lifestyle changes.",
        link: "substance-use/"
    },
    {
        text: "Step 4: Get help – Recovery is possible. Reach out to treatment centers, counselors, or addiction helplines for support.",
        link: "substance-use/"
    }
]
};

function initDisorderModal() {
    const guidedOverlay = document.getElementById('guided-modal');
    const guidedTitle = document.getElementById('guided-title');
    const guidedText = document.getElementById('guided-text');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const guidedClose = document.querySelector('.guided-close');
    const progressBar = document.getElementById('guided-progress-bar');
    const fullArticleBtn = document.getElementById('modal-link');

    if (!guidedOverlay) return; // safemode

    let currentSteps = [];
    let currentIndex = 0;

    document.querySelectorAll('.disorders-grid .card a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cardTitle = link.closest('.card').querySelector('h3').innerText;

            if (!guidedData[cardTitle]) return;

            currentSteps = guidedData[cardTitle];
            currentIndex = 0;

            guidedTitle.innerText = cardTitle;
            guidedText.innerText = currentSteps[0].text;
            fullArticleBtn.href = currentSteps[0].link;

            progressBar.style.width = `${(1 / currentSteps.length) * 100}%`;
            prevBtn.disabled = true;
            nextBtn.disabled = false;

            guidedOverlay.classList.add('show');
        });
    });

    guidedClose.addEventListener('click', () => {
        guidedOverlay.classList.remove('show');
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentSteps.length - 1) {
            currentIndex++;
            updateStep();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateStep();
        }
    });

    function updateStep() {
        guidedText.innerText = currentSteps[currentIndex].text;
        fullArticleBtn.href = currentSteps[currentIndex].link;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentSteps.length - 1;

        progressBar.style.width = `${((currentIndex + 1) / currentSteps.length) * 100}%`;
    }
}
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!hamburger || !mobileMenu) return; // header not loaded yet

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
        document.body.style.overflow = mobileMenu.classList.contains("show") ? "hidden" : "";
    });

    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) &&
            !hamburger.contains(e.target) &&
            mobileMenu.classList.contains("show")) 
        {
            mobileMenu.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("show")) {
            mobileMenu.classList.remove("show");
            document.body.style.overflow = "";
        }
    });
}

function initSearchMenu() {
    const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.querySelector(".header-search");
  const searchInput = document.getElementById("siteSearch");

  if (searchToggle && searchBar && searchInput) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      searchBar.classList.toggle("active");

      if (searchBar.classList.contains("active")) {
        searchInput.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !searchBar.contains(e.target) &&
        !searchToggle.contains(e.target)
      ) {
        searchBar.classList.remove("active");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchBar.classList.remove("active");
      }
    });
  }
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  resultsBox.innerHTML = "";

  if (!query) {
    resultsBox.classList.remove("show");
    return;
  }

  const matches = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.keywords.some(k => k.includes(query))
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = `<div class="no-search-results">No results found</div>`;
  } else {
    matches.forEach(item => {
      const result = document.createElement("a");
      result.href = item.url;
      result.className = "search-result";
      result.innerHTML = `
        <span class="result-title">${item.title}</span>
        <span class="result-type">${item.type}</span>
      `;
      resultsBox.appendChild(result);
    });
  }

  resultsBox.classList.add("show");
});
}

