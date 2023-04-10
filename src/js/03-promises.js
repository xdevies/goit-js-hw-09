import Notiflix from "notiflix";


function delayPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

function createSinglePromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return delayPromise(delay).then(() => {
    if (shouldResolve) {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      return { position, delay };
    } else {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      throw { position, delay };
    }
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  if (delay < 0 || step < 0 || amount < 0) {
    console.log('Values should be greater than zero.');
    return;
  }

  const promises = Array.from({ length: amount }, (_, i) =>
    createSinglePromise(i + 1, delay + i * step)
  );

  Promise.allSettled(promises)
    .then(results => {
      ('All promises settled:', results);
    })
    .catch(error => {
      ('Error:', error);
    });
});





