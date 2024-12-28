const tabs = document.querySelectorAll('.tabs li');
const tabsArr = Array.from(tabs);
const content = document.querySelectorAll('.content > div');
const contentArr = Array.from(content);
const spans = document.querySelectorAll('.no');

const add = document.querySelector('.add');
const reset = document.querySelector('.reset');
const freeBtn = document.querySelector('.free');
const count = document.querySelector('.count');

let free = false;

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

//// tabs
tabsArr.forEach(tab => {
  tab.addEventListener('click', function (e) {
    rmvActive();
    e.target.classList.add('active');
    hideContent();
    currentContent = document.querySelector(e.target.dataset.cont);
    currentContent.style.display = 'block';
    span = currentContent.querySelector('.no');
    span.innerHTML = `  عدد التكرار المتبقي: ${span.parentElement.dataset.count}`;
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
  } else {
    spans.forEach(span => {
      freeBtn.innerHTML = 'Free Count Disabled';
      freeBtn.style.backgroundColor = 'red';
      span.style.opacity = 1;
      span.style.visibility = 'visible';
      span.style.height = '25px'
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
    } else {
      counter = 0;
      count.innerHTML = counter;
      if (tabsArr.length - 1 == index) {
        tabsArr[0].click();
      } else {
        tabsArr[index + 1].click();
      }
    }
  } else {
    count.innerHTML = ++counter;
  }
});

////reset
reset.addEventListener('click', function () {
  count.innerHTML = counter = 0;
});
