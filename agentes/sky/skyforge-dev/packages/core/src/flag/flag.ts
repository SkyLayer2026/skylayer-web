import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["SKYFORGE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("SKYFORGE_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  SKYFORGE_AUTO_HEAP_SNAPSHOT: truthy("SKYFORGE_AUTO_HEAP_SNAPSHOT"),
  SKYFORGE_GIT_BASH_PATH: process.env["SKYFORGE_GIT_BASH_PATH"],
  SKYFORGE_CONFIG: process.env["SKYFORGE_CONFIG"],
  SKYFORGE_CONFIG_CONTENT: process.env["SKYFORGE_CONFIG_CONTENT"],
  SKYFORGE_DISABLE_AUTOUPDATE: truthy("SKYFORGE_DISABLE_AUTOUPDATE"),
  SKYFORGE_ALWAYS_NOTIFY_UPDATE: truthy("SKYFORGE_ALWAYS_NOTIFY_UPDATE"),
  SKYFORGE_DISABLE_PRUNE: truthy("SKYFORGE_DISABLE_PRUNE"),
  SKYFORGE_DISABLE_TERMINAL_TITLE: truthy("SKYFORGE_DISABLE_TERMINAL_TITLE"),
  SKYFORGE_SHOW_TTFD: truthy("SKYFORGE_SHOW_TTFD"),
  SKYFORGE_DISABLE_AUTOCOMPACT: truthy("SKYFORGE_DISABLE_AUTOCOMPACT"),
  SKYFORGE_DISABLE_MODELS_FETCH: truthy("SKYFORGE_DISABLE_MODELS_FETCH"),
  SKYFORGE_DISABLE_MOUSE: truthy("SKYFORGE_DISABLE_MOUSE"),
  SKYFORGE_FAKE_VCS: process.env["SKYFORGE_FAKE_VCS"],
  SKYFORGE_SERVER_PASSWORD: process.env["SKYFORGE_SERVER_PASSWORD"],
  SKYFORGE_SERVER_USERNAME: process.env["SKYFORGE_SERVER_USERNAME"],

  // Experimental
  SKYFORGE_EXPERIMENTAL_FILEWATCHER: Config.boolean("SKYFORGE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  SKYFORGE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("SKYFORGE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  SKYFORGE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("SKYFORGE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  SKYFORGE_MODELS_URL: process.env["SKYFORGE_MODELS_URL"],
  SKYFORGE_MODELS_PATH: process.env["SKYFORGE_MODELS_PATH"],
  SKYFORGE_DB: process.env["SKYFORGE_DB"],

  SKYFORGE_WORKSPACE_ID: process.env["SKYFORGE_WORKSPACE_ID"],
  SKYFORGE_EXPERIMENTAL_WORKSPACES: enabledByExperimental("SKYFORGE_EXPERIMENTAL_WORKSPACES"),
  SKYFORGE_EXPERIMENTAL_SESSION_SWITCHER: enabledByExperimental("SKYFORGE_EXPERIMENTAL_SESSION_SWITCHER"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get SKYFORGE_DISABLE_PROJECT_CONFIG() {
    return truthy("SKYFORGE_DISABLE_PROJECT_CONFIG")
  },
  get SKYFORGE_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("SKYFORGE_EXPERIMENTAL_REFERENCES")
  },
  get SKYFORGE_TUI_CONFIG() {
    return process.env["SKYFORGE_TUI_CONFIG"]
  },
  get SKYFORGE_CONFIG_DIR() {
    return process.env["SKYFORGE_CONFIG_DIR"]
  },
  get SKYFORGE_PURE() {
    return truthy("SKYFORGE_PURE")
  },
  get SKYFORGE_PERMISSION() {
    return process.env["SKYFORGE_PERMISSION"]
  },
  get SKYFORGE_PLUGIN_META_FILE() {
    return process.env["SKYFORGE_PLUGIN_META_FILE"]
  },
  get SKYFORGE_CLIENT() {
    return process.env["SKYFORGE_CLIENT"] ?? "cli"
  },
}
