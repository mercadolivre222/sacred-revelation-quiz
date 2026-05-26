import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import salomonCoin from "../assets/salomon_coin.png";

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

const REDIRECT_URL = "https://salomaopg.netlify.app/";

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
  const [progress, setProgress] = useState(0);

  const stage = useMemo(() => {
    const steps = [
      "Sondando Raízes Espirituais...",
      "Analisando Humilhações Diárias...",
      "Avaliando Danos Familiares...",
      "Mapeando Ciclo de Escassez Futura...",
      "Rastreando Maldição Hereditária...",
      "Verificando Falta de Conhecimento...",
      "Avaliando Compromisso Sagrado...",
      "PREPARANDO SUA SENTENÇA FINAL...",
    ];
    return steps[index] || "PREPARANDO SUA SENTENÇA FINAL...";
  }, [index]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          window.location.href = REDIRECT_URL;
          return 100;
        }
        return prev + 1;
      });
    }, 30); // 30ms * 100 = 3000ms (3 segundos)
    return () => clearInterval(interval);
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
        {/* Crest and Title - Rendered once globally, hidden during loading */}
        {!loading && (
          <div className="flex flex-col items-center mb-6">
            <img src={salomonCoin} alt="Brasão de Salomão" className="mx-auto w-24 h-24 mb-6" />
            <h1
              className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#c5a880",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              A SONDAGEM DA ESFERA DE ESCASSEZ
            </h1>
            <div className="mt-3 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
          </div>
        )}

        {/* WELCOME SCREEN */}
        <div style={{ display: !started ? "block" : "none" }}>
          <p
            className="text-center text-lg sm:text-xl leading-relaxed mb-8"
            style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
          >
            Desvende as chaves secretas de Salomão para quebrar a maldição financeira hereditária e
            destravar a sua prosperidade. A avaliação das suas raízes espirituais começará a seguir.
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
          {/* Progress */}
          <div className="mb-8">
            <p
              className="text-center text-sm sm:text-base mb-2 tracking-wide font-medium"
              style={{ fontFamily: "'EB Garamond', serif", color: "#a89d8c" }}
            >
              {stage} (Nível: {(index + 1) * 12.5}%)
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
            <h2
              className="text-center text-2xl sm:text-3xl tracking-wide uppercase mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#e63946",
                textShadow: "0 0 15px rgba(230, 57, 70, 0.4)",
                fontWeight: "bold",
                letterSpacing: "0.1em",
              }}
            >
              Bloqueio Identificado!
            </h2>
            <div className="h-3 w-full max-w-sm rounded-full bg-black/80 border border-[#4a3c2c]/80 overflow-hidden mb-2">
              <div
                className="h-full sacred-bar transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p
              className="text-center text-base sm:text-lg mb-6 font-medium"
              style={{ fontFamily: "'EB Garamond', serif", color: "#c5a880" }}
            >
              {progress}%
            </p>
            <p
              className="text-center text-lg sm:text-xl tracking-wide animate-pulse"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#c5a880",
                textShadow: "0 0 15px rgba(197, 168, 128, 0.5)",
                fontWeight: "bold",
              }}
            >
              Conectando com o Código de Salomão...
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
