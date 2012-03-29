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
    y = 50;
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
          width: 500,
          height: 200
        },
        bat_left: {
          x: 5,
          y: 50,
          width: 10,
          length: 30
        },
        bat_right: {
          hits: 0
        }
      };
      return describe("the ball touches the border of the field", function() {
        describe("left and right side: it changes dx", function() {
          describe("when touching the left side", function() {
            return it("dx goes positive and dy keeps the same", function() {
              ball.dx = -dx;
              ball.x = 0 + ball.size / 2 + ball.lineWidth;
              ball._check_collision_with_border(game);
              expect(ball.dx).toBe(dx);
              return expect(ball.dy).toBe(dy);
            });
          });
          return describe("when touching the right side", function() {
            beforeEach(function() {
              ball.x = game.field.width - (ball.size / 2 + ball.lineWidth);
              return game.bat_right.hits = 0;
            });
            it("dx goes negative and dy keeps the same", function() {
              ball._check_collision_with_border(game);
              expect(ball.dx).toBe(-dx);
              return expect(ball.dy).toBe(dy);
            });
            return it("hits of bat_right is one left", function() {
              ball._check_collision_with_border(game);
              return expect(game.bat_right.hits).toBe(-1);
            });
          });
        });
        describe("top and bottom: it changes dy", function() {
          it("dy goes positive when touching the top", function() {
            ball.dy = -dy;
            ball.y = 0 + ball.size / 2 + ball.lineWidth;
            ball._check_collision_with_border(game);
            return expect(ball.dy).toBe(dy);
          });
          return it("dy goes negative when touching the bottom", function() {
            ball.y = game.field.height - (ball.size / 2 + ball.lineWidth);
            ball._check_collision_with_border(game);
            return expect(ball.dy).toBe(-dy);
          });
        });
        return describe("the ball touches a bat", function() {
          return describe("the left bat", function() {
            return it("dx goes positive and dy keeps the same", function() {
              ball.x = game.bat_left.x + game.bat_left.width + (ball.size / 2 + ball.lineWidth);
              ball.dx = -dx;
              ball.y = 70;
              expect(ball.dx).toBe(-dx);
              ball._check_collision_with_bats(game);
              expect(ball.dx).toBe(dx);
              return expect(ball.dy).toBe(dy);
            });
          });
        });
      });
    });
  });

}).call(this);
