Original prompt: yes add clicks with undo

Progress:
- Added double-click remove on player chips.
- Added double-click add-teammate on empty field space.
- Added an "Undo last change" control that restores the most recent add/remove.

Notes:
- Resetting or changing presets clears the undo stack.
- Double-click add uses the clicked field position; remove restores the player and its outgoing custom lines.
- `npm.cmd run build` completed successfully after the interaction change.
