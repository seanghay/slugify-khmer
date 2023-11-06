import { slugify } from 'slugify-khmer'
import fileUrl from './khmerdict.txt?url'
import './style.css'

const el = {
  input: document.querySelector("#input"),
  output: document.querySelector("#output"),
  test: document.querySelector('#test'),
  result: document.querySelector('#result'),
}

async function main() {
  const res = await fetch(fileUrl);
  const text = await res.text();
  const words = text.split('\n')
    .map(it => it.trim())
    .filter(Boolean);

  let fps = 1;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

  const run = () => {
    const sampled = words[Math.floor(Math.random() * (words.length))]
    el.input.textContent = sampled;
    el.output.textContent = slugify(sampled);
  }

  function frame() {
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      run()
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame)
  run()

  el.test.addEventListener('input', () => {
    el.result.value = slugify(el.test.value); 
  })
}

main();