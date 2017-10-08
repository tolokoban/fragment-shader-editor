"use strict";

var $ = require("dom");
var Err = require("tfw.message").error;
var Modal = require("wdg.modal");
var Button = require("wdg.button");
var Resize = require("webgl.resize");
var Program = require("webgl.program");
var Storage = require("tfw.storage").local;
var FloatingButton = require("wdg.floating-button");

var gl;
var g_buff;


exports.start = function() {
  var canvas = document.createElement( "canvas" );
  document.body.appendChild( canvas );

  var fb = new FloatingButton({ icon: "edit" });
  document.body.appendChild( fb.element );
  fb.on( onEdit );

  gl = getContext( canvas );
  var prg = init( gl );

  var anim = function( time ) {
    requestAnimationFrame( anim );

    Resize( gl, 1 );

    prg.use();
    prg.$uniWidth = canvas.clientWidth;
    prg.$uniHeight = canvas.clientHeight;
    prg.$t = time * 0.001;

    prg.bindAttribs( g_buff, "attPos" );
    gl.bindBuffer( gl.ARRAY_BUFFER, g_buff );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  };
  requestAnimationFrame( anim );
};


function init( gl ) {
  var data = new Float32Array([ -1, 1, 1, 1, -1, -1, 1, -1 ]);
  g_buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, g_buff );
  gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );

  GLOBAL.frag = Storage.get("fragment-shader", GLOBAL.frag);
  return new Program( gl, GLOBAL );
}


function getContext( canvas ) {
  console.info( "Creation of context for WebGL 2.0" );
  var gl = canvas.getContext("webgl2", {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfPerformanceCaveat: false
  });
  if( !gl ) {
    console.warn( "Fallback to WebGL 1.0" );
    gl = canvas.getContext("webgl", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      failIfPerformanceCaveat: false
    });
  }
  return gl;
}


function onEdit() {
  var btnCancel = Button.Cancel();
  var btnSave = Button.Save();
  var area = $.tag( "textarea", {
    cols: 80, rows: 40
  } );
  area.value = GLOBAL.frag;

  var modal = new Modal({
    header: "Fragment shader",
    footer: [btnCancel, btnSave],
    content: area
  });

  btnCancel.on( modal.detach.bind( modal ) );
  btnSave.on( function() {
    var frag = area.value;
    var prg;
    try {
      prg = new Program( gl, { vert: GLOBAL.vert, frag: frag } );
    }
    catch(ex) { 
      console.info("[main] ex=", ex);
      prg = null; 
    }
    if( !prg ) {
      Err( "There is a syntax error! Please look at your console." );
    } else {
      Storage.set( "fragment-shader", frag );
      location.reload();
    }
  });

  modal.attach();

  setTimeout(function() {
    area.focus();
  });
}
