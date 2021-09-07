$(function () { 
    
    let searchFunc = (e) => {
        let apiKey = 'AIzaSyCd0voZ7biNdsZQd6nNjDnHDYwztwprOK8';
        if (e.key == 'Enter' || e.eventCode == 13) {
            if (e.target.value == '') {
            alert('Please enter something to search first.');
            } else {
                let url = '';
                let img = '';
                let title = '';
                let author = '';
                let pages = '';
                let summary = '';

                $.get(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=${apiKey}&maxResults=40`, function(data){
                    function searchedBooks(title, img, author, pages, summary) {
                        this.title = title,
                        this.img = img,
                        this.author = author,
                        this.pages = pages,
                        this.summary = summary
                    }
                    data.items.forEach(bookObj => {
                        let book = bookObj.volumeInfo;
                        let images = book.imageLinks;
                        if (!images) {
                            images = 'default';
                        } else {
                            images = book.imageLinks.thumbnail;
                        }
                        let newBook = new searchedBooks(book.title, images, book.authors, book.pageCount, book.description);
                    })
                    

                    // OBJECT {
                    //     "kind": "books#volumes",
                    //     "totalItems": 2649,
                    //     "items": [
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "hyGODQAAQBAJ",
                    //         "etag": "VS1TiCX0qfE",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/hyGODQAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "The Money Book for Freelancers, Part-timers, and the Self-employed",
                    //           "subtitle": "The Only Personal Finance System for People with Not-so-regular Jobs",
                    //           "authors": [
                    //             "Joseph D'Agnese",
                    //             "Denise Kiernan"
                    //           ],
                    //           "publisher": "Currency",
                    //           "publishedDate": "2010",
                    //           "description": "Shares strategies for accumulating real-world wealth while staying independently employed, distilling lessons from a variety of sources effectively used by the authors during the recent financial crisis.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780307453662"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "0307453669"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 306,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Business & Economics"
                    //           ],
                    //           "averageRating": 4,
                    //           "ratingsCount": 2,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "0.3.0.0.preview.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=hyGODQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=hyGODQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=hyGODQAAQBAJ&pg=PP1&dq=money&hl=&cd=1&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=hyGODQAAQBAJ&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/The_Money_Book_for_Freelancers_Part_time.html?hl=&id=hyGODQAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=hyGODQAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "Shares strategies for accumulating real-world wealth while staying independently employed, distilling lessons from a variety of sources effectively used by the authors during the recent financial crisis."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "88Wfk4EWZKYC",
                    //         "etag": "bqkbH8STSd0",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/88Wfk4EWZKYC",
                    //         "volumeInfo": {
                    //           "title": "The Money Book for the Young, Fabulous & Broke",
                    //           "authors": [
                    //             "Suze Orman"
                    //           ],
                    //           "publisher": "Penguin",
                    //           "publishedDate": "2005",
                    //           "description": "Addresses personal finance issues that are of relevance to today's world of high debt and disproportionate lifestyles, addressing such topics as credit cards, student loans, credit scores, insurance, and mortgages.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "1573222976"
                    //             },
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9781573222976"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 395,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Self-Help"
                    //           ],
                    //           "averageRating": 4.5,
                    //           "ratingsCount": 29,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "0.0.1.0.preview.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=88Wfk4EWZKYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=88Wfk4EWZKYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=88Wfk4EWZKYC&printsec=frontcover&dq=money&hl=&cd=2&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=88Wfk4EWZKYC&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/The_Money_Book_for_the_Young_Fabulous_Br.html?hl=&id=88Wfk4EWZKYC"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=88Wfk4EWZKYC&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "Addresses personal finance issues that are of relevance to today&#39;s world of high debt and disproportionate lifestyles, addressing such topics as credit cards, student loans, credit scores, insurance, and mortgages."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "DlXXFIMfpC4C",
                    //         "etag": "FKJ9NifE0T4",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/DlXXFIMfpC4C",
                    //         "volumeInfo": {
                    //           "title": "Not Your Parents' Money Book",
                    //           "subtitle": "Making, Saving, and Spending Your Money",
                    //           "authors": [
                    //             "Jean Chatzky"
                    //           ],
                    //           "publisher": "Simon and Schuster",
                    //           "publishedDate": "2010-08-10",
                    //           "description": "For the first time, financial guru and TODAY Show regular Jean Chatzky brings her expertise to a young audience. Chatzky provides her unique, savvy perspective on money with advice and insight on managing finances, even on a small scale. This book will reach kids before bad spending habits can get out of control. With answers and ideas from real kids, this grounded approach to spending and saving will be a welcome change for kids who are inundated by a consumer driven culture. This book talks about money through the ages, how money is actually made and spent, and the best ways for tweens to earn and save money.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "1416994734"
                    //             },
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9781416994732"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": true,
                    //             "image": false
                    //           },
                    //           "pageCount": 176,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Juvenile Nonfiction"
                    //           ],
                    //           "averageRating": 3,
                    //           "ratingsCount": 7,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "0.3.6.0.preview.2",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=DlXXFIMfpC4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=DlXXFIMfpC4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=DlXXFIMfpC4C&printsec=frontcover&dq=money&hl=&cd=3&source=gbs_api",
                    //           "infoLink": "https://play.google.com/store/books/details?id=DlXXFIMfpC4C&source=gbs_api",
                    //           "canonicalVolumeLink": "https://play.google.com/store/books/details?id=DlXXFIMfpC4C"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "FOR_SALE",
                    //           "isEbook": true,
                    //           "listPrice": {
                    //             "amount": 9.99,
                    //             "currencyCode": "USD"
                    //           },
                    //           "retailPrice": {
                    //             "amount": 9.99,
                    //             "currencyCode": "USD"
                    //           },
                    //           "buyLink": "https://play.google.com/store/books/details?id=DlXXFIMfpC4C&rdid=book-DlXXFIMfpC4C&rdot=1&source=gbs_api",
                    //           "offers": [
                    //             {
                    //               "finskyOfferType": 1,
                    //               "listPrice": {
                    //                 "amountInMicros": 9990000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "retailPrice": {
                    //                 "amountInMicros": 9990000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "giftable": true
                    //             }
                    //           ]
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": true,
                    //             "acsTokenLink": "http://books.google.com/books/download/Not_Your_Parents_Money_Book-sample-epub.acsm?id=DlXXFIMfpC4C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=DlXXFIMfpC4C&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "This book talks about money through the ages, how money is actually made and spent, and the best ways for tweens to earn and save money."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "p5rdDIrYChIC",
                    //         "etag": "B4gFrpil7Cw",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/p5rdDIrYChIC",
                    //         "volumeInfo": {
                    //           "title": "Sylvia Porter's Money Book",
                    //           "subtitle": "How to Earn It, Spend It, Save It, Invest It, Borrow It, and Use it to Better Your Life",
                    //           "authors": [
                    //             "Sylvia Porter"
                    //           ],
                    //           "publishedDate": "1976",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "0380006383"
                    //             },
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780380006380"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 1105,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Finance"
                    //           ],
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "0.2.2.0.preview.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=p5rdDIrYChIC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=p5rdDIrYChIC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=p5rdDIrYChIC&q=money&dq=money&hl=&cd=4&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=p5rdDIrYChIC&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/Sylvia_Porter_s_Money_Book.html?hl=&id=p5rdDIrYChIC"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "NO_PAGES",
                    //           "embeddable": false,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=p5rdDIrYChIC&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "NONE",
                    //           "quoteSharingAllowed": false
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "OepvDwAAQBAJ",
                    //         "etag": "vUq6heipzzw",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/OepvDwAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "The Smartest Money Book You'll Ever Read",
                    //           "subtitle": "Everything You Need to Know about Growing, Spending, and Enjoying Your Money",
                    //           "authors": [
                    //             "Daniel R. Solin"
                    //           ],
                    //           "publisher": "TarcherPerigee",
                    //           "publishedDate": "2012-12-31",
                    //           "description": "An Investor Advisor Representative who has appeared on CBS and CNN provides a no-nonsense guide to minimize taxes, buy or sell property, manage health care premiums or retire early, explaining how and when to do things to realize financial independence.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780399537783"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "0399537783"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 304,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Business & Economics"
                    //           ],
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "preview-1.0.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=OepvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=OepvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=OepvDwAAQBAJ&printsec=frontcover&dq=money&hl=&cd=5&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=OepvDwAAQBAJ&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/The_Smartest_Money_Book_You_ll_Ever_Read.html?hl=&id=OepvDwAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=OepvDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "An Investor Advisor Representative who has appeared on CBS and CNN provides a no-nonsense guide to minimize taxes, buy or sell property, manage health care premiums or retire early, explaining how and when to do things to realize financial ..."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "TnrrDwAAQBAJ",
                    //         "etag": "YEwEMRtKR8Y",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/TnrrDwAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "The Psychology of Money",
                    //           "subtitle": "Timeless lessons on wealth, greed, and happiness",
                    //           "authors": [
                    //             "Morgan Housel"
                    //           ],
                    //           "publisher": "Harriman House Limited",
                    //           "publishedDate": "2020-09-08",
                    //           "description": "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780857197696"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "085719769X"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": true,
                    //             "image": true
                    //           },
                    //           "pageCount": 256,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Business & Economics"
                    //           ],
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": true,
                    //           "contentVersion": "1.9.10.0.preview.3",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=TnrrDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=TnrrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=TnrrDwAAQBAJ&printsec=frontcover&dq=money&hl=&cd=6&source=gbs_api",
                    //           "infoLink": "https://play.google.com/store/books/details?id=TnrrDwAAQBAJ&source=gbs_api",
                    //           "canonicalVolumeLink": "https://play.google.com/store/books/details?id=TnrrDwAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "FOR_SALE",
                    //           "isEbook": true,
                    //           "listPrice": {
                    //             "amount": 15.83,
                    //             "currencyCode": "USD"
                    //           },
                    //           "retailPrice": {
                    //             "amount": 15.83,
                    //             "currencyCode": "USD"
                    //           },
                    //           "buyLink": "https://play.google.com/store/books/details?id=TnrrDwAAQBAJ&rdid=book-TnrrDwAAQBAJ&rdot=1&source=gbs_api",
                    //           "offers": [
                    //             {
                    //               "finskyOfferType": 1,
                    //               "listPrice": {
                    //                 "amountInMicros": 15830000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "retailPrice": {
                    //                 "amountInMicros": 15830000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "giftable": true
                    //             }
                    //           ]
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED",
                    //           "epub": {
                    //             "isAvailable": true,
                    //             "acsTokenLink": "http://books.google.com/books/download/The_Psychology_of_Money-sample-epub.acsm?id=TnrrDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    //           },
                    //           "pdf": {
                    //             "isAvailable": true,
                    //             "acsTokenLink": "http://books.google.com/books/download/The_Psychology_of_Money-sample-pdf.acsm?id=TnrrDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=TnrrDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "uZQFEAAAQBAJ",
                    //         "etag": "Nwiq5gmBREk",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/uZQFEAAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "The Money Plot",
                    //           "subtitle": "A History of Currency's Power to Enchant, Control, and Manipulate",
                    //           "authors": [
                    //             "Frederick Kaufman"
                    //           ],
                    //           "publisher": "Other Press (NY)",
                    //           "publishedDate": "2020",
                    //           "description": "Half fable, half manifesto, this brilliant new take on the ancient concept of cash lays bare its unparalleled capacity to empower and enthrall us. Frederick Kaufman tackles the complex history of money, beginning with the earliest myths and wrapping up with Wall Street's byzantine present-day doings. Along the way, he exposes a set of allegorical plots, stock characters, and stereotypical metaphors that have long been linked with money and commercial culture, from Melanesian trading rituals to the dogma of Medieval churchmen faced with global commerce, the rationales of Mercantilism and colonial expansion, and the U.S. dollar's 1971 unpinning from gold. The Money Plot offers a tool to see through the haze of modern banking and finance, demonstrating that the standard reasons given for economic inequality--the Neoliberal gospel of market forces--are, like dollars, euros, and yuan, contingent upon structures people have designed. It shines a light on the one percent's efforts to contain a money culture that benefits them within boundaries they themselves are increasingly setting. And Kaufman warns that if we cannot recognize what is going on, we run the risk of becoming pawns and shells ourselves, of becoming characters in someone else's plot, of becoming other people's money.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9781590517185"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "1590517180"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": true
                    //           },
                    //           "pageCount": 304,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Banks and banking"
                    //           ],
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "preview-1.0.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=uZQFEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=uZQFEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=uZQFEAAAQBAJ&printsec=frontcover&dq=money&hl=&cd=7&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=uZQFEAAAQBAJ&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/The_Money_Plot.html?hl=&id=uZQFEAAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=uZQFEAAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "The Money Plot offers a tool to see through the haze of modern banking and finance, demonstrating that the standard reasons given for economic inequality--the Neoliberal gospel of market forces--are, like dollars, euros, and yuan, ..."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "gRdOBrus_9wC",
                    //         "etag": "qGLwOoFZeqk",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/gRdOBrus_9wC",
                    //         "volumeInfo": {
                    //           "title": "Your Money and Your Brain",
                    //           "subtitle": "How the New Science of Neuroeconomics Can Help Make You Rich",
                    //           "authors": [
                    //             "Jason Zweig"
                    //           ],
                    //           "publisher": "Simon and Schuster",
                    //           "publishedDate": "2007",
                    //           "description": "A senior Money magazine writer draws on up-to-date findings to reveal how money can have the same effect on the mind as sex and drugs, explaining how to use the emerging science of neuroeconomics to make profitable investment choices while avoiding key mistakes. 60,000 first printing.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780743276689"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "074327668X"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 340,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Business & Economics"
                    //           ],
                    //           "averageRating": 2.5,
                    //           "ratingsCount": 4,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": true,
                    //           "contentVersion": "0.2.4.0.preview.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=gRdOBrus_9wC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=gRdOBrus_9wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=gRdOBrus_9wC&printsec=frontcover&dq=money&hl=&cd=8&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=gRdOBrus_9wC&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/Your_Money_and_Your_Brain.html?hl=&id=gRdOBrus_9wC"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=gRdOBrus_9wC&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "A senior Money magazine writer draws on up-to-date findings to reveal how money can have the same effect on the mind as sex and drugs, explaining how to use the emerging science of neuroeconomics to make profitable investment choices while ..."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "58hvDwAAQBAJ",
                    //         "etag": "Jh7xMrRBvH0",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/58hvDwAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "The Energy of Money",
                    //           "subtitle": "A Spiritual Guide to Financial and Personal Fulfillment",
                    //           "authors": [
                    //             "Maria Nemeth"
                    //           ],
                    //           "publisher": "Ballantine Books",
                    //           "publishedDate": "2000",
                    //           "description": "Helps readers plumb the beliefs that shape--and often undermine--their spending habits and outlines a program of exercises to help them fulfill their use of their finances.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780345434975"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "0345434978"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": false,
                    //             "image": false
                    //           },
                    //           "pageCount": 320,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Self-Help"
                    //           ],
                    //           "averageRating": 5,
                    //           "ratingsCount": 2,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": false,
                    //           "contentVersion": "preview-1.0.0",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=58hvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=58hvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=58hvDwAAQBAJ&printsec=frontcover&dq=money&hl=&cd=9&source=gbs_api",
                    //           "infoLink": "http://books.google.com/books?id=58hvDwAAQBAJ&dq=money&hl=&source=gbs_api",
                    //           "canonicalVolumeLink": "https://books.google.com/books/about/The_Energy_of_Money.html?hl=&id=58hvDwAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "NOT_FOR_SALE",
                    //           "isEbook": false
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                    //           "epub": {
                    //             "isAvailable": false
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=58hvDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "Helps readers plumb the beliefs that shape--and often undermine--their spending habits and outlines a program of exercises to help them fulfill their use of their finances."
                    //         }
                    //       },
                    //       {
                    //         "kind": "books#volume",
                    //         "id": "lF3IDwAAQBAJ",
                    //         "etag": "hcNKlhjo0aM",
                    //         "selfLink": "https://www.googleapis.com/books/v1/volumes/lF3IDwAAQBAJ",
                    //         "volumeInfo": {
                    //           "title": "Money",
                    //           "subtitle": "The True Story of a Made-Up Thing",
                    //           "authors": [
                    //             "Jacob Goldstein"
                    //           ],
                    //           "publisher": "Hachette Books",
                    //           "publishedDate": "2020-09-08",
                    //           "description": "The co-host of the popular NPR podcast Planet Money provides a well-researched, entertaining, somewhat irreverent look at how money is a made-up thing that has evolved over time to suit humanity's changing needs. Money only works because we all agree to believe in it. In Money, Jacob Goldstein shows how money is a useful fiction that has shaped societies for thousands of years, from the rise of coins in ancient Greece to the first stock market in Amsterdam to the emergence of shadow banking in the 21st century. At the heart of the story are the fringe thinkers and world leaders who reimagined money. Kublai Khan, the Mongol emperor, created paper money backed by nothing, centuries before it appeared in the west. John Law, a professional gambler and convicted murderer, brought modern money to France (and destroyed the country's economy). The cypherpunks, a group of radical libertarian computer programmers, paved the way for bitcoin. One thing they all realized: what counts as money (and what doesn't) is the result of choices we make, and those choices have a profound effect on who gets more stuff and who gets less, who gets to take risks when times are good, and who gets screwed when things go bad. Lively, accessible, and full of interesting details (like the 43-pound copper coins that 17th-century Swedes carried strapped to their backs), Money is the story of the choices that gave us money as we know it today.",
                    //           "industryIdentifiers": [
                    //             {
                    //               "type": "ISBN_13",
                    //               "identifier": "9780316417181"
                    //             },
                    //             {
                    //               "type": "ISBN_10",
                    //               "identifier": "0316417181"
                    //             }
                    //           ],
                    //           "readingModes": {
                    //             "text": true,
                    //             "image": false
                    //           },
                    //           "pageCount": 272,
                    //           "printType": "BOOK",
                    //           "categories": [
                    //             "Business & Economics"
                    //           ],
                    //           "averageRating": 4,
                    //           "ratingsCount": 2,
                    //           "maturityRating": "NOT_MATURE",
                    //           "allowAnonLogging": true,
                    //           "contentVersion": "1.1.1.0.preview.2",
                    //           "panelizationSummary": {
                    //             "containsEpubBubbles": false,
                    //             "containsImageBubbles": false
                    //           },
                    //           "imageLinks": {
                    //             "smallThumbnail": "http://books.google.com/books/content?id=lF3IDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    //             "thumbnail": "http://books.google.com/books/content?id=lF3IDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    //           },
                    //           "language": "en",
                    //           "previewLink": "http://books.google.com/books?id=lF3IDwAAQBAJ&pg=PP1&dq=money&hl=&cd=10&source=gbs_api",
                    //           "infoLink": "https://play.google.com/store/books/details?id=lF3IDwAAQBAJ&source=gbs_api",
                    //           "canonicalVolumeLink": "https://play.google.com/store/books/details?id=lF3IDwAAQBAJ"
                    //         },
                    //         "saleInfo": {
                    //           "country": "US",
                    //           "saleability": "FOR_SALE",
                    //           "isEbook": true,
                    //           "listPrice": {
                    //             "amount": 14.99,
                    //             "currencyCode": "USD"
                    //           },
                    //           "retailPrice": {
                    //             "amount": 14.99,
                    //             "currencyCode": "USD"
                    //           },
                    //           "buyLink": "https://play.google.com/store/books/details?id=lF3IDwAAQBAJ&rdid=book-lF3IDwAAQBAJ&rdot=1&source=gbs_api",
                    //           "offers": [
                    //             {
                    //               "finskyOfferType": 1,
                    //               "listPrice": {
                    //                 "amountInMicros": 14990000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "retailPrice": {
                    //                 "amountInMicros": 14990000,
                    //                 "currencyCode": "USD"
                    //               },
                    //               "giftable": true
                    //             }
                    //           ]
                    //         },
                    //         "accessInfo": {
                    //           "country": "US",
                    //           "viewability": "PARTIAL",
                    //           "embeddable": true,
                    //           "publicDomain": false,
                    //           "textToSpeechPermission": "ALLOWED",
                    //           "epub": {
                    //             "isAvailable": true,
                    //             "acsTokenLink": "http://books.google.com/books/download/Money-sample-epub.acsm?id=lF3IDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    //           },
                    //           "pdf": {
                    //             "isAvailable": false
                    //           },
                    //           "webReaderLink": "http://play.google.com/books/reader?id=lF3IDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                    //           "accessViewStatus": "SAMPLE",
                    //           "quoteSharingAllowed": false
                    //         },
                    //         "searchInfo": {
                    //           "textSnippet": "At the heart of the story are the fringe thinkers and world leaders who reimagined money. Kublai Khan, the Mongol emperor, created paper money backed by nothing, centuries before it appeared in the west."
                    //         }
                    //       }
                    //     ]
                    //   }

                })
            }
        }
    }

    let search = $('#book-search-input');
    $(search).on('keydown', searchFunc);
    let search2 = $('#book-search-input2');
    $(search2).on('keydown', searchFunc);

});