import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModel } from 'src/app/Models/Usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'fechaNacimiento', 'sexo'];
  dataSource: MatTableDataSource<UsuarioModel>;
  usuarios: UsuarioModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.usuarios);
   }

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource(this.usuarios);
    const usuarios: UsuarioModel[] = [
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Anderson11', fechaNacimiento: '24/12/1987', sexo: 'M'},
      {nombre: 'Juan', fechaNacimiento: '24/12/1987', sexo: 'M'}
    ]

    this.dataSource = new MatTableDataSource(usuarios);
    console.log('sort: ', this.sort, 'paginator: ', this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  create() {

  }

  update() {

  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
