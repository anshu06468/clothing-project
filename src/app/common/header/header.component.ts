import { Component, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/Ilogin';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MdePopoverTrigger } from '@material-extended/mde';
import { AuthService } from 'src/app/services/auth-service';
import { ProductService } from 'src/app/services/product.service';
import { HomeService } from 'src/app/services/home.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  category:Array<string>=["Exclusive","Zodiac T-Shirts","Couple","Regional","Music","Psychedelic","Yoga","TV & Camera","Personalized Template","Travel"]

  loadingEnable: boolean;
  sidenavEnable = false;
  isAuthenticated=false;
  user:User;
  private userSub:Subscription;
  private Productsubs:Subscription;
  private Loadingsubs:Subscription;
  private HomeSub:Subscription;

  
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }

  constructor(public dialog: MatDialog, private router: Router, private loadingService:LoadingService,
    private authService: AuthService,private productService:ProductService,private homeservice:HomeService) { }

  
  ngOnInit() {
    this.Productsubs=this.productService.getAllProducts().subscribe(resp=>{
      this.productService.category.next(resp);
    });
    this.HomeSub=this.homeservice.getBanners().subscribe();
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;//trick !user?false:true
      this.user=user;
    })

    this.authService.autoLogin();
    this.Loadingsubs=this.loadingService.progressEnable.subscribe(next => {
      this.loadingEnable = next;
    });
  }
  quantity = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];
  cartItems = new Array(3);

  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    this.authService.logOut()
  }
  closeCartPopover() {
    if (this.isAuthenticated) {
      this.trigger.toArray()[3].togglePopover();
    } else {
      this.trigger.toArray()[2].togglePopover();
    }
  }

  productHome(category) {
    this.router.navigate(['product/'+category]);
    }

  search(){
    this.router.navigate(["/search"],{queryParams:{page:1}});
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.Productsubs.unsubscribe();
    this.Loadingsubs.unsubscribe();
    this.HomeSub.unsubscribe();
  }
}
