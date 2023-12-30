#######################################
# Language Syntax Cheatsheet
# Godot Script / GDScript
#######################################

# Inheritance
extends Node

# Class Definition
class_name GameManager

# Variables
var name = "Aven"
var health = 100
var worlds = [1, "Lava", "Three"]
var properties = {
  name: "Aven",
  level: 4
}
var v2 = Vector2(1, 2)

# Functions
func heal(amount):
  health += amount

func drawSquare(size):
  move_forward(size)
  turn_right(90)
  move_forward(size)
  turn_right(90)
  move_forward(size)
  turn_right(90)
  move_forward(size)

# Logic Structures
if health = 100:
  print("Fully healed!")
elif health >= 1:
  print("Current health: " + health + "/100")
else:
  print("Gonzo")

for i in range(20):
  print(i)

while someNumber != 0:
  someNumber -= 1

match x:
  1:
    print("It's one!")
  2:
    print("It's one times two!")
  _:
    print("It's not 1 or 2.")

# Deltas
# Multiply by frame time delta to make the function time-based
# instead of frame-based, thus fps won't affect results
func _process(delta):
  rotate(0.3 * delta)

# Keywords
keywords {
  $NodePath: 'Shorthand for get_node("NodePath")',
  %UniqueNode: 'Shorthand for get_node("%UniqueNode")',
  self: "Refers to current class instance.",
  break: "Exits the execution of the current for or while loop.",
  continue: "Immediately skips to the next iteration of the for or while loop.",
  pass: "Used where a statement is required syntactically but execution of code is undesired, e.g. in empty functions.",
  return: "Returns a value from a function.",
  is: "Tests whether a variable extends a given class, or is of a given built-in type.",
  in: "Tests whether a value is within a string, array, range, dictionary, or node. When used with for, it iterates through them instead of testing.",
  as: "Cast the value to a given type if possible.",
  signal: "Defines a signal.",
  static: "Defines a static function or a static member variable.",
  const: "Defines a constant.",
  enum: "Defines an enum.",
  breakpoint: "Editor helper for debugger breakpoints. Unlike breakpoints created by clicking in the gutter, breakpoint is stored in the script itself.",
  await: "Waits for a signal or a coroutine to finish.",
  void: "Used to represent that a function does not return any value.",
  PI: "PI constant.",
  TAU: "TAU constant.",
  INF: "Infinity constant. Used for comparisons and as result of calculations.",
  NAN: "NAN (not a number) constant. Used as impossible result from calculations."
}
