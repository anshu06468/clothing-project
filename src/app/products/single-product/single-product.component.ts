import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  constructor() { }
  myThumbnail="https://res.cloudinary.com/div44owu1/image/upload/v1600703368/shbqvxbcyua4pdeqjgfo.webp"
  ngOnInit(): void {
  }

}
