# Richard Anglon — Portfolio

Personal portfolio website showcasing my work as a Fullstack Software Engineer. Built with Next.js, Tailwind CSS, Framer Motion, and TypeScript.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React + custom SVGs
- **Language:** TypeScript
- **Fonts:** Inter + JetBrains Mono

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
bun run build
```

Generates a fully static site in the `out/` directory, ready for deployment to any CDN or static hosting provider.

## Project Structure

```
src/
├── app/            # Next.js App Router (layout, page, globals)
├── components/
│   ├── layout/     # Header, Footer, Section wrapper
│   ├── sections/   # Hero, About, Projects, Skills, Experience, Contact
│   └── ui/         # Button, Badge, ProjectCard, AnimateOnScroll
├── data/           # JSON content (projects, experience, skills, personal)
├── lib/            # Typed data accessors
└── types/          # TypeScript interfaces
```

## License

This project is personal and not licensed for reuse.
