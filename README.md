# pett-componentes

Biblioteca de componentes React para formulários e telas de cadastro, escrita do zero em TypeScript — **sem nenhuma dependência de runtime além do próprio React**. Nenhum `react-bootstrap`, `primereact`, biblioteca de datas, de ícones ou de máscaras: tudo (máscaras de CPF/CNPJ, seletor de cor, grid com ordenação e redimensionamento, modal, abas) foi implementado na mão.

```json
"peerDependencies": {
    "react": ">=19.3.0",
    "react-dom": ">=19.3.0"
}
```

## Instalação

Este pacote ainda não é publicado no npm (`"private": true`). Pra usar em outro projeto local, referencie a pasta pelo caminho:

```bash
npm install file:../caminho/para/pett-componentes
```

Ou publique num registro privado, se preferir.

## Uso básico

```tsx
import { PettButton, PettFieldText } from 'pett-componentes';
import 'pett-componentes/style.css';

function Exemplo() {
    const [nome, setNome] = useState('');

    return (
        <>
            <PettFieldText label="NOME" name="nome" value={nome} set={setNome} />
            <PettButton caption="Salvar" variant="green" icone="checkmark" />
        </>
    );
}
```

A maioria dos campos segue a mesma convenção: `value` + `set` (o próprio `setState` de um objeto, ex. `useState({ nome: '', ... })`) — o campo escreve nele sozinho usando o `name` como chave: `set(prev => ({ ...prev, [name]: valor }))`. Quem preferir controlar manualmente pode usar `setMap`, que recebe o evento inteiro em vez de mexer direto no estado.

## Temas

Vêm prontos **3 temas** (`Light`, `Dark`, `Industrial`), cada um só um arquivo CSS com variáveis:

```tsx
import 'pett-componentes/temas/light.css';
import 'pett-componentes/temas/dark.css';
import 'pett-componentes/temas/industrial.css';
```

Pra ativar um, basta um atributo em qualquer elemento ancestral (`<html>`, `<body>`, ou um wrapper) — a troca é só isso, sem reimportar nada:

```tsx
document.documentElement.setAttribute('data-pett-theme', 'dark');
```

**Sem nenhum tema importado, o visual já é o Light por padrão** — cada componente tem o valor do tema Light embutido como fallback (`var(--pett-color-bg, #fff)`).

### Customizando

Como é tudo CSS Custom Properties, dá pra sobrescrever qualquer token sem tocar no pacote:

```css
[data-pett-theme="dark"] {
    --pett-color-accent: #ff4081;
}
```

Alguns componentes (`PettGrid`, `PettFieldDate`/`PettFieldLoc`) têm tokens próprios (`--pett-grid-*`, `--pett-field-btn-bg`) pra poder diferenciar o visual deles do resto dos campos, se precisar.

## Componentes disponíveis

### Botões e ícones
| Componente | Descrição |
|---|---|
| `PettButton` | Botão com 8 variantes de cor, 3 tamanhos, ícone opcional, estado de loading |
| `PettIcon` | Ícone da biblioteca interna de SVGs (usado internamente pelo `PettButton`, também exportado) |

### Campos de formulário
| Componente | Descrição |
|---|---|
| `PettFieldText` | Campo de texto simples, com máscara de maiúsculas opcional e filtro de teclas |
| `PettFieldTextArea` | Área de texto com auto-resize opcional |
| `PettFieldMask` | Campo com máscara configurável (CPF, CNPJ, telefone, etc.) |
| `PettFieldMoney` | Campo de valor monetário (formatação R$) |
| `PettFieldFloat` | Campo numérico decimal (percentual, peso, etc.) |
| `PettFieldDate` | Campo de data com máscara BR (DD/MM/AAAA) e seletor nativo via ícone de calendário |
| `PettFieldPass` | Campo de senha com botão de mostrar/ocultar e medidor de força opcional |
| `PettFieldOtp` | Campo de código de verificação (um dígito por caixa) |
| `PettFieldSearch` | Campo de busca com botão de limpar |
| `PettFieldLoc` | Campo numérico com botão de consulta acoplado (ex: busca de código) |
| `PettFieldDrop` | Select/dropdown, aceita lista de objetos ou de strings simples |
| `PettFieldCheck` | Checkbox com label |
| `PettFieldColor` | Campo de cor com seletor visual (HSV) embutido |
| `PettSwitch` | Alternador (toggle) para valores binários |

### Cor
| Componente | Descrição |
|---|---|
| `PettColorSwatch` | Amostra/seletor de cor avulso (usado internamente pelo `PettFieldColor`, também exportado) |

### Dados
| Componente | Descrição |
|---|---|
| `PettGrid` | Tabela de dados: colunas configuráveis, ordenação por coluna, redimensionamento com linha guia, seleção de linha, zebrado, cabeçalho fixo com rolagem |
| `PettColumn` | Configuração de uma coluna do `PettGrid` (não renderiza nada sozinho) |

### Modal
| Componente | Descrição |
|---|---|
| `PettModal` | Janela modal nativa — tamanhos sm/md/lg, posição centro/topo, tela cheia, backdrop configurável |
| `PettModalFooter` | Marca o conteúdo que deve ir no rodapé do modal (também disponível como `PettModal.Footer`) |

### Abas
| Componente | Descrição |
|---|---|
| `PettTab` | Container de abas, com indicador animado e navegação por teclado |
| `PettTabPanel` | Configuração de uma aba do `PettTab` (não renderiza nada sozinho) |

## Desenvolvimento

```bash
npm install        # instala as dependências de desenvolvimento
npm run dev        # sobe o app de demonstração (src/App.tsx) com hot-reload
npm run build      # gera a lib em dist/ (ESM + UMD + temas)
npm run lint       # roda o ESLint
```

O `src/App.tsx` não faz parte do pacote publicado — é só uma página de demonstração com exemplos de todos os componentes, organizada em cards por categoria, útil pra testar visualmente qualquer mudança.

## Estrutura de pastas

```
src/
├── Componentes/     # cada componente + seu CSS
├── Temas/           # PettThemeLight.css, PettThemeDark.css, PettThemeIndustrial.css
├── Imagens/Icones/  # SVGs usados pelo PettIcon
├── index.ts         # exports públicos do pacote
├── App.tsx          # página de demonstração (não vai pro pacote)
└── App.css
```