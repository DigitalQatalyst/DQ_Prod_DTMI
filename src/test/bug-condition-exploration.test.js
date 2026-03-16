import { describe, it, expect } from 'vitest'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..', '..')

/**
 * Bug Condition Exploration Test for Module Resolution Error Fix
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3**
 * 
 * This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * The test demonstrates the ERR_MODULE_NOT_FOUND bug when running `npm run dev:api`.
 * 
 * Expected behavior (after fix):
 * - API server should start successfully without module resolution errors
 * - ESM loader should successfully locate and load all required packages
 * - Module import chain should work: server.mjs → uploads/sign.js → ../../src/server/azure/blobSign.js
 */
describe('Bug Condition Exploration - Module Resolution Error', () => {
  it('should demonstrate ERR_MODULE_NOT_FOUND during API server startup', async () => {
    // This test uses a reduced number of examples for faster execution
    // as specified in the task requirements
    
    const testCases = [
      {
        command: 'npm run dev:api',
        description: 'API server startup with ESM module resolution'
      }
    ]
    
    for (const testCase of testCases) {
      const result = await runApiServerStartup(testCase.command)
      
      // Expected behavior after fix: server should start successfully
      // On unfixed code: this will fail with ERR_MODULE_NOT_FOUND
      expect(result.success).toBe(true)
      expect(result.error).toBeNull()
      expect(result.stderr).not.toContain('ERR_MODULE_NOT_FOUND')
      expect(result.stderr).not.toContain('Object.getPackageJSONURL')
      
      // Verify the module import chain works
      expect(result.moduleResolutionSuccess).toBe(true)
    }
  }, 30000) // 30 second timeout for server startup
  
  it('should verify module import chain resolution', async () => {
    // Test the specific module import chain mentioned in the bug report:
    // server.mjs → uploads/sign.js → ../../src/server/azure/blobSign.js
    
    try {
      // Attempt to import the problematic module directly
      const blobSignModule = await import('../../server/azure/blobSign.js')
      
      // Expected behavior: module should be importable with required exports
      expect(blobSignModule).toBeDefined()
      expect(typeof blobSignModule.buildBlobPath).toBe('function')
      expect(typeof blobSignModule.getUploadSas).toBe('function')
      expect(typeof blobSignModule.deleteBlob).toBe('function')
      
    } catch (error) {
      // On unfixed code: this will fail with module resolution errors
      // After fix: this should not throw
      throw new Error(`Module import failed: ${error.message}`)
    }
  })
  
  it('should verify ESM package resolution at Object.getPackageJSONURL', async () => {
    // This test specifically targets the Object.getPackageJSONURL failure
    // mentioned in the bug report
    
    const result = await testPackageResolution()
    
    // Expected behavior: package resolution should succeed
    expect(result.packageResolutionSuccess).toBe(true)
    expect(result.error).not.toContain('Object.getPackageJSONURL')
    expect(result.error).not.toContain('ERR_MODULE_NOT_FOUND')
  })
})

/**
 * Helper function to run API server startup and capture results
 */
async function runApiServerStartup(command) {
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(' ')
    const child = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env }
    })
    
    let stdout = ''
    let stderr = ''
    let resolved = false
    
    child.stdout.on('data', (data) => {
      stdout += data.toString()
      // Look for successful startup message
      if (stdout.includes('API listening on') && !resolved) {
        resolved = true
        child.kill('SIGTERM')
        resolve({
          success: true,
          error: null,
          stdout,
          stderr,
          moduleResolutionSuccess: true
        })
      }
    })
    
    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })
    
    child.on('error', (error) => {
      if (!resolved) {
        resolved = true
        resolve({
          success: false,
          error: error.message,
          stdout,
          stderr,
          moduleResolutionSuccess: false
        })
      }
    })
    
    child.on('exit', (code, signal) => {
      if (!resolved) {
        resolved = true
        const success = code === 0 || signal === 'SIGTERM'
        resolve({
          success,
          error: success ? null : `Process exited with code ${code}`,
          stdout,
          stderr,
          moduleResolutionSuccess: success && !stderr.includes('ERR_MODULE_NOT_FOUND')
        })
      }
    })
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (!resolved) {
        resolved = true
        child.kill('SIGKILL')
        resolve({
          success: false,
          error: 'Timeout waiting for server startup',
          stdout,
          stderr,
          moduleResolutionSuccess: false
        })
      }
    }, 10000)
  })
}

/**
 * Helper function to test package resolution specifically
 */
async function testPackageResolution() {
  try {
    // Test importing Azure Storage Blob package which is used in blobSign.js
    const azureModule = await import('@azure/storage-blob')
    
    return {
      packageResolutionSuccess: true,
      error: null,
      azureModuleLoaded: !!azureModule
    }
  } catch (error) {
    return {
      packageResolutionSuccess: false,
      error: error.message,
      azureModuleLoaded: false
    }
  }
}