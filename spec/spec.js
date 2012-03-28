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
      var MockedContext;
      MockedContext = (function() {

        function MockedContext() {}

        MockedContext.prototype.beginPath = function() {
          return "toBeSpied";
        };

        MockedContext.prototype.closePath = function() {
          return "toBeSpied";
        };

        MockedContext.prototype.clearRect = function() {
          return "mocked";
        };

        MockedContext.prototype.rect = function(a, b, c, d) {
          return "mocked";
        };

        MockedContext.prototype.stroke = function() {
          return "mocked";
        };

        MockedContext.prototype.fillRect = function(a, b, c, d) {
          return "mocked";
        };

        MockedContext.prototype.fillText = function(text, x, y) {
          return "mocked";
        };

        MockedContext.prototype.arc = function(a, b, c, d, e, f) {
          return "mocked";
        };

        return MockedContext;

      })();
      return it("works", function() {
        var context;
        context = jasmine.createSpyObj('mockedContext', ['clearRect', 'beginPath', 'closePath', 'rect', 'stroke', 'fillRect', 'fillText', 'arc']);
        game.run_loop(context);
        expect(context.clearRect).toHaveBeenCalled();
        return expect(context.beginPath).toHaveBeenCalled();
      });
    });
  });

}).call(this);
