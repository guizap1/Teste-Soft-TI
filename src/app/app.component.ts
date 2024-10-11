import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { Cadastro } from './cadastro/cadastro.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, Cadastro],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  }



