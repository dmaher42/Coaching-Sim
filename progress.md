Original prompt: yes add clicks with undo

Progress:
- Added double-click remove on player chips.
- Added double-click add-teammate on empty field space.
- Added an "Undo last change" control that restores the most recent add/remove.
- Added a "Remove all players" button in the player tools panel.
- Added a Pages compatibility copy so cached HTML can still load the updated bundle filename.
- Tightened the board layout so the side panel can scroll independently and the oval stays closer to the reference board size.

Notes:
- Resetting or changing presets clears the undo stack.
- Double-click add uses the clicked field position; remove restores the player and its outgoing custom lines.
- `npm.cmd run build` completed successfully after the interaction change.
- Remove-all is undoable and clears selection/line mode cleanly.
- Deployment now preserves the legacy hashed JS filename in `dist` for stale browser caches.
- Backs/Midfield/Forwards labels and midfield dividers now sit outside the clipped oval instead of getting cut off.
