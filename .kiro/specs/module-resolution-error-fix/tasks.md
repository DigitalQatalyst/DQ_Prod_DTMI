# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - API Server Module Resolution Failure
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For deterministic bugs, scope the property to the concrete failing case(s) to ensure reproducibility
  - Test that `npm run dev:api` command fails with ERR_MODULE_NOT_FOUND during ESM module resolution
  - Test that module import chain from server.mjs → uploads/sign.js → ../../src/server/azure/blobSign.js fails
  - Test that ESM loader fails at Object.getPackageJSONURL during package resolution
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Development Workflow Continuity
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (Vite dev server, build process, TypeScript compilation)
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Test that `npm run dev` (Vite dev server) starts and runs successfully
  - Test that `npm run build` compiles and bundles application without errors
  - Test that TypeScript compilation transpiles files correctly
  - Test that existing module imports continue to resolve and load successfully
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Fix for Node.js module resolution error

  - [ ] 3.1 Implement the module resolution fix
    - Verify and correct import paths in api/uploads/sign.js and api/uploads/delete.js
    - Ensure target file src/server/azure/blobSign.js exists with proper ESM export syntax
    - Update import statements to use correct file extensions as required by Node.js ESM
    - Verify relative path resolution from API upload handlers to source directory
    - Ensure all JavaScript files use consistent .js extensions and ESM syntax
    - Check package.json configuration supports ESM throughout module chain
    - Verify Azure Storage Blob dependencies are properly resolved in Node.js context
    - _Bug_Condition: isBugCondition(input) where input.command == "npm run dev:api" AND input.esmLoader.resolveModule() throws ERR_MODULE_NOT_FOUND_
    - _Expected_Behavior: expectedBehavior(result) where API server starts successfully without module resolution errors_
    - _Preservation: Development workflows (Vite dev, build, TypeScript) remain unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - API Server Module Resolution Success
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: Expected Behavior Properties from design_

  - [ ] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Development Workflow Continuity
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.