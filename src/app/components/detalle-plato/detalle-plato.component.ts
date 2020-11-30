import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { Plato } from 'src/entities/Plato';

@Component({
  selector: 'app-detalle-plato',
  templateUrl: './detalle-plato.component.html',
  styleUrls: ['./detalle-plato.component.css']
})
export class DetallePlatoComponent implements OnInit {

  plato:Plato;

  constructor(private activatedRoute:ActivatedRoute, private servicioDelivery:DeliveryService) { 
    
    this.activatedRoute.params.subscribe(params =>{
      this.servicioDelivery.getPlatoEnBaseDatosXId(params['id']).subscribe(platoEncontrado => {
        this.plato = platoEncontrado as Plato;
      });
    })
  }

  ngOnInit(): void {
  }

}
