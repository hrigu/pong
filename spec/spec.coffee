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
	y = 50
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
				width:500
				height:200
			bat_left:
				x: 5
				y:50
				width: 10
				length: 30
				
				
			bat_right:
				hits:0
		describe "the ball touches the border of the field", ->
			describe "left and right side: it changes dx", ->
				describe "when touching the left side", ->
					it "dx goes positive and dy keeps the same", ->
						ball.dx = -dx
						ball.x = 0 + ball.size / 2 + ball.lineWidth
						ball._check_collision_with_border(game)
						expect(ball.dx).toBe dx
						expect(ball.dy).toBe dy
				describe "when touching the right side", ->
					beforeEach ->
						ball.x = game.field.width - (ball.size / 2 + ball.lineWidth)
						game.bat_right.hits = 0
					it "dx goes negative and dy keeps the same", ->
						ball._check_collision_with_border(game)
						expect(ball.dx).toBe -dx
						expect(ball.dy).toBe dy
					it "hits of bat_right is one left", ->
						ball._check_collision_with_border(game)
						expect(game.bat_right.hits).toBe -1
			
			describe "top and bottom: it changes dy", ->
				it "dy goes positive when touching the top", ->
					ball.dy = -dy
					ball.y = 0 + ball.size / 2 + ball.lineWidth
					ball._check_collision_with_border(game)
					expect(ball.dy).toBe dy
				it "dy goes negative when touching the bottom", ->
					ball.y = game.field.height - (ball.size / 2 + ball.lineWidth)
					ball._check_collision_with_border(game)
					expect(ball.dy).toBe -dy
			describe "the ball touches a bat", ->
				describe "the left bat", ->
					it "dx goes positive and dy keeps the same", ->
						ball.x = game.bat_left.x + game.bat_left.width + (ball.size / 2 + ball.lineWidth)
						ball.dx = -dx
						ball.y = 70
						expect(ball.dx).toBe -dx
						ball._check_collision_with_bats(game)
						expect(ball.dx).toBe dx
						expect(ball.dy).toBe dy
						
				
		