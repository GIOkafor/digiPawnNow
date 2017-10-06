import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MatDialogModule) public error: any) { }

  ngOnInit() {
  }

}
