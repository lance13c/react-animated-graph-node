import { build } from "esbuild";
import { emptyDir } from "./utils.js";

const FORMATS = {
  ESM: "esm",
  CJS: "cjs",
};

const PLATFORMS = {
  BROWSER: "browser",
  NODE: "node",
};

// Build configuration for different formats
const buildConfigs = {
  [FORMATS.ESM]: {
    format: FORMATS.ESM,
    extension: ".js",
    globalVars: false,
  },
  [FORMATS.CJS]: {
    format: FORMATS.CJS,
    extension: ".cjs",
    globalVars: true,
  },
};

// Base esbuild configuration
const createBuildConfig = ({ format, minify = true }) => ({  // Set default minify to true
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  platform: PLATFORMS.BROWSER,
  target: ["es2018"],
  external: ["react", "react-dom"],
  format,
  packages: "external",
  metafile: true,
  logLevel: "info",
});

// Create the build configuration for a specific format
const createFormatConfig = async (format, minify = true) => {  // Set default minify to true
  const { extension, globalVars } = buildConfigs[format];
  const config = createBuildConfig({ format, minify });
  const outfile = `dist/index${extension}`;
  
  // Add CommonJS specific configurations
  if (globalVars) {
    config.banner = {
      js: `
        if (typeof window === 'undefined') {
          var global = globalThis;
          var process = { env: { NODE_ENV: "production" } };
        }
      `,
    };
  }
  
  return { ...config, outfile };
};

// Build handler for a specific format
const buildFormat = async (format, minify = true) => {  // Set default minify to true
  try {
    console.log(`📦 Building ${format.toUpperCase()} bundle (minified)...`);
    const config = await createFormatConfig(format, minify);
    const result = await build(config);
    
    // Log build metrics
    if (result.metafile) {
      const { inputs, outputs } = result.metafile;
      const inputFiles = Object.keys(inputs).length;
      const outputFiles = Object.keys(outputs).length;
      console.log(`✓ ${format.toUpperCase()} build complete:`, {
        inputFiles,
        outputFiles,
      });
    }
    
    return result;
  } catch (error) {
    console.error(`× ${format.toUpperCase()} build failed:`, error);
    throw error;
  }
};

// Main build process
async function runBuild() {
  try {
    console.log("🚀 Starting build process...");
    const startTime = Date.now();
    
    // Clean dist directory
    await emptyDir("dist");
    console.log("✓ Cleaned dist directory");
    
    // Build all formats with minification
    await Promise.all([
      buildFormat(FORMATS.ESM, true),  // Explicitly set minify to true
      buildFormat(FORMATS.CJS, true),  // Explicitly set minify to true
    ]);
    
    // Log build completion
    const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✨ Build completed in ${buildTime}s`);
  } catch (error) {
    console.error("\n💥 Build failed:", error);
    process.exit(1);
  }
}

runBuild();
