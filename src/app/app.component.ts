import { Component } from '@angular/core'
import { DataService } from './data.service'
import { OnInit } from '@angular/core'
import { Komposition } from '../server/entities/komposition'


@Component({
  providers: [DataService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['~@angular/material/core/theming/prebuilt/deeppurple-amber.css']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
      this.getUsers();
    }

title = 'Kompositions!';
constructor(private ds: DataService){};

kompositions: Komposition[];

getUsers(): any {
  this.ds.getKompositions().subscribe(result =>
  this.kompositions = result);
}



}
