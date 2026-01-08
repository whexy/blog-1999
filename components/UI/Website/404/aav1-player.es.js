import { jsxs as C, Fragment as z, jsx as F } from "react/jsx-runtime";
import { useRef as N, useState as R, useEffect as M } from "react";
class B {
  /**
   * Parse an AAV1 file from an ArrayBuffer
   * @param {ArrayBuffer} arrayBuffer - The raw .aav1 file contents
   * @throws {Error} If the file is invalid or unsupported
   */
  constructor(e) {
    this.buffer = e, this.view = new DataView(e), this.byteArray = new Uint8Array(e), this.parseHeader(), this.parsePalette(), this.parseFrameIndex();
  }
  /**
   * Parse the 64-byte header
   */
  parseHeader() {
    const e = String.fromCharCode(
      this.view.getUint8(0),
      this.view.getUint8(1),
      this.view.getUint8(2),
      this.view.getUint8(3)
    );
    if (e !== "AAV1")
      throw new Error(`Invalid magic number: expected "AAV1", got "${e}"`);
    if (this.version = this.view.getUint16(4, !0), this.width = this.view.getUint16(6, !0), this.height = this.view.getUint16(8, !0), this.frameCount = this.view.getUint32(10, !0), this.fpsNum = this.view.getUint16(14, !0), this.fpsDen = this.view.getUint16(16, !0), this.flags = this.view.getUint32(18, !0), this.paletteSize = this.view.getUint16(22, !0), this.charEncoding = this.view.getUint16(24, !0), this.fps = this.fpsNum / this.fpsDen, this.version !== 1)
      throw new Error(`Unsupported AAV1 version: ${this.version}`);
    if (this.width === 0 || this.height === 0)
      throw new Error(`Invalid dimensions: ${this.width}x${this.height}`);
    if (this.frameCount === 0)
      throw new Error("Frame count is zero");
    this.frameSize = this.width * this.height * 4;
  }
  /**
   * Parse the palette (paletteSize × 4 bytes RGBA)
   */
  parsePalette() {
    this.palette = new Float32Array(this.paletteSize * 4);
    for (let t = 0; t < this.paletteSize; t++) {
      const r = 64 + t * 4;
      this.palette[t * 4 + 0] = this.view.getUint8(r + 0) / 255, this.palette[t * 4 + 1] = this.view.getUint8(r + 1) / 255, this.palette[t * 4 + 2] = this.view.getUint8(r + 2) / 255, this.palette[t * 4 + 3] = this.view.getUint8(r + 3) / 255;
    }
  }
  /**
   * Parse the frame index table (frameCount × 4 bytes)
   */
  parseFrameIndex() {
    const e = 64 + this.paletteSize * 4;
    this.frameOffsets = new Uint32Array(this.frameCount);
    for (let t = 0; t < this.frameCount; t++)
      this.frameOffsets[t] = this.view.getUint32(e + t * 4, !0);
  }
  /**
   * Get a zero-copy view of frame data for a specific frame
   * @param {number} frameIndex - Frame index (0 to frameCount-1)
   * @returns {Uint8Array} View into the frame data (width × height × 4 bytes)
   */
  getFrameData(e) {
    if (e < 0 || e >= this.frameCount)
      throw new Error(`Frame index out of bounds: ${e}`);
    const t = this.frameOffsets[e];
    return new Uint8Array(this.buffer, t, this.frameSize);
  }
  /**
   * Get metadata for the animation
   * @returns {Object} Metadata object
   */
  getMetadata() {
    return {
      version: this.version,
      width: this.width,
      height: this.height,
      frameCount: this.frameCount,
      fps: this.fps,
      fpsNum: this.fpsNum,
      fpsDen: this.fpsDen,
      flags: this.flags,
      paletteSize: this.paletteSize,
      charEncoding: this.charEncoding,
      palette: this.palette,
      duration: this.frameCount / this.fps
    };
  }
}
function O(h = 8, e = 16, t = 4) {
  const a = 16 * h * t, n = 6 * e * t, m = document.createElement("canvas");
  m.width = a, m.height = n;
  const s = m.getContext("2d", {
    willReadFrequently: !1,
    alpha: !0
  });
  s.fillStyle = "black", s.fillRect(0, 0, a, n);
  const S = Math.floor(e * t * 0.85);
  s.font = `${S}px "SF Mono", Menlo, "Courier New", monospace`, s.textAlign = "center", s.textBaseline = "middle", s.fillStyle = "white", s.imageSmoothingEnabled = !0, s.imageSmoothingQuality = "high";
  for (let g = 0; g < 96; g++) {
    const d = 32 + g, o = String.fromCharCode(d), u = g % 16, T = Math.floor(g / 16), p = (u * h + h / 2) * t, l = (T * e + e / 2) * t;
    s.fillText(o, p, l);
  }
  return m;
}
const V = `#version 300 es

// Full-screen quad vertex shader
// Passes through clip-space position and UV coordinates

in vec2 a_position;  // Clip space position [-1, 1]
in vec2 a_uv;        // Texture coordinates [0, 1]

out vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_uv;
}
`, $ = `#version 300 es
precision highp float;
precision highp usampler2D;

// Fragment shader - renders ASCII grid using cell data and glyph atlas

in vec2 v_uv;
out vec4 fragColor;

// Textures
uniform usampler2D u_cellData;    // RGBA8UI: (glyph, fg, bg, attr)
uniform sampler2D u_glyphAtlas;   // RGBA8: pre-rendered glyphs
uniform sampler2D u_palette;      // RGBA8: palette texture (256x1)

// Uniforms
uniform vec2 u_gridSize;          // Grid dimensions (width, height)
uniform vec2 u_atlasGridSize;     // Atlas grid dimensions (16, 6)
uniform float u_paletteSize;      // Number of colors in palette

void main() {
  // 1. Compute cell coordinates (flip Y for correct orientation)
  vec2 cellCoord = floor(vec2(v_uv.x, 1.0 - v_uv.y) * u_gridSize);
  
  // 2. Fetch cell data
  uvec4 cell = texelFetch(u_cellData, ivec2(cellCoord), 0);
  uint glyph = cell.r;
  uint fgIndex = cell.g;
  uint bgIndex = cell.b;
  // uint attr = cell.a;  // Unused for now
  
  // 3. Compute local position within cell [0,1]
  vec2 localUV = fract(vec2(v_uv.x, 1.0 - v_uv.y) * u_gridSize);
  
  // 4. Map glyph code to atlas grid position
  // ASCII 0-31 map to row 0-1, 32-127 map to rows 2-7
  // We start rendering from ASCII 32, so subtract 32 from glyph
  uint glyphOffset = glyph >= 32u ? glyph - 32u : 0u;
  vec2 glyphGridPos = vec2(
    float(glyphOffset % 16u),
    floor(float(glyphOffset) / 16.0)
  );
  
  // 5. Compute atlas UV with nearest-neighbor sampling
  vec2 atlasUV = (glyphGridPos + localUV) / u_atlasGridSize;
  
  // 6. Sample glyph (use red channel as alpha)
  vec4 glyphSample = texture(u_glyphAtlas, atlasUV);
  float glyphAlpha = glyphSample.r;
  
  // 7. Lookup colors from palette texture
  // Sample at center of texel: (index + 0.5) / paletteSize
  vec4 fgColor = texture(u_palette, vec2((float(fgIndex) + 0.5) / u_paletteSize, 0.5));
  vec4 bgColor = texture(u_palette, vec2((float(bgIndex) + 0.5) / u_paletteSize, 0.5));
  
  // 8. Mix foreground and background based on glyph alpha
  fragColor = mix(bgColor, fgColor, glyphAlpha);
}
`;
class W {
  /**
   * Initialize WebGL2 renderer
   * @param {HTMLCanvasElement} canvas - Target canvas element
   * @param {Object} metadata - AAV1 metadata from parser
   * @param {HTMLCanvasElement} glyphAtlas - Pre-rendered glyph atlas
   * @param {number} scale - Rendering scale factor (default: 4 for sharper rendering)
   * @param {Object} options - Optional rendering options
   * @param {number} options.width - Optional display width in pixels (overrides default)
   * @param {number} options.height - Optional display height in pixels (overrides default)
   */
  constructor(e, t, r, i = 4, a = {}) {
    this.canvas = e, this.metadata = t, this.scale = i;
    const n = e.getContext("webgl2", {
      alpha: !1,
      antialias: !1,
      depth: !1,
      stencil: !1,
      premultipliedAlpha: !1,
      preserveDrawingBuffer: !0
    });
    if (!n)
      throw new Error("WebGL2 not supported");
    this.gl = n, this.cellWidth = 8, this.cellHeight = 16, this.canvas.width = t.width * this.cellWidth * i, this.canvas.height = t.height * this.cellHeight * i, a.width !== void 0 || a.height !== void 0 ? (a.width !== void 0 && (this.canvas.style.width = `${a.width}px`), a.height !== void 0 && (this.canvas.style.height = `${a.height}px`)) : (this.canvas.style.width = "100%", this.canvas.style.height = "100%"), n.viewport(0, 0, this.canvas.width, this.canvas.height), this.initShaders(), this.initGeometry(), this.initTextures(r), this.initUniforms();
  }
  /**
   * Compile and link shaders
   */
  initShaders() {
    const e = this.gl, t = this.compileShader(e.VERTEX_SHADER, V), r = this.compileShader(e.FRAGMENT_SHADER, $), i = e.createProgram();
    if (e.attachShader(i, t), e.attachShader(i, r), e.linkProgram(i), !e.getProgramParameter(i, e.LINK_STATUS)) {
      const a = e.getProgramInfoLog(i);
      throw new Error(`Failed to link program: ${a}`);
    }
    e.useProgram(i), this.program = i, this.attribLocations = {
      position: e.getAttribLocation(i, "a_position"),
      uv: e.getAttribLocation(i, "a_uv")
    }, this.uniformLocations = {
      cellData: e.getUniformLocation(i, "u_cellData"),
      glyphAtlas: e.getUniformLocation(i, "u_glyphAtlas"),
      palette: e.getUniformLocation(i, "u_palette"),
      gridSize: e.getUniformLocation(i, "u_gridSize"),
      atlasGridSize: e.getUniformLocation(i, "u_atlasGridSize"),
      paletteSize: e.getUniformLocation(i, "u_paletteSize")
    };
  }
  /**
   * Compile a shader
   * @param {number} type - Shader type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
   * @param {string} source - Shader source code
   * @returns {WebGLShader} Compiled shader
   */
  compileShader(e, t) {
    const r = this.gl, i = r.createShader(e);
    if (r.shaderSource(i, t), r.compileShader(i), !r.getShaderParameter(i, r.COMPILE_STATUS)) {
      const a = r.getShaderInfoLog(i), n = e === r.VERTEX_SHADER ? "vertex" : "fragment";
      throw new Error(`Failed to compile ${n} shader: ${a}`);
    }
    return i;
  }
  /**
   * Setup full-screen quad geometry
   */
  initGeometry() {
    const e = this.gl, t = new Float32Array([
      // Triangle 1
      -1,
      -1,
      0,
      0,
      // Bottom-left
      1,
      -1,
      1,
      0,
      // Bottom-right
      -1,
      1,
      0,
      1,
      // Top-left
      // Triangle 2
      -1,
      1,
      0,
      1,
      // Top-left
      1,
      -1,
      1,
      0,
      // Bottom-right
      1,
      1,
      1,
      1
      // Top-right
    ]), r = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, r), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW);
    const i = 4 * 4;
    e.enableVertexAttribArray(this.attribLocations.position), e.vertexAttribPointer(
      this.attribLocations.position,
      2,
      // 2 components (x, y)
      e.FLOAT,
      !1,
      i,
      0
      // offset
    ), e.enableVertexAttribArray(this.attribLocations.uv), e.vertexAttribPointer(
      this.attribLocations.uv,
      2,
      // 2 components (u, v)
      e.FLOAT,
      !1,
      i,
      2 * 4
      // offset: 2 floats * 4 bytes
    ), this.vertexCount = 6;
  }
  /**
   * Initialize textures
   * @param {HTMLCanvasElement} glyphAtlas - Glyph atlas canvas
   */
  initTextures(e) {
    const t = this.gl;
    this.glyphAtlasTexture = t.createTexture(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.glyphAtlasTexture), t.texImage2D(
      t.TEXTURE_2D,
      0,
      // level
      t.RGBA,
      // internal format
      t.RGBA,
      // format
      t.UNSIGNED_BYTE,
      // type
      e
      // source
    ), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), this.cellDataTexture = t.createTexture(), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, this.cellDataTexture), t.texImage2D(
      t.TEXTURE_2D,
      0,
      // level
      t.RGBA8UI,
      // internal format (unsigned integer)
      this.metadata.width,
      // width
      this.metadata.height,
      // height
      0,
      // border
      t.RGBA_INTEGER,
      // format (integer)
      t.UNSIGNED_BYTE,
      // type
      null
      // data (allocate only)
    ), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
    const r = this.metadata.paletteSize, i = new Uint8Array(r * 4);
    for (let a = 0; a < r * 4; a++)
      i[a] = Math.round(this.metadata.palette[a] * 255);
    this.paletteTexture = t.createTexture(), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, this.paletteTexture), t.texImage2D(
      t.TEXTURE_2D,
      0,
      // level
      t.RGBA,
      // internal format
      r,
      // width
      1,
      // height
      0,
      // border
      t.RGBA,
      // format
      t.UNSIGNED_BYTE,
      // type
      i
      // data
    ), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
  }
  /**
   * Set uniform values
   */
  initUniforms() {
    const e = this.gl;
    e.uniform1i(this.uniformLocations.glyphAtlas, 0), e.uniform1i(this.uniformLocations.cellData, 1), e.uniform1i(this.uniformLocations.palette, 2), e.uniform2f(
      this.uniformLocations.gridSize,
      this.metadata.width,
      this.metadata.height
    ), e.uniform2f(this.uniformLocations.atlasGridSize, 16, 6), e.uniform1f(this.uniformLocations.paletteSize, this.metadata.paletteSize);
  }
  /**
   * Upload frame data to GPU
   * @param {Uint8Array} frameData - Frame cell data (width × height × 4 bytes)
   */
  uploadFrame(e) {
    const t = this.gl;
    t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, this.cellDataTexture), t.texSubImage2D(
      t.TEXTURE_2D,
      0,
      // level
      0,
      0,
      // xoffset, yoffset
      this.metadata.width,
      // width
      this.metadata.height,
      // height
      t.RGBA_INTEGER,
      // format
      t.UNSIGNED_BYTE,
      // type
      e
      // data (Uint8Array view)
    );
  }
  /**
   * Render the current frame
   */
  render() {
    const e = this.gl;
    e.clearColor(0, 0, 0, 1), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLES, 0, this.vertexCount);
  }
  /**
   * Cleanup resources
   */
  destroy() {
    const e = this.gl;
    this.glyphAtlasTexture && e.deleteTexture(this.glyphAtlasTexture), this.cellDataTexture && e.deleteTexture(this.cellDataTexture), this.paletteTexture && e.deleteTexture(this.paletteTexture), this.program && e.deleteProgram(this.program);
  }
}
function q({ url: h, fps: e, width: t, height: r }) {
  const i = N(null), [a, n] = R("loading"), [m, s] = R(null), [S, g] = R(null);
  return M(() => {
    let d = null, o = null, u = null, T = null, p = -1, l = !1;
    const U = new AbortController();
    async function L() {
      try {
        let c = function(D) {
          if (!(l || !u || !o)) {
            if (D >= w) {
              const b = Math.max(
                1,
                Math.min(
                  f.frameCount,
                  Math.floor((D - w) / x) + 1
                )
              );
              p = (p + b) % f.frameCount, w += b * x;
              const X = u.getFrameData(p);
              o.uploadFrame(X), o.render();
            }
            l || (d = requestAnimationFrame(c));
          }
        };
        n("loading");
        const E = await fetch(h, { cache: "no-store", signal: U.signal });
        if (!E.ok)
          throw new Error(`Failed to fetch ${h}: ${E.statusText}`);
        const I = await E.arrayBuffer();
        if (l) return;
        u = new B(I);
        const f = u.getMetadata(), _ = typeof e == "number" ? e : null, v = _ && _ > 0 ? _ : f.fps, A = Number.isFinite(v) && v > 0 ? v : 24;
        g({
          width: f.width,
          height: f.height,
          frameCount: f.frameCount,
          fps: A,
          duration: f.frameCount / A
        });
        const y = 4, P = O(8, 16, y);
        if (l) return;
        if (!i.current)
          throw new Error("Canvas element not available");
        if (o = new W(i.current, f, P, y, {
          width: t,
          height: r
        }), l) return;
        const G = u.getFrameData(0);
        if (o.uploadFrame(G), o.render(), p = 0, l) return;
        T = performance.now();
        const x = 1e3 / A;
        let w = T + x;
        n("playing"), d = requestAnimationFrame(c);
      } catch (c) {
        if (l || (c == null ? void 0 : c.name) === "AbortError") return;
        s(c instanceof Error ? c.message : String(c)), n("error");
      }
    }
    return L(), () => {
      l = !0, U.abort(), d !== null && (cancelAnimationFrame(d), d = null), o && (o.destroy(), o = null), u = null;
    };
  }, [h, e, t, r]), /* @__PURE__ */ C(z, { children: [
    a === "loading" && /* @__PURE__ */ F("div", { children: "Loading animation..." }),
    a === "error" && /* @__PURE__ */ C("div", { style: { color: "red" }, children: [
      "Error: ",
      m
    ] }),
    /* @__PURE__ */ F(
      "canvas",
      {
        ref: i,
        style: {
          imageRendering: "auto",
          display: "block"
        }
      }
    )
  ] });
}
export {
  q as AAV1Player
};
//# sourceMappingURL=aav1-player.es.js.map
