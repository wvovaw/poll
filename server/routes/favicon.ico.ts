export default defineEventHandler(() => {
  const size = 16
  const bytesPerPixel = 4
  const pixelCount = size * size
  const pixelDataSize = pixelCount * bytesPerPixel

  const icoHeaderSize = 6
  const entrySize = 16
  const dibHeaderSize = 40

  const imageOffset = icoHeaderSize + entrySize
  const imageSize = dibHeaderSize + pixelDataSize
  const totalSize = imageOffset + imageSize

  const buffer = new ArrayBuffer(totalSize)
  const view = new DataView(buffer)
  let offset = 0

  // --- ICO HEADER ---
  view.setUint16(offset, 0, true)
  offset += 2 // reserved
  view.setUint16(offset, 1, true)
  offset += 2 // icon
  view.setUint16(offset, 1, true)
  offset += 2 // count

  // --- DIRECTORY ENTRY ---
  view.setUint8(offset++, size) // width
  view.setUint8(offset++, size) // height
  view.setUint8(offset++, 0) // colors
  view.setUint8(offset++, 0) // reserved
  view.setUint16(offset, 1, true)
  offset += 2 // planes
  view.setUint16(offset, 32, true)
  offset += 2 // bpp
  view.setUint32(offset, imageSize, true)
  offset += 4
  view.setUint32(offset, imageOffset, true)
  offset += 4

  // --- DIB HEADER ---
  view.setUint32(offset, dibHeaderSize, true)
  offset += 4
  view.setInt32(offset, size, true)
  offset += 4
  view.setInt32(offset, size * 2, true)
  offset += 4 // ICO height
  view.setUint16(offset, 1, true)
  offset += 2
  view.setUint16(offset, 32, true)
  offset += 2
  view.setUint32(offset, 0, true)
  offset += 4
  view.setUint32(offset, pixelDataSize, true)
  offset += 4
  offset += 16 // skip rest of DIB header

  // --- PIXELS (BGRA, bottom-up) ---
  const pixels = new Uint8Array(buffer, offset)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = ((size - 1 - y) * size + x) * 4
      const black = Math.random() > 0.6

      pixels[i] = black ? 0 : 255 // B
      pixels[i + 1] = black ? 0 : 255 // G
      pixels[i + 2] = black ? 0 : 255 // R
      pixels[i + 3] = 255 // A
    }
  }

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'no-store',
    },
  })
})
