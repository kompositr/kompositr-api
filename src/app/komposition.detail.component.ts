import { Component,Input } from '@angular/core'
import { Komposition } from '../server/entities/komposition'

@Component({
  providers: [],
  selector: 'komposition-detail',
  templateUrl: './komposition.detail.component.html',
  styleUrls: []
})

export class KompositionDetailComponent {
  @Input()
  komp: Komposition;
}