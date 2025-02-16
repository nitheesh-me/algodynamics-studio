# algodynamics-docs
Document, Explore, and Direct Algorithms in Motion


## Dev Setup and Considerations

Uses the following
- [Dev Container](https://code.visualstudio.com/docs/remote/containers) for `bun` enviroment (needs docker to operate).
- [Bun](https://bun.red/) for project scaffolding and management.
- [Astro](https://astro.build/) for static site generation.


## To Run

Install dependencies
```
bun install
```

You can choose to disable telemetry

```
astro telemetry disable
```

And finally to 

Run the dev server
```
bun dev
```

To add shad/cn components, use commands like (v0.dev gives code with these components)
```
bunx --bun shadcn@canary add button
```

This is due to Tailwind CSS v4.

---

Visit `http://localhost:4444/en/experiments/bubble-sort/` to see the bubble sort experiment.
check `src/components/Machines/bubblesort/SwapMachine.tsx` and `src/content/docs/en/experiments/bubble-sort.mdx` for how to customize the content



TODO:
- [ ] Setup XState for the machines
- [ ] Remove/Replace Astro Docs elements
- [ ] Clean up unnecessary components and content
- [ ] Add more experiments