this.pong = {}	
class pong.Game
	tempo: 30
	hits_for_winning: 10
	winner: null
	constructor: (width, height) ->		
		@ball = new pong.Ball()
		@field = new pong.Field(width, height)
		@bat_right = new pong.Bat('green', width - 15, height / 2, 40, 38)
		@bat_left = new pong.Bat('red', 5, height / 2, 89, 65)

	run_loop: (context) ->
		context.clearRect(0, 0, @field.width, @field.height)
		@field.draw(context)
		@bat_left.draw(context)	
		@bat_right.draw(context)	
		if (! @winner)
			@bat_left.draw(context)	
			@bat_right.draw(context)	
			@ball.draw(context)
			@ball.check_collision(this)
			@ball.compute_new_pos()
			@winner = @bat_left if (@bat_left.hits >= @hits_for_winning)
			@winner = @bat_right if (@bat_right.hits >= @hits_for_winning)
		else 
			context.font         = "30pt Calibri" 
			context.fillStyle    = "#{@winner.color}"
			context.textBaseline = 'top'
			context.fillText("The winner is #{@winner.color}!", 20, @field.height / 2-30)
class pong.Ball
	color: "#0000ff"
	size: 6, lineWidth: 2
	x: 30, y: 300
	dx: 5, dy: 5
	
	x_left: -> @x - (@size / 2 + @lineWidth)
	x_right: -> @x + @size / 2 + @lineWidth
	y_top: -> @y - (@size / 2 + @lineWidth)
	y_bottom: -> @y + @size / 2 + @lineWidth		
	
	
	check_collision: (game) ->
		@_check_collision_with_bats(game)
		@_check_collision_with_border(game)	
	

	_check_collision_with_bats: (game) ->
		if (@dx > 0)
			bat = game.bat_right
			if (@x_right() > bat.x && @y_top() > bat.y && @y_bottom() < (bat.y + bat.length)) 		
				@_update(bat) 
		if (@dx < 0)
			bat = game.bat_left
			x_left =  @x_left() 
			y_top = @y_top()
			y_bottom = @y_bottom()
			if (x_left<= (bat.x + bat.width) && y_top >= bat.y && y_bottom <= (bat.y + bat.length)) 		
				@_update(bat)
							
	_check_collision_with_border: (game) ->
		if (@x_left() <= 0) 
			@dx = -@dx
			@color = "#0000ff"
		if (@x_right() >= game.field.width)
			game.bat_right.hits--
			@dx = -@dx
			@color = "#0000ff"
		if (@y_top() <= 0 || @y_bottom() >= game.field.height) 
			@dy = -@dy
				
	_update: (bat) ->				
		@dx = -@dx
		@color = bat.color
		bat.hits++
		
	compute_new_pos: () ->
		@x += @dx
		@y += @dy
	
	draw: (context) ->
		context.beginPath()
		context.arc(@x, @y, @size, 0, Math.PI*2, true)
		context.closePath()	
		context.strokeStyle = @color	
		context.lineWidth = @lineWidth
		context.stroke()

class pong.Bat
	width: 10, length: 80
	hits: 0
	constructor:(@color, @x, @y, @keynum_down, @keynum_up) ->
		this.addKeyObservers()
		
	addKeyObservers: ->
		document.addEventListener 'keydown', (e) =>
			switch e.keyCode
				when @keynum_down then @downPressed = true
				when @keynum_up then @upPressed = true
		, false
  
		document.addEventListener 'keyup', (e) =>
			switch e.keyCode
				when @keynum_down then @downPressed = false
				when @keynum_up then @upPressed = false
		, false	


		
	draw: (context) ->
		@y -= 5 if @upPressed
		@y += 5 if @downPressed
		context.fillStyle = 'rgba(0,0,0,0.8)'
		context.fillRect @x, @y, @width, @length
		this.draw_text(context)
		
	draw_text :(context) ->
		context.fillStyle    = @color
		context.font         = "15pt Calibri"
		context.textBaseline = 'top'
		context.fillText(@hits, @x, 5)
		
	
class pong.Field
	constructor:(@width, @height) ->
	
		
	draw: (context)->
		context.beginPath()
		context.rect(0, 0, @width, @height)
		context.closePath()	
		context.strokeStyle ='rgba(0,0,0,0.8)'	
		context.lineWidth = 2
		context.stroke()
		
	
	 	