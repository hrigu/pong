describe "game", ->
	game = null
	beforeEach ->
		game = new pong.Game(20, 30)

	describe "a new game", ->
		expectedTempo = 30
		it "has a tempo of #{expectedTempo}", ->
			expect(game.tempo).toBe expectedTempo
		it "has a ball", ->
			expect(game.ball).toBeDefined
		it "has two bats", ->
			expect(game.bat_right).toBeDefined		
			expect(game.bat_left).toBeDefined
	describe "the run-loop", ->
		it "works", ->
			mockedContext = jasmine.createSpyObj('mockedContext', ['clearRect', 'beginPath', 'closePath', 'rect', 'stroke', 'fillRect', 'fillText', 'arc'])#new MockedContext()
			game.run_loop(mockedContext)
			expect(mockedContext.clearRect).toHaveBeenCalled();
			expect(mockedContext.beginPath).toHaveBeenCalled();