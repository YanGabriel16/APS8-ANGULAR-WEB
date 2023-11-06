import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdicionarLocalRequest } from '../../models';
import { LocalService } from '../../service/local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-adicionar-local',
  templateUrl: './modal-adicionar-local.component.html',
  styleUrls: ['./modal-adicionar-local.component.scss']
})
export class ModalAdicionarLocalComponent {
  form: FormGroup;
  inscricao: Subscription;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private service: LocalService,
    private messageService: MessageService) {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      latitude: [null, [Validators.required, Validators.pattern(/^-?\d*\.?\d*$/)]],
      longitude: [null, [Validators.required, Validators.pattern(/^-?\d*\.?\d*$/)]],
      cep: [null],
      cidade: [null],
      estado: [null],
      pais: [null],
    });
  }

  onClickAdicionar() {
    if (this.form.get('nome').value == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'O nome é requerido.' });
      return;
    }

    if (this.form.get('latitude').value == null || this.form.get('longitude').value == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A latitude e longitude são requeridas.' });
      return;
    }
    this.loading = true;

    var request: AdicionarLocalRequest = {
      nome: this.form.get('nome').value,
      latitude: this.form.get('latitude').value,
      longitude: this.form.get('longitude').value,
      cep: this.form.get('cep').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      pais: this.form.get('pais').value,
    };

    this.inscricao = this.service.adicionar(request).subscribe(
      () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Local foi adicionado.' });
        return;
      }, error => {
        this.loading = false;
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao adicionar o local.' });
        return;
      });
  }
}
