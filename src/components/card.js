import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  const divCard = document.createElement('div');
  const divHeadline = document.createElement('div');
  const divAuthor = document.createElement('div');
  const divImage = document.createElement('div');
  const image = document.createElement('img');
  const spanAuthor = document.createElement('span');

  divCard.classList.add('card');
  divHeadline.classList.add('headline');
  divAuthor.classList.add('author');
  divImage.classList.add('img-container');

  divHeadline.textContent = article.headline;
  image.src = article.authorPhoto;
  spanAuthor.textContent = article.authorName;

  divCard.append( divHeadline, divAuthor );
  divAuthor.append( divImage, spanAuthor );
  divImage.appendChild( image );

  divCard.addEventListener('click', () => {
    console.log(divHeadline);
  });
  
  return divCard;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  axios.get('http://localhost:5001/api/articles')
  .then( (res) => {
    const classSelector = document.querySelector(selector);

    const bootstrapArray = res.data.articles.bootstrap;
    const javascriptArray = res.data.articles.javascript;
    const jqueryArray = res.data.articles.jquery;
    const nodeArray = res.data.articles.node;
    const technologyArray = res.data.articles.technology;

    bootstrapArray.forEach( item => {
      classSelector.appendChild(Card(item));
    })
    javascriptArray.forEach( item => {
      classSelector.appendChild(Card(item));
    })
    jqueryArray.forEach( item => {
      classSelector.appendChild(Card(item));
    })
    nodeArray.forEach( item => {
      classSelector.appendChild(Card(item));
    })
    technologyArray.forEach( item => {
      classSelector.appendChild(Card(item));
    })
    return classSelector;
  })
  .catch( () => {
    console.log('error');
  })
  .finally( () => {
    console.log('done');
  })
}

export { Card, cardAppender }
