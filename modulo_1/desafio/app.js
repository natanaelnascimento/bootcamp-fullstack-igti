// GLOBAL

// HTML
let form = null;
let searchText = null;
let searchButton = null;
let foundText = null;
let statsText = null;
let foundPanel = null;
let statsPanel = null;
let load = null;

// Lists
let allUsersList = [];
let foundUsersList = [];
let statsList = [];

// Others
numberFormatter = null;

window.addEventListener('load', function() {
    form = this.document.querySelector('#form');
    searchText = this.document.querySelector('#search_text');
    searchButton = this.document.querySelector('#search_button');
    foundText = this.document.querySelector('#found_text');
    statsText = this.document.querySelector('#stats_text');
    foundPanel = this.document.querySelector('#found_panel');
    statsPanel = this.document.querySelector('#stats_panel');
    load = this.document.querySelector('#load');

    fetchUsers();

    form.addEventListener('submit', event => event.preventDefault());
    searchText.addEventListener('keyup', handleSarchText);
    searchButton.addEventListener('click', handleSearchButton);

    numberFormatter = Intl.NumberFormat('pt-BR', {maximumFractionDigits: 2});

    searchText.value = '';
    render();
});

async function fetchUsers() {
    renderLoading();
    let success = false;
    try {
        let response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
        if(response.ok) {
            let json = await response.json();
            allUsersList = json.results;
            allUsersList = allUsersList.map(user => {
                return {
                    name: `${user.name.first} ${user.name.last}`,
                    age: user.dob.age,
                    picture: user.picture.thumbnail,
                    gender: user.gender
                }
            });
            success = true;
        }
    } catch {
        success = false;
    }

    completeLoading(success);
}

function handleSarchText(event) {
    renderSearchButton();
    if(event.key === 'Enter' && searchText.value.trim() !== '')
        search();
}

function handleSearchButton(event) {
    search();
}

function search() {
    if(searchText.value === '')
        return;
    foundUsersList = allUsersList.filter(user => user.name.toLowerCase().includes(searchText.value.toLowerCase()));
    foundUsersList.sort((a, b) => a.name.localeCompare(b.name));
    updateStatsList();
    render();
}

function updateStatsList() {
    statsList = [];
    if(foundUsersList.length === 0)
        return;

    // qtd sexo masculino
    let male = foundUsersList.reduce((accumulator, user) => {
        return user.gender === 'male' ? ++accumulator : accumulator;
    }, 0);
    statsList = [...statsList, {item: 'Sexo masculino', value: numberFormatter.format(male)}];

    // qtd sexo feminino
    let female = foundUsersList.reduce((accumulator, user) => {
        return user.gender === 'female' ? ++accumulator : accumulator;
    }, 0);
    statsList = [...statsList, {item: 'Sexo feminino', value: numberFormatter.format(female)}];

    // soma das idades
    let ageSum = foundUsersList.reduce((accumulator, user) => accumulator + user.age, 0); 
    statsList = [...statsList, {item: 'Soma das idades', value: numberFormatter.format(ageSum)}];

    // média das idades
    let ageAvg = ageSum / foundUsersList.length;
    statsList = [...statsList, {item: 'Média das idades', value: numberFormatter.format(ageAvg)}];
}

function renderFoundText() {
    let innerHTML = '';
    if(searchText.value === '')
        innerHTML = 'Nenhum usuário filtrado';
    else if(foundUsersList.length === 0)
        innerHTML = 'Nenhum usuário encontrado';
    else if(foundUsersList.length === 1)
        innerHTML = `${foundUsersList.length} usuário encontrado`;
    else
        innerHTML = `${foundUsersList.length} usuários encontrados`;
    foundText.innerHTML = innerHTML;
}

function renderStatsText() {
    let innerHTML = '';
    if(foundUsersList.length === 0)
        innerHTML = 'Nada a ser exibido';
    else
        innerHTML = 'Estatísticas';
    statsText.innerHTML = innerHTML;
}

function renderFoundPanel() {
    let innerHTML = '';
    if(foundUsersList.length > 0) {
        innerHTML = '<ul class="collection">';
        foundUsersList.forEach(user => innerHTML += `<li class="collection-item"><img class="user-picture" src="${user.picture}">${user.name}, ${user.age} anos</li>`);
        innerHTML += '</ul>';
    }
    foundPanel.innerHTML = innerHTML;
}

function renderStatsPanel() {
    let innerHTML = '';
    if(statsList.length > 0) {   
        innerHTML = '<ul class="collection">';
        statsList.forEach(s => innerHTML += `<li class="collection-item">${s.item}: <span class="stats-value">${s.value}</span></li>`);
        innerHTML += '</ul>';
    }
    statsPanel.innerHTML = innerHTML;
}

function renderLoading() {
    searchText.setAttribute('disabled', 'disabled');
    searchButton.setAttribute('disabled', 'disabled');
    load.innerHTML =
    `<div class="center">Aguarde...</div>
    <div class="progress">
        <div class="indeterminate"></div>
    </div>`;
}

function completeLoading(success) {
    load.innerHTML = '';
    if(success) {
        searchText.removeAttribute('disabled');
        searchButton.removeAttribute('disabled');
        render();
    } else {
        alert('Erro ao obter dados! Recarregue a página para tentar de novo.');
    }
}

function renderSearchButton() {
    if(searchText.value.trim() === '')
        searchButton.setAttribute('disabled', 'disabled');
    else
        searchButton.removeAttribute('disabled');
}

function render() {
    renderSearchButton();
    renderFoundText();
    renderStatsText();
    renderFoundPanel();
    renderStatsPanel();
    searchText.focus();
}