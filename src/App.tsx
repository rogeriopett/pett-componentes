import { useEffect, useState } from 'react';
import { PettFieldCheck } from './Componentes/PettFieldCheck';
import { PettFieldColor } from './Componentes/PettFieldColor';
import { PettFieldDate } from './Componentes/PettFieldDate';
import { PettFieldDrop } from './Componentes/PettFieldDrop';
import { PettFieldFloat } from './Componentes/PettFieldFloat';
import { PettFieldMask } from './Componentes/PettFieldMask';
import { PettFieldMoney } from './Componentes/PettFieldMoney';
import { PettFieldOtp } from './Componentes/PettFieldOtp';
import { PettFieldPass } from './Componentes/PettFieldPass';
import { PettFieldText } from './Componentes/PettFieldText';
import { PettFieldTextArea } from './Componentes/PettFieldTextArea';
import { PettSwitch } from './Componentes/PettSwitch';
import { PettColorSwatch } from './Componentes/PettColorSwatch';
import { PettIcon } from './Componentes/PettIcon';
import { PettButton } from './Componentes/PettButton';
import { PettFieldSearch } from './Componentes/PettFieldSearch';
import { PettFieldLoc } from './Componentes/PettFieldLoc';
import { PettGrid } from './Componentes/PettGrid';
import { PettColumn } from './Componentes/PettColumn';
import { PettModal } from './Componentes/PettModal';
import { PettTab } from './Componentes/PettTab';
import { PettTabPanel } from './Componentes/PettTabPanel';

import './App.css';
import './Temas/PettThemeLight.css';
import './Temas/PettThemeDark.css';
import './Temas/PettThemeIndustrial.css';

function App() {
    const [formData, setFormData] = useState({ nome: '', codigo: '', status: '', categoria: '', cpf: '', cnpj: '',
        dataNascimento: '', celular: '', observacao: '', senhaLogin: "", senhaForte: "", salario: 2500.5,
        valorDesconto: null, pesoKg: 12.45, taxaPorcentagem: 5.753, aceitaTermos: true,
        receberEmail: false, acesso: 'S', codigoVerificacao: "", pesquisa: "", localizacao: "50",
        corTema: "#4CAF50", tema: 'light'
     });

    // Exemplo de lista com Objetos
    const opcoesStatus = [
        { label: 'ATIVO', valor: 'A' },
        { label: 'INATIVO', valor: 'I' },
        { label: 'BLOQUEADO', valor: 'B' },
    ];

    // Exemplo de lista com Strings simples
    const opcoesCategoria = ['CLIENTE', 'FORNECEDOR', 'TRANSPORTADORA'];

    // Exemplo de dados para o PettGrid
    const usuariosExemplo = [
        { id: 1, nome: 'Ana Souza', cargo: 'Desenvolvedora', status: 'A', salario: 6500 },
        { id: 2, nome: 'Bruno Lima', cargo: 'Analista', status: 'I', salario: 4200 },
        { id: 3, nome: 'Carla Melo', cargo: 'Gerente', status: 'A', salario: 9800 },
        { id: 4, nome: 'Diego Alves', cargo: 'Suporte', status: 'B', salario: 3100 },
        { id: 5, nome: 'ROGERIO PETT', cargo: 'CEO', status: 'A', salario: 18100.94 },
        { id: 6, nome: 'ADRIANA', cargo: 'CEO', status: 'A', salario: 18100 },
    ];

    const [cor, setCor] = useState("#ff0");
    const [showModal, setShowModal] = useState(false);
    const [showModalCustom, setShowModalCustom] = useState(false);
    const [showModalTop, setShowModalTop] = useState(false);

    const opcoesTema = [
        { label: 'CLARO (LIGHT)', valor: 'light' },
        { label: 'ESCURO (DARK)', valor: 'dark' },
        { label: 'INDUSTRIAL', valor: 'industrial' },
    ];

    // Aplica o tema no <html> (ancestral de tudo, inclusive do <body>)
    useEffect(() => {
        document.documentElement.setAttribute('data-pett-theme', formData.tema);
    }, [formData.tema]);

    return <>
        <section id="center">
            <div className="demo-container">
                <div className="demo-header">
                    <h2>Biblioteca pett-componentes</h2>
                    <PettFieldDrop
                        size="demo-theme-switcher"
                        label="TEMA DA INTERFACE"
                        name="tema"
                        value={formData.tema}
                        set={setFormData}
                        options={opcoesTema}
                        optionLabel="label"
                        optionValue="valor"
                    />
                </div>

                <div className="demo-grid">

                    <section className="demo-card">
                        <h3>Botões</h3>
                        <PettButton caption="Localizar" variant="orange" size="sm" icone="search" icoSize="12"/>
                        <PettButton caption="Localizar" variant="green" />
                        <PettButton caption="Localizar" variant="yellow" size="lg"/>
                        <div className="demo-row">
                            <PettButton caption="Localizar" variant="dark" icone="search" />
                            <PettButton caption="Novo" variant="light" icone="plus" />
                            <PettButton caption="Salvar" variant="green" icone="checkmark" />
                            <PettButton caption="Excluir" variant="red" icone="trash" />
                            <PettButton caption="Editar" variant="purple" icone="pencil" />
                            <PettButton caption="Opções" variant="orange" drop />
                            <PettButton caption="Carregando..." variant="blue" icone="loading_white" animado />
                        </div>
                    </section>

                    <section className="demo-card">
                        <h3>Localização e Busca</h3>
                        <PettFieldSearch name="pesquisa" placeholder="Pesquisar registros..." value={formData.pesquisa} set={setFormData} />
                        <PettFieldLoc label="CÓD. SIMPLES" name="localizacao" value={formData.localizacao} set={setFormData} onClick={() => alert("Abrir consulta simples")} />
                    </section>

                    <section className="demo-card">
                        <h3>Identificação</h3>
                        <PettFieldText label="NOME COMPLETO" name="nome" value={formData.nome} set={setFormData} required/>
                        <PettFieldDrop label="STATUS DO CADASTRO" name="status" value={formData.status} set={setFormData} options={opcoesStatus} optionLabel="label" optionValue="valor" />
                        <PettFieldDrop label="CATEGORIA" name="categoria" value={formData.categoria} set={setFormData} options={opcoesCategoria} />
                        <PettFieldMask label="CPF" name="cpf" mask="999.999.999-99" value={formData.cpf} set={setFormData}/>
                        <PettFieldMask label="CELULAR / WHATSAPP" name="celular" mask="(99) 99999-9999" value={formData.celular} set={setFormData} />
                        <PettFieldMask label="CNPJ" name="cnpj" mask="**.***.AAA/AAAA-99" value={formData.cnpj} set={setFormData} upper/>
                    </section>

                    <section className="demo-card">
                        <h3>Data e Segurança</h3>
                        <PettFieldDate label="DATA DE NASCIMENTO" name="dataNascimento" value={formData.dataNascimento} set={setFormData} />
                        <PettFieldPass label="SENHA DE ACESSO" name="senhaLogin" value={formData.senhaLogin} set={setFormData} required autoComplete="current-password"/>
                        <PettFieldPass label="CRIE UMA SENHA FORTE" name="senhaForte" value={formData.senhaForte} set={setFormData} feedback={true}
                            promptLabel="Digite uma senha com letras, números e símbolos."
                            weakLabel="Muito fraca!"
                            mediumLabel="Senha razoável"
                            strongLabel="Excelente senha!"
                        />
                        <PettFieldOtp label="CÓDIGO DE VERIFICAÇÃO" name="codigoVerificacao" length={6} value={formData.codigoVerificacao} set={setFormData} autoFocus/>
                    </section>

                    <section className="demo-card">
                        <h3>Valores Numéricos</h3>
                        <PettFieldMoney label="SALÁRIO BASE" name="salario" value={formData.salario} set={setFormData}/>
                        <PettFieldMoney label="DESCONTO (R$)" name="valorDesconto" value={formData.valorDesconto ?? ""} set={setFormData}/>
                        <PettFieldFloat label="PESO (KG)" name="pesoKg" value={formData.pesoKg} set={setFormData}/>
                        <PettFieldFloat label="TAXA (%)" name="taxaPorcentagem" minDigits={3} maxDigits={3} value={formData.taxaPorcentagem} set={setFormData}/>
                    </section>

                    <section className="demo-card">
                        <h3>Cor e Texto Longo</h3>
                        <PettFieldColor label="COR DO TEMA" name="corTema" value={formData.corTema} set={setFormData}/>
                        <PettFieldTextArea name="observacao" label="OBSERVAÇÕES DO CADASTRO" rows={4} value={formData.observacao} set={setFormData} autoResize={true} upper={true} />
                    </section>

                    <section className="demo-card">
                        <h3>Opções e Confirmação</h3>
                        <PettFieldCheck label="Li e concordo com os termos de uso" name="aceitaTermos" value={formData.aceitaTermos} set={setFormData}/>
                        <PettFieldCheck label="Desejo receber novidades por e-mail" name="receberEmail" value={formData.receberEmail} set={setFormData}/>
                        <PettSwitch label="Permitir Acesso à Empresa" name="acesso" value={formData.acesso} set={setFormData} trueValue="S" falseValue="N"/>
                    </section>

                    <section className="demo-card">
                        <h3>Amostra de Cor e Ícones</h3>
                        <PettColorSwatch value={cor} onChange={(novaCor) => setCor(novaCor)}/>
                        <div className="demo-row">
                            <PettIcon name="checkmark" size={20} animado/>
                            <PettIcon name="loading_red" size={24} />
                        </div>
                    </section>

                    <section className="demo-card">
                        <h3>Modal</h3>
                        <div className="demo-row">
                            <PettButton caption="Padrão (rodapé automático)" variant="blue" onClick={() => setShowModal(true)} />
                            <PettButton caption="Rodapé customizado" variant="purple" onClick={() => setShowModalCustom(true)} />
                            <PettButton caption="No topo, pequeno" variant="orange" onClick={() => setShowModalTop(true)} />
                        </div>
                    </section>

                    <section className="demo-card demo-card-wide">
                        <h3>Abas (PettTab)</h3>
                        <PettTab>
                            <PettTabPanel header="Aba 1">
                                <p>Conteúdo da primeira aba. Só ela existe de verdade no DOM até você trocar — as outras nem chegam a renderizar.</p>
                            </PettTabPanel>
                            <PettTabPanel header="Aba 2">
                                <p>Segunda aba — dá pra colocar qualquer componente do pacote aqui dentro, igual num formulário normal.</p>
                            </PettTabPanel>
                            <PettTabPanel header="Aba 3 (desabilitada)" disabled>
                                <p>Você não deveria conseguir ver isso — essa aba está desabilitada.</p>
                            </PettTabPanel>
                            <PettTabPanel header="Aba 4">
                                <p>Quarta aba — repare que o indicador desliza até o final da lista sem travar.</p>
                            </PettTabPanel>
                            <PettTabPanel header="Aba com nome bem mais longo">
                                <p>Essa aba tem um título mais comprido, só pra testar o indicador com larguras bem diferentes entre as abas.</p>
                            </PettTabPanel>
                        </PettTab>
                    </section>

                    <section className="demo-card demo-card-wide">
                        <h3>Grid de Dados (PettGrid)</h3>
                        <PettGrid listagem={usuariosExemplo} showRowBorders={false} rowSelect={(row) => alert('Selecionado: ' + row.nome)} >
                            <PettColumn field="nome" header="Nome" sortable />
                            <PettColumn field="cargo" header="Cargo" sortable width={140} />
                            <PettColumn header="Status" body={(row) => opcoesStatus.find((o) => o.valor === row.status)?.label ?? row.status}/>
                            <PettColumn header="Salário" align="right" body={(row) => row.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/>
                        </PettGrid>
                    </section>

                </div>

                <PettModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title="Exemplo de PettModal"
                    size="md"
                    position="center"
                >
                    <p>Este é um modal nativo, sem depender do react-bootstrap.</p>
                    <p>
                        Tente pressionar <strong>Esc</strong>, ou clicar fora dele — como o
                        <code> backdrop</code> padrão é <code>"static"</code>, clicar fora não fecha.
                    </p>
                    <p>Este modal não passa nenhum <code>PettModalFooter</code>, então o botão "Fechar" padrão aparece sozinho.</p>
                </PettModal>

                <PettModal
                    show={showModalCustom}
                    onHide={() => setShowModalCustom(false)}
                    title="Rodapé customizado"
                    size="md"
                >
                    <p>Este modal passa um <code>PettModal.Footer</code> próprio — repare que o botão "Fechar" padrão não aparece mais, só o que foi passado.</p>
                    <PettModal.Footer>
                        <PettButton caption="Cancelar" variant="light" onClick={() => setShowModalCustom(false)} />
                        <PettButton caption="Confirmar" variant="green" icone="checkmark" onClick={() => setShowModalCustom(false)} />
                    </PettModal.Footer>
                </PettModal>

                <PettModal
                    show={showModalTop}
                    onHide={() => setShowModalTop(false)}
                    title="No topo"
                    size="sm"
                    position="top"
                >
                    <p>Esse aqui usa <code>size="sm"</code> e <code>position="top"</code>.</p>
                </PettModal>

                <details className="demo-json">
                    <summary>Ver estado do formulário (JSON)</summary>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </details>
            </div>
        </section>

    </>
}

export default App