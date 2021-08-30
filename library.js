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
    let newBook = document.createElement('div');
    let newTitle = document.createElement('h3');
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
    newTitle.className = 'book-titles'
    newBook.className = 'book-div';
    newBook.append(newTitle);
    document.getElementById('book-container').appendChild(newBook);
};

let bookSearchBox = document.getElementById('book-search-input');
let bookSearchBoxMediaQuery = document.getElementById('book-search-input2')

document.getElementById('cover-div-book-search').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

document.getElementById('search-icon').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search');
    coverDiv.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        coverDiv.className = 'animatedCoverUp';
    });
});

document.getElementById('cover-div-book-search2').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    document.getElementById('icon-div').className = 'animateIcons';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

document.getElementById('icon-div').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search2');
    e.target.className = 'animateIcons';
    coverDiv.className = 'animatedCover';
    document.getElementById('cover-div-book-search2').className = 'animatedCover';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animateIconsBack';
        coverDiv.className = 'animatedCoverUp';
    });
});

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

