let select = function (element) {
    return document.getElementById(element);
}

let create = function (element) {
    return document.createElement(element);
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

    let colorsArray = ['#635781', '#577d81', '#cbc25f', '#6fcb5f', '#685fcb', '#cb5fc8', '#cb5f5f', '#cba05f', '#905fcb', '#5fcbc1', '#af7cab'];
    let chooseColor = () => {
        let length = colorsArray.length;
        let randNum = Math.floor(Math.random() * (length));
        return randNum;
    };

    let chosenColor = colorsArray[chooseColor()];
    newBook.children.item(1).style['background-color'] = chosenColor; //Front cover.
    newBook.children.item(3).style['background-color'] = chosenColor; //Back cover.

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

    if (select('cover-img')) {
        let img = document.createElement('img');
        img.src = select('cover-img').src;
        img.style = `height: 275px;
                    width: 155px;
                    border-radius: 10px;`;
        newBook.children.item(1).appendChild(img);//Puts image into front cover div.
    } else {  //If there isn't a cover image, just use a h3 title.
        let newTitle = create('h3');
        newTitle.innerText = this.title;
        newTitle.classList.add('book-titles');
        newTitle.id = 'bookTitle' + bookContainer.childElementCount;
        newBook.children.item(1).append(newTitle);
    }

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

//Book overlay hover toggle:

let turnHoverOff = () => {
    let booksLength = select('book-container').childElementCount;
    let books = document.getElementsByClassName('newBook');
    for (i = 0; i < booksLength; i++) {
        let overlays = books.item(i).childNodes.item(1);
        overlays.classList.remove('hover');
    }
}

let turnHoverOn = () => {
    let booksLength = select('book-container').childElementCount;
    let books = document.getElementsByClassName('newBook');
    for (i = 0; i < booksLength; i++) {
        let overlays = books.item(i).childNodes.item(1);
        overlays.classList.add('hover');
    }
}

//New Book Button:

let newBookUI = () => {
    select('overlay').style.display = 'block';
    select('new-book-ui').style.display = 'block';
    turnHoverOff();
}

select('new-book-title').addEventListener('click', newBookUI);

select('plus-icon').addEventListener('click', newBookUI);

function inputClear () {
    document.querySelectorAll('input').forEach(el => el.value = '');
    if (select('cover-img')) {
        select('cover-img').src = '';
    }
    // console.log(document.querySelectorAll('input'));
};

inputClear();

select('overlay').addEventListener('click', function backToMain () {
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    select('search-books-ui').style.display = 'none';
    select('searched-books-container').innerHTML = '';
    turnHoverOn();
})

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
            alert('I don\'t think that\'s possible...');
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

select('img-upload').addEventListener('change', function getBookCover (e) {
    let img = document.createElement('img');
    img.id = 'cover-img';
    img.alt = 'Cover preview';
    let file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function convertTobase64 () {
        img.src = reader.result;
        img.style = `height: 55px;
                    width: 40px;`
        let imgdiv = select('img-div');
        imgdiv.innerHTML = '';
        imgdiv.appendChild(img);

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
})


select('done-btn').addEventListener('click', function submit (e) {
    let title = select('title-input').value;
    let author = select('author-input').value;
    let pages = select('pagesTotal').innerText;
    let pagesRead = select('pagesRead').innerText;
    let reviewText = 'Your review would be exquisite, I\'m sure.';
    let reviewStars = 0;
    let tags = ''
    if (pagesRead == 0) {
        tags = 'toBeRead';
    } else if (pagesRead == pages) {
        tags = 'read'
    }
    let newBook = new book(title, author, pages, pagesRead, reviewText, reviewStars, tags);
    newBook.pIL();
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    inputClear();
    turnHoverOn();
    e.preventDefault();
    return;
})

//Edit button:





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

let placeholderBook = Object.assign(Object.create(book.prototype), {
    title: 'A Book',
    author: 'An Author',
    pages: 500,
    pagesRead: 0,
    reviewText: '',
    reviewStars: '',
    tags: 'toBeRead'
});

gibberish.pIL();
gibberish2.pIL();
gibberish3.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();


//If pages read is equal to pages, make a change in book appearance / move it to tag read.