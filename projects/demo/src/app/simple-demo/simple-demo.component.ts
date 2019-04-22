import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickFormField } from '../../quick-form/QuickFormField'
import { QuickForm } from '../../quick-form/QuickForm'
import { BaseComponent } from '../../quick-form/util/BaseComponent'
import { ArrayValidators } from '../../quick-form/validators/ArrayValidators'
import { tap } from 'rxjs/operators'

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
      validators: [ ArrayValidators.minSelectedValues(2) ],
      value: 'Angular'
    },
    {
      title: 'Experience 2', type: 'chips',
      options: [
        {
          group: 'JavaScript',
          options: [
            { value: 'React', label: 'React' },
            { value: 'Angular', label: 'Angular' },
            { value: 'Vue', label: 'Vue' },
            { value: 'Ember.js', label: 'Ember.js' },
            { value: 'jQuery', label: 'jQuery' }
          ]
        }, {
          group: 'Java',
          options: [
            { value: 'SpringMVC', label: 'SpringMVC' },
            { value: 'Wicket', label: 'Wicket' },
            { value: 'JSF', label: 'JSF' }
          ]
        }
      ],
      value: [ 'Vue', 'jQuery' ]
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
    return JSON.stringify(QuickForm.preProcessFormValues(this.form.value, this.fields), null, 2)
  }
}
