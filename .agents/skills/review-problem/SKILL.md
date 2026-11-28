---
name: review-problem
description: Review a named algorithm practice problem in this repository and add regression tests that expose bugs in its current implementation, leaving the implementation unchanged. Use for exercise reviews and requests for failing tests, rather than implementation fixes.
---

# Review a problem

Accept a problem name, slug, or exercise path, for example:

```text
$review-problem singly linked list
```

Review the current working-tree implementation, including uncommitted edits. The deliverable is a correctness review and, when bugs are reproducible, failing regression tests for the user to solve.

## Locate and understand

- Find the exercise under `collections/` using directory names and titles in `metadata.json`. Ask for the problem name if absent; ask for the collection or variant only if multiple matches remain plausible.
- Read applicable `AGENTS.md` instructions, the exercise's `description.md`, current implementation, tests, and any local types or shared test helpers needed to understand the contract.
- Treat stated constraints and operation preconditions as the input domain. Missing behavior outside that domain is not a bug. If the contract is ambiguous, distinguish that uncertainty from a confirmed defect rather than changing the description to justify a test.
- Check the working-tree status before editing so existing user changes remain intact. Keep edits limited to the selected exercise's tests. Leave implementations, templates, saved attempts, descriptions, practice metadata, and project configuration unchanged.

## Review and reproduce

- Run the existing exercise tests directly with the repository's configured runner. Avoid practice CLI commands that may save attempts or update review metadata. Record existing failures separately from new failures.
- Trace each operation against the contract, including meaningful boundary cases and state transitions. For mutable structures, examine ordering, length, duplicates, removal, and reuse after emptying where applicable. Review required storage and complexity by inspection as well as behavior.
- Use an independent reference model or bounded exhaustive exploration when it adds confidence beyond the existing examples. Keep randomized exploration reproducible, then reduce any counterexample to a small deterministic test.
- Add tests only for confirmed valid-input defects that existing tests do not already expose. Follow the suite's conventions and assert the contract's expected result, not the implementation's current behavior. Prefer public behavior; inspect internal structure only when a stated structural requirement cannot be checked through the public interface.
- Run every added test against the unchanged implementation. Confirm it fails at an assertion demonstrating the defect, rather than because of an import, setup, or runner error. Leave those regression tests failing; do not fix the implementation or weaken the assertions. For suspected nontermination, use a bounded or isolated reproduction so verification can finish.
- If no valid failing case is found, leave the tests unchanged. Do not manufacture failures with invalid inputs, unsupported requirements, timing thresholds, or deliberately changed implementations. Report inspection-only issues, such as a complexity violation, separately if a reliable behavioral test is unavailable.

## Finish

Inspect the final diff to confirm only intended test changes were made and temporary probes were removed without disturbing user files.

Report confirmed findings with implementation locations, the valid triggering case, and expected versus actual behavior. Summarize existing and newly added test results and link changed tests. If nothing was found, say no bugs were found within the stated contract, describe the checks actually performed, and state that no files changed. Make clear that the implementation was left unchanged and identify any verification that could not be completed.
