describe "a game", ->
	game = null
	expectedTempo = 30
	beforeEach ->
		game = new pong.Game(20, 30)
	it "has a tempo of #{expectedTempo}", ->
		expect(game.tempo).toBe expectedTempo
	it "has a ball", ->
		expect(game.ball).toBeDefined
	it "has two bats", ->
		expect(game.bat_right).toBeDefined		
		expect(game.bat_left).toBeDefined