# Contributing to Angular Temporal

Thank you for your interest in contributing to Angular Temporal! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or 22.x
- Angular CLI 17+ (for signals compatibility)
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/angular-temporal.git
   cd angular-temporal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a development branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bug-fix
   ```

4. **Start development**
   ```bash
   # Run tests in watch mode
   npm run test
   
   # Run tests once with coverage
   npm run test:ci
   
   # Run linting
   npm run lint
   
   # Build the library
   npm run build
   
   # Create a package for testing
   npm run pack
   ```

## 📋 Development Guidelines

### Code Style

- Follow the existing code style and patterns
- Use TypeScript strict mode
- Prefer Angular signals for inputs/outputs
- Follow the Temporal API specifications

### Angular Temporal Specific Guidelines

- **Components**: Use signal-based inputs (`input()`) and outputs (`output()`)
- **Services**: Use Angular's `inject()` function for dependency injection
- **Pipes**: Ensure they handle null/undefined values gracefully
- **Temporal API**: Follow TC39 Temporal specifications
- **Polyfill**: Use the provided polyfill wrapper for Temporal functionality

### Testing

- Write unit tests for all new functionality
- Maintain or improve test coverage
- Test with Angular versions that support signals
- Use descriptive test names and good test structure

```typescript
// Example test structure
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [TemporalService]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle happy path case', () => {
    // Test implementation
  });
});
```

## 🐛 Bug Reports

When reporting bugs, please include:

- Angular version
- Angular Temporal version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)
- Code examples

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) for consistency.

## ✨ Feature Requests

When suggesting features, please include:

- Clear description of the feature
- Use cases and examples
- Proposed API design
- Priority level
- Willingness to contribute

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml) for consistency.

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines
3. **Write tests** for your changes
4. **Update documentation** if needed
5. **Run the test suite** and ensure all tests pass
6. **Create a pull request** using the [PR template](.github/pull_request_template.md)

### PR Requirements

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] PR description is complete

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new public APIs
- Update code examples in documentation
- Keep the changelog up to date

## 🏗️ Project Structure

```
projects/angular-temporal/src/lib/
├── components/          # 3 Angular components (Date, Time, DateTime pickers)
│   ├── temporal-date-picker/
│   ├── temporal-time-picker/
│   └── temporal-date-time-picker/
├── pipes/              # 7 Angular pipes for formatting
│   ├── temporal-date.pipe.ts
│   ├── temporal-time.pipe.ts
│   ├── temporal-date-time.pipe.ts
│   ├── temporal-duration.pipe.ts
│   ├── temporal-instant.pipe.ts
│   ├── temporal-relative.pipe.ts
│   └── temporal-zoned-date-time.pipe.ts
├── directives/         # 2 Angular directives
│   ├── temporal-input.directive.ts
│   └── temporal-timezone.directive.ts
├── services/           # 1 Angular service
│   └── temporal.service.ts
├── types/              # 13 interfaces and 12 type aliases
│   ├── temporal-format-options.ts
│   └── temporal.types.ts
├── utils/              # Utility functions
│   └── polyfill.ts
└── angular-temporal.module.ts
```

## 🧪 Testing Strategy

- **Unit Tests**: Test individual components, pipes, directives, and services
- **Integration Tests**: Test component interactions
- **Compatibility Tests**: Ensure Angular signals compatibility
- **Temporal API Tests**: Verify TC39 specification compliance

## 📦 Release Process

Releases are automated via GitHub Actions:

1. Version bump in `package.json`
2. Push to `main` branch
3. CI/CD pipeline runs tests and builds
4. Automatic npm publish and GitHub release
5. Release notes generated from commit messages

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/umairhm/angular-temporal/discussions)
- 🐛 [GitHub Issues](https://github.com/umairhm/angular-temporal/issues)
- 📖 [Documentation](https://github.com/umairhm/angular-temporal#readme)

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Angular Temporal! 🚀
