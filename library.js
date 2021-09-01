let select = function (el) {
    return document.getElementById(el);
}

let create = function (el) {
    return document.createElement(el);
}

let tags = {
    userLibraryMain : [],
    toBeRead : [],
    read : [],
    reading : [],
    putDown : [],
    favorites : []
}

function book(title, author, pages, pagesRead, reviewText, reviewStars, tags) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead,
    this.reviewText = reviewText,
    this.reviewStars = reviewStars
    this.tags = tags
}

book.prototype.pIL = function placeInLibrary() {
    let bookBuild = select('book-build');
    let bookContainer = select('book-container');
    let newBook = bookBuild.cloneNode(true);
    newBook.classList.add('newBook');
    newBook.id += bookContainer.childElementCount;

    let colorsArray = ['#635781', '#577d81', '#cbc25f', '#6fcb5f', '#685fcb', '#cb5fc8', '#cb5f5f', '#cba05f', '#905fcb', '#5fcbc1'];
    let chooseColor = () => {
        let length = colorsArray.length;
        let randNum = Math.floor(Math.random() * (length + 1));
        return randNum;
    };

    let chosenColor = colorsArray[chooseColor()];
    newBook.children.item(0).style['background-color'] = chosenColor; //Front cover.
    newBook.children.item(2).style['background-color'] = chosenColor; //Back cover.

    let newTitle = create('h3');
    tags.userLibraryMain.push(this);
    switch (this.tags) {
        case ('toBeRead'): 
            tags.toBeRead.push(this); 
            break;
        case 'read': 
            tags.read.push(this); 
            break;
        case 'reading': 
            tags.reading.push(this); 
            break;
        case 'putDown': 
            tags.putDown.push(this); 
            break;
        case 'favorites': 
            tags.favorites.push(this); 
            break;
    }

    newTitle.innerText = this.title;
    newTitle.classList.add('book-titles');
    newBook.children.item(0).append(newTitle);
    bookContainer.appendChild(newBook);
};

let bookSearchBox = select('book-search-input');
let bookSearchBoxMediaQuery = select('book-search-input2')

//Website view search bar animations:

select('cover-div-book-search').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

select('search-icon').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search');
    coverDiv.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        coverDiv.className = 'animatedCoverUp';
    });
});

//Media query/mobile view search bar animations:

select('cover-div-book-search2').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    document.getElementById('icon-div').className = 'animateIcons';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

select('icon-div').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search2');
    e.target.className = 'animateIcons';
    coverDiv.className = 'animatedCover';
    document.getElementById('cover-div-book-search2').className = 'animatedCover';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animateIconsBack';
        coverDiv.className = 'animatedCoverUp';
    });
});

//New Book Button:

// function addBookUI () {

// }

// select('new-book-title').addEventListener('click',)

// select('plus-icon').addEventListener('click',)

(function inputClear () {
    document.querySelectorAll('input').forEach(el => el.value = '');
    console.log(document.querySelectorAll('input'));
})();

select('pages-input').addEventListener('keydown', function enterFunc (e) {
    if (e.key == 'Enter' || e.eventCode == 13) {
        let pages = e.target.value;
        select('pages-read-range').setAttribute('max', pages);
        select('pagesTotal').innerText = pages;
        e.target.value = '';
        e.preventDefault();
    }
})

select('pages-read-range').addEventListener('input', function pageReadSlide (e) {
    let pages = e.target.value;
    select('pagesRead').innerText = pages;
})

select('pages-read-input').addEventListener('keydown', function enterFunc (e) {
    if (e.key == 'Enter' || e.eventCode == 13) {
        let numberOfPages = parseInt(select('pages-read-range').getAttribute('max'));
        let pagesRead = parseInt(e.target.value);
        if (numberOfPages == 0) {
            alert('Please enter the number of pages first.');
            e.preventDefault();
            return;
        } else if (pagesRead > numberOfPages) {
            alert('I don\'t think that\'s possible...')
            e.preventDefault();
            return;
        } else {
            select('pagesRead').innerText = pagesRead;
            select('pages-read-range').value = pagesRead;
            e.target.value = '';
            e.preventDefault();
        }
    }
})

let gibberish = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish',
    author: 'Big Boy',
    pages: 321,
    pagesRead: 321,
    reviewText: 'It was alright. Didn\'t make any sense, though.',
    reviewStars: 3,
    tags: 'read'
});

let gibberish2 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish the Sequel',
    author: 'Big Boy',
    pages: 365,
    pagesRead: 56,
    reviewText: '',
    reviewStars: '',
    tags: 'reading'
});

let gibberish3 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish: the Prequel',
    author: 'Big Boy',
    pages: 450,
    pagesRead: 0,
    reviewText: '',
    reviewStars: '',
    tags: 'toBeRead'
});

gibberish.pIL();
gibberish2.pIL();
gibberish3.pIL();

//If pages read is equal to pages, make a change in book appearance / move it to tag read.