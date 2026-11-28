---
name: review-dsa-exercise
description: Review a DSA practice exercise against repository learning rules, or align its description, template, and tests with those rules when requested. Use for exercise-level reviews rather than general branch or PR reviews.
---

# Review DSA Exercise

Review the exercise as a learning contract: the description states the assumptions, the template exposes the intended algorithm, and the tests verify that contract.

## Establish the contract

Read applicable `AGENTS.md` instructions and the target exercise's description, templates, active solutions, types, helpers, and tests. Inspect the working-tree changes so a learner's in-progress solution is distinguishable from scaffolding. Use repository configuration to discover test commands.

Apply the repository's current rules as the authority. Where it adopts a valid-input practice model, assess these properties:

- Input constraints and operation preconditions are explicit in the description.
- Implementations expose the algorithm and data structures clearly; defensive validation, custom errors, and recovery serve an explicit exercise requirement.
- Tests use representative valid inputs and meaningful state transitions, including valid boundaries.
- CLI and practice-infrastructure validation stays outside this exercise simplification.

Distinguish public contract requirements from redundant internal defenses. If bounds and endpoint cases guarantee that a node exists, assess later missing-node errors, silent returns, and optional chaining against that invariant. Explain the guarantee before recommending simplification.

If the description explicitly requires out-of-range behavior, treat it as part of the current contract. Identify removing that requirement as a coordinated contract change; distinguish it from removing internal defenses that the contract never required. Discuss whether error handling is an actual learning objective under the repository rules.

## Review or align

For a review request, report findings without changing files. Separate rule compliance from algorithm correctness. Give each actionable finding a file location, the relevant rule or contract, and its practical consequence. State when either category has no findings and disclose testing limits.

When updates are requested, align the authorized artifacts together. Put valid-input assumptions in the description and remove contradictory requirements from templates and tests. Preserve signatures and the intended learning task. Edit active solutions only when included in the request; preserve archived attempts and learner work otherwise. Reviewing or updating an exercise does not itself authorize publishing a PR or removing a worktree.

For stateful structures, select focused transitions that expose their invariants. In a linked list, useful cases include head/middle/tail changes, length updates, duplicates, an absent value, emptying and reuse, and identity-based removal when reference equality is specified. A removal of an absent value can be valid contract behavior even when invalid indices are outside the contract. Assert observable behavior, including an append after tail removal to expose stale tail state.

Choose deterministic, readable cases that make failures easy to diagnose. Keep randomized or model-based tests when they add useful algorithm coverage; the prior linked-list session's replacement of one randomized test is not a universal rule.

## Verify and report

Run the affected exercise suite when feasible. If failures appear, compare the original suite against the same solution or otherwise establish a baseline before attributing them to the update. Distinguish a scaffold or unfinished learner solution from a reference implementation.

When dependencies are unavailable, report the limitation or use an available compatible runner in an isolated temporary workspace. Include required local imports and report any configuration differences; passing against a different solution does not establish that the current solution passes.

Inspect the final diff for contract consistency and unintended changes. Report the changed artifacts, test outcome, and any demonstrated pre-existing failures separately. Keep baseline failures visible without expanding an exercise-scaffolding task into unsolicited solution repairs.
