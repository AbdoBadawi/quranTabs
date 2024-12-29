const tabs = document.querySelectorAll('.tabs li');
const tabsArr = Array.from(tabs);
const content = document.querySelectorAll('.content > div');
const contentArr = Array.from(content);
const spans = document.querySelectorAll('.no');
const progress = document.querySelector('.progress');

const nav = document.querySelector('.nav');
const alpha = document.querySelector('#alpha-range');
const contentColor = document.querySelector('#content-color');
const mainColor = document.querySelector('#main-color');
const changeBackground = document.querySelector('.rand-background');
const defaultSettings = document.querySelector('.default');

const menuBtn = document.querySelector('.bars-icon');
const closeBtn = document.querySelector('.close-btn');
const add = document.querySelector('.add');
const reset = document.querySelector('.reset');
const freeBtn = document.querySelector('.free');
const count = document.querySelector('.count');
const date = document.querySelector('.date');
let free = false;

// local storage

// display date
const now = new Date();
const dateVal = new Intl.DateTimeFormat('ar-eg', {
  hour: '2-digit',
  minute: '2-digit',
  // second: '2-digit',
  month: 'long',
  year: 'numeric',
  day: '2-digit',
  weekday: 'long',
}).format(now);
date.innerHTML = dateVal;

setInterval(function () {
  const now = new Date();
  const dateVal = new Intl.DateTimeFormat('ar-eg', {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    month: 'long',
    year: 'numeric',
    day: '2-digit',
    weekday: 'long',
  }).format(now);
  date.innerHTML = dateVal;
}, 1000);

//// nav
menuBtn.addEventListener('click', function () {
  nav.style.display = 'flex';
});

closeBtn.addEventListener('click', function () {
  nav.style.display = 'none';
});

alpha.addEventListener('change', function () {
  // !fix must set to each content div not the current only
  currentContent.style.backgroundColor = `rgba(30, 36, 44, ${
    this.value / 100
  })`;
});

contentColor.addEventListener('change', function () {
  currentContent.style.backgroundColor = this.value;
});

const listOfImages = [
  'a56d09f97e55a53473e610e749479449.jpg',
  'ancient-ornamented-arches-symbolize-religious-spirituality-in-architecture-generated-by-ai-free-photo.jpg',
  'india-taj-mahal-agra-architecture.jpg',
  'islamic-xptqk5xw6adpezzv.jpg',
  'mosque-6231915_640.jpg',
  'photo-1570206916435-745fc43bb9c1.jpg',
  'pngtree-islamic-festival-title-banner-image_16134790.jpg',
];

changeBackground.addEventListener('click', function () {
  document.body.style.backgroundImage = `url(./${
    listOfImages[Math.floor(Math.random() * listOfImages.length)]
  })`;
  console.log(
    `url(./${listOfImages[Math.floor(Math.random() * listOfImages.length)]})`
  );
});

defaultSettings.addEventListener('click', function () {
  // localStorage.clear()
  // window.location.reload();
  // nav.style.display = 'none'
});

//// tabs
// rmvActive
function rmvActive() {
  tabsArr.forEach(tab => tab.classList.remove('active'));
}
// hide content
function hideContent() {
  contentArr.forEach(div => (div.style.display = 'none'));
}

let currentContent = document.querySelector(tabsArr[0].dataset.cont);
let span = currentContent.querySelector('.no');
span.innerHTML = `  عدد التكرار المتبقي: ${span.parentElement.dataset.count}`;

tabsArr.forEach(tab => {
  tab.addEventListener('click', function (e) {
    rmvActive();
    e.target.classList.add('active');
    hideContent();
    currentContent = document.querySelector(e.target.dataset.cont);
    currentContent.style.display = 'block';
    span = currentContent.querySelector('.no');
    span.innerHTML = `  عدد التكرار المتبقي: ${span.parentElement.dataset.count}`;
    counter = 0;
    count.innerHTML = counter;
    progress.style.width = 0;
  });
});

////free
freeBtn.addEventListener('click', function () {
  free = !free;
  if (free) {
    freeBtn.innerHTML = 'Free Count Enabled';
    freeBtn.style.backgroundColor = 'green';
    spans.forEach(span => {
      span.style.opacity = 0;
      span.style.visibility = 'hidden';
      span.style.height = '0px';
    });
    progress.style.width = 0;
  } else {
    spans.forEach(span => {
      freeBtn.innerHTML = 'Free Count Disabled';
      freeBtn.style.backgroundColor = 'red';
      span.style.opacity = 1;
      span.style.visibility = 'visible';
      span.style.height = '25px';
      span.innerHTML = `  عدد التكرار المتبقي: ${span.parentElement.dataset.count}`;
    });
  }
  counter = 0;
  count.innerHTML = counter;
});

//// add
let counter = 0;
add.addEventListener('click', function () {
  if (!free) {
    let index = Array.from(tabs).findIndex(tab =>
      tab.classList.contains('active')
    );
    if (counter < currentContent.dataset.count) {
      count.innerHTML = ++counter;
      span.innerHTML = `عدد التكرار المتبقي: ${
        span.parentElement.dataset.count - counter
      }`;
      progress.style.width = `${Math.trunc(
        (+count.innerHTML / currentContent.dataset.count) * 100
      )}%`;
    } else {
      counter = 0;
      count.innerHTML = counter;
      if (tabsArr.length - 1 == index) {
        tabsArr[0].click();
      } else {
        tabsArr[index + 1].click();
      }
      progress.style.width = 0;
    }
  } else {
    count.innerHTML = ++counter;
  }
});

////reset
reset.addEventListener('click', function () {
  count.innerHTML = counter = 0;
});
