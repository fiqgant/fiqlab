import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Mount-only viewport detection intentionally sets initial state
      // synchronously in an effect; not a cascading-render bug.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
