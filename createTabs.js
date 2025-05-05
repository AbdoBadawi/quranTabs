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
const closeBtn = document.querySelectorAll('.close-btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const infoBtn = document.querySelector('.info-icon');
const copyBtn = document.querySelector('.copy-btn');

const date = document.querySelector('.date');

const add = document.querySelector('.add');
const reset = document.querySelector('.reset');
const freeBtn = document.querySelector('.free');
const count = document.querySelector('.count');

const root = document.documentElement;
let free = false;
let started = false;
// local storage
if (localStorage.getItem('start')) {
  started = localStorage.getItem('start');
}

if (!started) {
  overlay.style.display = 'block';
  modal.style.display = 'block';
  started = !started;
  localStorage.setItem('start', started);
}

if (localStorage.getItem('backgroundImg')) {
  document.body.style.backgroundImage = `url(${localStorage.getItem(
    'backgroundImg'
  )})`;
}

if (localStorage.getItem('alpha')) {
  if (localStorage.getItem('contentColor')) {
    contentArr.forEach(content => {
      content.style.backgroundColor = hexToRgb(
        localStorage.getItem('contentColor')
      );
    });
  } else {
    contentArr.forEach(content => {
      content.style.backgroundColor = `rgba(30, 36, 44, ${
        localStorage.getItem('alpha') / 100
      })`;
    });
  }
  alpha.value = localStorage.getItem('alpha');
} else if (localStorage.getItem('contentColor')) {
  contentArr.forEach(content => {
    content.style.backgroundColor = hexToRgb(contentColor.value);
  });
}

if (localStorage.getItem('mainColor')) {
  root.style.setProperty(
    '--main-color-light',
    localStorage.getItem('mainColor')
  );
}

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
// open and close
menuBtn.addEventListener('click', function () {
  nav.style.display = 'flex';
});

closeBtn.forEach(btn =>
  btn.addEventListener('click', function (e) {
    e.target.parentElement.style.display = 'none';
    overlay.style.display = 'none';
  })
);

overlay.addEventListener('click', function () {
  overlay.style.display = 'none';
  modal.style.display = 'none';
});

infoBtn.addEventListener('click', function () {
  modal.style.display = 'block';
  overlay.style.display = 'block';
});

copyBtn.addEventListener('click', function () {
  navigator.clipboard.writeText(window.location.href);
  this.classList.add('active');
  setTimeout(() => {
    copyBtn.classList.remove('active');
  }, 700);
});

// colors
function hexToRgb(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace('#', '');

  // Ensure hex is 6 characters long (e.g., 'FFFFFF')
  if (hex.length !== 6) {
    throw new Error('Invalid hexadecimal color code.');
  }

  // Extract the red, green, and blue components
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${
    localStorage.getItem('alpha') / 100 || 0.5
  })`;
}

alpha.addEventListener('change', function () {
  localStorage.alpha = this.value;
  if (localStorage.getItem('contentColor')) {
    contentArr.forEach(content => {
      content.style.backgroundColor = hexToRgb(
        localStorage.getItem('contentColor')
      );
    });
  } else {
    contentArr.forEach(content => {
      content.style.backgroundColor = `rgba(30, 36, 44, ${this.value / 100})`;
    });
  }
});

contentColor.addEventListener('change', function () {
  contentArr.forEach(content => {
    content.style.backgroundColor = hexToRgb(contentColor.value);
  });
  localStorage.setItem('contentColor', this.value);
});

mainColor.addEventListener('change', function () {
  root.style.setProperty('--main-color-light', this.value);
  localStorage.setItem('mainColor', this.value);
  // tabsArr.forEach(tab => {
  //   tab.parentElement.style.backgroundColor = this.value;
  //   tab.style.backgroundColor = this.value;
  // });
  // contentArr.forEach(content => {
  //   content.style.borderBottomColor = this.value;
  // });
  // add.style.backgroundColor = this.value;
});

// backgroundImage
const listOfImages = [
  'a56d09f97e55a53473e610e749479449.jpg',
  'ancient-ornamented-arches-symbolize-religious-spirituality-in-architecture-generated-by-ai-free-photo.jpg',
  'india-taj-mahal-agra-architecture.jpg',
  'islamic-xptqk5xw6adpezzv.jpg',
  'mosque-6231915_640.jpg',
  'photo-1509814047455-cfe301a66b2a.jpg',
  'photo-1527838832700-5059252407fa.jpg',
  'photo-1553755088-ef1973c7b4a1.jpg',
  'photo-1554976757-606d486f5d92.jpg',
  'photo-1560601575-29dc7d25ff3b.jpg',
  'photo-1570206916435-745fc43bb9c1.jpg',
  'photo-1574246604907-db69e30ddb97.jpg',
  'photo-1579005162077-541af2cae3e4.jpg',
  'photo-1584650605024-7344812fa167.jpg',
  'photo-1585036156171-384164a8c675.jpg',
  'photo-1587617425953-9075d28b8c46.jpg',
  'photo-1590075865003-e48277faa558.jpg',
  'photo-1600814832809-579119f47045.jpg',
  'photo-1605976528013-638e49b6599f.jpg',
  'photo-1616422840391-fa670d4b2ae7.jpg',
  'photo-1626079313403-7399d1aa95cf.jpg',
  'photo-1712844404689-653e88152472.jpg',
  'photo-1733063166436-e3550c66f9eb.jpg',
  'pngtree-islamic-festival-title-banner-image_16134790.jpg',
];

changeBackground.addEventListener('click', function () {
  let randImg = listOfImages[Math.floor(Math.random() * listOfImages.length)];

  if (localStorage.getItem('backgroundImg')) {
    while (localStorage.getItem('backgroundImg') == randImg) {
      randImg = listOfImages[Math.floor(Math.random() * listOfImages.length)];
    }
  } else {
    while (randImg == 'photo-1570206916435-745fc43bb9c1.jpg') {
      randImg = listOfImages[Math.floor(Math.random() * listOfImages.length)];
    }
  }
  document.body.style.backgroundImage = `url(./${randImg})`;

  localStorage.setItem('backgroundImg', randImg);
});

// reset to default
defaultSettings.addEventListener('click', function () {
  localStorage.clear();
  nav.style.display = 'none';
  window.location.reload();
  // document.body.style.backgroundImage = `url(./photo-1570206916435-745fc43bb9c1.jpg)`;
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
    add.innerHTML = 'Add';
    add.style.backgroundColor =
      localStorage.getItem('mainColor') || 'rgba(27, 41, 67, 0.9)';
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
  add.innerHTML = 'Add';
  add.style.backgroundColor =
    localStorage.getItem('mainColor') || 'rgba(27, 41, 67, 0.9)';
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

      if (counter == currentContent.dataset.count) {
        add.innerHTML = 'Next';
        add.style.backgroundColor = 'green';
      }
    } else {
      add.innerHTML = 'Add';
      add.style.backgroundColor =
        localStorage.getItem('mainColor') || 'rgba(27, 41, 67, 0.9)';
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
  span.innerHTML = `عدد التكرار المتبقي: ${span.parentElement.dataset.count}`;
  count.innerHTML = counter = 0;
  progress.style.width = 0;
  add.innerHTML = 'Add';
  add.style.backgroundColor =
    localStorage.getItem('mainColor') || 'rgba(27, 41, 67, 0.9)';
});
