import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ModalAdicionarLocalComponent } from './modal-adicionar-local/modal-adicionar-local.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ModalAtualizarLocalComponent } from './modal-atualizar-local/modal-atualizar-local.component';
import { ModalExcluirLocalComponent } from './modal-excluir-local/modal-excluir-local.component';
import { ChartModule } from 'primeng/chart';
import { GraficoLinhaComponent } from './grafico-linha/grafico-linha.component';

@NgModule({
    providers: [
        MessageService,
    ],
    declarations: [
        ModalAdicionarLocalComponent,
        ModalAtualizarLocalComponent,
        ModalExcluirLocalComponent,
        GraficoLinhaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        MessagesModule,
        ChartModule
    ],
    exports: [
        GraficoLinhaComponent
    ]
})
export class ComponentsModule { }