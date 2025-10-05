# GitHub Actions CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline that automates building, testing, and publishing of the Angular Temporal library.

## Pipeline Overview

The pipeline consists of two main jobs:

### 1. Build and Test Job
- **Triggers**: Push to main branch, Pull requests to main branch
- **Matrix Strategy**: Tests against Node.js 18.x and 20.x with Angular 19 and 20
- **Steps**:
  - Checkout code
  - Setup Node.js with caching
  - Install dependencies
  - Lint library code
  - Build library
  - Run unit tests with coverage
  - Build demo application
  - Upload build artifacts

### 2. Publish Job
- **Triggers**: Only on push to main branch
- **Dependencies**: Requires successful completion of build and test job
- **Steps**:
  - Checkout code
  - Setup Node.js with npm registry
  - Install dependencies
  - Build library
  - Run tests with coverage
  - Upload coverage to Codecov
  - Publish to npm
  - Create GitHub release

## Required Secrets

To enable the pipeline, you need to configure the following secrets in your GitHub repository:

### NPM_TOKEN
- **Purpose**: Authentication for publishing to npm
- **How to get**: 
  1. Login to npm: `npm login`
  2. Create a token: `npm token create`
  3. Copy the token and add it as a repository secret named `NPM_TOKEN`

### GITHUB_TOKEN
- **Purpose**: Authentication for creating GitHub releases
- **Note**: This is automatically provided by GitHub Actions, no manual setup required

## Coverage Reporting

The pipeline automatically uploads coverage reports to Codecov for detailed coverage analysis.

## Release Process

When code is pushed to the main branch:
1. All tests must pass
2. Library is built and tested
3. Package is published to npm
4. GitHub release is created with:
   - Version number based on run number
   - Build artifacts
   - Coverage information
   - Installation instructions

## Local Testing

You can run the same tests locally:

```bash
# Install dependencies
npm ci

# Run linting
npm run lint

# Build library
npm run build

# Run tests with coverage
npm run test:ci

# Build demo app
ng build angular-temporal-demo
```

## Troubleshooting

### Common Issues

1. **Test Failures**: Check that all unit tests pass locally before pushing
2. **Build Failures**: Ensure the library builds successfully with `npm run build`
3. **Publish Failures**: Verify NPM_TOKEN is correctly configured
4. **Coverage Issues**: Check that test files are properly configured

### Pipeline Status

You can monitor the pipeline status in the "Actions" tab of your GitHub repository.
