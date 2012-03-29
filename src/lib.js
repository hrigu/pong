(function() {

  this.pong = {};

  pong.Game = (function() {

    Game.prototype.tempo = 30;

    Game.prototype.hits_for_winning = 10;

    Game.prototype.winner = null;

    function Game(width, height) {
      this.ball = new pong.Ball(new pong.Point(30, 300), 5, 5);
      this.field = new pong.Field(width, height);
      this.bat_right = new pong.Bat('green', width - 15, height / 2, 40, 38);
      this.bat_left = new pong.Bat('red', 5, height / 2, 89, 65);
    }

    Game.prototype.run_loop = function(context) {
      context.clearRect(0, 0, this.field.width, this.field.height);
      this.field.draw(context);
      this.bat_left.draw(context);
      this.bat_right.draw(context);
      if (!this.winner) {
        this.bat_left.draw(context);
        this.bat_right.draw(context);
        this.ball.draw(context);
        this.ball.check_collision(this);
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

  pong.Ball = (function() {

    function Ball(pos, dx, dy) {
      this.pos = pos;
      this.dx = dx;
      this.dy = dy;
      this.color = "#0000ff";
      this.lineWidth = 2;
      this.r = 6;
      this._compute_boundaries();
    }

    Ball.prototype.check_collision = function(game) {
      this._check_collision_with_bats(game);
      return this._check_collision_with_border(game);
    };

    Ball.prototype._check_collision_with_bats = function(game) {
      var bat;
      if (this.dx > 0) {
        bat = game.bat_right;
        if (this.x_right > bat.x && this.y_top > bat.y && this.y_bottom < (bat.y + bat.length)) {
          this._update(bat);
        }
      }
      if (this.dx < 0) {
        bat = game.bat_left;
        if (this.x_left <= (bat.x + bat.width) && this.y_top >= bat.y && this.y_bottom <= (bat.y + bat.length)) {
          return this._update(bat);
        }
      }
    };

    Ball.prototype._check_collision_with_border = function(game) {
      if (this.x_left <= 0) {
        this.dx = -this.dx;
        this.color = "#0000ff";
      }
      if (this.x_right >= game.field.width) {
        game.bat_right.hits--;
        this.dx = -this.dx;
        this.color = "#0000ff";
      }
      if (this.y_top <= 0 || this.y_bottom >= game.field.height) {
        return this.dy = -this.dy;
      }
    };

    Ball.prototype._update = function(bat) {
      this.dx = -this.dx;
      this.color = bat.color;
      return bat.hits++;
    };

    Ball.prototype.compute_new_pos = function() {
      this.pos.x += this.dx;
      this.pos.y += this.dy;
      return this._compute_boundaries();
    };

    Ball.prototype._compute_boundaries = function() {
      this.x_left = this.pos.x - this.r;
      this.x_right = this.pos.x + this.r;
      this.y_top = this.pos.y - this.r;
      return this.y_bottom = this.pos.y + this.r;
    };

    Ball.prototype.draw = function(context) {
      context.beginPath();
      context.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, true);
      context.closePath();
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      return context.stroke();
    };

    return Ball;

  })();

  pong.Bat = (function() {

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

    Bat.prototype.draw = function(context) {
      if (this.upPressed) this.y -= 5;
      if (this.downPressed) this.y += 5;
      context.fillStyle = 'rgba(0,0,0,0.8)';
      context.fillRect(this.x, this.y, this.width, this.length);
      return this.draw_text(context);
    };

    Bat.prototype.draw_text = function(context) {
      context.fillStyle = this.color;
      context.font = "15pt Calibri";
      context.textBaseline = 'top';
      return context.fillText(this.hits, this.x, 5);
    };

    return Bat;

  })();

  pong.Field = (function() {

    function Field(width, height) {
      this.width = width;
      this.height = height;
    }

    Field.prototype.draw = function(context) {
      context.beginPath();
      context.rect(0, 0, this.width, this.height);
      context.closePath();
      context.strokeStyle = 'rgba(0,0,0,0.8)';
      context.lineWidth = 2;
      return context.stroke();
    };

    return Field;

  })();

  pong.Point = (function() {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    return Point;

  })();

}).call(this);
