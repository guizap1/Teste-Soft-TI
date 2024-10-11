import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CepService } from '../cep.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class Cadastro {
  title = 'soft-ti-teste';
  showForm = false;
  mostrarNomeFantasia: boolean = false;
  submitted = false;
  userForm: FormGroup;
  users;

  constructor(
    private cepService: CepService,
  ) {
    this.userForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      endereco: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nomeFantasia: new FormControl(''),
      cep: new FormControl('', Validators.required),
      tipoCliente: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
    });

    this.users = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  consultaCep() {
    this.cepService.buscarCep(this.userForm.get("cep")?.value).subscribe((dados) => this.populaForm(dados))
  }

  populaForm(dados: any) {
    this.userForm.patchValue({
      cep: dados.cep,
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
    })
  }

  changeShowForm(): void {
    this.showForm = !this.showForm;
    this.submitted = false;
    this.userForm.reset();
  }

  onTipoChange(event: Event): void {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    this.mostrarNomeFantasia = valorSelecionado === 'juridica';
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const dadosForm = this.userForm.value;

      const novoUsuario = {
        cod: this.users.length + 1,
        nome: dadosForm.nome,
        endereco: dadosForm.endereco,
        email: dadosForm.email,
        nomeFantasia: dadosForm.nomeFantasia,
        cep: dadosForm.cep,
        tipoCliente: dadosForm.tipoCliente,
        documento: dadosForm.documento,
        bairro: dadosForm.bairro,
        cidade: dadosForm.cidade,
        telefone: dadosForm.telefone,
      };

      this.users.push(novoUsuario);
      
      localStorage.setItem('usuarios', JSON.stringify(this.users));

      this.userForm.reset();
      this.showForm = false;
      this.submitted = false;
    } else {
      alert('Formulário inválido, por favor preencha os campos obrigatórios(*).');
    }
  }
}