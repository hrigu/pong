(function() {
  var Ball, Bat, Field, Game, context, game, getCanvas, run_loop;

  game = null;

  context = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    context = canvas.getContext('2d');
    game = new Game(canvas.width, canvas.height);
    return setInterval(run_loop, game.tempo);
  });

  run_loop = function() {
    return game.run_loop();
  };

  getCanvas = function() {
    return $("#myCanvas")[0];
  };

  Game = (function() {

    Game.prototype.tempo = 30;

    Game.prototype.hits_for_winning = 10;

    Game.prototype.winner = null;

    function Game(width, height) {
      this.ball = new Ball();
      this.field = new Field(width, height);
      this.bat_right = new Bat('green', width - 15, height / 2, 40, 38);
      this.bat_left = new Bat('red', 5, height / 2, 89, 65);
    }

    Game.prototype.run_loop = function() {
      context.clearRect(0, 0, this.field.width, this.field.height);
      this.field.draw();
      this.bat_left.draw();
      this.bat_right.draw();
      if (!this.winner) {
        this.bat_left.draw();
        this.bat_right.draw();
        this.ball.draw();
        this.ball.check_collision(game);
        this.ball.compute_new_pos();
        if (this.bat_left.hits >= this.hits_for_winning) {
          this.winner = this.bat_left;
        }
        if (this.bat_right.hits >= this.hits_for_winning) {
          return this.winner = this.bat_right;
        }
      } else {
        context.font = "30pt Calibri";
        context.fillStyle = "" + this.winner.color;
        context.textBaseline = 'top';
        return context.fillText("The winner is " + this.winner.color + "!", 20, this.field.height / 2 - 30);
      }
    };

    return Game;

  })();

  Ball = (function() {

    function Ball() {}

    Ball.prototype.color = "#0000ff";

    Ball.prototype.size = 5;

    Ball.prototype.lineWidth = 2;

    Ball.prototype.x = 30;

    Ball.prototype.y = 300;

    Ball.prototype.dx = 5;

    Ball.prototype.dy = 5;

    Ball.prototype.x_left = function() {
      return this.x - this.size - this.lineWidth;
    };

    Ball.prototype.x_right = function() {
      return this.x + this.size + this.lineWidth;
    };

    Ball.prototype.y_low = function() {
      return this.y - this.size - this.lineWidth;
    };

    Ball.prototype.y_high = function() {
      return this.y + this.size + this.lineWidth;
    };

    Ball.prototype.check_collision = function(game) {
      var bat;
      if (this.dx > 0) {
        bat = game.bat_right;
        if (this.x_right() > bat.x && this.y_low() > bat.y && this.y_high() < (bat.y + bat.length)) {
          this._update(bat);
        }
      }
      if (this.dx < 0) {
        bat = game.bat_left;
        if (this.x_left() < bat.x + bat.width && this.y_low() > bat.y && this.y_high() < (bat.y + bat.length)) {
          this._update(bat);
        }
      }
      if (this.x_left() < 0) {
        this.dx = -this.dx;
        this.color = "#0000ff";
      }
      if (this.x_right() > game.field.width) {
        game.bat_right.hits--;
        this.dx = -this.dx;
        this.color = "#0000ff";
      }
      if (this.y_low() < 0 || this.y_high() > game.field.height) {
        return this.dy = -this.dy;
      }
    };

    Ball.prototype._update = function(bat) {
      this.dx = -this.dx;
      this.color = bat.color;
      return bat.hits++;
    };

    Ball.prototype.compute_new_pos = function() {
      this.x += this.dx;
      return this.y += this.dy;
    };

    Ball.prototype.draw = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
      context.closePath();
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      return context.stroke();
    };

    return Ball;

  })();

  Bat = (function() {

    Bat.prototype.width = 10;

    Bat.prototype.length = 80;

    Bat.prototype.hits = 0;

    function Bat(color, x, y, keynum_down, keynum_up) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.keynum_down = keynum_down;
      this.keynum_up = keynum_up;
      this.addKeyObservers();
    }

    Bat.prototype.addKeyObservers = function() {
      var _this = this;
      document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
          case _this.keynum_down:
            return _this.downPressed = true;
          case _this.keynum_up:
            return _this.upPressed = true;
        }
      }, false);
      return document.addEventListener('keyup', function(e) {
        switch (e.keyCode) {
          case _this.keynum_down:
            return _this.downPressed = false;
          case _this.keynum_up:
            return _this.upPressed = false;
        }
      }, false);
    };

    Bat.prototype.draw = function() {
      if (this.upPressed) this.y -= 5;
      if (this.downPressed) this.y += 5;
      context.fillStyle = 'rgba(0,0,0,0.8)';
      context.fillRect(this.x, this.y, this.width, this.length);
      return this.draw_text();
    };

    Bat.prototype.draw_text = function() {
      context.fillStyle = this.color;
      context.font = "15pt Calibri";
      context.textBaseline = 'top';
      return context.fillText(this.hits, this.x, 5);
    };

    return Bat;

  })();

  Field = (function() {

    function Field(width, height) {
      this.width = width;
      this.height = height;
    }

    Field.prototype.draw = function() {
      context.beginPath();
      context.rect(0, 0, this.width, this.height);
      context.closePath();
      context.strokeStyle = 'rgba(0,0,0,0.8)';
      context.lineWidth = 2;
      return context.stroke();
    };

    return Field;

  })();

}).call(this);
