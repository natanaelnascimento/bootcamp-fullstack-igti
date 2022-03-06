import { promises } from 'fs';

const { readFile, writeFile } = promises;

const dados = [];

init();

async function init() {
    try {
        await loadData();
        await funcao1CriarArquivosEstados();
        await funcao3EstadosComMaisCidades();
        await funcao4EstadosComMenosCidades();
        funcao5MaiorNomePorEstado();
        funcao6MenorNomePorEstado();
        funcao7CidadeMaiorNome();
        funcao8CidadeMenorNome();
    } catch (error) {
        console.log(error);
    }
}

async function writeJsonFile(name, data) {
    writeFile(`${name}.json`, JSON.stringify(data));
}

async function readJsonFile(name) {
    return JSON.parse(await readFile(`${name}.json`, 'utf8'));
}

async function loadData() {
    let cidades = await readJsonFile('./input/Cidades');
    let estados = await readJsonFile('./input/Estados');

    cidades = cidades.sort((c1, c2) => {
        if (c1.Nome > c2.Nome) return 1
        else if (c2.Nome > c1.Nome) return -1
        return 0;
    });
    estados = estados.sort((e1, e2) => {
        if (e1.Sigla > e2.Sigla) return 1
        else if (e2.Sigla > e1.Sigla) return -1
        return 0;
    });

    let mapDados = estados.map(e => {
        e.cidades = cidades.filter(c => c.Estado === e.ID);
        return e;
    });

    mapDados.forEach(d => dados.push(d));
}

async function mapearEstadosPorQuantidadeCidades() {
    let estados = await Promise.all(dados.map(async e => {
        return {
            "uf": e.Sigla,
            "qtdCidades": await funcao2QuantidadeCidadesPorUF(e.Sigla)
        }
    }));
    estados = estados.sort((e1, e2) => e2.qtdCidades - e1.qtdCidades);
    return estados;
}

function mapearEstadosPorTamanhoNomeOrdenada(ordenador) {
    let estados = dados.map(e => {
        let cidade = e.cidades.sort(ordenador)[0];
        cidade = e.cidades.filter(c => c.Nome.length === cidade.Nome.length)
            .sort((c1, c2) => {
                if (c1.Nome > c2.Nome) return 1
                else if (c2.Nome > c1.Nome) return -1
                return 0;
            })[0];
        return {
            "uf": e.Sigla,
            "Nome": cidade.Nome
        }
    });
    return estados;
}

function obterCidadePorTamanhoNome(ordenador) {
    let cidades = mapearEstadosPorTamanhoNomeOrdenada(ordenador);
    let cidade = cidades.sort(ordenador)[0];
    cidade = cidades.filter(c => c.Nome.length === cidade.Nome.length)
        .sort((c1, c2) => {
            if (c1.Nome > c2.Nome) return 1
            else if (c2.Nome > c1.Nome) return -1
            return 0;
        })[0];
    return cidade;
}

async function funcao1CriarArquivosEstados() {
    const promises = [];
    dados.forEach(async e => {
        promises.push(writeJsonFile(`data/${e.Sigla}`, e.cidades));
    });
    Promise.all(promises);
}

async function funcao2QuantidadeCidadesPorUF(uf) {
    let cidades = await readJsonFile(`data/${uf}`);
    return cidades.length;
}

async function funcao3EstadosComMaisCidades() {
    console.log('Método 3 - 5 estados com mais cidades');
    let estados = await mapearEstadosPorQuantidadeCidades();
    estados = estados.map(e => `${e.uf} - ${e.qtdCidades}`);
    console.log(estados.slice(0, 5));
}

async function funcao4EstadosComMenosCidades() {
    console.log('Método 4 - 5 estados com menos cidades');
    let estados = await mapearEstadosPorQuantidadeCidades();
    estados = estados.map(e => `${e.uf} - ${e.qtdCidades}`);
    console.log(estados.slice(estados.length - 5));
}

function funcao5MaiorNomePorEstado() {
    console.log('Método 5 - Cidades de maior nome por estado');
    let estados = mapearEstadosPorTamanhoNomeOrdenada((c1, c2) => c2.Nome.length - c1.Nome.length);
    estados = estados.map(e => `${e.Nome} - ${e.uf}`);
    console.log(estados);
}

function funcao6MenorNomePorEstado() {
    console.log('Método 6 - Cidades de menor nome por estado');
    let estados = mapearEstadosPorTamanhoNomeOrdenada((c1, c2) => c1.Nome.length - c2.Nome.length);
    estados = estados.map(e => `${e.Nome} - ${e.uf}`);
    console.log(estados);
}

function funcao7CidadeMaiorNome() {
    console.log('Método 7 - Cidade de maior nome');
    let cidade = obterCidadePorTamanhoNome((c1, c2) => c2.Nome.length - c1.Nome.length);
    console.log(`${cidade.Nome} - ${cidade.uf}`);
}

function funcao8CidadeMenorNome() {
    console.log('Método 8 - Cidade de menor nome');
    let cidade = obterCidadePorTamanhoNome((c1, c2) => c1.Nome.length - c2.Nome.length);
    console.log(`${cidade.Nome} - ${cidade.uf}`);
}