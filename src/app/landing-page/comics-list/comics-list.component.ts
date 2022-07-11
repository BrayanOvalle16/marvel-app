import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComicsService } from 'src/app/Services/comics.service';
import { ComicsPageComponent } from '../comics-page/comics-page.component';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
export class ComicsListComponent implements OnInit {

  constructor(public http: ComicsService, public dialog: MatDialog) { }

  data: any;
  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(){
    this.data = this.http.getFavoriteComics();
    console.log(this.http.getFavoriteComics())
  }
  openDialog(url: string) {
    const dialogRef = this.dialog.open(ComicsPageComponent, {data: 
    url});
  }
}
