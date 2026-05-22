import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="quiz-bg min-h-screen w-full flex items-center justify-center px-4 py-10">
      <section className="parchment relative w-full max-w-md rounded-md px-6 py-10 sm:px-10 sm:py-12 text-center">
        <h1
          className="text-6xl font-bold tracking-wide"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#B8860B",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          404
        </h1>
        <h2
          className="mt-4 text-xl font-bold tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#DAA520" }}
        >
          Página Não Encontrada
        </h2>
        <p
          className="mt-4 text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
        >
          A revelação que você procura não pôde ser encontrada nesta esfera. Retorne ao início.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="gold-btn inline-flex items-center justify-center px-6 py-3 rounded-md text-base sm:text-lg font-bold"
            style={{ fontFamily: "'EB Garamond', serif", textDecoration: "none" }}
          >
            Voltar ao Início
          </Link>
        </div>
      </section>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="quiz-bg min-h-screen w-full flex items-center justify-center px-4 py-10">
      <section className="parchment relative w-full max-w-md rounded-md px-6 py-10 sm:px-10 sm:py-12 text-center">
        <h1
          className="text-4xl font-bold tracking-wide"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#B8860B",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          Erro Inesperado
        </h1>
        <h2
          className="mt-4 text-lg font-bold tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#DAA520" }}
        >
          A conexão foi interrompida
        </h2>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ fontFamily: "'EB Garamond', serif", color: "#F5F5DC" }}
        >
          Ocorreu um erro ao sintonizar a sabedoria oculta. Tente carregar novamente ou retorne ao
          início.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="gold-btn px-6 py-3 rounded-md text-base font-bold flex-1"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Tentar Novamente
          </button>
          <a
            href="/"
            className="gold-btn px-6 py-3 rounded-md text-base font-bold flex-1 text-center"
            style={{ fontFamily: "'EB Garamond', serif", textDecoration: "none" }}
          >
            Página Inicial
          </a>
        </div>
      </section>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A Sondagem da Esfera de Escassez" },
      {
        name: "description",
        content: "Uma sondagem profunda da esfera de escassez e abundância de Salomão.",
      },
      { name: "author", content: "Antigravity" },
      { property: "og:title", content: "A Sondagem da Esfera de Escassez" },
      {
        property: "og:description",
        content: "Uma sondagem profunda da esfera de escassez e abundância de Salomão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "A Sondagem da Esfera de Escassez" },
      {
        name: "twitter:description",
        content: "Uma sondagem profunda da esfera de escassez e abundância de Salomão.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=EB+Garamond:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
