import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingBag, X, Minus, Plus, Search } from "lucide-react";
import { perfumes, families, type Perfume, type Family } from "@/lib/perfumes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumière Parfums — Fine Fragrance Catalogue" },
      { name: "description", content: "Browse our curated catalogue of niche perfumes with notes, sizes and prices." },
      { property: "og:title", content: "Lumière Parfums — Fine Fragrance Catalogue" },
      { property: "og:description", content: "Curated niche perfumes with notes, sizes and prices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type CartItem = { id: string; ml: number; price: number; name: string; qty: number };
type Sort = "featured" | "low" | "high";

function Bottle({ hue }: { hue: number }) {
  return (
    <svg viewBox="0 0 120 160" className="h-40 w-auto drop-shadow-xl">
      <rect x="48" y="8" width="24" height="22" rx="3" fill="var(--foreground)" />
      <rect x="54" y="30" width="12" height="10" fill="var(--muted-foreground)" />
      <rect x="20" y="40" width="80" height="110" rx="14" fill={`oklch(0.78 0.09 ${hue} / 0.85)`} />
      <rect x="30" y="50" width="12" height="80" rx="6" fill="oklch(1 0 0 / 0.35)" />
      <rect x="38" y="88" width="44" height="22" rx="2" fill="var(--background)" opacity="0.9" />
    </svg>
  );
}

function Index() {
  const [family, setFamily] = useState<Family | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    let l = perfumes.filter(
      (p) =>
        (family === "All" || p.family === family) &&
        (p.name + p.house + p.notes.join(" ")).toLowerCase().includes(query.toLowerCase()),
    );
    if (sort !== "featured") l = [...l].sort((a, b) => (sort === "low" ? 1 : -1) * (a.sizes[0]!.price - b.sizes[0]!.price));
    return l;
  }, [family, query, sort]);

  const add = (p: Perfume) => {
    const s = p.sizes[sizes[p.id] ?? 0]!;
    setCart((c) => {
      const f = c.find((i) => i.id === p.id && i.ml === s.ml);
      return f ? c.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id: p.id, ml: s.ml, price: s.price, name: p.name, qty: 1 }];
    });
    setOpen(true);
  };
  const change = (i: CartItem, d: number) =>
    setCart((c) => c.map((x) => (x === i ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl tracking-wide">Lumière</span>
          <button onClick={() => setOpen(true)} className="relative rounded-full p-2 hover:bg-muted" aria-label="Open bag">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{count}</span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Niche fragrance house</p>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-5xl leading-tight md:text-7xl">Scent is the memory you wear.</h1>
        <a href="#catalogue" className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground hover:opacity-90">Explore the catalogue</a>
      </section>

      <section id="catalogue" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...families] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFamily(f)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${family === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 rounded-full border border-border px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes…" className="w-36 bg-transparent py-1.5 text-sm outline-none" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-full border border-border bg-background px-3 text-sm">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>

        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No fragrances match.</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const si = sizes[p.id] ?? 0;
            return (
              <article key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg">
                <div className="grid h-52 place-items-center rounded-xl bg-muted"><Bottle hue={p.hue} /></div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.house}</p>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{p.family}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.notes.join(" · ")} — {p.gender}</p>
                <div className="mt-4 flex gap-2">
                  {p.sizes.map((s, i) => (
                    <button key={s.ml} onClick={() => setSizes({ ...sizes, [p.id]: i })} className={`rounded-md border px-3 py-1 text-xs ${si === i ? "border-foreground" : "border-border text-muted-foreground"}`}>
                      {s.ml} ml
                    </button>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-xl font-medium">${p.sizes[si]!.price}</span>
                  <button onClick={() => add(p)} className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Adddfdh to bag</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">© 2026 Lumière Parfums · Free shipping over $150</footer>

      {open && (
        <div className="fixed inset-0 z-40 flex justify-end bg-foreground/30" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-sm flex-col bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Your bag</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-auto">
              {cart.length === 0 && <p className="text-muted-foreground">Your bag is empty.</p>}
              {cart.map((i) => (
                <div key={i.id + i.ml} className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.ml} ml · ${i.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => change(i, -1)} className="rounded border border-border p-1"><Minus className="h-3 w-3" /></button>
                    <span className="w-5 text-center text-sm">{i.qty}</span>
                    <button onClick={() => change(i, 1)} className="rounded border border-border p-1"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-lg"><span>Total</span><span>${total}</span></div>
              <button disabled={!cart.length} className="mt-4 w-full rounded-full bg-primary py-3 text-primary-foreground disabled:opacity-50">Checkout</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
