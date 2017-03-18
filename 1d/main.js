
// Interesting rules: 30, 45, 90, 110

import Canvas2d     from '../src/Canvas2d';
import Generation   from './Generation';
import Rule         from './Rule';
import Renderer1d   from './Renderer';

let renderer, iterations, worldSize, rule;

let c = new Canvas2d("content");
c.fitwindow();


Init();
Evolve();


function Init()
{
  let [ts, tr] = [ document.getElementById("txtSize"),
                   document.getElementById("txtRule") ];
  // clamp values into range
  let s = Math.max(Math.min(ts.value, 32),1);
  let r = Math.max(Math.min(tr.value, 255),1);

  [ts.value, tr.value] = [s, r];

  renderer = new Renderer1d(c, s);
  rule = new Rule(r);

  worldSize = Math.floor(c.width() / s);
  iterations = Math.floor(c.height() / s);
}

function Evolve()
{
  c.fitwindow();
  c.clear();

  let g = new Generation(worldSize);

  renderer.render(g, 0);

  for (let i=1; i<iterations; i++)
  {
    g = g.mutate(rule);
    renderer.render(g, i);
  }

}


document.getElementById("btnRun").onclick = () => {
  Init();
  Evolve();
}


window.onresize = (e) => {
  Init();
  Evolve();
}


// hello
