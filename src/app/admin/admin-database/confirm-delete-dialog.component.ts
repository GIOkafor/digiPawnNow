import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'confirm-delete-dialog',
	templateUrl: 'confirm-delete-dialog.html'
})

export class ConfirmDeleteDialog {
	
	constructor(
		public dialogRef: MdDialogRef<ConfirmDeleteDialog>
		) {
		// code...
	}
}