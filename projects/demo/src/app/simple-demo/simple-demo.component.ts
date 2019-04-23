import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickFormField } from '../../quick-form/QuickFormField'
import { QuickForm } from '../../quick-form/QuickForm'
import { BaseComponent } from '../../quick-form/util/BaseComponent'
import { tap } from 'rxjs/operators'
import { CheckboxValidators } from '../../quick-form/validators/CheckboxValidators'

@Component({
  selector: 'app-simple-demo',
  templateUrl: './simple-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleDemoComponent extends BaseComponent implements OnInit {
  form!: FormGroup
  fields: QuickFormField[] = [
    {
      title: 'Name', required: true,
      validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    { title: 'Programmer?', type: 'switch' },
    { title: 'Some Questions', type: 'separator' },
    {
      title: 'Experience 1', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      validators: [ CheckboxValidators.minSelectedValues(2) ],
      value: 'Angular'
    },
    {
      title: 'Hobbies', type: 'chips'
    },
    {
      title: 'Series/Movies', type: 'chips',
      options: [
        {
          group: 'TV Series',
          options: [
            'Game of Thrones',
            'Black Summer',
            'Chilling Adventures of Sabrina',
            'Star Trek: Discovery',
            'The Act',
            'The Walking Dead',
            'Line of Duty'
          ]
        }, {
          group: 'Movies',
          options: [
            'Avengers: Infinity War',
            'Deadpool 2',
            'Solo: A Star Wars Story',
            'Ocean\'s 8',
            'Hereditary',
            'Incredibles 2',
            'Jurassic World: Fallen Kingdom',
            'Sicario 2: Soldado'
          ]
        }
      ],
      value: [ 'Game of Thrones' ]
    },
    {
      title: 'Prefers', type: 'radio', required: true,
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ]
    },
    {
      title: 'Comments', type: 'textarea'
    },
    {
      title: 'New Feature', type: 'richtext' as any
    },
    {
      title: 'Category', type: 'select', required: true,
      options: [ 'Category 1', 'Category 2', 'Category 3' ]
    }
  ]

  constructor (private cd: ChangeDetectorRef) {
    super()
  }

  ngOnInit (): void {
    this.form = QuickForm.makeForm(this.fields)

    this.autoUnsubscribe(
      this.form.valueChanges.pipe(
        tap(() => this.cd.markForCheck())
      )
    )
  }

  get values () {
    return JSON.stringify(QuickForm.preProcessFormValues(this.form.value), null, 2)
  }

  get valid () {
    return this.form.valid
  }
}
