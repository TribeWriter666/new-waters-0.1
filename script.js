const inputImage = document.getElementById('input-image');
const originalImage = document.getElementById('original-image');
const glitchedCanvas = document.getElementById('glitched-canvas');
const glitchButton = document.getElementById('glitch-button');


inputImage.addEventListener('change', function() {
  const file = inputImage.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function() {
    originalImage.src = reader.result;
  });

  reader.readAsDataURL(file);
});


function glitchCanvas(ctx, canvas) {
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const length = pixels.data.length;

  const sliceSize = Math.floor(Math.random() * 40) + 5;
  const sliceCount = Math.floor(length / sliceSize);

  for (let i = 0; i < sliceCount; i++) {
    const sliceOffset = i * sliceSize;
    const copyLength = Math.floor(Math.random() * sliceSize);

    for (let j = 0; j < copyLength; j++) {
      const copyOffset = j * 4;
      const destinationOffset =
        Math.floor(Math.random() * length) - sliceOffset;
      const destinationPixel = sliceOffset + destinationOffset;

      pixels.data[sliceOffset + copyOffset] =
        pixels.data[destinationPixel + copyOffset];
      pixels.data[sliceOffset + copyOffset + 1] =
        pixels.data[destinationPixel + copyOffset + 1];
      pixels.data[sliceOffset + copyOffset + 2] =
        pixels.data[destinationPixel + copyOffset + 2];
      pixels.data[sliceOffset + copyOffset + 3] =
        pixels.data[destinationPixel + copyOffset + 3];
    }
  }

  ctx.putImageData(pixels, 0, 0);
}
glitchButton.addEventListener('click', function() {
  glitchImage();
});
