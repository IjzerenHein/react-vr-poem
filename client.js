// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("VRPoem", {
      /* initial props */
    }),
    r360.getDefaultSurface()
  );

  // Load the initial environment
  //r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));

  // Set background video
  const player = r360.compositor.createVideoPlayer("myplayer");
  player.setSource(r360.getAssetURL("xmas_360.mov"), "2D", "mp4");
  r360.compositor.setBackgroundVideo("myplayer");

  // Loop video
  player.setLoop(true);
  player.play();
}

window.React360 = { init };
