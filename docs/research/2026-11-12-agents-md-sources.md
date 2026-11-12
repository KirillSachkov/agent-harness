# AGENTS.md / CLAUDE.md: what primary sources say about writing and maintaining them

Research date: 2026-11-12. All sources accessed 2026-11-12.
Scope: how to write and maintain a project instruction file for coding agents, what tooling exists, and what matters for a repo where `CLAUDE.md` is a symlink to `AGENTS.md` and both Claude Code and Codex are used.

Labels used below: **[doc]** first-party product documentation (describes behaviour), **[code]** source code (strongest evidence for behaviour), **[opinion]** practitioner or vendor advice without measurement, **[measured]** empirical result.

## Sources

| # | Source | URL | Publisher | Date shown | Type |
|---|---|---|---|---|---|
| S1 | A Complete Guide to AGENTS.md | https://www.aihero.dev/a-complete-guide-to-agents-md | AI Hero (Matt Pocock's site; no byline on page) | updated 2026-01-18 (front matter `updatedAt`) | opinion |
| S2 | How Claude remembers your project | https://code.claude.com/docs/en/memory | Anthropic | date not shown | doc |
| S3 | Best practices for Claude Code | https://code.claude.com/docs/en/best-practices (old URL https://www.anthropic.com/engineering/claude-code-best-practices now 308-redirects here) | Anthropic | date not shown | doc + opinion |
| S4 | claude-md-management plugin | https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management | Anthropic (author Isabella He) | last commit touching plugin 2026-02-20 (`aecd4c8`) | tool |
| S5 | AGENTS.md site | https://agents.md | Agentic AI Foundation / LF Projects, LLC | date not shown | spec-ish doc |
| S6 | agentsmd/agents.md repo | https://github.com/agentsmd/agents.md (`openai/agents.md` resolves to it via GitHub API) | agentsmd org, MIT | last commit 2026-09-10 (`d001185`) | site source |
| S7 | Codex AGENTS.md guide | https://learn.chatgpt.com/docs/agent-configuration/agents-md (old https://developers.openai.com/codex/guides/agents-md 308-redirects here) | OpenAI | date not shown | doc |
| S8 | Codex source `codex-rs/core/src/agents_md.rs` | https://github.com/openai/codex/blob/main/codex-rs/core/src/agents_md.rs | OpenAI | main at `d2f7632` (2026-11-12) | code |
| S9 | Codex slash commands | https://developers.openai.com/codex/cli/slash-commands | OpenAI | date not shown (seen only via search snippet) | doc |
| S10 | Add repository custom instructions for Copilot | https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions | GitHub | date not shown | doc |
| S11 | Cursor Rules | https://cursor.com/docs/context/rules | Cursor (Anysphere) | date not shown | doc |
| S12 | Gemini CLI: GEMINI.md | https://geminicli.com/docs/cli/gemini-md/ | Google | updated 2026-06-18 | doc |
| S13 | Aider: Specifying coding conventions | https://aider.chat/docs/usage/conventions.html | Aider | date not shown | doc |
| S14 | mattpocock/skills (writing-for-agents, setup-matt-pocock-skills, retro) | https://github.com/mattpocock/skills | Matt Pocock | main at `5863806` (2026-11-12) | opinion + tool |
| S15 | Writing a good CLAUDE.md | https://www.humanlayer.dev/blog/writing-a-good-claude-md | HumanLayer (Kyle) | 2025-11-25 | opinion (secondary; cited by S1) |
| E1 | Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?" | https://arxiv.org/abs/2602.11988 | ETH Zurich et al. | v1 2026-02-12, v3 2026-09-29 | measured |
| E2 | Lulla et al., "On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents" | https://arxiv.org/abs/2601.20404 | Univ. of Otago et al. | v1 2026-01-28, v2 2026-03-30 | measured |
| E3 | Chatlatanagulchai et al., "Agent READMEs: An Empirical Study of Context Files for Agentic Coding" | https://arxiv.org/abs/2511.12884 | academic | v1 2025-11-17, v2 2026-08-09 | measured (descriptive) |
| E4 | Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?" (IFScale) | https://arxiv.org/abs/2507.11538 | Distyl AI | v1 2025-07-15 | measured (not coding) |

## Findings per source

### S1. AI Hero, "A Complete Guide to AGENTS.md" [opinion]

Every concrete recommendation on the page:

1. Minimal file. "the ideal AGENTS.md file should be as small as possible."
2. Root file holds only: a one-sentence project description, the package manager if not npm, non-standard build/typecheck commands. "Be ruthless about what goes here."
3. The one-sentence description anchors scope: "This single sentence gives the agent context about why they're working in this repository."
4. Name the package manager explicitly; consider Corepack so the system handles wrong-manager warnings.
5. Do not grow the file one rule per misbehaviour; it becomes a "ball of mud". Do periodic style passes to remove conflicting opinions from different developers ("Nobody does a full style pass.").
6. Do not auto-generate: "Never use initialization scripts to auto-generate your AGENTS.md."
7. Instruction budget: every token "gets loaded on every single request, regardless of whether it's relevant." Cites S15 for "~150-200 instructions" (see E4 for what the underlying paper actually measured).
8. Stale docs are worse than none: "stale information actively _poisons_ the context."
9. Avoid file paths (they move); "Instead of documenting structure, describe capabilities." Let the agent build just-in-time docs during planning. Domain concepts are more stable than paths, but "Keep a light touch."
10. Progressive disclosure: "give the agent only what it needs right now, and point it to other resources when needed." Put language/tool rules in `docs/TYPESCRIPT.md`, `docs/TESTING.md`, etc., referenced conversationally; docs may link to further docs (a tree); link external docs; use skills.
11. No forceful emphasis: "no "always," no all-caps forcing."
12. Monorepos: nested AGENTS.md files "merge with the root level"; root holds monorepo purpose, navigation, shared tools; packages hold their own stack and conventions. "Don't overload any level."
13. Symlink for Claude Code: `ln -s AGENTS.md CLAUDE.md`.
14. Provides a refactoring prompt: find contradictions and ask which to keep; extract root essentials; group the rest into topic files; output a minimal root with links plus a `docs/` layout; flag redundant, vague or obvious instructions (e.g. "write clean code") for deletion.

No studies are cited besides S15.

### S2. Claude Code docs, memory page [doc]

- Status: "Claude treats them as context, not enforced configuration." For hard blocks use a PreToolUse hook. "The more specific and concise your instructions, the more consistently Claude follows them."
- When to add: "Treat CLAUDE.md as the place you write down what you'd otherwise re-explain." Triggers: Claude makes the same mistake a second time; a code review catches something Claude should have known; you repeat a correction from last session; a new teammate would need the same context.
- What belongs: "Keep it to facts Claude should hold in every session: build commands, conventions, project layout, "always do X" rules." Multi-step procedures or area-specific rules go to skills or path-scoped rules.
- Writing: be concrete and verifiable ("Use 2-space indentation" not "Format code properly"). Size: "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." Structure with headers and bullets. Consistency: "if two instructions contradict each other, Claude may pick one arbitrarily."
- Locations and order: managed policy, user `~/.claude/CLAUDE.md`, project `./CLAUDE.md` or `./.claude/CLAUDE.md`, local `./CLAUDE.local.md` (gitignore it). "All discovered files are concatenated into context rather than overriding each other." Ancestors load at launch, root first, so closer files are read last; `CLAUDE.local.md` is appended after `CLAUDE.md` at each level.
- Subdirectories: subdirectory CLAUDE.md files load on demand, when Claude reads/writes/edits a file there. On-demand files and path-scoped rules have a per-file cap (40,000 characters with a 200K window; 150,000-200,000 with 1M) and are truncated beyond it. Launch-time files load whole up to 4 MiB.
- Imports: `@path/to/import`, relative to the importing file, "maximum depth of four hops". Imports inside code spans/fences are not expanded. External imports (outside the working dir) need one-time approval. "Imports help you organize a long file but don't reduce its context cost."
- `.claude/rules/*.md`: one topic per file, discovered recursively. Without `paths` frontmatter they load at launch; with `paths:` globs they load when Claude touches a matching file. Symlinks into `.claude/rules/` are supported.
- HTML comments: "Block-level HTML comments (`<!-- maintainer notes -->`) in CLAUDE.md files are stripped before the content is injected into Claude's context."
- `/init`: "Claude analyzes your codebase and creates a file with build commands, test instructions, and project conventions it discovers. If a CLAUDE.md already exists, `/init` suggests improvements rather than overwriting it." With `CLAUDE_CODE_NEW_INIT=1` it runs an interactive multi-phase flow (CLAUDE.md, skills, hooks) and also migrates `AGENTS.md`, `.devin/rules/`, `.windsurf/rules/`, `.clinerules`. Plain `/init` imports Cursor and Copilot rules. `/import` appends a one-time copy of another agent's files.
- Audit tooling: "run `/doctor prompt-audit`" to find "instructions written for older models, references to files or commands that don't exist, and files that contradict each other"; covers CLAUDE.md, CLAUDE.local.md, AGENTS.md, rules, skills, commands, subagents, output styles; proposes edits, changes nothing until asked. `/doctor` (checkup) "cuts content Claude can derive from the codebase, such as directory layouts, dependency lists, and architecture overviews, and keeps pitfalls, rationale, and conventions that differ from tool defaults." Startup and `/status` warn when a file is over the recommended length or the combined total is too large.
- Native AGENTS.md (v2.1.277+): "Claude Code can read `AGENTS.md` as your project instructions". Default setting `claude-md-or-agents-md`: AGENTS.md is read only when no `CLAUDE.md`, `.claude/CLAUDE.md` or `CLAUDE.local.md` exists in the working dir or above. Alternative `claude-md-and-agents-md` loads both (CLAUDE.md first, AGENTS.md after, deduplicated). Configured via `/config` or `pluginConfigs."cc-plugin-agents-md@builtin"` in user/managed settings only (ignored in project settings). "Not read: `AGENTS.local.md`, `AGENTS.override.md`, or anything under a `.agents/` directory."
- Symlink vs import: a `CLAUDE.md` containing `@AGENTS.md` is fine and never double-loads; a `CLAUDE.md` that only says in words "read AGENTS.md" is unreliable ("Claude sees `AGENTS.md` only if it decides to open the file"). Symlink caveats: "the Edit and Write tools refuse to write through a symlink, and the refusal directs Claude to edit the link's target"; on Windows use the import because symlinks check out as a one-line text file without `core.symlinks`. Verify with `/context all` or `/memory`.
- Compaction: "Project-root CLAUDE.md survives compaction"; nested files and path rules reload on demand.
- Auto memory (separate, Claude-written): `~/.claude/projects/<project>/memory/MEMORY.md`, first 200 lines or 25KB loaded per session, machine-local, shared across worktrees.

### S3. Claude Code docs, best practices [doc + opinion]

- "every line in it takes a little of Claude's attention on *every* task, whether it's relevant or not." Keep only what Claude cannot work out from code: exact test/typecheck/lint commands including a single test file; misleading code (old pattern not to copy, a live-looking-dead directory); decisions not in the repo; "Anything you've had to correct twice already".
- Shows a 10-line example (Commands / Conventions / Gotchas).
- `/init` is a start: "From there the work is mostly removing lines."
- Emphasis: "If Claude keeps ignoring a line that *is* in `CLAUDE.md`, adding IMPORTANT probably won't fix it." In the "What you can stop doing" table: "piling on emphasis mostly makes Claude over-apply the rule."
- Determinism: "If something has to happen every time, make it a hook, a deny rule, or a managed setting. `CLAUDE.md` is for guidelines". "If you keep adding emphasis to a `CLAUDE.md` line and Claude still misses it, that's a sign the line belongs in a hook."
- Architecture: old advice "Describe your architecture and file layout in `CLAUDE.md`" is retired: "Claude reads the repo itself. Only write down what isn't in there."
- Procedures go to skills ("The `CLAUDE.md` rule applies to skills too: only write down what Claude can't find on its own"); area rules to `.claude/rules/` with `paths:`; personal preferences to `CLAUDE.local.md`.

### S4. Anthropic `claude-md-management` plugin [tool]

Exists in `anthropics/claude-plugins-official`. README: "Tools to maintain and improve CLAUDE.md files - audit quality, capture session learnings, and keep project memory current."

- Skill `claude-md-improver`: finds CLAUDE.md files, scores each 0-100 on Commands/workflows, Architecture clarity, Non-obvious patterns, Conciseness, Currency, Actionability; prints a quality report first ("ALWAYS output the quality report BEFORE making any updates."), then proposes diffs and applies only after approval. Flags stale commands, missing deps, outdated architecture, missing env setup, broken test commands, undocumented gotchas.
- Command `/revise-claude-md`: end-of-session reflection on missing context (commands, style, testing, env quirks, gotchas), drafts one-line additions ("Keep it concise - one line per concept."), shows diffs, edits only approved changes (`allowed-tools: Read, Edit, Glob`).
- Drift from current docs: it searches for `.claude.local.md` rather than the documented `CLAUDE.local.md`; it ignores AGENTS.md; it scores "Architecture clarity" as High weight, which S3 now calls retired advice; it mentions a `#` shortcut not found on the current memory page (not verified). Last plugin commit is 2026-02-20, so it predates native AGENTS.md support and `/doctor prompt-audit`.

### S5/S6. agents.md site and repo [doc]

- "A simple, open format for guiding coding agents"; "Think of AGENTS.md as a README for agents". "AGENTS.md is now stewarded by the Agentic AI Foundation under the Linux Foundation."
- Format: "No. AGENTS.md is just standard Markdown." No required fields.
- Suggested sections: project overview, build and test commands, code style, testing instructions, security considerations; optionally commit/PR guidelines, deployment steps, large datasets.
- Precedence: "The closest AGENTS.md to the edited file wins"; "explicit user chat prompts override everything."
- Commands: if listed, "The agent will attempt to execute relevant programmatic checks" and fix failures before finishing.
- Maintenance: treat it as living documentation, update any time.
- Migration: rename the old file to AGENTS.md and symlink the old name.
- Lists ~23 supporting tools (Codex, Jules, Cursor, Copilot coding agent, Gemini CLI, Aider, Zed, Warp, VS Code, Devin, Junie, Amp, Windsurf, etc.). Claude Code is not in the list as shown.
- The repo (`agentsmd/agents.md`, MIT) is the Next.js site plus a sample AGENTS.md; it contains no formal spec for precedence beyond the site FAQ.

### S7/S8/S9. OpenAI Codex [doc + code]

- Global: `~/.codex` (or `$CODEX_HOME`); "Codex uses only the first non-empty file at this level", preferring `AGENTS.override.md` over `AGENTS.md`.
- Project: "Starting at the project root (typically the Git root), Codex walks down to your current working directory." Per directory it checks `AGENTS.override.md`, then `AGENTS.md`, then `project_doc_fallback_filenames`; "Codex includes at most one file per directory." The code comment adds: "We do **not** walk past the project root." Root is found by `project_root_markers` (default `.git`).
- Merge: concatenated root to leaf; "Files closer to your current directory override earlier guidance because they appear later in the combined prompt."
- Size: `project_doc_max_bytes` default 32 KiB, a combined budget across all files (S8: `AGENTS_MD_MAX_BYTES ... // 32 KiB`). Over budget, the file is truncated and a warning says "Trim your project instructions to fit the budget. If you need to keep them all, increase `project_doc_max_bytes`."
- S8 facts not in the docs: "Symlinks are allowed." Project docs are skipped entirely for untrusted projects (`active_project.is_untrusted()`). There is no `@path` import expansion in the loader, so `@file` lines are plain text to Codex. Empty files are skipped.
- Content advice in docs: keep rules concise, "reserve formatting and lint checks for CI", place overrides "as close to specialized work as possible."
- Verification: ask "Summarize the current instructions"; `codex --cd subdir`; `codex -c log_dir=./.codex-log`.
- S9: Codex `/init` "Generate an `AGENTS.md` scaffold in the current directory."
- Docs do not mention CLAUDE.md or symlinks.

### S10. GitHub Copilot [doc]

- Files: `.github/copilot-instructions.md` (repo-wide), `.github/instructions/*.instructions.md` with `applyTo` globs (and `excludeAgent`), any number of `AGENTS.md` ("the nearest `AGENTS.md` in the directory tree takes precedence"), or a single root `CLAUDE.md`/`GEMINI.md` as an alternative.
- Advice differs from S1/S3: document build/test/lint commands in working order with versions and workarounds, describe project layout and key paths, use "always" for required steps, tell the agent to trust the instructions; generated onboarding instructions capped at "2 pages". "Whenever possible, try to avoid providing conflicting sets of instructions."

### S11. Cursor [doc]

- `.cursor/rules/*.mdc` with modes Always / glob-attached / agent-requested (by description) / manual; AGENTS.md supported at root and nested, combined with parents, more specific wins.
- "Keep rules under 500 lines"; split into composable rules; reference files instead of copying; "Start simple. Add rules only when you notice Agent making the same mistake repeatedly." Avoid copying style guides (use a linter), documenting every common command, rare edge cases, and duplicating code.

### S12. Gemini CLI [doc]

- `GEMINI.md` hierarchy: global `~/.gemini/GEMINI.md`, workspace dirs and parents, and just-in-time scan when a tool touches a directory; all concatenated and sent "with every prompt". Supports `@file.md` imports. `/memory show`, `/memory reload`. Use AGENTS.md via `context.fileName: ["AGENTS.md", ...]` in `.gemini/settings.json`. Page notes Gemini CLI was replaced by Antigravity CLI on 2026-06-18 for some tiers.

### S13. Aider [doc]

- Put conventions in a small markdown file and load read-only: `/read CONVENTIONS.md` or `read:` in `.aider.conf.yml` ("marked as read-only, and cached if prompt caching is enabled"). Aider does not auto-discover AGENTS.md; S5 suggests `read: AGENTS.md`.

### S14. mattpocock/skills [opinion + tool]

- Latest main: `5863806dd4e15c63174bee4e7515a4256792ecfa` (2026-11-12, merge of PR #1416).
- `skills/productivity/writing-for-agents/` is unchanged since `a496f5513d4a4cf889bc48e189e579f4b0bdf6aa` (2026-10-29). The compare `a496f55...main` is 4 commits ahead, all touching `skills/in-progress/chief-of-staff` and `skills/in-progress/software-factory` plus changesets. Last commit to writing-for-agents is `321658273c` (2026-08-19, "Remove all em-dashes from the repo").
- There is no dedicated "write/update AGENTS.md" skill. Relevant pieces:
  - `writing-for-agents` (description: "Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md."). Key ideas: a line in AGENTS.md naming a doc is a **context pointer** whose wording decides when the agent reaches it; **context load** vs **cognitive load**; information hierarchy and progressive disclosure; **sprawl**; prefer positive instructions over **negation** ("steering by prohibition drags the forbidden behaviour into context"); pruning: single source of truth, the environment as source of truth so restating `package.json`/layout is a **cache** ("Cache what the agent cannot find by looking"), **relevance**, **sediment** ("stale layers that settle because adding feels safe and removing feels risky"), and **no-ops** ("an instruction the model already obeys by default pays load to say nothing").
  - `setup-matt-pocock-skills`: writes an `## Agent skills` block plus `docs/agents/*.md`. Rule: "If `CLAUDE.md` exists, edit it. Else if `AGENTS.md` exists, edit it." and "Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa)". Updates the block in place.
  - `retro` (user-invoked): loads writing-for-agents and proposes environment fixes, including "Global AGENTS.md: are there any steering instructions that should be moved to coding standards (or automated checks) instead?" and "No-ops: look for instructions in steering files that don't modify the agent's behavior." Prefers deterministic checks over written rules for mechanical violations.
- Matt's own repo: `CLAUDE.md` is the real file (4,206 bytes) and `AGENTS.md` is a symlink to it (git mode 120000), the reverse of S1's command. Its content is mostly repo invariants (which manifests to update, where docs live), not directory tours.

### S15. HumanLayer [opinion, secondary]

- Source of S1's "~150-200 instructions" claim, citing arXiv 2507.11538. Also: "general consensus is that < 300 lines is best, and shorter is even better"; author's root file is "less than sixty lines"; heading "Don't use `/init` or auto-generate your `CLAUDE.md`"; "Never send an LLM to do a linter's job"; "Prefer pointers to copies". Claims Claude Code wraps CLAUDE.md in a reminder that it "may or may not be relevant" (observed via proxy; not in Anthropic docs, not verified here).

### E1-E4. Empirical evidence [measured]

- **E1 (Gloaguen et al., arXiv 2602.11988, v3 2026-09-29).** Benchmarks: SWE-bench Lite (300 tasks, LLM-generated files) and CTXbench (138 instances, 12 repos with developer-committed files). Agents: Claude Code + Sonnet 4.5, Codex + GPT-5.2 / GPT-5.1 mini, Qwen Code. "providing context files does not generally improve task success rates ... while increasing inference cost by over 20% on average." LLM-generated vs none: about -0.5% (SWE-bench) and -2% (CTXbench), not significant. Developer-written vs none: about +2.4%, not significant; developer-written beat LLM-generated by about 7% (p = 0.038). LLM-generated files add 2.45-3.92 steps and ~20-23% cost. "instructions in the context files are well followed" but "repository overviews ... are not helpful." With other repo docs removed, LLM-generated files helped (~+2.7%), i.e. they mostly duplicate existing docs. Recommendations: "We therefore suggest omitting LLM-generated context files for the time being"; "Human-written context files should only include instructions required for coding agents". Python-only.
- **E2 (Lulla et al., arXiv 2601.20404, v2 2026-03-30).** 10 repos, 124 PRs, with vs without AGENTS.md: "associated with a lower median runtime" (-28.64%) and "reduced output token consumption" (-16.58%), "maintaining a comparable task completion behavior." Small, correlational, workshop-length.
- **E3 (Chatlatanagulchai et al., arXiv 2511.12884, v2 2026-08-09).** 2,303 context files from 1,925 repos (Claude Code, Codex, Copilot). Descriptive: files evolve "like configuration code" through "frequent, small additions"; common content: tests 75.9%, implementation details 70.8%, architecture 68.1%; rare: security 14.8%, performance 14.5%. Describes them as "complex, difficult-to-read artifacts". Measures what people write, not whether it helps.
- **E4 (IFScale, arXiv 2507.11538, 2025-07-15).** Keyword-inclusion in a business report, not coding. Best models reach 68% at 500 instructions; top reasoning models keep "near-perfect performance through 150 or more instructions before declining"; bias toward earlier instructions. This is the measured basis behind the popular "150-200 instructions" figure; transferring it to coding-agent instruction files is extrapolation.

## Consolidated practices

| Practice | Supported by | Disagreement / nuance |
|---|---|---|
| Keep the always-loaded file short | S1, S2 (<200 lines), S3, S7 (32 KiB total), S11 (<500 lines per rule), S15 (<300, ideally ~60), S14 (sprawl); E1 cost data | Limits differ by tool: Claude 200 lines per file (advisory, with warnings), Codex 32 KiB hard combined budget (truncates), Cursor 500 lines, Copilot "2 pages" for generated files. No source gives an evidence-based line count; E4 is not about coding. |
| Write only what the agent cannot find by looking | S3 ("only holds what Claude couldn't work out from the code itself"), S2 `/doctor`, S14 (cache, no-ops), S11, E1 (overviews not helpful; LLM files redundant with docs) | S5 and S10 still recommend project overview / layout; S4 scores "Architecture clarity" High. Current Anthropic docs and E1 side against overviews. |
| List build/test/lint commands | S3 ("the single most useful line"), S5, S10, S2, S1 (only if non-standard), S4 | S1 and S11 say list only non-standard commands; S14 treats `package.json` scripts as a source of truth not to cache. Consensus: list the exact verification commands, especially single-test and non-obvious ones. |
| Don't describe directory structure / file paths | S1 (paths go stale), S3 (retired advice), S2 `/doctor` cuts layouts, S14 (environment is the source of truth) | S2 itself lists "project layout" as fit content and gives `src/api/handlers/` as a good concrete instruction; S10 recommends layout and key paths. Middle ground: name a path when it is a convention or a trap, not as a tour. |
| No emphasis words (IMPORTANT, ALWAYS, caps) | S1, S3 (over-application), S14 (negation lever) | S10 recommends "always" for required steps. Older Anthropic advice used emphasis; current S3 retracts it. |
| Hard rules go to hooks, CI, linters, deny rules | S3, S2, S7 ("reserve formatting and lint checks for CI"), S11, S15, S14 retro | No disagreement. |
| Progressive disclosure: pointers to topic docs, skills, path-scoped rules | S1, S2/S3 (skills, `.claude/rules` with `paths:`), S11 (rule modes), S10 (`applyTo`), S14 (context pointers), S15 | Claude `@imports` load eagerly and save no context (S2); a plain-text pointer is lazy but relies on the agent choosing to open it. Codex has no imports. |
| Nest files per package/subtree in monorepos | S1, S2, S5, S7, S10, S11, S12 | Semantics differ: Claude concatenates (no override, contradictions resolved arbitrarily); Codex/S5/Copilot/Cursor say nearest wins (Codex by appearing last). |
| Avoid contradictions | S1, S2 ("may pick one arbitrarily"), S10, S14 (single source of truth) | None. |
| Human writes it; generators are a draft at most | S1, S15, E1 (LLM-generated hurt slightly, human-written better by ~7%) | S2/S3 offer `/init` and say the remaining work "is mostly removing lines"; S9 Codex `/init` scaffolds. Reconcilable: use `/init` only as a draft, then cut. |
| Be concrete and checkable | S2, S11, S4 ("Actionability") | None. |
| Prefer positive phrasing | S14 | Others silent. |
| Personal content outside the shared file | S2/S3 (`CLAUDE.local.md`, gitignored), S7 (`AGENTS.override.md`), S10 (personal instructions) | `CLAUDE.local.md` suppresses native AGENTS.md reading in Claude Code by default (S2). |

## Maintenance

- **Add on evidence of repeated need.** S2: same mistake twice, review catch, repeated correction. S3: "Anything you've had to correct twice already." S11: "Add rules only when you notice Agent making the same mistake repeatedly." S1 warns that adding one rule per incident without pruning makes a "ball of mud"; S14 calls the failure **sediment**.
- **Prune regularly.** S2: "Review your CLAUDE.md files ... periodically to remove outdated or conflicting instructions." S1: periodic style passes and a refactoring prompt. S14: delete no-ops whole-sentence; check every line for relevance. S3: after `/init` "the work is mostly removing lines."
- **Avoid stale-prone content.** S1 (paths), S11 (reference files rather than copy), S15 (pointers over copies), S14 (don't cache the environment).
- **Move enforcement out.** When a rule keeps being missed: shorten the file or convert to a hook/CI check (S3); mechanical violations get deterministic checks (S14 retro).
- **Automated / assisted checks available today:**
  - Claude Code `/doctor prompt-audit`: dead file/command references, older-model instructions, contradictions; covers AGENTS.md too (S2).
  - Claude Code `/doctor`: proposes trims of derivable content (S2).
  - Claude Code startup and `/status` length warnings (S2); `InstructionsLoaded` hook to log which files load (S2; does not fire for AGENTS.md read natively, but does when reached through a CLAUDE.md symlink or import).
  - Codex truncation warnings when over `project_doc_max_bytes` (S8).
  - Anthropic `claude-md-improver` skill and `/revise-claude-md` command (S4), both approval-gated; note their drift from current docs.
  - Matt Pocock `retro` skill (S14) for post-session environment fixes, judged by writing-for-agents.
- **Version control.** E3 measures that real files change often in small additions. S2/S3: project file is team-shared through source control; personal files are gitignored. No first-party source prescribes a PR review checklist for instruction files; that is a gap.
- **Verify what loaded.** Claude: `/context all`, `/memory` (S2/S3). Codex: ask "Summarize the current instructions", `--cd`, TUI log (S7). Gemini: `/memory show` (S12).

## Tool facts

For a repo with `AGENTS.md` as the real file and `CLAUDE.md -> AGENTS.md` (this repo: `AGENTS.md` is 2,131 bytes).

Claude Code:
- The symlink counts as a `CLAUDE.md`, so Claude reads it as CLAUDE.md and does not also load AGENTS.md; S2: "Either way Claude reads the content once."
- Edit/Write refuse to write through the symlink and redirect to `AGENTS.md`; edit `AGENTS.md` directly.
- Windows clones without `core.symlinks` get a one-line text `CLAUDE.md`; S2 recommends `@AGENTS.md` import for such teams.
- Since v2.1.277 the symlink is optional: deleting `CLAUDE.md` makes Claude read `AGENTS.md` natively (default `claude-md-or-agents-md`). But adding any `CLAUDE.local.md` or `.claude/CLAUDE.md` would then suppress AGENTS.md unless the user setting is `claude-md-and-agents-md`. Some sessions (plugin disabled; first session after upgrade from <=2.1.276) can't read AGENTS.md natively; the symlink or import works everywhere.
- Native AGENTS.md reading skips `.agents/` directories, `AGENTS.override.md`, `AGENTS.local.md`.
- Subdirectory `CLAUDE.md` / `AGENTS.md` load lazily when Claude touches files there; capped per file (40k chars at 200K window).
- `@path` imports are expanded (max 4 hops) but load eagerly; HTML block comments are stripped for Claude only.

Codex:
- Reads `AGENTS.md` (symlinks allowed) from git root down to cwd; never `CLAUDE.md` unless added to `project_doc_fallback_filenames`.
- `@path` lines are not expanded; Claude-specific `@imports` in AGENTS.md become literal text for Codex. Markdown links work as plain pointers for both tools.
- 32 KiB combined budget across all AGENTS.md files on the path; overflow is truncated with a warning.
- `AGENTS.override.md` per directory replaces `AGENTS.md` for Codex only; Claude ignores it.
- Untrusted projects load no project docs.
- HTML comments are not documented as stripped, so they cost Codex tokens (inferred from S8: content is read as-is).
- `/init` scaffolds AGENTS.md.

Shared:
- Both tools treat the file as guidance, not enforcement; anything that must always hold belongs in hooks (Claude), CI, or linters.
- Claude concatenates nested files without override semantics; Codex orders root-to-leaf so closer files "override" by position. Write nested files so they don't contradict the root rather than relying on precedence.
- `setup-matt-pocock-skills` edits `CLAUDE.md` when it exists; with a symlink it would write through it (or be refused by Claude Code's Edit tool and redirected to `AGENTS.md`). Matt's own repo uses the opposite direction (`AGENTS.md -> CLAUDE.md`).

## Evidence quality and gaps

- **Behaviour facts** (loading order, limits, imports, symlinks) are strong: first-party docs, and for Codex confirmed in source code at main `d2f7632`. Claude Code facts are from docs only (closed source); several are version-gated (v2.1.277, 2.1.281, 2.1.285, 2.1.309), so check `claude --version`.
- **Writing advice** from vendors and practitioners (S1, S3, S10, S11, S14, S15) is opinion. Anthropic's "under 200 lines" is a product recommendation, not a published measurement. HumanLayer's "< 300 lines" is "general consensus".
- **The "150-200 instructions" figure** traces S1 -> S15 -> E4. E4 measured keyword inclusion in report writing, not coding agents, and its threshold is "150 or more" for the best reasoning models only.
- **Effectiveness evidence is thin and mixed.** E1 (largest, controlled, Python only, models of early 2026) finds no significant success gain and +20% cost, with human-written files better than generated ones and overviews unhelpful. E2 (small, correlational) finds faster, cheaper runs with similar completion. They measure different outcomes (success vs efficiency) and are not in direct conflict. E3 is descriptive only. No study isolates individual practices (emphasis words, nesting, pointer-vs-inline, length thresholds).
- **Tooling drift:** S4's plugin predates native AGENTS.md support and `/doctor prompt-audit` and uses a non-standard `.claude.local.md` name. S5's tool list omits Claude Code although S2 documents native support.
- **Not verified:** S15's claim about a Claude Code system reminder wrapping CLAUDE.md; the `#` memory shortcut cited by S4; whether Codex strips HTML comments; Codex `/init` was confirmed only through a search snippet of the official page.
- **Gaps:** no first-party guidance on reviewing instruction-file changes in PRs; no study of maintenance practices' effect on outcomes; no cross-tool test of symlink vs import behaviour beyond each vendor's own docs.
