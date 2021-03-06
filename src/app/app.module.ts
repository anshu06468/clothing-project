import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { MdePopoverModule } from '@material-extended/mde';
import { SliderComponent } from './common/slider/slider.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { LoginComponent } from './common/login/login.component';
import { ShoppingCartComponent } from './myprofile/shopping-cart/shopping-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileInformationComponent } from './myprofile/profile-information/profile-information.component';
import { ManageAddressComponent } from './myprofile/manage-address/manage-address.component';
import { SavedCardsComponent } from './myprofile/saved-cards/saved-cards.component';
import { MyRewardsComponent } from './myprofile/my-rewards/my-rewards.component';
import { ReviewsRatingComponent } from './myprofile/reviews-rating/reviews-rating.component';
import { NotificationsComponent } from './myprofile/notifications/notifications.component';
import { WishlistComponent } from './myprofile/wishlist/wishlist.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
import { SignupComponent } from './common/signup/signup.component';
import { MaterialModule } from './material/material.module'
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { SearchComponent } from './search/search.component';
import { SearchproductComponent } from './search/searchproduct/searchproduct.component'
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AdsComponent } from './common/ads/ads.component';

const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    SliderComponent,
    FooterComponent,
    ProductsComponent,
    SingleProductComponent,
    LoginComponent,
    ShoppingCartComponent,
    MyprofileComponent,
    ProfileInformationComponent,
    ManageAddressComponent,
    SavedCardsComponent,
    MyRewardsComponent,
    ReviewsRatingComponent,
    NotificationsComponent,
    WishlistComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    ForgotPasswordComponent,
    ChangepasswordComponent,
    SearchComponent,
    SearchproductComponent,
    AdsComponent
  ],
  imports: [
    NgxImageZoomModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OwlModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    NgxSkltnModule.forRoot(skltnConfig),
    MdePopoverModule,

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent]
})
export class AppModule { }
