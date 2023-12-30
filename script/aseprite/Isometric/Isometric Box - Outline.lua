-- From: https://github.com/oscb/aseprites-scripts/
-- @FormulaTroy changes: Code formatting, not functionality
---------------------------------------
-- USER DEFAULTS --
---------------------------------------
local palette = app.activeSprite.palettes[1]

-- Default colors:
local colors = {
    stroke = Color {
        r = 0,
        g = 0,
        b = 0,
        a = 255
    },
    fill = Color {
        r = 255,
        g = 255,
        b = 255,
        a = 0
    }
}

-- Use 3px corner by default:
local use3pxCorner = false

-- Default Max Sizes:
local maxSize = {
    x = math.floor(app.activeSprite.width / 4),
    y = math.floor(app.activeSprite.width / 4),
    z = math.floor(app.activeSprite.height / 2)
}

---------------------------------------
-- Colors Utility --
---------------------------------------
local function colorAsPixel(color)
    return app.pixelColor.rgba(color.red, color.green, color.blue, color.alpha)
end

---------------------------------------
-- BASIC LINES --
---------------------------------------
local function hLine(color, x, y, len)
    -- Horizontal Line
    for i = 1, len do
        app.activeImage:putPixel(x + i, y, color)
    end
end

local function vLine(color, x, y, len)
    -- Vertical Line
    for i = 1, len do
        app.activeImage:putPixel(x, y + i, color)
    end
end

---------------------------------------
-- ISOMETRIC LINES --
---------------------------------------
local function isoLineDownRight(color, x, y, len)
    for i = 0, len do
        x1 = i * 2
        x2 = x1 + 1
        app.activeImage:putPixel(x + x1, y + i, color)
        app.activeImage:putPixel(x + x2, y + i, color)
    end
end

local function isoLineDownLeft(color, x, y, len)
    for i = 0, len do
        x1 = i * 2
        x2 = x1 + 1
        app.activeImage:putPixel(x - x1, y + i, color)
        app.activeImage:putPixel(x - x2, y + i, color)
    end
end

local function isoLineUpRight(color, x, y, len)
    for i = 0, len do
        x1 = i * 2
        x2 = x1 + 1
        app.activeImage:putPixel(x + x1, y - i, color)
        app.activeImage:putPixel(x + x2, y - i, color)
    end
end

local function isoLineUpLeft(color, x, y, len)
    for i = 0, len do
        x1 = i * 2
        x2 = x1 + 1
        app.activeImage:putPixel(x - x1, y - i, color)
        app.activeImage:putPixel(x - x2, y - i, color)
    end
end

---------------------------------------
-- FINAL CUBE --
---------------------------------------
local function drawCube(type, xSize, ySize, zSize, color)
    --[[
    Dimensions:
      X: right side
      Y: left side
      Z: is height

    Type can be 1 or 2:
      1 is for 3px corner
      2 is for 2px corner
  ]] --
    local centerX = math.floor(app.activeSprite.width / 2)
    local centerY = math.floor(app.activeSprite.height / 2)

    local a = (type == 1) and 0 or 1
    local b = (type == 1) and 1 or 0

    -- top plane
    isoLineUpRight(color, centerX - a, centerY, xSize) -- bottom right
    isoLineUpLeft(color, centerX, centerY, ySize) -- bottom left
    isoLineUpLeft(color, centerX + xSize * 2 + b, centerY - xSize, ySize) -- top right
    isoLineUpRight(color, centerX - ySize * 2 - 1, centerY - ySize, xSize) -- top left

    -- bottom plane
    isoLineUpRight(color, centerX - a, centerY + zSize, xSize) -- right
    isoLineUpLeft(color, centerX, centerY + zSize, ySize) -- left

    -- vertical lines
    vLine(color, centerX - a, centerY, zSize) -- middle
    vLine(color, centerX - ySize * 2 - 1, centerY - ySize, zSize) -- left
    vLine(color, centerX + xSize * 2 + b, centerY - xSize, zSize) -- right
end

---------------------------------------
-- LAYER MANAGEMENT --
---------------------------------------
local function newLayer(name)
    s = app.activeSprite
    lyr = s:newLayer()
    lyr.name = name
    s:newCel(lyr, 1)

    return lyr
end

---------------------------------------
-- USER INTERFACE --
---------------------------------------
local dlg = Dialog("[KAM] Isometric Box (Lite)")
dlg:separator{
    text = "Size:"
}:slider{
    id = "ySize",
    label = "Left:",
    min = 1,
    max = maxSize.y,
    value = 5
}:slider{
    id = "xSize",
    label = "Right:",
    min = 1,
    max = maxSize.x,
    value = 5
}:slider{
    id = "zSize",
    label = "Height:",
    min = 3,
    max = maxSize.z,
    value = 10
}:separator{
    text = "Colors:"
}:color{
    id = "strokeColor",
    label = "Stroke:",
    color = colors.stroke
} -- :color {id="fillColor", label="Fill:", color = colors.fill}
:separator():radio{
    id = "typeOne",
    label = "Corner:",
    text = "3 px",
    selected = use3pxCorner
}:radio{
    id = "typeTwo",
    text = "2 px",
    selected = not use3pxCorner
}:separator():button{
    id = "ok",
    text = "Add Box",
    onclick = function()
        local data = dlg.data
        app.transaction(function()
            local cubeType = data.typeOne and 1 or 2

            newLayer("Cube(" .. data.xSize .. " " .. data.ySize .. " " .. data.zSize .. ")")
            drawCube(cubeType, data.xSize, data.ySize, data.zSize, data.strokeColor)
        end)
        -- Refresh screen
        app.command.Undo()
        app.command.Redo()
    end
}:show{
    wait = false
}
