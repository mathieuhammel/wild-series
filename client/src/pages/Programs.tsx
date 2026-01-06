import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true);
        setError(null);

        // Si tu as un proxy Vite configuré -> OK :
        const response = await fetch("/api/programs");

        // Sinon, utilise :
        // const response = await fetch("http://localhost:3310/api/programs");

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data: Program[] = await response.json();
        setPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main style={{ padding: 16 }}>
      <h1>Programs</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {programs.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src={p.poster}
              alt={p.title}
              style={{ width: "100%", height: 320, objectFit: "cover" }}
              loading="lazy"
            />
            <div style={{ padding: 12 }}>
              <h2 style={{ margin: "0 0 8px" }}>{p.title}</h2>
              <p style={{ margin: "0 0 8px", opacity: 0.7 }}>
                {p.country} • {p.year}
              </p>
              <p style={{ margin: 0 }}>{p.synopsis}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
