import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: QuizPage,
  head: () => ({
    meta: [
      { title: "Avaliação Sagrada de Perfil" },
      { name: "description", content: "Descubra seu perfil espiritual e financeiro." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=EB+Garamond:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});

const REDIRECT_URL = "[INSIRA_A_URL_DA_SUA_PAGINA_DE_VENDAS_AQUI]";

type Q = { q: string; opts: string[] };

const QUESTIONS: Q[] = [
  {
    q: "Você sente que, por mais que ore e trabalhe, a sua vida financeira parece estar sob uma maldição que você não consegue quebrar?",
    opts: [
      "Sim, sinto que minha vida está totalmente amarrada e travada",
      "Trabalho como escravo e o dinheiro some antes de entrar",
    ],
  },
  {
    q: "Qual dessas humilhações você não aguenta mais passar no seu dia a dia?",
    opts: [
      "Ver minha família passando vontade e não poder dar o básico",
      "Deitar a cabeça no travesseiro e chorar escondido com medo do amanhã",
      "O olhar de julgamento das pessoas que me veem fracassar",
    ],
  },
  {
    q: "O seu estresse com a falta de dinheiro já começou a afetar a paz dentro da sua casa e o seu relacionamento?",
    opts: [
      "Sim, as cobranças e as brigas estão destruindo o meu lar",
      "Sim, sinto uma vergonha profunda diante dos meus filhos/parceiro",
    ],
  },
  {
    q: "Se você não quebrar esse ciclo de escassez hoje, como estará a sua vida financeira daqui a 6 meses?",
    opts: [
      "Pior do que hoje, atolado em dívidas e no desespero total",
      "Humilhado, dependendo da ajuda ou da pena dos outros",
    ],
  },
  {
    q: "Você já percebeu que as mesmas dificuldades financeiras que seus pais enfrentaram estão se repetindo EXATAMENTE igual na sua vida?",
    opts: [
      "Sim, vejo que é uma maldição hereditária que passou para mim",
      "Sim, e tenho um medo profundo de deixar essa herança maldita para meus filhos",
    ],
  },
  {
    q: "Você sabia que a Bíblia diz que o povo sofre por falta de conhecimento, e que Salomão deixou chaves exatas para sair da miséria?",
    opts: [
      "Eu preciso conhecer essas chaves urgentemente para mudar minha história",
      "Não aceito mais viver na ignorância e na escassez, quero a resposta",
    ],
  },
  {
    q: "Se a revelação secreta para destravar a sua prosperidade exigir apenas 7 minutos do seu dia, você assume o compromisso sagrado?",
    opts: [
      "SIM! Eu faço o que for preciso, não aguento mais essa humilhação!",
      "Estou pronto para seguir o protocolo com toda a força da minha fé",
    ],
  },
  {
    q: "A sua sentença de libertação está pronta. Você vai clicar para receber o Código de Salomão ou vai aceitar continuar na miséria?",
    opts: [
      "QUERO QUEBRAR A MALDIÇÃO E DESTRAVAR MINHA RIQUEZA AGORA! 👑",
      "NÃO ACEITO MAIS A HUMILHAÇÃO, QUERO MINHA RESTAURAÇÃO! 💸",
    ],
  },
];

const LOADING_TEXTS = [
  "PROCESSANDO SUA SENTENÇA...",
  "MALDIÇÃO DE ESCASSEZ DETECTADA!",
  "REDIRECIONANDO PARA A LIBERTAÇÃO FINANCEIRA...",
];

function getStageText(idx: number) {
  const steps = [
    { label: "Sondando Raízes Espirituais...", pct: 25 },
    { label: "Analisando Humilhações Diárias...", pct: 35 },
    { label: "Avaliando Danos Familiares...", pct: 45 },
    { label: "Mapeando Ciclo de Escassez Futura...", pct: 55 },
    { label: "Rastreando Maldição Hereditária...", pct: 65 },
    { label: "Verificando Falta de Conhecimento...", pct: 75 },
    { label: "Avaliando Compromisso Sagrado...", pct: 85 },
    { label: "PREPARANDO SUA SENTENÇA FINAL...", pct: 95 }
  ];
  return steps[idx] || { label: "PREPARANDO SUA SENTENÇA FINAL...", pct: 95 };
}

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const stage = useMemo(
    () => (loading ? { label: "REVELAÇÃO PRONTA", pct: 100 } : getStageText(index)),
    [index, loading],
  );

  useEffect(() => {
    if (!loading) return;
    let step = 0;
    setLoadingStep(0);
    const interval = setInterval(() => {
      step += 1;
      if (step < LOADING_TEXTS.length) setLoadingStep(step);
    }, 1100);
    const timeout = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 3500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading]);

  const handleAnswer = () => {
    if (index === QUESTIONS.length - 1) {
      setLoading(true);
      return;
    }
    setIndex((i) => i + 1);
    setFadeKey((k) => k + 1);
  };

  const current = QUESTIONS[index];

  return (
    <main className="quiz-bg min-h-screen w-full flex items-center justify-center px-4 py-10">
      <section className="parchment relative w-full max-w-2xl rounded-md px-6 py-10 sm:px-12 sm:py-14">
        {/* Crest */}
        <div className="flex flex-col items-center mb-6">
          <Crest />
          <h1
            className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FF4500", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
          >
            AVALIAÇÃO SAGRADA DE PERFIL
          </h1>
          <div className="mt-3 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#FF4500] to-transparent" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <p
            className="text-center text-sm sm:text-base mb-2 tracking-wide font-medium"
            style={{ fontFamily: "'EB Garamond', serif", color: "#FFF" }}
          >
            {stage.label}{" "}
            <span style={{ color: "#FF4500" }}>(Nível: {stage.pct}%)</span>
          </p>
          <div className="h-3 w-full rounded-full bg-black/60 border border-[#FF4500]/40 overflow-hidden">
            <div
              className="h-full sacred-bar transition-all duration-700 ease-out"
              style={{ width: `${stage.pct}%` }}
            />
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 min-h-[260px]">
            <div className="loader-ring mb-8" />
            <p
              key={loadingStep}
              className="text-center text-xl sm:text-2xl fade-in tracking-wide animate-pulse"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: loadingStep === 1 ? "#FF3333" : loadingStep === 2 ? "#FF4500" : "#F5F5DC",
                textShadow: "0 0 15px rgba(255, 69, 0, 0.7)",
                fontWeight: "bold"
              }}
            >
              {LOADING_TEXTS[loadingStep]}
            </p>
          </div>
        ) : (
          <div key={fadeKey} className="fade-in">
            <p
              className="text-center text-xl sm:text-2xl leading-snug mb-8"
              style={{ fontFamily: "'EB Garamond', serif", color: "#FFF" }}
            >
              {current.q}
            </p>
            <div className="flex flex-col gap-4">
              {current.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={handleAnswer}
                  className="gold-btn w-full px-5 py-4 rounded-md text-left sm:text-center text-base sm:text-lg"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p
              className="mt-8 text-center text-xs sm:text-sm italic"
              style={{ fontFamily: "'EB Garamond', serif", color: "#E0A9A9" }}
            >
              Pergunta {index + 1} de {QUESTIONS.length}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function Crest() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="fire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="50%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
      </defs>
      {/* Crown */}
      <path
        d="M20 38 L30 22 L40 34 L50 18 L60 34 L70 22 L80 38 L75 50 L25 50 Z"
        fill="url(#fire)"
        stroke="#8B0000"
        strokeWidth="1.2"
      />
      <circle cx="30" cy="22" r="2.5" fill="#FFD700" stroke="#8B0000" />
      <circle cx="50" cy="18" r="3" fill="#FFD700" stroke="#8B0000" />
      <circle cx="70" cy="22" r="2.5" fill="#FFD700" stroke="#8B0000" />
      {/* Crossed keys */}
      <g stroke="url(#fire)" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="30" y1="58" x2="72" y2="92" />
        <line x1="70" y1="58" x2="28" y2="92" />
      </g>
      <circle cx="30" cy="58" r="5" fill="none" stroke="url(#fire)" strokeWidth="3" />
      <circle cx="70" cy="58" r="5" fill="none" stroke="url(#fire)" strokeWidth="3" />
      <rect x="69" y="88" width="6" height="3" fill="url(#fire)" />
      <rect x="69" y="83" width="4" height="3" fill="url(#fire)" />
      <rect x="25" y="88" width="6" height="3" fill="url(#fire)" />
      <rect x="27" y="83" width="4" height="3" fill="url(#fire)" />
    </svg>
  );
}
