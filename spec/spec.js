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
    var ball, dx, dy, pos;
    pos = {
      x: 20,
      y: 50
    };
    ball = null;
    dx = 3;
    dy = 6;
    beforeEach(function() {
      return ball = new pong.Ball(new pong.Point(pos.x, pos.y), dx, dy);
    });
    it("has the initial position (" + pos + ")", function() {
      return expect(ball.pos).toEqual(pos);
    });
    it("can compute new position, which is (" + (pos.x + dx) + ", " + (pos.y + dy) + ")", function() {
      ball.compute_new_pos();
      expect(ball.pos.x).toBe(pos.x + dx);
      return expect(ball.pos.y).toBe(pos.y + dy);
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
              ball.x_left = 0;
              ball._check_collision_with_border(game);
              expect(ball.dx).toBe(dx);
              return expect(ball.dy).toBe(dy);
            });
          });
          return describe("when touching the right side", function() {
            beforeEach(function() {
              ball.x_right = game.field.width;
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
            ball.y_top = 0;
            ball._check_collision_with_border(game);
            return expect(ball.dy).toBe(dy);
          });
          return it("dy goes negative when touching the bottom", function() {
            ball.y_bottom = game.field.height;
            ball._check_collision_with_border(game);
            return expect(ball.dy).toBe(-dy);
          });
        });
        return describe("the ball touches a bat", function() {
          return describe("the left bat", function() {
            return it("dx goes positive and dy keeps the same", function() {
              ball.x_left = game.bat_left.x + game.bat_left.width;
              ball.dx = -dx;
              ball.y_top = 70;
              ball.y_bottom = 70;
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
