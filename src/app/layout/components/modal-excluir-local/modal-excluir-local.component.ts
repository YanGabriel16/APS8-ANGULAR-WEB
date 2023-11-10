import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Local } from '../../models';
import { LocalService } from '../../service/local.service';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-Excluir-local',
  templateUrl: './modal-Excluir-local.component.html'
})
export class ModalExcluirLocalComponent implements OnInit {
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
        nome: [{value: this.entidade.nome ?? " - ", disabled: true}],
        latitude: [{value: this.entidade.latitude ?? " - ", disabled: true}],
        longitude: [{value: this.entidade.longitude ?? " - ", disabled: true}],
        cep: [{value: this.entidade.cep ?? " - ", disabled: true}],
        cidade: [{value: this.entidade.cidade ?? " - ", disabled: true}],
        estado: [{value: this.entidade.estado ?? " - ", disabled: true}],
        pais: [{value: this.entidade.pais ?? " - ", disabled: true}],
      });
    });
  }

  onClickExcluir() {
    this.inscricao = this.service.excluir(this.entidade.id.toString()).subscribe(
      () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Local foi excluido com sucesso.' });
        return;
      }, error => {
        this.loading = false;
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao excluir o local.' });
        return;
      });
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
