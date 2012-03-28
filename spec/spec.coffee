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
		class MockedContext
			beginPath: -> "toBeSpied"
			closePath: -> "toBeSpied"
			clearRect: -> "mocked"
			rect: (a, b, c, d) -> "mocked"
			stroke: -> "mocked"		
			fillRect: (a, b, c, d) -> "mocked"
			fillText: (text, x, y) -> "mocked"
			arc: (a, b, c, d, e, f) -> "mocked"		
		it "works", ->
			context = jasmine.createSpyObj('mockedContext', ['clearRect', 'beginPath', 'closePath', 'rect', 'stroke', 'fillRect', 'fillText', 'arc'])#new MockedContext()
			#spyOn(context, 'clearRect')

			game.run_loop(context)
			expect(context.clearRect).toHaveBeenCalled();
			expect(context.beginPath).toHaveBeenCalled();