import Notiflix from "notiflix";



function delayPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

async function createSinglePromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  await delayPromise(delay);

  if (shouldResolve) {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    return { position, delay };
  } else {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    throw { position, delay };
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', async event => {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    try {
      await createSinglePromise(i, delay + (i - 1) * step);
    } catch ({ position, delay }) {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }
});

