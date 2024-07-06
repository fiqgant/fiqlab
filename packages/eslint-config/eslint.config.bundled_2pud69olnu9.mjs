// dist/index.js
import { default as default2 } from "@eslint/js";
import { default as default3 } from "@eslint-react/eslint-plugin";
import { default as default4 } from "@next/eslint-plugin-next";
import { default as default5 } from "@typescript-eslint/eslint-plugin";
import { default as default6 } from "@typescript-eslint/parser";
import { default as default7 } from "eslint-config-prettier";
import { default as default8 } from "eslint-plugin-eslint-comments";
import * as importPlugin from "eslint-plugin-import";
import { default as default9 } from "eslint-plugin-jsx-a11y";
import { default as default10 } from "eslint-plugin-playwright";
import { default as default11 } from "eslint-plugin-prettier";
import { default as default12 } from "eslint-plugin-react-hooks";
import { default as default13 } from "eslint-plugin-simple-import-sort";
import * as sonarjsPlugin from "eslint-plugin-sonarjs";
import { default as default14 } from "eslint-plugin-tailwindcss";
import { default as default15 } from "eslint-plugin-testing-library";
import * as turboPlugin from "eslint-plugin-turbo";
import { default as default16 } from "eslint-plugin-unicorn";
import { default as default17 } from "eslint-plugin-unused-imports";
import globals from "globals";
import { isPackageExists } from "local-pkg";
var comments = [
  {
    name: "tszhong0411:comments",
    plugins: {
      "eslint-comments": default8
    },
    rules: {
      ...default8.configs.recommended.rules,
      "eslint-comments/require-description": "error"
    }
  }
];
var GLOB_SRC_EXT = "?([cm])[jt]s?(x)";
var GLOB_JS = "**/*.?([cm])js";
var GLOB_JSX = "**/*.?([cm])jsx";
var GLOB_TS = "**/*.?([cm])ts";
var GLOB_TSX = "**/*.?([cm])tsx";
var GLOB_E2E = `**/e2e/**/*.{test,spec}.${GLOB_SRC_EXT}`;
var GLOB_TEST = `**/tests/**/*.{test,spec}.${GLOB_SRC_EXT}`;
var GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.next",
  "**/.vercel",
  "**/.changeset",
  "**/.cache",
  "**/CHANGELOG*.md",
  "**/LICENSE*"
];
var ignores = [
  {
    ignores: GLOB_EXCLUDE
  }
];
var importSort = [
  {
    name: "tszhong0411:import-sort",
    plugins: {
      "simple-import-sort": default13
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [[String.raw`^@?\w`], [String.raw`^[\w]`], ["^"], [String.raw`^\.`]]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  }
];
var imports = [
  {
    name: "tszhong0411:imports",
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/no-amd": "error",
      "import/no-commonjs": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-self-import": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/newline-after-import": ["error", { count: 1 }]
    }
  }
];
var javascript = [
  {
    name: "tszhong0411:javascript",
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        document: "readonly",
        navigator: "readonly",
        window: "readonly"
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: "module"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      "unused-imports": default17
    },
    rules: {
      ...default2.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ]
    }
  }
];
var next = [
  {
    name: "tszhong0411:next",
    plugins: {
      "@next/next": default4
    },
    rules: {
      ...default4.configs.recommended.rules,
      ...default4.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];
var playwright = [
  {
    name: "tszhong0411:playwright",
    ...default10.configs["flat/recommended"],
    files: [GLOB_E2E]
  }
];
var prettier = [
  {
    name: "tszhong0411:prettier",
    plugins: {
      prettier: default11
    },
    rules: {
      // Avoid conflicts
      ...default7.rules,
      "prettier/prettier": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off"
    }
  }
];
var react = (options) => {
  const plugins = default3.configs.all.plugins;
  return [
    {
      name: "tszhong0411:react",
      plugins: {
        "@eslint-react": plugins["@eslint-react"],
        "@eslint-react/dom": plugins["@eslint-react/dom"],
        "react-hooks": default12,
        "@eslint-react/hooks-extra": plugins["@eslint-react/hooks-extra"],
        "@eslint-react/naming-convention": plugins["@eslint-react/naming-convention"],
        "jsx-a11y": default9
      },
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: default6,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          project: options?.project,
          sourceType: "module"
        }
      },
      rules: {
        ...default3.configs["recommended-type-checked"].rules,
        ...default3.configs.dom.rules,
        ...default12.configs.recommended.rules,
        ...default9.configs.strict.rules,
        // @eslint-react
        "@eslint-react/no-missing-component-display-name": "error",
        "@eslint-react/no-class-component": "error",
        // @eslint-react/dom
        "@eslint-react/dom/no-dangerously-set-innerhtml": "off",
        // @eslint-react/hooks-extra
        "@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks": "error",
        "@eslint-react/hooks-extra/prefer-use-state-lazy-initialization": "error",
        // @eslint-react/naming-convention
        "@eslint-react/naming-convention/component-name": "error",
        "@eslint-react/naming-convention/filename": [
          "error",
          {
            rule: "kebab-case"
          }
        ],
        "@eslint-react/naming-convention/use-state": "error",
        // jsx-a11y
        "jsx-a11y/alt-text": [
          "error",
          {
            elements: ["img"],
            img: ["Image"]
          }
        ],
        "jsx-a11y/lang": "error"
      },
      settings: {
        "jsx-a11y": {
          components: {
            Button: "button",
            Image: "img",
            Input: "input",
            Textarea: "textarea",
            Link: "a"
          }
        }
      }
    }
  ];
};
var sonarjs = [
  {
    name: "tszhong0411:sonarjs",
    plugins: {
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,
      "sonarjs/no-duplicate-string": "off"
    }
  }
];
var tailwindcss = [
  {
    name: "tszhong0411:tailwindcss",
    plugins: {
      tailwindcss: default14
    },
    rules: {
      ...default14.configs.recommended.rules,
      // Done by Prettier
      "tailwindcss/classnames-order": "off",
      // Turn off due to poor performance
      "tailwindcss/no-custom-classname": "off"
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"]
      }
    }
  }
];
var testingLibrary = [
  {
    name: "tszhong0411:testing-library",
    plugins: {
      "testing-library": default15
    },
    rules: {
      ...default15.configs.react.rules
    },
    files: [GLOB_TEST]
  }
];
var turbo = [
  {
    name: "tszhong0411:turbo",
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      ...turboPlugin.configs.recommended.rules
    }
  }
];
var typescript = (options) => [
  {
    name: "tszhong0411:typescript",
    plugins: {
      "@typescript-eslint": default5
    },
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: default6,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: options?.project,
        tsconfigRootDir: options?.tsconfigRootDir,
        sourceType: "module"
      }
    },
    rules: {
      ...default5.configs["recommended-type-checked"].rules,
      ...default5.configs["strict-type-checked"].rules,
      ...default5.configs["stylistic-type-checked"].rules,
      ...default5.configs["eslint-recommended"].overrides[0].rules,
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-invalid-this": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      // Turn off due to poor performance
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off"
    }
  }
];
var unicorn = [
  {
    name: "tszhong0411:unicorn",
    plugins: {
      unicorn: default16
    },
    rules: {
      ...default16.configs.recommended.rules,
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
      "unicorn/prevent-abbreviations": "off"
    }
  }
];
var hasTypeScript = isPackageExists("typescript");
var hasTurbo = isPackageExists("turbo");
var tszhong0411 = async (options = {}, ...userConfigs) => {
  const {
    typescript: enableTypeScript = hasTypeScript,
    react: enableReact = false,
    turbo: enableTurbo = hasTurbo,
    next: enableNext = false,
    playwright: enablePlaywright = false,
    testingLibrary: enableTestingLibrary = false,
    gitignore: enableGitignore = true
  } = options;
  const configs3 = [];
  if (enableGitignore) {
    configs3.push((await import("eslint-config-flat-gitignore")).default());
  }
  configs3.push(
    ...ignores,
    ...javascript,
    ...unicorn,
    ...comments,
    ...importSort,
    ...sonarjs,
    ...tailwindcss,
    ...imports,
    ...prettier
  );
  if (enableTypeScript) {
    configs3.push(...typescript(options));
  }
  if (enableReact) {
    configs3.push(...react(options));
  }
  if (enableTurbo) {
    configs3.push(...turbo);
  }
  if (enableNext) {
    configs3.push(...next);
  }
  if (enablePlaywright) {
    configs3.push(...playwright);
  }
  if (enableTestingLibrary) {
    configs3.push(...testingLibrary);
  }
  configs3.push(...userConfigs);
  return configs3;
};
var src_default = tszhong0411;

// eslint.config.mjs
var eslint_config_default = src_default({
  project: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
  react: true,
  next: true,
  playwright: true,
  testingLibrary: true,
  turbo: true,
  typescript: true
});
export {
  eslint_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlzdC9pbmRleC5qcyIsICJlc2xpbnQuY29uZmlnLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvdGF1ZmlxL0NvZGUvVFMvZmlxbGFiL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9pbmRleC5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvdGF1ZmlxL0NvZGUvVFMvZmlxbGFiL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvdGF1ZmlxL0NvZGUvVFMvZmlxbGFiL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9pbmRleC5qc1wiOy8vIHNyYy9wbHVnaW5zLnRzXG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQyIH0gZnJvbSBcIkBlc2xpbnQvanNcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDMgfSBmcm9tIFwiQGVzbGludC1yZWFjdC9lc2xpbnQtcGx1Z2luXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ0IH0gZnJvbSBcIkBuZXh0L2VzbGludC1wbHVnaW4tbmV4dFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0NSB9IGZyb20gXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0NiB9IGZyb20gXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ3IH0gZnJvbSBcImVzbGludC1jb25maWctcHJldHRpZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDggfSBmcm9tIFwiZXNsaW50LXBsdWdpbi1lc2xpbnQtY29tbWVudHNcIjtcbmltcG9ydCAqIGFzIGltcG9ydFBsdWdpbiBmcm9tIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDkgfSBmcm9tIFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MTAgfSBmcm9tIFwiZXNsaW50LXBsdWdpbi1wbGF5d3JpZ2h0XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxMSB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxMiB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxMyB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXNpbXBsZS1pbXBvcnQtc29ydFwiO1xuaW1wb3J0ICogYXMgc29uYXJqc1BsdWdpbiBmcm9tIFwiZXNsaW50LXBsdWdpbi1zb25hcmpzXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxNCB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXRhaWx3aW5kY3NzXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxNSB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXRlc3RpbmctbGlicmFyeVwiO1xuaW1wb3J0ICogYXMgdHVyYm9QbHVnaW4gZnJvbSBcImVzbGludC1wbHVnaW4tdHVyYm9cIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDE2IH0gZnJvbSBcImVzbGludC1wbHVnaW4tdW5pY29yblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MTcgfSBmcm9tIFwiZXNsaW50LXBsdWdpbi11bnVzZWQtaW1wb3J0c1wiO1xuXG4vLyBzcmMvY29uZmlncy9jb21tZW50cy50c1xudmFyIGNvbW1lbnRzID0gW1xuICB7XG4gICAgbmFtZTogXCJ0c3pob25nMDQxMTpjb21tZW50c1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzXCI6IGRlZmF1bHQ4XG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDguY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzL3JlcXVpcmUtZGVzY3JpcHRpb25cIjogXCJlcnJvclwiXG4gICAgfVxuICB9XG5dO1xuXG4vLyBzcmMvZ2xvYnMudHNcbnZhciBHTE9CX1NSQ19FWFQgPSBcIj8oW2NtXSlbanRdcz8oeClcIjtcbnZhciBHTE9CX0pTID0gXCIqKi8qLj8oW2NtXSlqc1wiO1xudmFyIEdMT0JfSlNYID0gXCIqKi8qLj8oW2NtXSlqc3hcIjtcbnZhciBHTE9CX1RTID0gXCIqKi8qLj8oW2NtXSl0c1wiO1xudmFyIEdMT0JfVFNYID0gXCIqKi8qLj8oW2NtXSl0c3hcIjtcbnZhciBHTE9CX0UyRSA9IGAqKi9lMmUvKiovKi57dGVzdCxzcGVjfS4ke0dMT0JfU1JDX0VYVH1gO1xudmFyIEdMT0JfVEVTVCA9IGAqKi90ZXN0cy8qKi8qLnt0ZXN0LHNwZWN9LiR7R0xPQl9TUkNfRVhUfWA7XG52YXIgR0xPQl9FWENMVURFID0gW1xuICBcIioqL25vZGVfbW9kdWxlc1wiLFxuICBcIioqL2Rpc3RcIixcbiAgXCIqKi9wYWNrYWdlLWxvY2suanNvblwiLFxuICBcIioqL3lhcm4ubG9ja1wiLFxuICBcIioqL3BucG0tbG9jay55YW1sXCIsXG4gIFwiKiovYnVuLmxvY2tiXCIsXG4gIFwiKiovb3V0cHV0XCIsXG4gIFwiKiovY292ZXJhZ2VcIixcbiAgXCIqKi90ZW1wXCIsXG4gIFwiKiovLnRlbXBcIixcbiAgXCIqKi90bXBcIixcbiAgXCIqKi8udG1wXCIsXG4gIFwiKiovLmhpc3RvcnlcIixcbiAgXCIqKi8ubmV4dFwiLFxuICBcIioqLy52ZXJjZWxcIixcbiAgXCIqKi8uY2hhbmdlc2V0XCIsXG4gIFwiKiovLmNhY2hlXCIsXG4gIFwiKiovQ0hBTkdFTE9HKi5tZFwiLFxuICBcIioqL0xJQ0VOU0UqXCJcbl07XG5cbi8vIHNyYy9jb25maWdzL2lnbm9yZXMudHNcbnZhciBpZ25vcmVzID0gW1xuICB7XG4gICAgaWdub3JlczogR0xPQl9FWENMVURFXG4gIH1cbl07XG5cbi8vIHNyYy9jb25maWdzL2ltcG9ydC1zb3J0LnRzXG52YXIgaW1wb3J0U29ydCA9IFtcbiAge1xuICAgIG5hbWU6IFwidHN6aG9uZzA0MTE6aW1wb3J0LXNvcnRcIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICBcInNpbXBsZS1pbXBvcnQtc29ydFwiOiBkZWZhdWx0MTNcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICBcInNpbXBsZS1pbXBvcnQtc29ydC9pbXBvcnRzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBzOiBbW1N0cmluZy5yYXdgXkA/XFx3YF0sIFtTdHJpbmcucmF3YF5bXFx3XWBdLCBbXCJeXCJdLCBbU3RyaW5nLnJhd2BeXFwuYF1dXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInNpbXBsZS1pbXBvcnQtc29ydC9leHBvcnRzXCI6IFwiZXJyb3JcIlxuICAgIH1cbiAgfVxuXTtcblxuLy8gc3JjL2NvbmZpZ3MvaW1wb3J0cy50c1xudmFyIGltcG9ydHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOmltcG9ydHNcIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICBpbXBvcnQ6IGltcG9ydFBsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIFwiaW1wb3J0L25vLWFtZFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1jb21tb25qc1wiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9maXJzdFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1kdXBsaWNhdGVzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1wiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1uYW1lZC1kZWZhdWx0XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLXNlbGYtaW1wb3J0XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLXdlYnBhY2stbG9hZGVyLXN5bnRheFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uZXdsaW5lLWFmdGVyLWltcG9ydFwiOiBbXCJlcnJvclwiLCB7IGNvdW50OiAxIH1dXG4gICAgfVxuICB9XG5dO1xuXG4vLyBzcmMvY29uZmlncy9qYXZhc2NyaXB0LnRzXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiZ2xvYmFsc1wiO1xudmFyIGphdmFzY3JpcHQgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOmphdmFzY3JpcHRcIixcbiAgICBsYW5ndWFnZU9wdGlvbnM6IHtcbiAgICAgIGVjbWFWZXJzaW9uOiAyMDIyLFxuICAgICAgZ2xvYmFsczoge1xuICAgICAgICAuLi5nbG9iYWxzLmJyb3dzZXIsXG4gICAgICAgIC4uLmdsb2JhbHMubm9kZSxcbiAgICAgICAgLi4uZ2xvYmFscy5lczIwMjIsXG4gICAgICAgIGRvY3VtZW50OiBcInJlYWRvbmx5XCIsXG4gICAgICAgIG5hdmlnYXRvcjogXCJyZWFkb25seVwiLFxuICAgICAgICB3aW5kb3c6IFwicmVhZG9ubHlcIlxuICAgICAgfSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAganN4OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGVjbWFWZXJzaW9uOiAyMDIyLFxuICAgICAgICBzb3VyY2VUeXBlOiBcIm1vZHVsZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBsaW50ZXJPcHRpb25zOiB7XG4gICAgICByZXBvcnRVbnVzZWREaXNhYmxlRGlyZWN0aXZlczogdHJ1ZVxuICAgIH0sXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJ1bnVzZWQtaW1wb3J0c1wiOiBkZWZhdWx0MTdcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzLFxuICAgICAgXCJ1bnVzZWQtaW1wb3J0cy9uby11bnVzZWQtaW1wb3J0c1wiOiBcImVycm9yXCIsXG4gICAgICBcInVudXNlZC1pbXBvcnRzL25vLXVudXNlZC12YXJzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgdmFyczogXCJhbGxcIixcbiAgICAgICAgICB2YXJzSWdub3JlUGF0dGVybjogXCJeX1wiLFxuICAgICAgICAgIGFyZ3M6IFwiYWZ0ZXItdXNlZFwiLFxuICAgICAgICAgIGFyZ3NJZ25vcmVQYXR0ZXJuOiBcIl5fXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXTtcblxuLy8gc3JjL2NvbmZpZ3MvbmV4dC50c1xudmFyIG5leHQgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOm5leHRcIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICBcIkBuZXh0L25leHRcIjogZGVmYXVsdDRcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICAuLi5kZWZhdWx0NC5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzLFxuICAgICAgLi4uZGVmYXVsdDQuY29uZmlnc1tcImNvcmUtd2ViLXZpdGFsc1wiXS5ydWxlcyxcbiAgICAgIFwiQG5leHQvbmV4dC9uby1odG1sLWxpbmstZm9yLXBhZ2VzXCI6IFwib2ZmXCJcbiAgICB9XG4gIH1cbl07XG5cbi8vIHNyYy9jb25maWdzL3BsYXl3cmlnaHQudHNcbnZhciBwbGF5d3JpZ2h0ID0gW1xuICB7XG4gICAgbmFtZTogXCJ0c3pob25nMDQxMTpwbGF5d3JpZ2h0XCIsXG4gICAgLi4uZGVmYXVsdDEwLmNvbmZpZ3NbXCJmbGF0L3JlY29tbWVuZGVkXCJdLFxuICAgIGZpbGVzOiBbR0xPQl9FMkVdXG4gIH1cbl07XG5cbi8vIHNyYy9jb25maWdzL3ByZXR0aWVyLnRzXG52YXIgcHJldHRpZXIgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOnByZXR0aWVyXCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgcHJldHRpZXI6IGRlZmF1bHQxMVxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC8vIEF2b2lkIGNvbmZsaWN0c1xuICAgICAgLi4uZGVmYXVsdDcucnVsZXMsXG4gICAgICBcInByZXR0aWVyL3ByZXR0aWVyXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiYXJyb3ctYm9keS1zdHlsZVwiOiBcIm9mZlwiLFxuICAgICAgXCJwcmVmZXItYXJyb3ctY2FsbGJhY2tcIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuLy8gc3JjL2NvbmZpZ3MvcmVhY3QudHNcbnZhciByZWFjdCA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHBsdWdpbnMgPSBkZWZhdWx0My5jb25maWdzLmFsbC5wbHVnaW5zO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwidHN6aG9uZzA0MTE6cmVhY3RcIixcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0XCI6IHBsdWdpbnNbXCJAZXNsaW50LXJlYWN0XCJdLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvZG9tXCI6IHBsdWdpbnNbXCJAZXNsaW50LXJlYWN0L2RvbVwiXSxcbiAgICAgICAgXCJyZWFjdC1ob29rc1wiOiBkZWZhdWx0MTIsXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9ob29rcy1leHRyYVwiOiBwbHVnaW5zW1wiQGVzbGludC1yZWFjdC9ob29rcy1leHRyYVwiXSxcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L25hbWluZy1jb252ZW50aW9uXCI6IHBsdWdpbnNbXCJAZXNsaW50LXJlYWN0L25hbWluZy1jb252ZW50aW9uXCJdLFxuICAgICAgICBcImpzeC1hMTF5XCI6IGRlZmF1bHQ5XG4gICAgICB9LFxuICAgICAgZmlsZXM6IFtHTE9CX0pTLCBHTE9CX0pTWCwgR0xPQl9UUywgR0xPQl9UU1hdLFxuICAgICAgbGFuZ3VhZ2VPcHRpb25zOiB7XG4gICAgICAgIHBhcnNlcjogZGVmYXVsdDYsXG4gICAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgICBlY21hRmVhdHVyZXM6IHtcbiAgICAgICAgICAgIGpzeDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvamVjdDogb3B0aW9ucz8ucHJvamVjdCxcbiAgICAgICAgICBzb3VyY2VUeXBlOiBcIm1vZHVsZVwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBydWxlczoge1xuICAgICAgICAuLi5kZWZhdWx0My5jb25maWdzW1wicmVjb21tZW5kZWQtdHlwZS1jaGVja2VkXCJdLnJ1bGVzLFxuICAgICAgICAuLi5kZWZhdWx0My5jb25maWdzLmRvbS5ydWxlcyxcbiAgICAgICAgLi4uZGVmYXVsdDEyLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICAgIC4uLmRlZmF1bHQ5LmNvbmZpZ3Muc3RyaWN0LnJ1bGVzLFxuICAgICAgICAvLyBAZXNsaW50LXJlYWN0XG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9uby1taXNzaW5nLWNvbXBvbmVudC1kaXNwbGF5LW5hbWVcIjogXCJlcnJvclwiLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3Qvbm8tY2xhc3MtY29tcG9uZW50XCI6IFwiZXJyb3JcIixcbiAgICAgICAgLy8gQGVzbGludC1yZWFjdC9kb21cbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L2RvbS9uby1kYW5nZXJvdXNseS1zZXQtaW5uZXJodG1sXCI6IFwib2ZmXCIsXG4gICAgICAgIC8vIEBlc2xpbnQtcmVhY3QvaG9va3MtZXh0cmFcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L2hvb2tzLWV4dHJhL2Vuc3VyZS1jdXN0b20taG9va3MtdXNpbmctb3RoZXItaG9va3NcIjogXCJlcnJvclwiLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvaG9va3MtZXh0cmEvcHJlZmVyLXVzZS1zdGF0ZS1sYXp5LWluaXRpYWxpemF0aW9uXCI6IFwiZXJyb3JcIixcbiAgICAgICAgLy8gQGVzbGludC1yZWFjdC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvbmFtaW5nLWNvbnZlbnRpb24vY29tcG9uZW50LW5hbWVcIjogXCJlcnJvclwiLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvbmFtaW5nLWNvbnZlbnRpb24vZmlsZW5hbWVcIjogW1xuICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBydWxlOiBcImtlYmFiLWNhc2VcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L25hbWluZy1jb252ZW50aW9uL3VzZS1zdGF0ZVwiOiBcImVycm9yXCIsXG4gICAgICAgIC8vIGpzeC1hMTF5XG4gICAgICAgIFwianN4LWExMXkvYWx0LXRleHRcIjogW1xuICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50czogW1wiaW1nXCJdLFxuICAgICAgICAgICAgaW1nOiBbXCJJbWFnZVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJqc3gtYTExeS9sYW5nXCI6IFwiZXJyb3JcIlxuICAgICAgfSxcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgIFwianN4LWExMXlcIjoge1xuICAgICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEJ1dHRvbjogXCJidXR0b25cIixcbiAgICAgICAgICAgIEltYWdlOiBcImltZ1wiLFxuICAgICAgICAgICAgSW5wdXQ6IFwiaW5wdXRcIixcbiAgICAgICAgICAgIFRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICAgICAgICBMaW5rOiBcImFcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXTtcbn07XG5cbi8vIHNyYy9jb25maWdzL3NvbmFyanMudHNcbnZhciBzb25hcmpzID0gW1xuICB7XG4gICAgbmFtZTogXCJ0c3pob25nMDQxMTpzb25hcmpzXCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgc29uYXJqczogc29uYXJqc1BsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLnNvbmFyanNQbHVnaW4uY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwic29uYXJqcy9uby1kdXBsaWNhdGUtc3RyaW5nXCI6IFwib2ZmXCJcbiAgICB9XG4gIH1cbl07XG5cbi8vIHNyYy9jb25maWdzL3RhaWx3aW5kY3NzLnRzXG52YXIgdGFpbHdpbmRjc3MgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOnRhaWx3aW5kY3NzXCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgdGFpbHdpbmRjc3M6IGRlZmF1bHQxNFxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQxNC5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzLFxuICAgICAgLy8gRG9uZSBieSBQcmV0dGllclxuICAgICAgXCJ0YWlsd2luZGNzcy9jbGFzc25hbWVzLW9yZGVyXCI6IFwib2ZmXCIsXG4gICAgICAvLyBUdXJuIG9mZiBkdWUgdG8gcG9vciBwZXJmb3JtYW5jZVxuICAgICAgXCJ0YWlsd2luZGNzcy9uby1jdXN0b20tY2xhc3NuYW1lXCI6IFwib2ZmXCJcbiAgICB9LFxuICAgIHNldHRpbmdzOiB7XG4gICAgICB0YWlsd2luZGNzczoge1xuICAgICAgICBjYWxsZWVzOiBbXCJjblwiLCBcImN2YVwiXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXTtcblxuLy8gc3JjL2NvbmZpZ3MvdGVzdGluZy1saWJyYXJ5LnRzXG52YXIgdGVzdGluZ0xpYnJhcnkgPSBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOnRlc3RpbmctbGlicmFyeVwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwidGVzdGluZy1saWJyYXJ5XCI6IGRlZmF1bHQxNVxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQxNS5jb25maWdzLnJlYWN0LnJ1bGVzXG4gICAgfSxcbiAgICBmaWxlczogW0dMT0JfVEVTVF1cbiAgfVxuXTtcblxuLy8gc3JjL2NvbmZpZ3MvdHVyYm8udHNcbnZhciB0dXJibyA9IFtcbiAge1xuICAgIG5hbWU6IFwidHN6aG9uZzA0MTE6dHVyYm9cIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICB0dXJibzogdHVyYm9QbHVnaW5cbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICAuLi50dXJib1BsdWdpbi5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzXG4gICAgfVxuICB9XG5dO1xuXG4vLyBzcmMvY29uZmlncy90eXBlc2NyaXB0LnRzXG52YXIgdHlwZXNjcmlwdCA9IChvcHRpb25zKSA9PiBbXG4gIHtcbiAgICBuYW1lOiBcInRzemhvbmcwNDExOnR5cGVzY3JpcHRcIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludFwiOiBkZWZhdWx0NVxuICAgIH0sXG4gICAgZmlsZXM6IFtHTE9CX1RTLCBHTE9CX1RTWF0sXG4gICAgbGFuZ3VhZ2VPcHRpb25zOiB7XG4gICAgICBwYXJzZXI6IGRlZmF1bHQ2LFxuICAgICAgcGFyc2VyT3B0aW9uczoge1xuICAgICAgICBlY21hRmVhdHVyZXM6IHtcbiAgICAgICAgICBqc3g6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucz8ucHJvamVjdCxcbiAgICAgICAgdHNjb25maWdSb290RGlyOiBvcHRpb25zPy50c2NvbmZpZ1Jvb3REaXIsXG4gICAgICAgIHNvdXJjZVR5cGU6IFwibW9kdWxlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICAuLi5kZWZhdWx0NS5jb25maWdzW1wicmVjb21tZW5kZWQtdHlwZS1jaGVja2VkXCJdLnJ1bGVzLFxuICAgICAgLi4uZGVmYXVsdDUuY29uZmlnc1tcInN0cmljdC10eXBlLWNoZWNrZWRcIl0ucnVsZXMsXG4gICAgICAuLi5kZWZhdWx0NS5jb25maWdzW1wic3R5bGlzdGljLXR5cGUtY2hlY2tlZFwiXS5ydWxlcyxcbiAgICAgIC4uLmRlZmF1bHQ1LmNvbmZpZ3NbXCJlc2xpbnQtcmVjb21tZW5kZWRcIl0ub3ZlcnJpZGVzWzBdLnJ1bGVzLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvYXJyYXktdHlwZVwiOiBbXCJlcnJvclwiLCB7IGRlZmF1bHQ6IFwiYXJyYXktc2ltcGxlXCIgfV0sXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1pbnZhbGlkLXRoaXNcIjogXCJlcnJvclwiLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tc2hhZG93XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2NvbnNpc3RlbnQtdHlwZS1pbXBvcnRzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgcHJlZmVyOiBcInR5cGUtaW1wb3J0c1wiLFxuICAgICAgICAgIGZpeFN0eWxlOiBcImlubGluZS10eXBlLWltcG9ydHNcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtdGVtcGxhdGUtZXhwcmVzc2lvbnNcIjogW1wiZXJyb3JcIiwgeyBhbGxvd051bWJlcjogdHJ1ZSB9XSxcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVwiOiBcIm9mZlwiLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGxcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2Vzc1wiOiBcIm9mZlwiLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvY29uc2lzdGVudC10eXBlLWRlZmluaXRpb25zXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cIjogXCJvZmZcIixcbiAgICAgIC8vIFR1cm4gb2ZmIGR1ZSB0byBwb29yIHBlcmZvcm1hbmNlXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlc1wiOiBcIm9mZlwiXG4gICAgfVxuICB9XG5dO1xuXG4vLyBzcmMvY29uZmlncy91bmljb3JuLnRzXG52YXIgdW5pY29ybiA9IFtcbiAge1xuICAgIG5hbWU6IFwidHN6aG9uZzA0MTE6dW5pY29yblwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHVuaWNvcm46IGRlZmF1bHQxNlxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQxNi5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzLFxuICAgICAgXCJ1bmljb3JuL25vLWF3YWl0LWV4cHJlc3Npb24tbWVtYmVyXCI6IFwib2ZmXCIsXG4gICAgICBcInVuaWNvcm4vbm8tbnVsbFwiOiBcIm9mZlwiLFxuICAgICAgXCJ1bmljb3JuL3ByZWZlci1leHBvcnQtZnJvbVwiOiBbXCJlcnJvclwiLCB7IGlnbm9yZVVzZWRWYXJpYWJsZXM6IHRydWUgfV0sXG4gICAgICBcInVuaWNvcm4vcHJldmVudC1hYmJyZXZpYXRpb25zXCI6IFwib2ZmXCJcbiAgICB9XG4gIH1cbl07XG5cbi8vIHNyYy9lbnYudHNcbmltcG9ydCB7IGlzUGFja2FnZUV4aXN0cyB9IGZyb20gXCJsb2NhbC1wa2dcIjtcbnZhciBoYXNUeXBlU2NyaXB0ID0gaXNQYWNrYWdlRXhpc3RzKFwidHlwZXNjcmlwdFwiKTtcbnZhciBoYXNUdXJibyA9IGlzUGFja2FnZUV4aXN0cyhcInR1cmJvXCIpO1xuXG4vLyBzcmMvaW5kZXgudHNcbnZhciB0c3pob25nMDQxMSA9IGFzeW5jIChvcHRpb25zID0ge30sIC4uLnVzZXJDb25maWdzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB0eXBlc2NyaXB0OiBlbmFibGVUeXBlU2NyaXB0ID0gaGFzVHlwZVNjcmlwdCxcbiAgICByZWFjdDogZW5hYmxlUmVhY3QgPSBmYWxzZSxcbiAgICB0dXJibzogZW5hYmxlVHVyYm8gPSBoYXNUdXJibyxcbiAgICBuZXh0OiBlbmFibGVOZXh0ID0gZmFsc2UsXG4gICAgcGxheXdyaWdodDogZW5hYmxlUGxheXdyaWdodCA9IGZhbHNlLFxuICAgIHRlc3RpbmdMaWJyYXJ5OiBlbmFibGVUZXN0aW5nTGlicmFyeSA9IGZhbHNlLFxuICAgIGdpdGlnbm9yZTogZW5hYmxlR2l0aWdub3JlID0gdHJ1ZVxuICB9ID0gb3B0aW9ucztcbiAgY29uc3QgY29uZmlncyA9IFtdO1xuICBpZiAoZW5hYmxlR2l0aWdub3JlKSB7XG4gICAgY29uZmlncy5wdXNoKChhd2FpdCBpbXBvcnQoXCJlc2xpbnQtY29uZmlnLWZsYXQtZ2l0aWdub3JlXCIpKS5kZWZhdWx0KCkpO1xuICB9XG4gIGNvbmZpZ3MucHVzaChcbiAgICAuLi5pZ25vcmVzLFxuICAgIC4uLmphdmFzY3JpcHQsXG4gICAgLi4udW5pY29ybixcbiAgICAuLi5jb21tZW50cyxcbiAgICAuLi5pbXBvcnRTb3J0LFxuICAgIC4uLnNvbmFyanMsXG4gICAgLi4udGFpbHdpbmRjc3MsXG4gICAgLi4uaW1wb3J0cyxcbiAgICAuLi5wcmV0dGllclxuICApO1xuICBpZiAoZW5hYmxlVHlwZVNjcmlwdCkge1xuICAgIGNvbmZpZ3MucHVzaCguLi50eXBlc2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuICBpZiAoZW5hYmxlUmVhY3QpIHtcbiAgICBjb25maWdzLnB1c2goLi4ucmVhY3Qob3B0aW9ucykpO1xuICB9XG4gIGlmIChlbmFibGVUdXJibykge1xuICAgIGNvbmZpZ3MucHVzaCguLi50dXJibyk7XG4gIH1cbiAgaWYgKGVuYWJsZU5leHQpIHtcbiAgICBjb25maWdzLnB1c2goLi4ubmV4dCk7XG4gIH1cbiAgaWYgKGVuYWJsZVBsYXl3cmlnaHQpIHtcbiAgICBjb25maWdzLnB1c2goLi4ucGxheXdyaWdodCk7XG4gIH1cbiAgaWYgKGVuYWJsZVRlc3RpbmdMaWJyYXJ5KSB7XG4gICAgY29uZmlncy5wdXNoKC4uLnRlc3RpbmdMaWJyYXJ5KTtcbiAgfVxuICBjb25maWdzLnB1c2goLi4udXNlckNvbmZpZ3MpO1xuICByZXR1cm4gY29uZmlncztcbn07XG52YXIgc3JjX2RlZmF1bHQgPSB0c3pob25nMDQxMTtcbmV4cG9ydCB7XG4gIHNyY19kZWZhdWx0IGFzIGRlZmF1bHRcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvdGF1ZmlxL0NvZGUvVFMvZmlxbGFiL3BhY2thZ2VzL2VzbGludC1jb25maWcvZXNsaW50LmNvbmZpZy5tanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3RhdWZpcS9Db2RlL1RTL2ZpcWxhYi9wYWNrYWdlcy9lc2xpbnQtY29uZmlnXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy90YXVmaXEvQ29kZS9UUy9maXFsYWIvcGFja2FnZXMvZXNsaW50LWNvbmZpZy9lc2xpbnQuY29uZmlnLm1qc1wiO2ltcG9ydCB0c3pob25nMDQxMSBmcm9tICcuL2Rpc3QvaW5kZXguanMnXG5cbmV4cG9ydCBkZWZhdWx0IHRzemhvbmcwNDExKHtcbiAgcHJvamVjdDogJy4vdHNjb25maWcuanNvbicsXG4gIHRzY29uZmlnUm9vdERpcjogaW1wb3J0Lm1ldGEuZGlybmFtZSxcbiAgcmVhY3Q6IHRydWUsXG4gIG5leHQ6IHRydWUsXG4gIHBsYXl3cmlnaHQ6IHRydWUsXG4gIHRlc3RpbmdMaWJyYXJ5OiB0cnVlLFxuICB0dXJibzogdHJ1ZSxcbiAgdHlwZXNjcmlwdDogdHJ1ZVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLFdBQVcsZ0JBQWdC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
