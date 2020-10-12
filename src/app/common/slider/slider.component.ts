import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/Ilogin';
import { LoginService } from 'src/app/services/login.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  carouselOptions = 
    {
      animateIn: 'bounceInRight',
      animateOut: 'bounceOutLeft',
      items: 1, 
      dots: true, 
      navigation: false, 
      loop:true,
      margin:20,
      autoplay:true,
      autoHeight: true,
      autoHeightClass: 'owl-height',
      center:true,
      lazyLoad:true
      
  }
  
 
  images = [
    
   
  ];
 
  constructor(private homeService: HomeService) { 
    this.homeService.bannersImages.subscribe(res => {
      if(res){
        this.images = res.data;
        // console.log(res)
      }
      else{
        // console.log("not loaded")
        setTimeout(() => {
          this.images=res.data;
        }, 1000);
      }
    })
  }

  ngOnInit() {
  }


}
