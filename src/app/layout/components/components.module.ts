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

@NgModule({
    providers: [
        MessageService,
    ],
    declarations: [
        ModalAdicionarLocalComponent,
        ModalAtualizarLocalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        MessagesModule
    ],
    exports: []
})
export class ComponentsModule { }