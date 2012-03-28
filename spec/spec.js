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

}).call(this);
