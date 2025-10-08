const fs = require('fs');
const path = require('path');

// Read command line arguments
const angularVersion = process.argv[2];
const nodeVersion = process.argv[3];

if (!angularVersion || !nodeVersion) {
  console.error('Usage: node update-versions.js <angular-version> <node-version>');
  process.exit(1);
}

// Read version config
const configPath = path.join(__dirname, '..', 'version-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Validate versions
if (!config.versions[angularVersion]) {
  console.error(`Unsupported Angular version: ${angularVersion}`);
  process.exit(1);
}

const versionConfig = config.versions[angularVersion];
if (!versionConfig.node[nodeVersion]) {
  console.error(`Unsupported Node.js version: ${nodeVersion}`);
  process.exit(1);
}

// Helper function to update dependency version
const updateDependencyVersion = (dependencies, packageName, version, isPeer = false) => {
  if (!dependencies?.[packageName]) return;

  if (isPeer && dependencies[packageName].includes('||')) {
    // For peer dependencies with multiple versions
    if (!dependencies[packageName].includes(version)) {
      dependencies[packageName] = `${version} || ${dependencies[packageName]}`;
    }
  } else {
    dependencies[packageName] = version;
  }
};

// Update package.json files
const updatePackageJson = (packagePath) => {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const isLibPackage = packagePath.includes('projects/angular-temporal');
  console.log(`\nUpdating ${isLibPackage ? 'library' : 'root'} package.json...`);

  // Update Angular core packages
  for (const pkgName of config.angularPackages) {
    updateDependencyVersion(pkg.dependencies, pkgName, versionConfig.angular);
    updateDependencyVersion(pkg.devDependencies, pkgName, versionConfig.angular);
    updateDependencyVersion(pkg.peerDependencies, pkgName, versionConfig.angular, true);
  }

  // Update secondary packages that depend on Angular version
  for (const [pkgName, versions] of Object.entries(config.secondaryPackages)) {
    const version = versions[angularVersion];
    if (!version) {
      console.warn(`Warning: No version specified for ${pkgName} in Angular ${angularVersion}`);
      continue;
    }

    // Handle package groups (like angular-eslint/*)
    if (pkgName.includes('-')) {
      const prefix = pkgName.split('-')[0];
      const suffix = pkgName.split('-')[1];
      
      // Find and update all matching packages
      for (const dep of Object.keys(pkg.devDependencies || {})) {
        if (dep.startsWith(`@${prefix}-${suffix}/`)) {
          updateDependencyVersion(pkg.devDependencies, dep, version);
        }
      }
    }
    
    // Update the main package
    updateDependencyVersion(pkg.dependencies, pkgName, version);
    updateDependencyVersion(pkg.devDependencies, pkgName, version);
    updateDependencyVersion(pkg.peerDependencies, pkgName, version, true);
  }

  // Update TypeScript
  if (pkg.devDependencies?.['typescript']) {
    pkg.devDependencies['typescript'] = versionConfig.typescript;
    console.log('Updated TypeScript version');
  }

  // Update zone.js
  if (pkg.dependencies?.['zone.js'] || pkg.devDependencies?.['zone.js']) {
    updateDependencyVersion(pkg.dependencies, 'zone.js', versionConfig['zone.js']);
    updateDependencyVersion(pkg.devDependencies, 'zone.js', versionConfig['zone.js']);
    console.log('Updated zone.js version');
  }

  // Update @types/node
  if (pkg.devDependencies?.['@types/node']) {
    pkg.devDependencies['@types/node'] = versionConfig.node[nodeVersion];
    console.log(`Updated @types/node to match Node.js ${nodeVersion}`);
  }

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Successfully updated ${packagePath}`);
};

// Update both package.json files
try {
  console.log(`\nUpdating dependencies for Angular ${angularVersion} and Node.js ${nodeVersion}...`);
  updatePackageJson(path.join(__dirname, '..', '..', 'package.json'));
  updatePackageJson(path.join(__dirname, '..', '..', 'projects', 'angular-temporal', 'package.json'));
  console.log('\nAll package.json files have been updated successfully!');
} catch (error) {
  console.error('\nError updating package.json files:', error);
  process.exit(1);
}