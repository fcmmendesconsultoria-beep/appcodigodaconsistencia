document.addEventListener('DOMContentLoaded', () => {
    // State
    const totalDays = 60;
    let currentDay = 1;
    let isCompletedToday = false;

    // Elements
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressBar = document.getElementById('progress-bar');
    
    const actionCard = document.getElementById('action-card');
    const actionTitle = document.getElementById('action-title');
    const actionDescription = document.getElementById('action-description');
    const actionNotes = document.getElementById('action-notes');
    const completeBtn = document.getElementById('complete-btn');
    
    const successMessage = document.getElementById('success-message');
    const nextDayBtn = document.getElementById('next-day-btn');

    // Sample data for days (could be fetched from a server or local storage)
    const challenges = [
        {
            title: "Definir seus objetivos principais",
            description: "Escreva no seu caderno quais são os 3 principais objetivos que você deseja alcançar nestes 60 dias. Seja específico e realista."
        },
        {
            title: "Auditoria de tempo",
            description: "Monitore e anote como você gasta cada hora do seu dia hoje. Identifique os ladrões de tempo."
        },
        {
            title: "Leitura de 15 minutos",
            description: "Leia 15 minutos de um livro que ajude no seu desenvolvimento pessoal ou profissional."
        }
    ];

    // Initialize UI
    updateProgressUI();
    loadDayContent(currentDay);

    // Event Listeners
    completeBtn.addEventListener('click', () => {
        if (!isCompletedToday) {
            completeDay();
        }
    });

    nextDayBtn.addEventListener('click', () => {
        if (currentDay < totalDays) {
            currentDay++;
            isCompletedToday = false;
            resetUIForNextDay();
        }
    });

    // Functions
    function updateProgressUI() {
        progressText.textContent = `Dia ${currentDay} de ${totalDays}`;
        const percentage = Math.round((currentDay / totalDays) * 100);
        progressPercentage.textContent = `${percentage}%`;
        
        // Slight delay for animation effect
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
        }, 100);
    }

    function loadDayContent(day) {
        // Load mock content if available, else generic
        const content = challenges[day - 1] || {
            title: `Ação do Dia ${day}`,
            description: "Mantenha o foco. Execute a tarefa planejada para hoje e dê mais um passo em direção ao seu objetivo maior."
        };

        actionTitle.textContent = content.title;
        actionDescription.textContent = content.description;
        actionNotes.value = ''; // clear text area
    }

    function completeDay() {
        isCompletedToday = true;
        
        // Visual feedback transition
        actionCard.classList.add('fade-out');
        
        setTimeout(() => {
            actionCard.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Re-trigger animation by slight delay before adding full opacity
            setTimeout(() => {
                successMessage.style.display = 'flex';
                // Trigger reflow
                void successMessage.offsetWidth;
                successMessage.classList.add('fade-in');
            }, 50);
            
        }, 500); // match transition duration in CSS
    }

    function resetUIForNextDay() {
        successMessage.classList.add('hidden');
        setTimeout(() => {
            successMessage.style.display = 'none';
            actionCard.style.display = 'block';
            
            // Trigger reflow
            void actionCard.offsetWidth;
            
            actionCard.classList.remove('fade-out');
            
            updateProgressUI();
            loadDayContent(currentDay);
        }, 500);
    }
});
