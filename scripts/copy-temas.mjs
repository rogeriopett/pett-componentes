// Copia os temas prontos (CSS puro, sem processamento) para dist/temas/
// após o build da lib, para que fiquem disponíveis para quem instalar o pacote.
import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../src/Temas");
const dest = resolve(__dirname, "../dist/temas");

cpSync(src, dest, { recursive: true });
console.log(`Temas copiados para ${dest}`);
