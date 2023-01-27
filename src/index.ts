import P5 from 'p5';
import { sum } from 'mathjs';
import people from './data.json';

window.addEventListener('error', (event) => {
  const { message, error } = event;
  handleError(error || message);
});

try {
  const button = document.getElementById('btn');
  const params1 = document.getElementById('params-1') as HTMLInputElement;
  const params2 = document.getElementById('params-2') as HTMLInputElement;
  const result = document.getElementById('result');

  if (!button || !params1 || !params2 || !result) {
    throw new Error('Missing elements');
  }

  button.addEventListener('click', () => {
    const total = sum([
      ...people.map((person) => person.age),
      parseInt(params1.value, 10),
      parseInt(params2.value, 10),
    ]);

    result.innerHTML = total.toString();
  });
} catch (error) {
  handleError(error);
}

function handleError(error: string | Error) {
  console.error(error);
  const errorDiv = (document.createElement('div').innerHTML = error.toString());
  document.body.append(errorDiv);
}

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800);
    canvas.parent('app');

    p5.background('white');
  };

  p5.draw = () => {
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  };
};

new P5(sketch);
