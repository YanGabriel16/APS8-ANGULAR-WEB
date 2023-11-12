import { Component, Input, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdicionarLocalRequest, AtualizarLocalRequest, Local } from '../../models';
import { LocalService } from '../../service/local.service';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-atualizar-local',
  templateUrl: './modal-atualizar-local.component.html'
})
export class ModalAtualizarLocalComponent implements OnInit {
  entidadeId: number;
  form: FormGroup;
  inscricao: Subscription;
  loading: boolean = false;
  entidade: Local;

  constructor(private fb: FormBuilder,
    private service: LocalService,
    private messageService: MessageService, 
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.entidadeId = this.config.data.entidadeId;
    this.inscricao = this.service.obter(this.entidadeId.toString()).subscribe(res => {
      this.entidade = res;
      this.form = this.fb.group({
        nome: [this.entidade.nome, Validators.required],
        latitude: [{value: this.entidade.latitude ?? " - ", disabled: true}],
        longitude: [{value: this.entidade.longitude ?? " - ", disabled: true}],
        cep: [{value: this.entidade.cep ?? " - ", disabled: true}],
        cidade: [{value: this.entidade.cidade ?? " - ", disabled: true}],
        estado: [{value: this.entidade.estado ?? " - ", disabled: true}],
        pais: [{value: this.entidade.pais ?? " - ", disabled: true}],
      });
    });
  }

  onClickAtualizar() {
    if (this.form.get('nome').value == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'O nome é requerido.' });
      return;
    }

    if (this.form.get('latitude').value == null || this.form.get('longitude').value == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A latitude e longitude são requeridas.' });
      return;
    }
    this.loading = true;

    var request: AtualizarLocalRequest = {
      nome: this.form.get('nome').value
    };

    this.inscricao = this.service.atualizar(this.entidade.id.toString(), request).subscribe(
      () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Local foi atualizado com sucesso.' });
        return;
      }, error => {
        this.loading = false;
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao atualizar o local.' });
        return;
      });
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
