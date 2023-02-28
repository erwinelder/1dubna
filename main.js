const default_words = [
    'Údajně',
    'postávající',
    'řešit',
    'strážník',
    'ona',
    'vyšetřovací',
    'podezřelý',
    'terč',
    'ošetření',
    'myslivec',
    'prý',
    'mezitím',
    'krvácející',
    'zboží',
    'obtěžovat'
];

const right_words = [
    'řešili',
    'strážníkům',
    'jí',
    'terčem',
    'ošetření',
    'myslivci',
    'mezitím',
    'krvácejícím',
    'údajně',
    'postávající',
    'prý',
    'zboží',
    'Podezřelé',
    'obtěžovali',
    'vyšetřovací'
];



//////////////////////////////////////////////////



var id = function(id) {
    return document.getElementById(id);
}



// upload words to words container

for (let a = 0; default_words[a]; a++)
    id('words').insertAdjacentHTML('beforeend', constructWordEl(a));

function constructWordEl (n) {

    if (n != default_words.length - 1)
        return (`<span class="word">${default_words[n]}</span>, `);
    else
        return (`<span class="word">${default_words[n]}</span>`);
}


// set up click on notification of word container
id('words-cont-notification').onclick = function() {
    id('words-cont-notification').style.opacity = '0';
    setTimeout(() => {
        id('words-cont-notification').style.display = 'none';
    }, 400);
}



// set up click on words
for (let word of document.getElementsByClassName('word')) {
    word.onclick = function() {
        if (this.classList.contains('word_through'))
            this.classList.remove('word_through');
        else this.classList.add('word_through');
    }
}



// set up click on check answers button
id('check-input').onclick = function() {

    let inputs = id('text').getElementsByTagName('input');
    let results = 0;
    
    for (let a = 0; inputs[a]; a++)
        if (inputs[a].value == right_words[a]) {
            inputs[a].classList.add('right-answer');
            results++;
        } else inputs[a].classList.add('bad-answer');

    showResultsWindow(results);
}

function percent_line(){
    percent_line_status = 1;
    if (result == 0) {}
    else if (result == 1){
        id('percent-line').style.width = '7%';
    } else if (result == 2){
        id('percent-line').style.width = '13%';
    } else if (result == 3){
        id('percent-line').style.width = '20%';
    } else if (result == 4){
        id('percent-line').style.width = '27%';
    } else if (result == 5){
        id('percent-line').style.width = '33%';
    } else if (result == 6){
        id('percent-line').style.width = '40%';
    } else if (result == 7){
        id('percent-line').style.width = '47%';
    } else if (result == 8){
        id('percent-line').style.width = '53%';
    } else if (result == 9){
        id('percent-line').style.width = '60%';
    } else if (result == 10){
        id('percent-line').style.width = '67%';
    } else if (result == 11){
        id('percent-line').style.width = '73%';
    } else if (result == 12){
        id('percent-line').style.width = '80%';
    } else if (result == 13){
        id('percent-line').style.width = '87%';
    } else if (result == 14){
        id('percent-line').style.width = '93%';
    } else if (result == 15){
        id('percent-line').style.width = '100%';
    } else {}
}



function showResultsWindow (results) {

    id('results-cont').setAttribute('animstatus', 'processing');
    disableScrolling();
    applyResultsToResultsNumber(results);

    id('results-cont').classList.add('visible');

    setTimeout(() => {
        id('results-cont').classList.add('background');
        
        setTimeout(() => {
            id('results').classList.add('transform');
        
            setTimeout(() => {
                id('percent-shadow').classList.add('visible');
                id('percent').classList.add('visible');
            
                setTimeout(() => {

                    if (id('check-input').getAttribute('opened-status') == '0') {
                        applyResultsToProgressLine(results);
                    }
                    id('results-cont').setAttribute('animstatus', 'done');

                }, 800);
            }, 300);
        }, 300);
    }, 1);
}

function applyResultsToResultsNumber (results) {
    id('percent-number').value = `${results}/${default_words.length}`;
}

function applyResultsToProgressLine (results) {

    let words_count = default_words.length;
    let percent = (100 / words_count) * results;

    id('percent-line').style.width = percent + '%';
}

id('results-cont').onclick = () => {
    if(id('results-cont').getAttribute('animstatus') == 'done') {

        enableScrolling();

        if (id('check-input').getAttribute('opened-status') != '1') {
            id('check-input').setAttribute('opened-status', '1');
            id('check-input').value = 'Výsledek';
        }

        id('results').classList.add('hide');
        id('results').classList.remove('visible');
        id('results').classList.remove('transform');
        id('results-cont').classList.remove('background');

        setTimeout(() => {
            id('results-cont').classList.remove('visible');

            setTimeout(() => {
                id('results').classList.remove('hide');
            }, 300);
        }, 300);
    }
}



function disableScrolling () {
	var x = window.scrollX;
	var y = window.scrollY;
	window.onscroll = function() {
		window.scrollTo(x, y);
	};
}
enableScrolling();
function enableScrolling () {
// set up scroll listener
    window.onscroll = function() {
        if (id('words-cont').getBoundingClientRect().top == 0)
            id('words-cont').classList.add('sticky');
        else id('words-cont').classList.remove('sticky');
    };
}