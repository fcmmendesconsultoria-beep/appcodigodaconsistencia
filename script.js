async function checarAcesso() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Se não tiver sessão (não está logado), manda para o login
        window.location.href = '/entrar';
    }
}

// Executa a checagem assim que a página abre
checarAcesso();

document.addEventListener('DOMContentLoaded', () => {
    // ... aqui continua o restante do seu código original que carrega os desafios
});document.addEventListener('DOMContentLoaded', () => {
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
const challenges = [
        { title: "Ação 1: Suas Qualidades", description: "Escreva 5 qualidades suas que ninguém no trabalho reconhece ainda." },
        { title: "Ação 2: Resultados Reais", description: "Liste seus 3 maiores resultados profissionais dos últimos 2 anos. Descreva o impacto de cada um." },
        { title: "Ação 3: Crenças Limitantes", description: "Escreva: (1) A crença limitante identificada. (2) A versão oposta criada. (3) Como se sentiu ao ler em voz alta." },
        { title: "Ação 4: Visão Externa", description: "Pergunte a 3 pessoas de confiança: 'Qual é o meu maior talento?'. Anote as iniciais delas e as respostas exatas." },
        { title: "Ação 5: Propósito em Frase", description: "Defina seu propósito profissional em uma frase. Ex: 'Eu existo na empresa para...'" },
        { title: "Ação 6: Inspiração Feminina", description: "Assista 1h de palestra de uma mulher líder. Anote 3 aprendizados." },
        { title: "Ação 7: Declaração de Influência", description: "Quem você quer ser reconhecida como profissional até o fim dos 60 dias?" },
        { title: "Ação 8: Ponto de Excelência", description: "Escolha 1 competência técnica onde você é melhor que a maioria. Explique por que se destaca." },
        { title: "Ação 9: Zona de Medo", description: "Identifique sua zona de medo frequente e escreva 3 ações que te tiram dela." },
        { title: "Ação 10: Manifesto de Identidade", description: "Crie seu 'manifesto de identidade influente': 5 frases sobre quem você é como líder." },
        { title: "Ação 11: Reação a Questionamentos", description: "Observe como reage a críticas a suas ideias. Escreva uma nova resposta assertiva para usar." },
        { title: "Ação 12: Meta de 30 Dias", description: "Defina um objetivo claro de reconhecimento para os próximos 30 dias. Seja específica." },
        { title: "Ação 13: Autoanálise em Vídeo", description: "Grave 2 min sobre um projeto. Anote 3 pontos positivos de comunicação e 2 a melhorar." },
        { title: "Ação 14: Técnica STAR", description: "Escreva 1 história profissional usando Situação, Tarefa, Ação e Resultado." },
        { title: "Ação 15: Voz na Reunião", description: "Fale nos primeiros 5 min da próxima reunião. Descreva a reação da sala e seu sentimento." },
        { title: "Ação 16: Resposta Assertiva", description: "Ao ser interrompida, diga: 'Entendo, mas vou terminar'. Descreva como foi a experiência." },
        { title: "Ação 17: Domínio de Tema", description: "Prepare uma explicação de 3 min sobre um tema que domina. Escreva o resumo em 3 linhas." },
        { title: "Ação 18: Mapa de Poder", description: "Liste Aliados (apoiam) e Desafiadores (testam sua autoridade) sem usar sobrenomes." },
        { title: "Ação 19: Aberturas Poderosas", description: "Escreva 5 frases impactantes para introduzir suas ideias em reuniões." },
        { title: "Ação 20: Protagonismo por E-mail", description: "Proponha uma solução por escrito para um problema da equipe. Descreva a solução e a reação." },
        { title: "Ação 21: Escuta Ativa", description: "Faça 2 perguntas de aprofundamento em uma conversa. O que você descobriu de novo?" },
        { title: "Ação 22: Diálogo Estratégico", description: "Identifique alguém influente. Planeje quando, onde e o que perguntar a essa pessoa." },
        { title: "Ação 23: Ideia com Dados", description: "Apresente uma ideia embasada em dados para sua liderança. Qual foi a reação?" },
        { title: "Ação 24: Rastro de Presença", description: "Envie um resumo pós-reunião com suas contribuições. Quem recebeu e qual foi o retorno?" },
        { title: "Ação 25: LinkedIn: Foto e Headline", description: "Atualize seu perfil para refletir quem você é agora. Cole o link do seu perfil aqui." },
        { title: "Ação 26: Post de Aprendizado", description: "Publique no LinkedIn um aprendizado recente. Compartilhe o link do post aqui." },
        { title: "Ação 27: Comentários Inteligentes", description: "Comente em 3 posts de líderes do setor. Houve resposta ou debate relevante?" },
        { title: "Ação 28: Café Estratégico", description: "Convide alguém para aprender (não vender). Escreva como foi o convite e o aprendizado." },
        { title: "Ação 29: Comunidade Ativa", description: "Faça 1 contribuição relevante em um grupo profissional online. Qual foi a repercussão?" },
        { title: "Ação 30: Insight para Equipe", description: "Compartilhe um artigo ou dado que agregue valor ao time. Por que isso é relevante agora?" },
        { title: "Ação 31: Post de Resultado", description: "Publique sobre um resultado que ajudou a gerar (sem dados sigilosos). Cole o link aqui." },
        { title: "Ação 32: Descanso Estratégico", description: "Dia de integração: revise suas notas até aqui e identifique o padrão de suas vitórias." },
        { title: "Ação 33: Atualização do Setor", description: "Inscreva-se em pelo menos 1 evento ou webinar do seu setor. Qual você escolheu?" },
        { title: "Ação 34: Auditoria Digital", description: "Pesquise seu nome no Google. O que aparece está alinhado com sua meta?" },
        { title: "Ação 35: Networking Cross-Area", description: "Fale com alguém fora da sua área. Como sua área é vista por quem está de fora?" },
        { title: "Ação 36: Manifestação em Fórum", description: "Identifique um evento interno onde você pode se manifestar ou apresentar. Qual é ele?" },
        { title: "Ação 37: Reconhecimento Público", description: "Elogie publicamente um colega. Compartilhe o link ou o texto do post aqui." },
        { title: "Ação 38: Proposta de Valor", description: "O que você entrega que ninguém mais entrega igual? Resuma em 1 frase." },
        { title: "Ação 39: Depoimento Escrito", description: "Peça 1 depoimento sobre seu trabalho para um colega ou gestor." },
        { title: "Ação 40: Acervo de Vitórias", description: "Monte uma pasta com elogios e resultados. Como usará isso estrategicamente?" },
        { title: "Ação 41: Bio em 3 Versões", description: "Escreva sua bio profissional em: 1 linha, 3 linhas e 1 parágrafo." },
        { title: "Ação 42: Referência em Tema", description: "Prepare um mini-conteúdo sobre um tema que você domina. Quem o recebeu?" },
        { title: "Ação 43: Co-liderança", description: "Proponha liderar uma iniciativa interna. Para quem propôs e qual a resposta?" },
        { title: "Ação 44: Currículo Vivo", description: "Atualize seu CV com os projetos dos últimos 12 meses. O que mais cresceu em você?" },
        { title: "Ação 45: Plano de Melhoria", description: "Apresente um plano de melhoria para um processo da área à sua liderança." },
        { title: "Ação 46: Post de Opinião", description: "Publique sua opinião sobre um tema do setor no LinkedIn. Cole o link aqui." },
        { title: "Ação 47: Premiações e Rankings", description: "Pesquise premiações no seu setor onde você pode se candidatar. Quais são os passos?" },
        { title: "Ação 48: Ajuste de Imagem", description: "Revise tudo criado até aqui. Qual imagem profissional está emergindo? Ajuste o necessário." },
        { title: "Ação 49: Conquista de Equipe", description: "Destaque um resultado do time e seu papel como facilitadora. Como a equipe reagiu?" },
        { title: "Ação 50: Decisores-Chave", description: "Mapeie quem aprova projetos e indica pessoas. Qual o papel e influência de cada um?" },
        { title: "Ação 51: Patrocinador Interno", description: "Identifique 1 mentor interno que pode te recomendar. Por que escolheu essa pessoa?" },
        { title: "Ação 52: Visão de 6 Meses", description: "Cargo, habilidades e conexões. Onde você estará em 6 meses? Coloque a data final." },
        { title: "Ação 53: Preparação de Negociação", description: "Levante dados para uma negociação (salário/projeto). Escreva seus argumentos principais." },
        { title: "Ação 54: Reunião 1:1", description: "Agende conversa com sua liderança sobre seu crescimento. O que foi combinado?" },
        { title: "Ação 55: Plano PAIC", description: "Escreva seu Plano de Influência Corporativa para 12 meses. Qual ação será a mais difícil?" },
        { title: "Ação 56: Espaço e Limites", description: "Onde você cedeu espaço desnecessário? Qual comportamento mudará nesta semana?" },
        { title: "Ação 57: Impacto Visível", description: "Escolha um tema para gerar impacto nos próximos 30 dias. Comece hoje." },
        { title: "Ação 58: Postura de Decisora", description: "Opine sobre um dilema da área com base em dados. Escreva sua análise aqui." },
        { title: "Ação 59: Carta para o Futuro", description: "Escreva para si mesma daqui a 1 ano. Como quer ser reconhecida e como se sentirá?" },
        { title: "Ação 60: Celebração", description: "Escreva os 5 maiores avanços que percebeu em si mesma. Você mudou, e isso é real." }
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
