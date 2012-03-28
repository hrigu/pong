(function() {

  describe("game", function() {
    var game;
    game = null;
    beforeEach(function() {
      return game = new pong.Game(20, 30);
    });
    describe("a new game", function() {
      var expectedTempo;
      expectedTempo = 30;
      it("has a tempo of " + expectedTempo, function() {
        return expect(game.tempo).toBe(expectedTempo);
      });
      it("has a ball", function() {
        return expect(game.ball).toBeDefined;
      });
      return it("has two bats", function() {
        expect(game.bat_right).toBeDefined;
        return expect(game.bat_left).toBeDefined;
      });
    });
    return describe("the run-loop", function() {
      return it("works", function() {
        var mockedContext;
        mockedContext = jasmine.createSpyObj('mockedContext', ['clearRect', 'beginPath', 'closePath', 'rect', 'stroke', 'fillRect', 'fillText', 'arc']);
        game.run_loop(mockedContext);
        expect(mockedContext.clearRect).toHaveBeenCalled();
        return expect(mockedContext.beginPath).toHaveBeenCalled();
      });
    });
  });

  describe("Ball", function() {
    var ball, dx, dy, x, y;
    ball = null;
    x = 20;
    y = 20;
    dx = 3;
    dy = 6;
    beforeEach(function() {
      ball = new pong.Ball();
      ball.x = x;
      ball.y = y;
      ball.dx = dx;
      return ball.dy = dy;
    });
    it("has the initial position (" + x + ", " + y + ")", function() {
      expect(ball.x).toBe(x);
      return expect(ball.y).toBe(y);
    });
    it("can compute new position, which is (" + (x + dx) + ", " + (y + dy) + ")", function() {
      ball.compute_new_pos();
      expect(ball.x).toBe(x + dx);
      return expect(ball.y).toBe(y + dy);
    });
    return describe("collision detection", function() {
      var game;
      game = {
        field: {
          width: 200,
          length: 200
        },
        bat_right: {
          hits: 0
        }
      };
      describe("the ball touches the left of the field", function() {
        beforeEach(function() {
          ball = new pong.Ball();
          ball.x = 0 + ball.size / 2 + ball.lineWidth;
          ball.y = y;
          ball.dx = dx;
          return ball.dy = dy;
        });
        return it("changes dx: changes sign", function() {
          ball._check_collision_with_border(game);
          return expect(ball.dx).toBe(-dx);
        });
      });
      return describe("the ball touches the top of the field", function() {
        beforeEach(function() {
          ball = new pong.Ball();
          ball.x = x;
          ball.y = 0 + ball.size / 2 + ball.lineWidth;
          ball.dx = dx;
          return ball.dy = -dy;
        });
        return it("changes dy: goes positive (" + dy + ")", function() {
          ball._check_collision_with_border(game);
          return expect(ball.dy).toBe(dy);
        });
      });
    });
  });

}).call(this);
