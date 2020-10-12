import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StringifyOptions } from 'querystring';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    center: true,
    navigation: false, 
    loop:true,
    autoplay:false,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
data:[];
default = new Array(4);
subscription:Subscription

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private productService: ProductService) {
  
    
    // iconRegistry.addSvgIcon(
    //     'thumbs-up',
    //     sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
    // this.productService.getAllProducts().subscribe(res => {
    //   this.data = res.data;
    //   console.log(res)
    // });
    this.subscription=this.productService.category.subscribe(resp=>{
      if(!resp){
        setTimeout(()=>this.data=resp.data,1000)
      }else {
        this.data=resp.data
      }
    })
  }

  productHome(category:string) {
    this.router.navigate(['product/'+category]);
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

} 
