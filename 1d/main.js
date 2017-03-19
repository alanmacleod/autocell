
// Interesting rules: 30, 45, 90, 110

import Canvas2d     from '../src/Canvas2d';
import Generation   from './Generation';
import Rule         from './Rule';
import Renderer1d   from './Renderer';

let renderer, worldSize, rule, timer = null;

let c = new Canvas2d("content");
c.fitwindow();

Restart();


function Restart()
{
  Init();
  Evolve();
}

function Init()
{
  let [ts, tr] = [ document.getElementById("txtSize"),
                   document.getElementById("txtRule") ];
  // clamp values into range
  let s = Math.max(Math.min(ts.value, 32),1);
  let r = Math.max(Math.min(tr.value, 255),1);

  s = isNaN(s) ? 4 : s;
  r = isNaN(r) ? 90: r;

  [ts.value, tr.value] = [s, r];

  renderer = new Renderer1d(c, s);
  rule = new Rule(r);

  worldSize = Math.floor(c.width() / s);

  if (timer) window.clearInterval(timer);

  c.clear();
}


function Evolve()
{
  c.fitwindow();
  c.clear();

  // Create the first generation
  let g = new Generation(worldSize);

  let iteration = 0;
  // Render first gen now
  renderer.render(g, iteration++);

  // For 2d+ version use requestAnimationFrame()
  timer = window.setInterval(() => {

    // Mutate the last generation into a new one
    g = g.mutate(rule);
    renderer.render(g, iteration++);

  }, 25);

}


document.getElementById("btnRun").onclick = () => {
  Restart();
}


window.onresize = (e) => {
  Restart();
}
