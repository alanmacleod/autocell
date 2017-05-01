
// import Canvas2d from '../../shared/Canvas2d';

import * as THREE from 'three';

export default class Renderer3d
{
  constructor(options)
  {
    // data set extent (not sure this applie to OpenWorld)
    this.size = options.size;
    this.renderElement = typeof options.render == 'string' ? document.getElementById(options.render) : options.render;
    this.scale = options.scale || 1;
    [this.width, this.height] = [0, 0];

    this.cube = null;
    this.cubeMat = null;
    this.init();

    this.voxels = [];
  }

  init()
  {
    [this.width, this.height] = [this.renderElement.clientWidth, this.renderElement.clientHeight];

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.set(2500, 2500, 8000);
    this.camera.lookAt( new THREE.Vector3(2500,2500, 0) );
    this.scene = new THREE.Scene();

    this.ambientLight = new THREE.AmbientLight(0x808080);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.position.set(1, 0.75, 0.5 ).normalize();
    this.scene.add(this.directionalLight);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderElement.appendChild(this.renderer.domElement);

    this.cube = new THREE.BoxGeometry(this.scale, this.scale, this.scale);
    this.cubeMat = new THREE.MeshLambertMaterial({color: 0xff00ff });

    document.addEventListener( 'keydown', this.keyDown.bind(this), false );
    document.addEventListener( 'keyup', this.keyUp, false );

    // for (let t=0; t< 500; t++)
    // {
    //   let v = new THREE.Mesh(this.cube, this.cubeMat);
    //   let [x, y, z] = [Math.floor(Math.random() * 100),
    //     Math.floor(Math.random() * 100),
    //     Math.floor(Math.random() * 100)
    //   ];
    //   v.position.set(x*50,y*50,0);
    //   if (t > 45)
    //   //console.log(v);
    //
    //   this.scene.add(v);
    // }
    //
    // this.render();
  }

  keyDown(e)
  {
    switch (e.keyCode)
    {
      case 40:
        this.camera.position.add(new THREE.Vector3(0,0,100));
        break;
      case 38:
        this.camera.position.add(new THREE.Vector3(0,0,-100));
        break;
    }
  }

  keyUp(e)
  {

  }


  resize(w, h)
  {
    // this.canvas2d.resize(w, h);
    // this.canvas2d.clear();
  }

  render(data)
  {
    if (data.length != this.size)
    {
      //this.size = data.length;
      console.log("derp"); return;
      //this.resize(this.size * this.scale, this.size * this.scale);
    }

    let voxCounter = 0;

    for (let y=0; y<this.size; y++)
    {
      for (let x=0; x<this.size; x++)
      {
        if (data[y][x])
        {
          let col = data[y][x].shader();
          if (col)
          {
            // Visible voxel!
            if (voxCounter > (this.voxels.length-1))
            {
              let v = new THREE.Mesh(this.cube, this.cubeMat);
              //v.position.set(x * this.scale, y * this.scale, 0);
              this.scene.add(v);
              this.voxels.push(v);
            }
            this.voxels[voxCounter].visible = true;
            this.voxels[voxCounter].position.set(x * this.scale, y * this.scale, 0);

            voxCounter++;

            // let v = new THREE.Mesh(this.cube, this.cubeMat);
            // v.position.set(x * this.scale, y * this.scale, 0);
            // this.scene.add(v);
            // v.visible = true;
          }
        }
      }
    }

    //console.log("Num scene objs: ", this.scene.children.length);

    // hide remaining voxels in our pool;

    for (let t=voxCounter; t<this.voxels.length; t++)
    {
      this.voxels[t].visible = false;
    }

    this.renderer.render(this.scene, this.camera);
  }

}
