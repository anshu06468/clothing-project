import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ProductService } from '../services/product.service';
import { filter, startWith, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { relative } from 'path';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  imgUrl: string
  category: string
  data: []
  default = new Array(4);

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute,private productS:ProductsService) { }

  public destroyed = new Subject<any>();
  
  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      startWith(this.router),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      // console.log("event")
      this.fetchData()
    });
  }

  fetchData() {
    this.category = this.route.snapshot.params.category;
    this.productService.getCategoryProducts(this.category).subscribe(data => {
      // console.log("asdf")
      // this.imgUrl=data[0].defaultimage;
      this.data = data;
    })
  }

  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.complete();
    console.log("destroyed")
  }

  singleNavigate(item){
    this.productService.getProductById(item._id).subscribe(()=>{
      this.router.navigate([item.name,item._id],{relativeTo: this.route})
    });
  }


}
