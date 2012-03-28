(function() {

  describe("a game", function() {
    var expectedTempo, game;
    game = null;
    expectedTempo = 30;
    beforeEach(function() {
      return game = new pong.Game(20, 30);
    });
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

}).call(this);
