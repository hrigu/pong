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
	pos = 
		x:20
		y:50
	ball = null
	dx = 3
	dy = 6
	beforeEach ->
		ball = new pong.Ball(new pong.Point(pos.x, pos.y), dx, dy)
		
	it "has the initial position (#{pos})", ->
		expect(ball.pos).toEqual pos
	it "can compute new position, which is (#{pos.x+dx}, #{pos.y+dy})", ->
		ball.compute_new_pos()
		expect(ball.pos.x).toBe pos.x + dx
		expect(ball.pos.y).toBe pos.y + dy
		
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
						ball.x_left = 0
						ball._check_collision_with_border(game)
						expect(ball.dx).toBe dx
						expect(ball.dy).toBe dy
				describe "when touching the right side", ->
					beforeEach ->
						ball.x_right = game.field.width
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
					ball.y_top = 0
					ball._check_collision_with_border(game)
					expect(ball.dy).toBe dy
				it "dy goes negative when touching the bottom", ->
					ball.y_bottom = game.field.height
					ball._check_collision_with_border(game)
					expect(ball.dy).toBe -dy
			describe "the ball touches a bat", ->
				describe "the left bat", ->
					it "dx goes positive and dy keeps the same", ->
						ball.x_left = game.bat_left.x + game.bat_left.width
						ball.dx = -dx
						ball.y_top = 70
						ball.y_bottom = 70
						expect(ball.dx).toBe -dx
						ball._check_collision_with_bats(game)
						expect(ball.dx).toBe dx
						expect(ball.dy).toBe dy
						
				
		