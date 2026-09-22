# WorkConnect — wieloetapowy formularz dodawania produktu

Zadanie rekrutacyjne. Strona z tabelą produktów i paginacją oraz
trzykrokowy formularz dodawania produktu w oknie modalnym, z walidacją per krok.

**Demo:** [https://workconnect-assignment.vercel.app/](https://workconnect-assignment.vercel.app/)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, React Compiler)
- [shadcn/ui](https://ui.shadcn.com) na [Base UI](https://base-ui.com) + Tailwind CSS 4
- [TanStack Form](https://tanstack.com/form) — stan formularza i kroki
- [Zod](https://zod.dev) — schematy walidacji dla każdego kroku
- [nuqs](https://nuqs.dev) — numer strony w URL
- [sonner](https://sonner.emilkowal.ski) — toast po zapisie



## Uruchomienie

Wymagany Node.js **20.9+** (projekt rozwijany na Node 24) i npm.

```bash
git clone git@github.com:ptrlgj/workconnect-assignment.git
cd workconnect-assignment
npm ci
npm run dev
```

Aplikacja działa pod [http://localhost:3000](http://localhost:3000).

### Pozostałe skrypty


| Komenda         | Opis                                           |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | serwer deweloperski z hot reloadem             |
| `npm run build` | build produkcyjny                              |
| `npm run start` | uruchomienie zbudowanej aplikacji (po `build`) |
| `npm run lint`  | ESLint                                         |


Projekt nie wymaga zmiennych środowiskowych ani backendu.

## Struktura projektu

```
src/
├── app/                      # layout (NuqsAdapter, Toaster) i strona główna (server component)
├── components/
│   ├── ui/                   # komponenty shadcn/ui
│   ├── form/                 # pola formularza podpięte pod TanStack Form (TextField, SelectField, ...)
│   └── products/
│       ├── ProductsView.tsx  # wyspa kliencka: lista + dialog
│       ├── ProductTable.tsx  # tabela (desktop) / karty (mobile), przełączane CSS-em
│       ├── ProductList.tsx   # paginacja, clamp strony
│       ├── AddProductDialog.tsx
│       └── product-form/     # Stepper i trzy kroki formularza
├── hooks/                    # form-context / useAppForm
└── lib/
    ├── products.ts           # typ Product i dane mockowe
    ├── product-options.ts    # listy opcji (producenci, kategorie, cechy, VAT, waluty)
    ├── product-list-params.ts# definicja parametru ?page (nuqs)
    └── product-form/         # schematy Zod, definicje kroków, przeliczanie cen
```



## Uwagi do implementacji

Trzy rzeczy, których nie było w zadaniu — opisuję, żeby było jasne, że to
decyzje, a nie przeoczenia.

**6 produktów w mocku zamiast 5.** Przy stronie liczącej 5 pozycji pięć mocków
daje dokładnie jedną stronę, więc nie da się sprawdzić, czy `?page=2` przeżywa
odświeżenie — produkt dodany w formularzu żyje tylko w stanie klienta i po
`F5` znika razem z drugą stroną. Szósty produkt jest po to, żeby paginację
dało się przetestować bez dopisywania trwałości, której zadanie nie wymaga.

**Dodane produkty nie przetrwają odświeżenia.** To wynika ze specyfikacji.
Trzymanie produktów w `localStorage` oznaczałoby, że
serwer nie zna ich liczby — przy `?page=2` musiałby wyrenderować sclampowaną stronę 1
i przeskoczyć po hydracji albo wysłać sam skeleton.

**Brak potwierdzenia przy zamykaniu dialogu.** Esc, klik w tło lub X zamykają
formularz od razu i kasują wpisane dane — nawet na trzecim kroku. Uważam, że
powinien tu być prompt „porzucić zmiany?", ale nie ma go ani w specyfikacji,
ani w projekcie Figma, więc nie dodawałem go z własnej inicjatywy.

## Rozbieżności projektu Figma ze specyfikacją

- **Stawka VAT** — w Figmie wygląda na zwykły input, specyfikacja wymaga
selecta. Zaimplementowano select (0 / 5 / 8 / 23 %).
- **Label nad textareą** w kroku 1 w Figmie brzmi „Nazwa produktu" — użyto „Opis".
- **Toast** „Produkt został dodany" nie występuje w specyfikacji, ale jest
w projekcie — zaimplementowany przez `sonner`.
- **Myślnik** (`—`) jako stan magazynowy produktu nielimitowanego, spójnie
w tabeli i kartach.

