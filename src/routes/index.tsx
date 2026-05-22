import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: QuizPage,
  head: () => ({
    meta: [
      { title: "A Sondagem da Esfera de Escassez" },
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

const REDIRECT_URL = "[INSIRA_SEU_LINK_AQUI]";

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

function QuizPage() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const stage = useMemo(() => {
    const steps = [
      "Sondando Raízes Espirituais...",
      "Analisando Humilhações Diárias...",
      "Avaliando Danos Familiares...",
      "Mapeando Ciclo de Escassez Futura...",
      "Rastreando Maldição Hereditária...",
      "Verificando Falta de Conhecimento...",
      "Avaliando Compromisso Sagrado...",
      "PREPARANDO SUA SENTENÇA FINAL..."
    ];
    return steps[index] || "PREPARANDO SUA SENTENÇA FINAL...";
  }, [index]);

  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 3000);
    return () => clearTimeout(timeout);
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
    <main className="quiz-bg min-h-screen w-full flex flex-col items-center justify-center px-4 py-10">
      <section className="parchment relative w-full max-w-2xl rounded-md px-6 py-10 sm:px-12 sm:py-14 mb-6">
        
        {/* WELCOME SCREEN */}
        <div style={{ display: !started ? "block" : "none" }}>
          {/* Crest */}
          <div className="flex flex-col items-center mb-6">
            <Crest />
            <h1
              className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c5a880", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
            >
              A SONDAGEM DA ESFERA DE ESCASSEZ
            </h1>
            <div className="mt-3 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
          </div>

          <p
            className="text-center text-lg sm:text-xl leading-relaxed mb-8"
            style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
          >
            Desvende as chaves secretas de Salomão para quebrar a maldição financeira hereditária e destravar a sua prosperidade. A avaliação das suas raízes espirituais começará a seguir.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setStarted(true)}
              className="gold-btn w-full px-5 py-4 rounded-md text-center text-lg sm:text-xl font-bold"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              INICIAR REVELAÇÃO
            </button>
          </div>
        </div>

        {/* QUIZ SCREEN */}
        <div style={{ display: started && !loading ? "block" : "none" }}>
          {/* Crest */}
          <div className="flex flex-col items-center mb-6">
            <Crest />
            <h1
              className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c5a880", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
            >
              A SONDAGEM DA ESFERA DE ESCASSEZ
            </h1>
            <div className="mt-3 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
          </div>

          {/* Progress */}
          <div className="mb-8">
            <p
              className="text-center text-sm sm:text-base mb-2 tracking-wide font-medium"
              style={{ fontFamily: "'EB Garamond', serif", color: "#a89d8c" }}
            >
              {stage} (Nível: {((index + 1) * 12.5)}%)
            </p>
            <div className="h-3 w-full rounded-full bg-black/80 border border-[#4a3c2c]/80 overflow-hidden">
              <div
                className="h-full sacred-bar transition-all duration-700 ease-out"
                style={{ width: `${(index + 1) * 12.5}%` }}
              />
            </div>
          </div>

          {/* Question and options */}
          <div key={fadeKey} className="fade-in">
            <p
              className="text-center text-xl sm:text-2xl leading-snug mb-8"
              style={{ fontFamily: "'EB Garamond', serif", color: "#FFFFFF" }}
            >
              {current?.q}
            </p>
            <div className="flex flex-col gap-4">
              {current?.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={handleAnswer}
                  className="gold-btn w-full px-5 py-4 rounded-md text-center text-base sm:text-lg"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING SCREEN */}
        <div style={{ display: loading ? "block" : "none" }}>
          <div className="flex flex-col items-center justify-center py-12 min-h-[300px]">
            <div className="loader-ring mb-8" />
            <p
              className="text-center text-xl sm:text-2xl tracking-wide animate-pulse"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#c5a880",
                textShadow: "0 0 15px rgba(197, 168, 128, 0.5)",
                fontWeight: "bold"
              }}
            >
              Redirecionando para a Libertação...
            </p>
          </div>
        </div>

      </section>

      {/* Footer outside the card */}
      <div className="flex flex-col items-center w-full max-w-2xl relative select-none">
        <p
          className="text-center text-sm font-semibold tracking-widest"
          style={{ fontFamily: "'EB Garamond', serif", color: "#9e9382" }}
        >
          {index + 1} / {QUESTIONS.length}
        </p>
        
        {/* Subtle four-point star icon on the bottom right as seen in the image */}
        <div className="absolute right-4 bottom-0 text-[#9e9382] opacity-80" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>
    </main>
  );
}

function Crest() {
  return (
    <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        {/* Gold gradients for 3D metallic coin effect */}
        <radialGradient id="coin-base" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFE07D" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA7C11" />
          <stop offset="90%" stopColor="#8B6508" />
          <stop offset="100%" stopColor="#553F00" />
        </radialGradient>
        <linearGradient id="gold-emboss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF5D6" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#553F00" />
        </linearGradient>
        <filter id="emboss-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="0.8" floodColor="#000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Outer rim */}
      <circle cx="50" cy="50" r="48" fill="url(#coin-base)" stroke="#3A2A00" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#FFE9A3" strokeWidth="0.8" strokeDasharray="1.5, 1" opacity="0.8" />

      {/* Inner circle */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#684C00" strokeWidth="1" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#FFE07D" strokeWidth="0.5" />

      {/* Laurel wreath along the bottom arc */}
      <g fill="url(#gold-emboss)" filter="url(#emboss-shadow)" opacity="0.9">
        {/* Left branch */}
        <path d="M 22 55 C 24 67, 34 77, 48 78 C 45 75, 41 73, 38 68 C 35 64, 30 60, 22 55 Z" opacity="0.3" />
        {/* Leaves */}
        <path d="M 24 58 Q 21 62 25 64 Q 28 62 25 58 Z" />
        <path d="M 27 64 Q 24 68 29 70 Q 32 67 28 64 Z" />
        <path d="M 32 70 Q 29 75 34 76 Q 37 72 33 70 Z" />
        <path d="M 39 74 Q 37 79 42 79 Q 44 75 40 74 Z" />
        {/* Right branch */}
        <path d="M 78 55 C 76 67, 66 77, 52 78 C 55 75, 59 73, 62 68 C 65 64, 70 60, 78 55 Z" opacity="0.3" />
        <path d="M 76 58 Q 79 62 75 64 Q 72 62 75 58 Z" />
        <path d="M 73 64 Q 76 68 71 70 Q 68 67 72 64 Z" />
        <path d="M 68 70 Q 71 75 66 76 Q 63 72 67 70 Z" />
        <path d="M 61 74 Q 63 79 58 79 Q 56 75 60 74 Z" />
      </g>

      {/* Hebrew / Mystical characters on the top rim */}
      <g fill="#4A3500" fontFamily="serif" fontSize="5" fontWeight="bold" letterSpacing="1">
        <text x="24" y="28" transform="rotate(-35 24 28)">ש</text>
        <text x="32" y="22" transform="rotate(-20 32 22)">ל</text>
        <text x="41" y="18" transform="rotate(-5 41 18)">מ</text>
        <text x="50" y="17" transform="rotate(10 50 17)">ה</text>
        <text x="59" y="19" transform="rotate(25 59 19)">מ</text>
        <text x="67" y="23" transform="rotate(40 67 23)">ל</text>
        <text x="74" y="30" transform="rotate(55 74 30)">ך</text>
      </g>

      {/* Solomon Portrait (Facing Left, bearded, with crown) */}
      <g fill="url(#gold-emboss)" filter="url(#emboss-shadow)">
        {/* Hair and Beard */}
        <path d="M 45 35 Q 40 40 42 48 Q 44 56 42 62 C 43 65, 48 67, 52 64 C 54 62, 53 58, 56 56 C 58 54, 57 48, 55 46 Q 54 38 45 35 Z" />
        
        {/* Face profile */}
        <path d="M 44 38 C 42 38, 41 40, 40 42 C 39 43, 39 45, 38 45 C 37 45, 36 46, 37 47 C 38 48, 39 48, 38 49 C 37 50, 36 51, 38 52 C 39 52, 40 52, 39 53 C 38 55, 39 56, 42 56 C 44 56, 46 54, 46 51 C 46 45, 46 40, 44 38 Z" />

        {/* Crown */}
        <path d="M 43 35 L 40 26 L 45 30 L 50 24 L 52 30 L 56 27 L 54 36 Z" />
        <circle cx="40" cy="26" r="0.8" fill="#FFE9A3" />
        <circle cx="50" cy="24" r="1" fill="#FFE9A3" />
        <circle cx="56" cy="27" r="0.8" fill="#FFE9A3" />
        
        {/* Details: Eye */}
        <path d="M 41 42 Q 42 41 43 42" stroke="#553F00" strokeWidth="0.6" fill="none" />
        <circle cx="42" cy="43.5" r="0.5" fill="#332200" />
        
        {/* Mustache and Beard details */}
        <path d="M 39 50 C 40 50, 41 51, 41 52 C 40 53, 39 53, 38 53 C 38 52, 38 51, 39 50 Z" stroke="#553F00" strokeWidth="0.3" />
        <path d="M 41 53 C 43 55, 41 58, 45 59 C 47 60, 48 57, 49 55" stroke="#553F00" strokeWidth="0.4" fill="none" />
        
        {/* Clothes drape */}
        <path d="M 45 58 C 45 62, 39 67, 34 71 C 36 73, 40 73, 44 72 C 49 71, 55 69, 58 64 C 54 62, 48 59, 45 58 Z" />
        <path d="M 44 60 C 46 64, 52 66, 56 65" stroke="#FFE9A3" strokeWidth="0.5" fill="none" />
      </g>
    </svg>
  );
}
