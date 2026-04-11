// R3F uses module augmentation on React's JSX namespace.
// In newer versions of @react-three/fiber (v8), the types are declared
// via the package's own index.d.ts — but they require `"moduleResolution": "bundler"`
// and the package to be explicitly referenced.
// We explicitly reference the fiber types here to ensure they are loaded.

import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
