import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickForm, QuickFormField, CheckboxValidators } from 'ng-quick-form'

@Component({
  selector: 'app-field-types-demo',
  templateUrl: './field-types-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTypesDemoComponent implements OnInit {
  form!: FormGroup
  fields: QuickFormField[] = [
    {
      title: 'Name', required: true,
      validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    {
      title: 'Good', disabled: true,
      value: 'Good'
    },
    { title: 'Hungry?', type: 'switch' },
    { title: 'Programming Questions', type: 'separator' },
    {
      title: 'Front End', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      validators: [ CheckboxValidators.minSelectedValues(1) ],
      value: 'Angular'
    },
    {
      title: 'Real Programming Languages', type: 'chips',
      options: [ 'PHP', 'Cobol', 'Java', '.NET', 'C', 'C++' ]
    },
    {
      title: 'Prefers', type: 'radio', required: true,
      options: [ 'Front End', 'Back End', 'Full Stack', 'Whatever' ]
    },
    { title: 'Pet', type: 'separator' },
    {
      title: 'Animal Type', type: 'autocomplete',
      options: [ 'Fish', 'Insect', 'Mammal' ]
    },
    {
      title: 'Animal', type: 'autocomplete',
      // options for animal changes based on selected animal type
      optionsFn: (values: any) => {
        switch (values.animalType) {
          case 'Fish':
            return [ 'Gold Fish', 'Nemo' ]
          case 'Insect':
            return [ 'Ant', 'Bee', 'Spider' ]
          case 'Mammal':
            return [ 'Cat', 'Dog', 'Monkey' ]
          default:
            return [ ]
        }
      }
    },
    { title: 'Entertainment', type: 'separator' },
    {
      title: 'Series/Movies', type: 'chips',
      value: [ 'Game of Thrones' ],
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
      ]
    },
    {
      title: 'Oscar Nominees', type: 'select', selectMultiple: true, required: true,
      options: [
        'Avengers: Infinity War',
        'Deadpool 2',
        'Solo: A Star Wars Story',
        'Ocean\'s 8'
      ]
    },
    {
      title: 'Winner', type: 'select', required: true,
      options: [
        'Avengers: Infinity War',
        'Deadpool 2',
        'Solo: A Star Wars Story',
        'Ocean\'s 8'
      ]
    },
    {
      title: 'Comments', type: 'textarea'
    }
  ]

  ngOnInit (): void {
    this.form = QuickForm.makeForm(this.fields)
  }

  get values () {
    return JSON.stringify(QuickForm.preProcessFormValues(this.form.value), null, 2)
  }

  get valid () {
    return this.form.valid
  }
}
