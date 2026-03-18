# Module Resolution Error Fix Bugfix Design

## Overview

The Node.js API server fails to start due to an ERR_MODULE_NOT_FOUND error occurring in the ESM loader system during module resolution. The issue stems from a mismatch between the project's ESM configuration (`"type": "module"` in package.json) and the way modules are being imported and resolved. Specifically, the API server imports JavaScript files that reference other modules using relative paths, but the ESM resolver cannot properly locate the target modules due to file extension and path resolution conflicts.

The fix approach involves ensuring consistent module resolution by aligning file extensions, import paths, and ESM configuration to work harmoniously within Node.js's strict ESM resolution rules.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the module resolution failure - when the API server starts and ESM loader attempts to resolve modules with mismatched extensions or paths
- **Property (P)**: The desired behavior when the API server starts - successful module resolution and server startup without ERR_MODULE_NOT_FOUND errors
- **Preservation**: Existing Vite development server, build process, and TypeScript compilation that must remain unchanged by the fix
- **ESM Loader**: Node.js's ECMAScript Module loader system that handles module resolution and loading
- **Module Resolution**: The process by which Node.js locates and loads imported modules based on import specifiers and file system paths

## Bug Details

### Bug Condition

The bug manifests when the Node.js API server starts with `npm run dev:api` and the ESM loader attempts to resolve modules. The system fails during package.json resolution and module loading in the internal ESM resolution process.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type ServerStartupEvent
  OUTPUT: boolean
  
  RETURN input.command == "npm run dev:api"
         AND input.nodeType == "module" 
         AND input.esmLoader.resolveModule() throws ERR_MODULE_NOT_FOUND
         AND input.targetModule.path contains relative import paths
END FUNCTION
```

### Examples

- **API Server Startup**: Running `npm run dev:api` crashes with ERR_MODULE_NOT_FOUND at Object.getPackageJSONURL
- **Module Import Chain**: server.mjs → uploads/sign.js → ../../src/server/azure/blobSign.js fails during ESM resolution
- **Package Resolution**: ESM loader fails to locate package.json files for dependency resolution
- **Edge Case**: Build process with `npm run build` works correctly, indicating the issue is specific to Node.js ESM runtime resolution

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Vite development server (`npm run dev`) must continue to start and run without issues
- Build process (`npm run build`) must continue to compile and bundle the application without errors  
- TypeScript compilation must continue to transpile TypeScript files to JavaScript correctly
- Existing module imports that work correctly must continue to resolve and load successfully

**Scope:**
All development workflows that do NOT involve the Node.js API server should be completely unaffected by this fix. This includes:
- Frontend development with Vite
- TypeScript compilation and type checking
- Build and bundling processes
- Linting and testing workflows

## Hypothesized Root Cause

Based on the bug description and code analysis, the most likely issues are:

1. **File Extension Mismatch**: The upload handlers import from `blobSign.js` but the actual resolution may be looking for different extensions or the file may not exist with the expected extension

2. **Relative Path Resolution**: The relative import paths `../../src/server/azure/blobSign.js` may not resolve correctly under Node.js ESM rules, which are stricter than bundler resolution

3. **Package.json Resolution**: The ESM loader fails at `Object.getPackageJSONURL`, suggesting issues with how Node.js locates package.json files in the module resolution chain

4. **TypeScript/JavaScript Dual Files**: The presence of both `blobSign.ts` and `blobSign.js` may cause confusion in the module resolution process, where the import specifies `.js` but the resolver encounters conflicts

## Correctness Properties

Property 1: Bug Condition - API Server Startup Success

_For any_ server startup command where the API server is started with `npm run dev:api` and the ESM loader attempts to resolve modules, the fixed module resolution SHALL successfully locate and load all required modules, allowing the server to start without ERR_MODULE_NOT_FOUND errors.

**Validates: Requirements 2.1, 2.2, 2.3**

Property 2: Preservation - Development Workflow Continuity  

_For any_ development workflow that does NOT involve the Node.js API server (Vite dev server, build process, TypeScript compilation), the fixed module resolution SHALL produce exactly the same behavior as the original configuration, preserving all existing functionality for frontend development, building, and compilation processes.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**
## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `api/uploads/sign.js` and `api/uploads/delete.js`

**Function**: Import statements and module resolution

**Specific Changes**:
1. **Import Path Correction**: Update the import statement from `'../../src/server/azure/blobSign.js'` to use the correct file extension and ensure the target file exists
   - Verify that `src/server/azure/blobSign.js` exists and is properly formatted for ESM
   - Consider using explicit `.js` extensions for all relative imports as required by Node.js ESM

2. **File Extension Consistency**: Ensure all JavaScript files in the API directory use consistent `.js` extensions and proper ESM export syntax
   - Verify that `blobSign.js` uses `export` statements compatible with Node.js ESM
   - Remove any CommonJS syntax that might conflict with ESM resolution

3. **Module Resolution Path**: Verify the relative path resolution works correctly from the API upload handlers to the source directory
   - Test that the path `../../src/server/azure/blobSign.js` correctly resolves to the target file
   - Consider using absolute imports or package.json exports if relative paths continue to fail

4. **Package.json Configuration**: Ensure the `"type": "module"` configuration is properly supported throughout the module chain
   - Verify that all imported modules are ESM-compatible
   - Check for any mixed module systems that might cause resolution conflicts

5. **Dependency Resolution**: Ensure that the Azure Storage Blob dependencies are properly resolved in the Node.js context
   - Verify that `@azure/storage-blob` is correctly installed and accessible
   - Check for any version conflicts or missing dependencies

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that simulate the API server startup process and module resolution chain. Run these tests on the UNFIXED code to observe failures and understand the root cause.

**Test Cases**:
1. **API Server Startup Test**: Run `npm run dev:api` and capture the ERR_MODULE_NOT_FOUND error (will fail on unfixed code)
2. **Module Import Test**: Test direct import of the blobSign module from Node.js context (will fail on unfixed code)  
3. **Path Resolution Test**: Verify that the relative path `../../src/server/azure/blobSign.js` resolves correctly (will fail on unfixed code)
4. **ESM Compatibility Test**: Test that all modules in the import chain are ESM-compatible (may fail on unfixed code)

**Expected Counterexamples**:
- ERR_MODULE_NOT_FOUND errors during server startup
- Possible causes: incorrect file paths, missing file extensions, ESM/CommonJS conflicts, missing dependencies

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := startApiServer_fixed(input)
  ASSERT expectedBehavior(result)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalWorkflow(input) = fixedWorkflow(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the development workflow domain
- It catches edge cases that manual unit tests might miss  
- It provides strong guarantees that behavior is unchanged for all non-API-server workflows

**Test Plan**: Observe behavior on UNFIXED code first for Vite dev server, build process, and TypeScript compilation, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Vite Dev Server Preservation**: Observe that `npm run dev` works correctly on unfixed code, then write test to verify this continues after fix
2. **Build Process Preservation**: Observe that `npm run build` works correctly on unfixed code, then write test to verify this continues after fix
3. **TypeScript Compilation Preservation**: Observe that TypeScript compilation works correctly on unfixed code, then write test to verify this continues after fix

### Unit Tests

- Test module import resolution for each file in the API server chain
- Test file path resolution from upload handlers to blobSign module
- Test that ESM export/import syntax works correctly in Node.js context

### Property-Based Tests

- Generate random module import scenarios and verify they resolve correctly after fix
- Generate random development workflow combinations and verify preservation of existing functionality
- Test that all non-API-server commands continue to work across many scenarios

### Integration Tests

- Test full API server startup flow with all module dependencies
- Test switching between development workflows (Vite dev, API dev, build) 
- Test that the API server can successfully handle requests after startup fix