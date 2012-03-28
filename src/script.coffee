game = null
context = null
jQuery ->
	canvas = getCanvas()
	context = canvas.getContext '2d'
	game = new pong.Game(canvas.width, canvas.height)
	setInterval(run_loop, game.tempo)
	
run_loop = ->
	game.run_loop(context);
	
	
getCanvas = ->
	$("#myCanvas")[0]

