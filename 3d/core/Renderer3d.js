
// import Canvas2d from '../../shared/Canvas2d';

import * as THREE from 'three';
// import {FirstPersonControls} from './FPSControls.js';
//
// console.log(FirstPersonControls);

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
    this.camera.position.set(2500, 2500, 4000);
    this.camera.lookAt( new THREE.Vector3(2500,2500, 0) );
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.controls = new THREE.FirstPersonControls(this.camera);

    this.controls.movementSpeed = 1000;
    this.controls.lookSpeed = 0.125;
    this.controls.lookVertical = true;
    this.controls.constrainVertical = true;
    this.controls.verticalMin = 1.1;
    this.controls.verticalMax = 2.2;

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

    this.controls.update(this.clock.getDelta());

    let t1 = performance.now();
    //
    let voxCounter = 0;

    for (let z=0; z<this.size; z++)
    {
      for (let y=0; y<this.size; y++)
      {
        for (let x=0; x<this.size; x++)
        {
          if (data[z][y][x])
          {
            //let col = data[y][x].shader();

            if (data[z][y][x] === 1)
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
              this.voxels[voxCounter].position.set(x * this.scale, y * this.scale, z * this.scale);

              voxCounter++;

              // let v = new THREE.Mesh(this.cube, this.cubeMat);
              // v.position.set(x * this.scale, y * this.scale, 0);
              // this.scene.add(v);
              // v.visible = true;
            }
          }
        }
      }
    }

    console.log("Num scene objs: ", this.scene.children.length);
    // console.log("Setup time: ", performance.now() - t1);

    // hide remaining voxels in our pool;

    for (let t=voxCounter; t<this.voxels.length; t++)
    {
      this.voxels[t].visible = false;
    }

    this.renderer.render(this.scene, this.camera);
  }

}


THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', - 1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}

	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = true; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = true; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

		}

	};

	this.update = function( delta ) {

		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

		this.lon += this.mouseX * actualLookSpeed;
		if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( targetPosition );

	};

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	this.handleResize();

};
