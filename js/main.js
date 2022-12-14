/*
    * Version : 1.0
    * Author : @mohamedpierre
    * placeholder api : https://jsonplaceholder.typicode.com/
    * test spinner : https://github.com/hr-meheraj/Async-Await-Fetch-Api-with-Loading-Spinner
*/ 

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const result = document.getElementById('result');
// input event
search.addEventListener('input',  () => {
    searchStates(search.value, "notEnter"); // optional
});

// // TODO :  keyup event
search.addEventListener('keyup', ($event) =>{
    if($event.keyCode === 13){
        searchStates(search.value, "enter");
    }
})

// search states.json and filter it
const searchStates = async (searchText,isEnter) => {
    const response = await fetch('../data/stateless.json');
    const states = await response.json();
    var limitArrayToFive = [];
    
    // get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`(${searchText})`, 'gi');//gi = global, case insensitive
        return state.name.match(regex) || state.abbr.match(regex)
    });


    if(searchText === '') {
        matches = limitArrayToFive = []
    }

    if(isEnter === "enter") {
        outputHtmlList(matches,"all");
        return;
    }
    
    for (let i = 0; i < matches.length; i++) {
        if(i === 5) break;
        limitArrayToFive.push(matches[i]);            
    }
    outputHtmlList(limitArrayToFive, "justFive");//optional
}

// show results in HTML
const outputHtmlList = (matches,isAllResults) => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="card card-body mb-1"">
                <h4>${match.name} (${match.abbr}) <span class="text-light">${match.capital}</span></h4>
               <small>Lat: ${match.lat} / Long: ${match.long}</small> 
            </div>
        `).join('');

        matchList.innerHTML = html;
        if(isAllResults === "all"){
            result.innerHTML = html;
            emptyList();
            clearInput();
        }
    } else {
        if(isAllResults === "all"){
            result.innerHTML = '';
        }
        matches = [];
        emptyList();
    }
}


const emptyList = () => {
    matchList.innerHTML = '';
}

const clearInput = () =>{
    search.value = '';
}