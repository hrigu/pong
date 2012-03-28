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
			
describe "Ball", ->
	ball = null
	x = 20
	y = 20
	dx = 3
	dy = 6
	beforeEach ->
		ball = new pong.Ball()
		ball.x = x
		ball.y = y
		ball.dx = dx
		ball.dy = dy
		
	it "has the initial position (#{x}, #{y})", ->
		expect(ball.x).toBe x
		expect(ball.y).toBe y
	it "can compute new position, which is (#{x+dx}, #{y+dy})", ->
		ball.compute_new_pos()
		expect(ball.x).toBe x + dx
		expect(ball.y).toBe y + dy
	describe "collision detection", ->
		game = 
			field:
				width:200
				length:200
			bat_right:
				hits:0
		describe "the ball touches the left of the field", ->
			beforeEach ->
				ball = new pong.Ball()
				ball.x = 0 + ball.size / 2 + ball.lineWidth
				ball.y = y
				ball.dx = dx
				ball.dy = dy
			it "changes dx: changes sign", ->
				ball._check_collision_with_border(game)
				expect(ball.dx).toBe -dx
				
		describe "the ball touches the top of the field", ->
			beforeEach ->
				ball = new pong.Ball()
				ball.x = x
				ball.y = 0 + ball.size / 2 + ball.lineWidth
				ball.dx = dx
				ball.dy = -dy
			it "changes dy: goes positive (#{dy})", ->
				ball._check_collision_with_border(game)
				expect(ball.dy).toBe dy
		