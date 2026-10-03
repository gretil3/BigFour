# Member cutouts

Photos for the home hero carousel. Each file is picked up automatically by its name, which must match the member's `slug` in `packages/shared/src/data/members.ts`:

```
david.png  kevin.png  gerald.png  fiko.png
```

- **Transparent PNG** (WebP and AVIF also work): the person cut out from the background, so the hero's palette shows through.
- **Portrait, about 0.6 : 1** (for example 1200 × 2000). The image is scaled to fit that frame, anchored to the bottom.
- **Crop at the waist or chest, touching the bottom edge.** The active slide is enlarged and runs off the bottom of the screen.

Until a member's file exists, the hero shows nothing in its place.
