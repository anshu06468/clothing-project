import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdsService } from '../services/ads.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  adsArray=[];

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

  constructor(private adservice:AdsService, private router: Router, private productService: ProductService) {
  
    
    // iconRegistry.addSvgIcon(
    //     'thumbs-up',
    //     sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
    // this.getAds()
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

  // getAds(){
  //   this.adservice.getAds().subscribe(data=>{
  //     // console.log(data)
  //     this.adsArray=data.data;
  //   })
  // }
  

} 
