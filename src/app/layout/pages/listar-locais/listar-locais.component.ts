import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Local } from '../../models/local';

@Component({
  selector: 'app-listar-locais',
  templateUrl: './listar-locais.component.html',
  styleUrls: ['./listar-locais.component.scss']
})
export class ListarLocaisComponent implements OnInit {
  locais: Local[] = [];
  first = 0;
  rows = 5;

  ngOnInit(): void {
    this.locais.push(new Local('001', 'Sorocaba-SP', '18090-505'));
    this.locais.push(new Local('002', 'Itaporang-SP', '18580-000'));
    this.locais.push(new Local('003', 'Votorantim-SP', '18050-404'));
    this.locais.push(new Local('004', 'Campinas-SP', '13010-000'));
    this.locais.push(new Local('005', 'São Paulo-SP', '01000-000'));
    this.locais.push(new Local('006', 'Rio de Janeiro-RJ', '20000-000'));
    this.locais.push(new Local('007', 'Belo Horizonte-MG', '30000-000'));
    this.locais.push(new Local('008', 'Porto Alegre-RS', '90000-000'));
    this.locais.push(new Local('009', 'Curitiba-PR', '80000-000'));
    this.locais.push(new Local('010', 'Recife-PE', '50000-000'));
    this.locais.push(new Local('011', 'Salvador-BA', '40000-000'));
    this.locais.push(new Local('012', 'Fortaleza-CE', '60000-000'));
    this.locais.push(new Local('013', 'Brasília-DF', '70000-000'));
    this.locais.push(new Local('014', 'Manaus-AM', '69000-000'));
    this.locais.push(new Local('015', 'Belém-PA', '66000-000'));
    this.locais.push(new Local('016', 'Florianópolis-SC', '88000-000'));
    this.locais.push(new Local('017', 'Natal-RN', '59000-000'));
    this.locais.push(new Local('018', 'Goiania-GO', '74000-000'));
    this.locais.push(new Local('019', 'Maceió-AL', '57000-000'));
    this.locais.push(new Local('020', 'Teresina-PI', '64000-000'));
    this.locais.push(new Local('021', 'João Pessoa-PB', '58000-000'));
    this.locais.push(new Local('022', 'Campo Grande-MS', '79000-000'));
    this.locais.push(new Local('023', 'Cuiabá-MT', '78000-000'));
    this.locais.push(new Local('024', 'Aracaju-SE', '49000-000'));
    this.locais.push(new Local('025', 'Palmas-TO', '77000-000'));
    this.locais.push(new Local('026', 'Boa Vista-RR', '69300-000'));
    this.locais.push(new Local('027', 'Porto Velho-RO', '76800-000'));
    this.locais.push(new Local('028', 'Macapá-AP', '68900-000'));
    this.locais.push(new Local('029', 'Rio Branco-AC', '69900-000'));
    this.locais.push(new Local('030', 'Vitória-ES', '29000-000'));
  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onClickAdicionarLocal(): void {

  }

  onClickAtualizar(): void {

  }

  onClickGerenciar(entidade: Local): void {

  }
}
