import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { QuickForm, QuickFormField } from 'ng-quick-form'

@Component({
  selector: 'app-simple-demo',
  templateUrl: 'simple-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleDemoComponent implements OnInit {
  form!: FormGroup
  fields: QuickFormField[] = [
    {
      title: 'Name', validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    {
      title: 'Country', type: 'select',
      options: [ 'Australia', 'Finland', 'Kenya', 'Malaysia', 'Peru' ]
    },

    {
      title: 'State', type: 'select',
      // options for state changes based on selected country
      optionsFn: (values: any) => {
        switch (values.country) {
          case 'Australia':
            return [ 'Perth', 'Sydney', 'Atlantis' ]
          case 'Malaysia':
            return [ 'Selangor', 'Kuala Lumpur', 'Atlantis' ]
          default:
            return [ 'Other State 1', 'Other State 2' ]
        }
      }
    },
    {
      title: 'Front End', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      value: 'Angular'
    },
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
