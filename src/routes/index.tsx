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

type Q = { q: string; opts: [string, string] };

const QUESTIONS: Q[] = [
  {
    q: "Você sente que existe uma força invisível que afasta o dinheiro de você?",
    opts: ["Sim, parece que quanto mais ganho, mais ele some", "Sinto um peso constante que me trava hoje"],
  },
  {
    q: "Suas dívidas hoje são um fardo que tira o sono da sua família?",
    opts: ["Sim, não aguento mais as cobranças e a humilhação", "É uma angústia diária que me consome por dentro"],
  },
  {
    q: "Você já sentiu que, por mais que trabalhe, sua vida financeira é um deserto?",
    opts: ["Sim, trabalho como escravo e continuo na escassez", "Sinto que meu esforço nunca é recompensado"],
  },
  {
    q: "Qual o valor estimado que você precisaria hoje para quebrar as correntes das dívidas?",
    opts: ["Preciso de um milagre urgente (até R$ 5.000)", "Minha liberdade custa caro (R$ 20.000 ou mais)"],
  },
  {
    q: "Você acredita que a escassez financeira pode ser uma maldição que vem de gerações?",
    opts: ["Sim, meus pais sofreram e não quero isso pros meus filhos", "Talvez, parece que o destino da minha família é a luta"],
  },
  {
    q: "Sabendo que Salomão tinha o código da riqueza, você se sente pronto para recebê-lo?",
    opts: ["Sim, Deus me trouxe aqui para ter essa revelação", "Estou cansado de sofrer, preciso dessa chave agora"],
  },
  {
    q: "Você teria coragem de investir 7 minutos do seu dia para aplicar esse protocolo?",
    opts: ["Sim, farei o que for preciso para prosperar com fé!", "Estou disposto a seguir o Protocolo sem hesitar"],
  },
  {
    q: "O seu milagre está a um clique de distância. Você vai aceitar o seu destino?",
    opts: ["SIM! QUERO QUEBRAR AS CORRENTES E PROSPERAR!", "NÃO POSSO MAIS VIVER NA HUMILHAÇÃO, EU ACEITO!"],
  },
];

const LOADING_TEXTS = [
  "Analisando respostas do perfil...",
  "BLOQUEIO DE ESCASSEZ DETECTADO!",
  "REDIRECIONANDO PARA A REVELAÇÃO...",
];

function getStageText(idx: number) {
  if (idx < 2) return { label: "Sondando Raízes Espirituais...", pct: 25 };
  if (idx < 4) return { label: "Identificando Bloqueios de Salomão...", pct: 50 };
  if (idx < 6) return { label: "Analisando Histórico de Escassez...", pct: 75 };
  return { label: "PREPARANDO SUA REVELAÇÃO FINAL...", pct: 95 };
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
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#DAA520", textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}
          >
            AVALIAÇÃO SAGRADA DE PERFIL
          </h1>
          <div className="mt-3 h-px w-32 bg-[#B8860B]/60" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <p
            className="text-center text-sm sm:text-base mb-2 tracking-wide"
            style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
          >
            {stage.label}{" "}
            <span style={{ color: "#DAA520" }}>(Nível: {stage.pct}%)</span>
          </p>
          <div className="h-3 w-full rounded-full bg-black/60 border border-[#B8860B]/60 overflow-hidden">
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
              className="text-center text-lg sm:text-xl fade-in tracking-wide"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: loadingStep === 1 ? "#FFD700" : "#F5F5DC",
                textShadow: "0 0 10px rgba(218,165,32,0.4)",
              }}
            >
              {LOADING_TEXTS[loadingStep]}
            </p>
          </div>
        ) : (
          <div key={fadeKey} className="fade-in">
            <p
              className="text-center text-xl sm:text-2xl leading-snug mb-8"
              style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
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
              style={{ fontFamily: "'EB Garamond', serif", color: "#C9B68A" }}
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
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7E07A" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#7A5A10" />
        </linearGradient>
      </defs>
      {/* Crown */}
      <path
        d="M20 38 L30 22 L40 34 L50 18 L60 34 L70 22 L80 38 L75 50 L25 50 Z"
        fill="url(#gold)"
        stroke="#7A5A10"
        strokeWidth="1.2"
      />
      <circle cx="30" cy="22" r="2.5" fill="#FFF3B0" stroke="#7A5A10" />
      <circle cx="50" cy="18" r="3" fill="#FFF3B0" stroke="#7A5A10" />
      <circle cx="70" cy="22" r="2.5" fill="#FFF3B0" stroke="#7A5A10" />
      {/* Crossed keys */}
      <g stroke="url(#gold)" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="30" y1="58" x2="72" y2="92" />
        <line x1="70" y1="58" x2="28" y2="92" />
      </g>
      <circle cx="30" cy="58" r="5" fill="none" stroke="url(#gold)" strokeWidth="3" />
      <circle cx="70" cy="58" r="5" fill="none" stroke="url(#gold)" strokeWidth="3" />
      <rect x="69" y="88" width="6" height="3" fill="url(#gold)" />
      <rect x="69" y="83" width="4" height="3" fill="url(#gold)" />
      <rect x="25" y="88" width="6" height="3" fill="url(#gold)" />
      <rect x="27" y="83" width="4" height="3" fill="url(#gold)" />
    </svg>
  );
}
