import { ApiService } from './api.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'navie-bayes';
  validateForm!: FormGroup<{
    pregnacy: FormControl;
    glucose: FormControl;
    bloodPressure: FormControl;
    skinThickness: FormControl;
    insulin: FormControl;
    bmi: FormControl;
    diabetesPedigreeFunction: FormControl;
    age: FormControl;
  }>
  result: any;
  textResult: any = "Bạn vui lòng nhập đủ thông tin"
  submitForm(): void {
    console.log(this.validateForm.value);
    let data = {
      prgnancies: this.validateForm.value.pregnacy,
      gluco: this.validateForm.value.glucose,
      blood_pressure: this.validateForm.value.bloodPressure,
      skin: this.validateForm.value.skinThickness,
      insulin: this.validateForm.value.insulin,
      bim: this.validateForm.value.bmi,
      diabetes: this.validateForm.value.diabetesPedigreeFunction,
      age: this.validateForm.value.age,
    }
    this.Api.postData(data).subscribe((res: any) => {
      console.log(res);
      this.result = res;
      this.textResult = this.getText();
      this.getData();
    }
    );
    
  }
  data: any[] = [];
  getData(): void {
    this.Api.getData().subscribe((res: any) => {
      console.log(res);
      this.data = res;

    }
    );
  }
  resetForm(): void {
    this.validateForm.reset();
    this.textResult = "Bạn vui lòng nhập đủ thông tin"
  }
  getText() {
    if (this.result.status == 'success') {
      return this.result.prediction == 'Yes' ? "Bạn có khả năng mắc bệnh tiểu đường" : "Bạn không có khả năng mắc bệnh tiểu đường"
    }else{
      return "Bạn chưa nhập đủ thông tin"
    }

  }
  isVisible = false;

  toggleModal(): void {
    this.getData();
    this.isVisible = !this.isVisible;
  }

  constructor( private fb: NonNullableFormBuilder, private Api: ApiService) {
    this.validateForm = this.fb.group({
      pregnacy: [null, [Validators.required]],
      glucose: [null, [Validators.required]],
      bloodPressure: [null, [Validators.required]],
      skinThickness: [null, [Validators.required]],
      insulin: [null, [Validators.required]],
      bmi: [null, [Validators.required]],
      diabetesPedigreeFunction: [null, [Validators.required]],
      age: [null, [Validators.required]],
    });
   }

  
}
