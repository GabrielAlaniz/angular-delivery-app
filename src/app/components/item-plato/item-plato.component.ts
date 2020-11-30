import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plato } from 'src/entities/Plato';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-plato',
  templateUrl: './item-plato.component.html',
  styleUrls: ['./item-plato.component.css']
})
export class ItemPlatoComponent implements OnInit {

  @Input() platoAux:Plato;
  @Input() index:number;

  @Output() platoSeleccionado:EventEmitter<number>; //number == index

  constructor(private router:Router) { 
    this.platoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public verPlato(){
    console.log(this.index);
    this.platoSeleccionado.emit(this.index);
  }
}
