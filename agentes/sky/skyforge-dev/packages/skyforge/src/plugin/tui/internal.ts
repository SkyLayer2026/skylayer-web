import { Flag } from "@skyforge/core/flag/flag"
import { createBuiltinPlugins, type BuiltinTuiPlugin } from "@skyforge/tui/builtins"
import type { RuntimeFlags } from "@/effect/runtime-flags"

export type InternalTuiPlugin = BuiltinTuiPlugin

export function internalTuiPlugins(flags: Pick<RuntimeFlags.Info, "experimentalEventSystem">): InternalTuiPlugin[] {
  return createBuiltinPlugins({
    experimentalEventSystem: flags.experimentalEventSystem,
    experimentalSessionSwitcher: Flag.OPENCODE_EXPERIMENTAL_SESSION_SWITCHER,
  })
}
