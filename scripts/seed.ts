import { provisionBanks, retainHistory } from "../server/hindsight.ts";

await provisionBanks();
const stored = await retainHistory();
console.log(`Seeded ${stored} case documents across Meridian and Northline.`);
console.log("Banks are ready. Start the desk with npm run dev.");
