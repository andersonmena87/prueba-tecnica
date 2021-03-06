import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioGestionaComponent } from './modal-usuario-gestiona/usuarioGestion.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUsuarioComponent } from './modal-eliminar/eliminarUsuario.component';
import { ExcelService } from 'src/app/services/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'fechaNacimiento', 'genero', 'actions'];
  dataSource: MatTableDataSource<UsuarioModel>;
  usuarios: UsuarioModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private excelService: ExcelService,
    private datePipe: DatePipe,
  ) {
    this.dataSource = new MatTableDataSource(this.usuarios);
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usuarioService.getUsers().subscribe({
      next: (response) => {
        this.usuarios = response;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  create() {
    const dialogRef = this.dialog.open(UsuarioGestionaComponent, {
      width: '50%',
      disableClose: true, data: {}
    });

    dialogRef.componentInstance.metodo = 'save';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getUsers();
    });
  }

  update(usuario: UsuarioModel) {
    const dialogRef = this.dialog.open(UsuarioGestionaComponent, {
      width: '50%',
      disableClose: true, data: usuario
    });

    dialogRef.componentInstance.metodo = 'update';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getUsers();
    });
  }

  delete(usuario: UsuarioModel){
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '40%',
      disableClose: true, data: usuario
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getUsers();
    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getExcel(){
    let usuarios: any [] = [];
    let fecha: Date;
    this.dataSource.data.forEach((data) => {
      fecha = new Date(data.fechaNacimiento)
      usuarios.push({
        'Nombre': data.nombre,
        'Fecha de nacimiento': this.datePipe.transform(fecha, 'dd-MM-yyyy', 'es-ES'),
        'G??nero': this.getGenero(data.genero)
      })
    })

    this.excelService.exportAsExcelFile(usuarios, 'xls');
  }

  getGenero(genero: string){
    return genero == 'M' ? 'Masculino' : 'Femenino';
  }

  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
