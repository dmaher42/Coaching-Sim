Original prompt: yes add clicks with undo

Progress:
- Added double-click remove on player chips.
- Added double-click add-teammate on empty field space.
- Added an "Undo last change" control that restores the most recent add/remove.
- Added a "Remove all players" button in the player tools panel.
- Added a Pages compatibility copy so cached HTML can still load the updated bundle filename.
- Tightened the board layout so the side panel can scroll independently and the oval stays closer to the reference board size.
- Removed the X/Y coordinate readout from the selected-role card.
- Republished the root Pages entrypoint to the latest bundle so the selected-role card no longer shows stale coordinates.
- Stripped the field back to a single oval shape with the players on top, removing the extra pitch markings and labels.
- Keep the oval large on future passes; the field itself is the main simulation surface.
- Widened the oval again so it occupies more of the screen for simulations.
- Hid the control sidebar by default so the oval can run edge-to-edge across the screen.
- Restored the AFL pitch markings: goals, arcs, center square, and guide lines, while keeping the oval full width.
- Rotated the field layout to a tall portrait oval so it runs up and down the screen.
- Added player names with single-player writing and bulk import by pasted name list.
- Removed the extra helper copy from the player-names panel so the UI stays lean for personal use.
- Replaced the always-visible header strip with a compact expandable menu.
- Removed the preset phase builder and coach feedback panels from the sidebar.
- Added a batch action to place every imported name onto the field as its own player chip.
- Sharpened the oval toward a more AFL-like shape and made the field markings bolder.
- Shifted the oval left, removed the extra 50m arc decoration, and made player chips rounded rectangles.
- Fixed the center marking so it renders as a square instead of a rectangle.
- Shifted the oval farther left and removed the extra horizontal guide lines to declutter the field.
- Narrowed the oval again so it reads more like a true AFL oval and less like a circle.
- Imported players and names now persist in browser localStorage so the roster survives refreshes on the same device.
- Added a simple cross-device sync link so the current board state can be copied from one device and opened on another.
- Broadened the mobile oval and reduced its height so it reads less compacted on phone screens.
- Moved the mobile controls panel below the field so it no longer overlays the oval.
- Added a small confirmation toast for the sync-link copy action so it does not fail silently.

Notes:
- Resetting or changing presets clears the undo stack.
- Double-click add uses the clicked field position; remove restores the player and its outgoing custom lines.
- `npm.cmd run build` completed successfully after the interaction change.
- Remove-all is undoable and clears selection/line mode cleanly.
- Deployment now preserves the legacy hashed JS filename in `dist` for stale browser caches.
- Backs/Midfield/Forwards labels and midfield dividers now sit outside the clipped oval instead of getting cut off.
