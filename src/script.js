(function() {
  var context, game, getCanvas, run_loop;

  game = null;

  context = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    context = canvas.getContext('2d');
    game = new pong.Game(canvas.width, canvas.height);
    return setInterval(run_loop, game.tempo);
  });

  run_loop = function() {
    return game.run_loop(context);
  };

  getCanvas = function() {
    return $("#myCanvas")[0];
  };

}).call(this);
