import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  onClick(){
    this.toastr.error('Nos serveurs ne répondent plus', 'Une erreur est survenue');
  }

}
