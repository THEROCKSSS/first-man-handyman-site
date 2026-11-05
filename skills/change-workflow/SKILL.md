---
name: change-workflow
description: The workflow for every change to this website. Interview the owner one question at a time, write a short plan, wait for a yes, then build and verify. Use before any edit that is more than a one-line fix.
---

# Change workflow

This site belongs to a real business. Changes are made with the owner, not at them. This is the interview-first approach (adapted from the grilling method in mattpocock/skills, MIT).

## When to use it

Any request to add, change, remove or redesign something. **Skip the interview** only for a one-line fix (a typo, a wrong number the owner just gave you) or when the owner says "just do it" or "skip the questions". Even then, still run the checks in step 6.

## Steps

1. **Inspect first.** Read `AGENTS.md`, run `git status`, open the files the request touches. State in one sentence what will be different when you are done, and how you will prove it.
2. **Interview, one question at a time.** For each real fork, ask a single question, give your **recommended answer** and the trade-off of each option, then wait. Never stack questions. Stop when every material choice is settled. Good forks: scope (which looks?), wording (the owner's words, not yours), what to leave out, effect on phone vs laptop.
3. **Write the plan.** Short and concrete:
   - what changes, in which files
   - what you will not touch
   - risks (wrong facts, broken layout, accessibility)
   - how it will be checked
   For bigger work, split into small steps where each one can be seen working, and say which step must come first.
4. **Wait for the owner's yes.** A "go", "yes" or "do it" on the written plan counts. Nothing is built before that. If the plan changes while you work, say so and ask again.
5. **Build in small slices.** Keep facts word for word. Use the other skills for photos, reviews and business info. Mobile fixes go inside media queries.
6. **Verify, with evidence.** All three must pass and you must say so with the real output:
   ```bash
   npm run typecheck && npm run build && npm run check
   ```
   Then look at the changed page at phone width and laptop width in a real browser. If something could not be checked, say that plainly.
7. **Hand off.** Update `HANDOFF.md` (what changed, how to undo it, what is left), commit with a clear message, and tell the owner in plain words what changed and what you did not check.

## Never

- Publish, deploy or change the live site without a yes.
- Invent a fact, a price, a review or a claim.
- Change phone, email, hours or towns without the owner giving the new value.
- Add tracking, cookies, remote fonts or a backend.
- Delete the owner's photos, reviews or text. Add or archive instead.
