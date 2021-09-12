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

//Book constructor:
function book(title, author, pages, pagesRead, reviewText, reviewStars, tags, description) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead,
    this.reviewText = reviewText,
    this.reviewStars = reviewStars
    this.tags = tags
    this.description = description;
}

//Shows summary, review and the option to put the book 'down'.
function applyBookPreview (bookID, obj) {
    let bookOverlay = select(bookID).children.item(0).children.item(4);
    bookOverlay.addEventListener('click', function () {

        //Applying a clone of the book build:
        select('preview-book-ui').style.display = 'block';
        select('overlay').style.display = 'block';
        let bookPreview = select('book-preview');
        let bookColor = select(bookID).children.item(1).style.backgroundColor;
        let bookStaticClone = select(bookID).cloneNode(true);
        bookStaticClone.children.item(0).remove(); // Takes off the hover overlay.

        // Had to change the sizes of the book parts:
        let frontCover = bookStaticClone.children.item(0);
        frontCover.style = `height: 189.64px; width: 106.88px; background-color: ${bookColor};`;
        if (frontCover.children.item(0).nodeName == 'H3') {
           frontCover.children.item(0).style = 'font-size: revert';
        } else {
            frontCover.children.item(0).style = 'border-radius: 10px; height: 189.64px; width: 106.88px; display: block;';
        }
        let pages = bookStaticClone.children.item(1);
        pages.style = `height: 189.64px; width: 108.96px; bottom: 185px; left: 4px;`;
        let backCover = bookStaticClone.children.item(2);
        backCover.style = `height: 189.64px; width: 117.23px; left: 1px; bottom: 371px; background-color: ${bookColor};`;
        bookPreview.appendChild(bookStaticClone);

        //Applying data:
        let defaultSummary = `No summary...would you like to add one?<br>
        <a id='book-summary-pick' href='#'>Choose from existing book.</a> 
        <br>
        <a id='book-summary-create' href='#'>Create your own.</a></p>`;
        let defaultReview = `Nothing here yet!`;
        if (obj.reviewText) {
            select('review-text').innerText = obj.reviewText;
        } else {
            select('review-text').innerHTML = defaultReview;
        }
        if (obj.description) {
            select('summary-para').innerText = obj.description; 
        } else {
            select('summary-para').innerHTML = defaultSummary;
        }

        //Review stars functionality:
        function reviewStarActivate (i) {
            let starNum = this; // Trails back to the stars they're attatched to later.
            if (starNum.id){ //By default, it's the window obj.
                starNum = parseInt(starNum.id.replace(/star/gi, ''));
                i = starNum;
                obj.reviewStars = i;
            }
            for (j = i + 1; j <= 5; j++) {
                select(`${j}star`).src = 'faveStar.svg';
            }
            for (x = 1; x <= i; x++){
                select(`${x}star`).src = 'faveStarActive.svg';
            }
        };

        reviewStarActivate(obj.reviewStars);

        select('1star').addEventListener('click', reviewStarActivate);
        select('2star').addEventListener('click', reviewStarActivate);
        select('3star').addEventListener('click', reviewStarActivate);
        select('4star').addEventListener('click', reviewStarActivate);
        select('5star').addEventListener('click', reviewStarActivate);

        //Edit review button:
        select('edit-review-btn').addEventListener('click', function () {
            let reviewInput = select('review-input');
            reviewInput.style.display = 'block';
            let submitBtn = select('submit-review-btn');
            submitBtn.style.display = 'block';
            reviewInput.addEventListener('keydown', function (e) {
                if (e.key == 'Enter' || e.eventCode == 13) {
                    obj.reviewText = reviewInput.value;
                    select('review-text').innerText = reviewInput.value;
                    e.target.style.display = 'none';
                    submitBtn.style.display = 'none';
                }
            })
            submitBtn.addEventListener('click', function submit (e) {
                obj.reviewText = reviewInput.value;
                select('review-text').innerText = reviewInput.value;
                reviewInput.style.display = 'none';
                e.target.style.display = 'none';
                e.preventDefault();
            })
        });


        
        
    });

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
    applyBookPreview(newBook.id, this);
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
    select('preview-book-ui').style.display = 'none';
    select('book-preview').innerHTML = '';
    select('searched-books-container').innerHTML = '';
    for (x = 1; x <= 5; x++){
        select(`${x}star`).src = 'faveStar.svg';
    }
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
    let newBook = new book(title, author, pages, pagesRead, reviewText, reviewStars, tags, description);
    newBook.pIL();
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    inputClear();
    turnHoverOn();
    e.preventDefault();
    return;
})


let gibberish = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish',
    author: 'Big Boy',
    pages: 321,
    pagesRead: 321,
    reviewText: 'It was alright. Didn\'t make any sense, though.',
    reviewStars: 3,
    tags: 'read',
    description: 'Ykasj jnaj lasjonw kjndnsajdad lamdad akndand kann. Ajnnnasf alwopq knsknas.'
});

let gibberish2 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish the Sequel',
    author: 'Big Boy',
    pages: 365,
    pagesRead: 365,
    reviewText: 'It still doesn\'t make any sense...but it was mildly entertaining nonetheless.',
    reviewStars: '4',
    tags: 'read',
    description: 'jafiafi anfofajf akfkajksowws oinkasnfsan. knaknaskla aljmsdkasjdlkal aksnasn akjsnfkanf.'
});

let gibberish3 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish: the Prequel',
    author: 'Big Boy',
    pages: 450,
    pagesRead: 450,
    reviewText: 'Wow. I think I can finally understand why people read this series. My God. It is a masterpiece!!',
    reviewStars: '5',
    tags: 'read',
    description: 'Gib jib gabba wooky. Gahanda foroduki! Jamba laba da, tad aplo bungy.'
});

let placeholderBook = Object.assign(Object.create(book.prototype), {
    title: 'A Book',
    author: 'An Author',
    pages: 500,
    pagesRead: 0,
    reviewText: '',
    reviewStars: '',
    tags: 'toBeRead',
    description: ''
});

gibberish.pIL();
gibberish2.pIL();
gibberish3.pIL();
placeholderBook.pIL();
placeholderBook.pIL();
placeholderBook.pIL();


//If pages read is equal to pages, make a change in book appearance / move it to tag read.