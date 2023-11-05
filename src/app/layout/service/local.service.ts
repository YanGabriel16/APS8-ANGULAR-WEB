import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Local } from "../models/local";

@Injectable({
    providedIn: 'root',
})
export class LocalService {

    constructor(private http: HttpClient) { }

    private get url(): string {
        return "http://localhost:40000/api/Local";
    }

    adicionar(request: AdicionarLocalRequest): Observable<void> {
        return this.http.post<void>(`${this.url}`, request)
            .pipe(map(o => o));
    }

    atualizar(id: string, request: AtualizarLocalRequest): Observable<void> {
        return this.http.post<void>(`${this.url}/${id}`, request)
            .pipe(map(o => o));
    }

    excluir(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`)
            .pipe(map(o => o));
    }

    obter(id: string): Observable<Local> {
        return this.http.get<Local>(`${this.url}/local/${id}`)
            .pipe(map(o => o));
    }

    obterTodos(): Observable<Local[]> {
        return this.http.get<Local[]>(`${this.url}/locais`)
            .pipe(map(o => o as Local[]));
    }
}