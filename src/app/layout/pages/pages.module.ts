import { NgModule } from "@angular/core";
import { ListarLocaisComponent } from "./listar-locais/listar-locais.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { ComponentsModule } from "../components";
import { DialogModule } from "primeng/dialog";
import { DialogService } from "primeng/dynamicdialog";
import { CardModule } from 'primeng/card';
import { DashboardLocalComponent } from "./dashboard-local/dashboard-local.component";
import { MessagesModule } from 'primeng/messages';
import { DateFormatPipe } from "../pipes";

@NgModule({
    providers: [DialogService],
    declarations: [
        ListarLocaisComponent,
        DashboardLocalComponent,
        DateFormatPipe
    ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        FormsModule,
        PagesRoutingModule,
        ComponentsModule,
        DialogModule,
        CardModule,
        MessagesModule,
        
    ],
    exports: [ListarLocaisComponent]
})
export class PagesModule { }