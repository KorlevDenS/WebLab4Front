import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Point} from "../type";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() public changeREvent = new EventEmitter<number>();
  @Output() public submitEvent = new EventEmitter<Point>();
  @Output() public deletePoints = new EventEmitter();

  public form = new FormGroup({
    x: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.max(2),
      Validators.min(-2)
    ])),
    y: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.max(5),
      Validators.min(-5)
    ])),
    r: new FormControl(null, Validators.required)
  })

  constructor(private dialog: MatDialog) {
  }

  xControl = () => this.form.controls.x;
  yControl = () => this.form.controls.y;
  rControl = () => this.form.controls.r;

  changeR() {
    this.changeREvent.emit(this.rControl().value as unknown as number);
  }

  onChangeX() {
    let err_x = document.getElementById('err_x') as HTMLInputElement;
    let x = this.xControl().value;
    if (x == -2 || x == -1.5 || x == -1 || x == -0.5 || x == 0 || x == 2 || x == 1.5 || x == 1 || x == 0.5) {
      err_x.innerHTML = "";
    } else {
      err_x.innerHTML = "Некорректное значение x";
    }
  }

  onChangeR() {
    let err_r = document.getElementById('err_r') as HTMLInputElement;
    let r = this.rControl().value;
    if (r == -2 || r == -1.5 || r == -1 || r == -0.5 || r == 0 || r == 2 || r == 1.5 || r == 1 || r == 0.5) {
      err_r.innerHTML = "";
    } else {
      err_r.innerHTML = "Некорректное значение r";
    }
  }

  changeX() {
    this.changeREvent.emit(this.xControl().value as unknown as number);
  }

  submit() {
    this.submitEvent.emit(this.form.getRawValue() as unknown as Point);
  }

  delete() {
    this.dialog.open(DialogComponent).afterClosed().subscribe(result => {
      if (!result) return;

      this.deletePoints.emit();
    });
  }
}
