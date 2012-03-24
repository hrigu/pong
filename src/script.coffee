game = null
context = null
jQuery ->
	canvas = getCanvas()
	context = canvas.getContext '2d'
	game = new Game(canvas.width, canvas.height)
	setInterval(run_loop, game.tempo)
	
run_loop = ->
	game.run_loop();
	
	
getCanvas = ->
	$("#myCanvas")[0]
	
class Game
	tempo: 30
	hits_for_winning: 10
	winner: null
	constructor: (width, height) ->		
		@ball = new Ball()
		@field = new Field(width, height)
		@bat_right = new Bat('green', width - 15, height / 2, 40, 38)
		@bat_left = new Bat('red', 5, height / 2, 89, 65)

	run_loop: () ->
		context.clearRect(0, 0, @field.width, @field.height)
		@field.draw()
		@bat_left.draw()	
		@bat_right.draw()	
		if (! @winner)
			@bat_left.draw()	
			@bat_right.draw()	
			@ball.draw()
			@ball.check_collision(game)
			@ball.compute_new_pos()
			@winner = @bat_left if (@bat_left.hits >= @hits_for_winning)
			@winner = @bat_right if (@bat_right.hits >= @hits_for_winning)
		else 
			context.font         = "30pt Calibri" 
			context.fillStyle    = "#{@winner.color}"
			context.textBaseline = 'top'
			context.fillText("The winner is #{@winner.color}!", 20, @field.height / 2-30)
class Ball
	color: "#0000ff"
	size: 5, lineWidth: 2
	x: 30, y: 300
	dx: 5, dy: 5
	
	x_left: -> @x - @size - @lineWidth
	x_right: -> @x + @size + @lineWidth
	y_low: -> @y - @size - @lineWidth
	y_high: -> @y + @size + @lineWidth		
	
	
	check_collision: (game) ->
		if (@dx > 0)
			bat = game.bat_right
			if (@x_right() > bat.x && @y_low() > bat.y && @y_high() < (bat.y + bat.length)) 		
				@_update(bat) 
		if (@dx < 0)
			bat = game.bat_left
			if (@x_left() < bat.x + bat.width && @y_low() > bat.y && @y_high() < (bat.y + bat.length)) 		
				@_update(bat)	
		if (@x_left() < 0) 
			
			@dx = -@dx
			@color = "#0000ff"
		if (@x_right() > game.field.width)
			game.bat_right.hits--
			@dx = -@dx
			@color = "#0000ff"
			
		if (@y_low() < 0 || @y_high() > game.field.height) 
			@dy = -@dy
	
			
	_update: (bat) ->				
		@dx = -@dx
		@color = bat.color
		bat.hits++
		
	compute_new_pos: () ->
		@x += @dx
		@y += @dy
	
	draw: () ->
		context.beginPath()
		context.arc(@x, @y, @size, 0, Math.PI*2, true)
		context.closePath()	
		context.strokeStyle = @color	
		context.lineWidth = @lineWidth
		context.stroke()

class Bat
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


		
	draw: ->
		@y -= 5 if @upPressed
		@y += 5 if @downPressed
		context.fillStyle = 'rgba(0,0,0,0.8)'
		context.fillRect @x, @y, @width, @length
		this.draw_text()
		
	draw_text: ->
		context.fillStyle    = @color
		context.font         = "15pt Calibri"
		context.textBaseline = 'top'
		context.fillText(@hits, @x, 5)
		
	
class Field
	constructor:(@width, @height) ->
	
		
	draw: ->
		context.beginPath()
		context.rect(0, 0, @width, @height)
		context.closePath()	
		context.strokeStyle ='rgba(0,0,0,0.8)'	
		context.lineWidth = 2
		context.stroke()
		
	
	 	