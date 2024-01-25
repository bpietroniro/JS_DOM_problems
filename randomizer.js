function randomizer(...callbacks) {
  const maxTime = 2 * callbacks.length;

  let secondsCount = 0;
  const counter = setInterval(() => {
    secondsCount += 1;
    console.log(secondsCount);
    if (secondsCount >= maxTime) clearInterval(counter);
  }, 1000);

  callbacks.forEach(callback => {
    let delay = Math.random() * maxTime * 1000;
    setTimeout(callback, delay);
  });
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);
