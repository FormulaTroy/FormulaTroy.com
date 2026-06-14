import bpy

# use cm as unit
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.length_unit = 'CENTIMETERS'
scene.unit_settings.scale_length = 1.0

# set up grid snapping
scene.tool_settings.use_snap = True
scene.tool_settings.snap_target = 'CENTER'
scene.tool_settings.snap_elements = {'INCREMENT'}
scene.tool_settings.use_snap_grid_absolute = True

# delete default light and camera
targets = ["Camera", "Light"]
for name in targets:
    if name in bpy.data.objects:
        obj = bpy.data.objects[name]
        bpy.data.objects.remove(obj, do_unlink=True)

# loop through viewports to apply grid and shading changes
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for space in area.spaces:
            if space.type == 'VIEW_3D':

                # gridlines
                space.overlay.grid_scale = 0.1
                #space.overlay.grid_scale = 1.0
                space.overlay.grid_subdivisions = 10
                space.overlay.show_stats = True

                # shading
                space.shading.show_backface_culling = True
                space.shading.show_cavity = True
                space.shading.cavity_type = 'SCREEN'
                space.shading.curvature_ridge_factor = 0.75
                space.shading.curvature_valley_factor = 0.5

# success message if it makes it to the end
bpy.context.window_manager.popup_menu(
    lambda self, context: self.layout.label(text="Low Poly Template"),
    icon="INFO",
    title="Script Success"
)
