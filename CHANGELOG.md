# Changelog
All notable changes to this project will be documented in this file.

## [0.1.3] - 2020-10-12

- Set Angular version minimum to 9 and remove upper version limit.

## [0.1.2] - 2020-09-23

- Support length indicator & hint label.

## [0.1.1] - 2020-02-06

- Update Angular to ~9.0.0.

## [0.1.0] - 2020-02-06

- Update Angular to ~9.0.0-rc.14.

## [0.0.18] - 2019-07-14

### Fixed

- Fix datepicker height in IE 11.

## [0.0.17] - 2019-07-07

### Added

- Support readonly fields.

## [0.0.16] - 2019-06-27

### Added

- Experimental feature to display custom message below field via `customMessage`.

## [0.0.15] - 2019-06-23

### Added

- Support placeholder and float label.

### Fixed

- Fix datepicker title.
- Fix duplicate label for radio.

## [0.0.14] - 2019-06-20

### Added

- Manage field layout using properties within `layout`. It can be used to manage size of the cell occupied by the field. Layout is managed via [common-style-attributes](https://common-style-attributes.surge.sh/).

- Assign CSS class(es) to a class via `layout.cssClass`.

## [0.0.13] - 2019-06-19

### Added

- Add support for `datepicker` field type. To use this field type, make sure DateAdapter (e.g. import `MatNativeDateModule`, `MatMomentDateModule`, or provide a custom implementation) is configured.

## [0.0.12] - 2019-06-19

- Fix bug where `optionsFn` not called after form has changed. This fix change QuickFormField's lifecycle handling from `ngOnInit()` to `ngOnChanges()`.

## [0.0.11] - 2019-06-18

- Minor bug fix.

## [0.0.10] - 2019-06-16

- Fix auto-complete value. 

## [0.0.9] - 2019-06-12

- Quick fix for field validation error message "sometimes" not displaying. 

## [0.0.8] - 2019-06-06

- Fix switch label & suffix icon.

## [0.0.7] - 2019-06-06

### Added
- Support suffix icon with tooltip (Contributed by @zeskysee).

### Fixed

- Fix missing label for appearance standard, fill and outline (Contributed by @zeskysee).

## [0.0.6] - 2019-06-05

### Added
- Support for disabled fields (Contributed by @zeskysee) [pr#3](https://github.com/kctang/ng-quick-form/pull/3).
- Support for autocomplete as a new form field type (Contributed by @zeskysee) [pr#4](https://github.com/kctang/ng-quick-form/pull/4).

## [0.0.5] - 2019-06-04

### Added
- Select form field's options which able to filter by another select form field's value. Implements [issue#1](https://github.com/kctang/ng-quick-form/issues/1). 

[Unreleased]: https://github.com/kctang/ng-quick-form/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/kctang/ng-quick-form/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/kctang/ng-quick-form/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kctang/ng-quick-form/compare/v0.0.18...v0.1.0
[0.0.18]: https://github.com/kctang/ng-quick-form/compare/v0.0.17...v0.0.18
[0.0.17]: https://github.com/kctang/ng-quick-form/compare/v0.0.16...v0.0.17
[0.0.16]: https://github.com/kctang/ng-quick-form/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/kctang/ng-quick-form/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/kctang/ng-quick-form/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/kctang/ng-quick-form/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/kctang/ng-quick-form/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/kctang/ng-quick-form/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/kctang/ng-quick-form/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/kctang/ng-quick-form/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/kctang/ng-quick-form/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/kctang/ng-quick-form/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/kctang/ng-quick-form/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/kctang/ng-quick-form/compare/v0.0.4...v0.0.5
