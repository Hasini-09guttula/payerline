# PayerLine

Cashless pre-authorisation desk for St. Brigid Memorial. Each insurer has its own Hindsight memory bank. A file is held or cleared from what that insurer actually did on past cases, not from the written policy alone.

## What memory does

- **Retain** stores each past approval, query, and denial, plus the written policy, in that insurer’s bank.
- **Recall** brings back the past cases that match today’s procedure and documents.
- **Reflect** decides hold or send, with fixes, documents to leave out, and the evidence it used.

Meridian and Northline never share a bank. The same surgery can need opposite papers.

## Run

1. Copy `.env.example` to `.env` and set `HINDSIGHT_API_KEY` and `GROQ_API_KEY`.
2. `npm install`
3. `npm run seed` — creates the two banks, directives, and the case history.
4. `npm run dev` — API on port 8787, desk on port 5173.

Groq reads the clinical note with a tool call. If the tool call is malformed, the server retries before it fails.

## Demo

1. Leave the note as written and review it for Meridian. The policy says the packet is fine. Memory should hold it: letterhead date, package name, and the contradictory culture report.
2. Switch the payer to Northline and review again. The hold reasons should change. Northline has asked for the laboratory panel and a recent fitness note.
3. Log a new Meridian denial, then review a similar file. The next recommendation should include the new reason.
